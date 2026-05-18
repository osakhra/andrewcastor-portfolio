export default function TerminalPanel() {
  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle" style={{ backgroundColor: '#0A0E18' }}>
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-border-subtle bg-bg-secondary px-3 py-2">
        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#E24B4A' }} />
        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#EF9F27' }} />
        <span className="inline-block h-2 w-2 rounded-full bg-accent-teal" />
        <span className="ml-2 font-mono text-[10px] text-text-muted">andrew@castor:~</span>
      </div>

      {/* Body */}
      <div className="px-3.5 py-4 font-mono text-[11px] leading-relaxed">
        <div>
          <span className="text-accent-teal">$</span>{' '}
          <span className="text-text-secondary">whoami</span>
        </div>
        <div className="text-text-tertiary">infrastructure_engineer</div>

        <div className="mt-2.5">
          <span className="text-accent-teal">$</span>{' '}
          <span className="text-text-secondary">cat ./profile.json</span>
        </div>
        <div className="pl-2 text-text-tertiary">
          <span className="text-accent-purple-bright">focus</span>:{' '}
          <span className="text-text-secondary">&quot;infrastructure security&quot;</span>
          <br />
          <span className="text-accent-purple-bright">location</span>:{' '}
          <span className="text-text-secondary">&quot;Orlando, FL&quot;</span>
          <br />
          <span className="text-accent-purple-bright">school</span>:{' '}
          <span className="text-text-secondary">&quot;UCF · Fall 2026&quot;</span>
          <br />
          <span className="text-accent-purple-bright">stack</span>:{' '}
          <span className="text-text-secondary">[linux, tls, rbac, azure]</span>
          <br />
          <span className="text-accent-purple-bright">clearance</span>:{' '}
          <span className="text-accent-teal">&quot;eligible&quot;</span>
        </div>

        <div className="mt-2.5">
          <span className="text-accent-teal">$</span>{' '}
          <span className="text-text-secondary">systemctl status hire-me</span>
        </div>
        <div className="text-accent-teal">
          ● active (running)
          <span className="ml-1 inline-block h-3 w-1.5 animate-blink bg-accent-teal align-middle" />
        </div>
      </div>
    </div>
  );
}
