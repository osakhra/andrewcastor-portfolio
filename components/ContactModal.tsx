'use client';

import { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const turnstileRef = useRef<TurnstileInstance>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setErrorMessage('Security check pending. Please wait a moment and try again.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      
      // Reset form after 2.5 seconds and close modal
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
        onClose();
      }, 2500);

    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
      // Reset the turnstile token so they can try again
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary/80 p-4 backdrop-blur-sm transition-all">
      <div className="ac-card relative w-full max-w-lg shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-text-tertiary transition-colors hover:text-accent-teal"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="mb-1 font-display text-2xl font-bold text-text-primary">Get in touch</h2>
        <p className="mb-6 font-body text-[14px] text-text-secondary">
          Feel free to drop a message. I'll get back to you as soon as possible.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border-subtle bg-status-shipped-bg p-8 text-center">
            <div className="mb-3 rounded-full bg-accent-teal/20 p-3 text-accent-teal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="font-display text-lg font-semibold text-text-primary">Message Sent!</p>
            <p className="font-body text-[14px] text-text-secondary">Thank you for reaching out.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Your Name"
                className="w-full rounded-md border border-border-subtle bg-bg-primary px-3 py-2.5 font-body text-[14px] text-text-primary outline-none transition-colors focus:border-accent-teal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={status === 'loading'}
              />
              <input
                required
                type="email"
                placeholder="Your Email"
                className="w-full rounded-md border border-border-subtle bg-bg-primary px-3 py-2.5 font-body text-[14px] text-text-primary outline-none transition-colors focus:border-accent-teal"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={status === 'loading'}
              />
            </div>
            
            <input
              required
              type="text"
              placeholder="Subject"
              className="w-full rounded-md border border-border-subtle bg-bg-primary px-3 py-2.5 font-body text-[14px] text-text-primary outline-none transition-colors focus:border-accent-teal"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              disabled={status === 'loading'}
            />

            <textarea
              required
              rows={5}
              placeholder="Message"
              className="w-full resize-none rounded-md border border-border-subtle bg-bg-primary px-3 py-2.5 font-body text-[14px] text-text-primary outline-none transition-colors focus:border-accent-teal"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={status === 'loading'}
            />

            {/* Invisible Turnstile Widget */}
            <div className="hidden">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
              />
            </div>

            {status === 'error' && (
              <p className="font-body text-[13px] text-[#E24B4A]">{errorMessage}</p>
            )}

            <button 
              type="submit" 
              className="btn-primary mt-2 justify-center py-3"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}