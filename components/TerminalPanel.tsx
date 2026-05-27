export default function TerminalPanel() {
  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle bg-bg-terminal">
      {/* Title bar - Updated to bg-bg-tertiary for crisp contrast in light mode */}
      <div className="flex items-center gap-1.5 border-b border-border-subtle bg-bg-tertiary px-3 py-2">
        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#E24B4A' }} />
        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#EF9F27' }} />
        <span className="inline-block h-2 w-2 rounded-full bg-accent-teal" />
        <span className="ml-2 font-mono text-[11px] text-text-tertiary">andrew@castor:~</span>
      </div>

      {/* Body - Text tokens automatically inherit the darkened light-mode colors */}
      <div className="px-3.5 py-4 font-mono text-[12px] leading-relaxed">
        <div>
          <span className="text-accent-teal">$</span>{' '}
          <span className="text-text-secondary">whoami</span>
        </div>
        <div className="text-text-tertiary">infrastructure_engineer</div>

        <div className="mt-2.5">
          <span className="text-accent-teal">$</span>{' '}
          <span className="text-text-secondary">cat ./profile.json</span>
        </div>
        <div className="text-text-tertiary">
          <div>{'{'}</div>
          <div className="pl-3">
            <span className="text-accent-purple-bright">&quot;focus&quot;</span>
            <span className="text-text-tertiary">: </span>
            <span className="text-text-secondary">&quot;infrastructure security&quot;</span>
            <span className="text-text-tertiary">,</span>
          </div>
          <div className="pl-3">
            <span className="text-accent-purple-bright">&quot;location&quot;</span>
            <span className="text-text-tertiary">: </span>
            <span className="text-text-secondary">&quot;Orlando, FL&quot;</span>
            <span className="text-text-tertiary">,</span>
          </div>
          <div className="pl-3">
            <span className="text-accent-purple-bright">&quot;school&quot;</span>
            <span className="text-text-tertiary">: </span>
            <span className="text-text-secondary">&quot;UCF · Fall 2026&quot;</span>
            <span className="text-text-tertiary">,</span>
          </div>
          <div className="pl-3">
            <span className="text-accent-purple-bright">&quot;stack&quot;</span>
            <span className="text-text-tertiary">: [</span>
            <span className="text-text-secondary">&quot;linux&quot;</span>
            <span className="text-text-tertiary">, </span>
            <span className="text-text-secondary">&quot;tls&quot;</span>
            <span className="text-text-tertiary">, </span>
            <span className="text-text-secondary">&quot;rbac&quot;</span>
            <span className="text-text-tertiary">, </span>
            <span className="text-text-secondary">&quot;azure&quot;</span>
            <span className="text-text-tertiary">],</span>
          </div>
          <div className="pl-3">
            <span className="text-accent-purple-bright">&quot;clearance&quot;</span>
            <span className="text-text-tertiary">: </span>
            <span className="text-accent-teal">&quot;eligible&quot;</span>
          </div>
          <div>{'}'}</div>
        </div>

        <div className="mt-2.5">
          <span className="text-accent-teal">$</span>{' '}
          <span className="text-text-secondary">systemctl enable --now andrew.service</span>
        </div>
        <div className="text-accent-teal">
          ● active (running)
          <span className="ml-1 inline-block h-3 w-1.5 animate-blink bg-accent-teal align-middle" />
        </div>
      </div>
    </div>
  );
}