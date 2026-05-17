import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <p className="mb-2 font-mono text-6xl font-bold text-accent-teal/20">404</p>
        <h1 className="mb-2 font-display text-xl font-semibold text-text-primary">
          Page not found
        </h1>
        <p className="mb-5 font-body text-sm text-text-tertiary">
          This route doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Back to Home <ArrowRightIcon size={12} />
        </Link>
      </div>
    </section>
  );
}
