import { NextResponse } from 'next/server';

// This specific line tells Next.js to compile this as a Cloudflare Worker
export const runtime = 'edge';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // 1. Validate that the frontend sent all required fields
    if (!name || !email || !subject || !message || !turnstileToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Verify the Turnstile Token with Cloudflare's API
    const turnstileVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
    });

    const turnstileResult = await turnstileVerify.json();

    if (!turnstileResult.success) {
      return NextResponse.json({ error: 'Failed anti-bot verification' }, { status: 403 });
    }

    // 3. Send Email via Resend REST API (Bypassing the SDK for Edge compatibility)
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@andrewcastor.dev>',
        to: 'johnandrewcastor@gmail.com',
        subject: `Portfolio: ${escapeHtml(subject)}`,
        html: `
          <div style="font-family: sans-serif; color: #111827;">
            <h2 style="color: #059669;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <hr style="border: 1px solid #E5E7EB; margin: 16px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `,
        reply_to: email, // This allows you to just hit "Reply" in your inbox!
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend Error:', errorData);
      throw new Error('Failed to send email via Resend');
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Server API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}