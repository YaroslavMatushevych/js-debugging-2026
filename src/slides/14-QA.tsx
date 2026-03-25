export function QASlide() {
  const links = [
    { label: 'why-did-you-render',           url: 'github.com/welldone-software/why-did-you-render' },
    { label: 'React Scan',                   url: 'github.com/aidenybai/react-scan' },
    { label: 'OpenTelemetry',                url: 'opentelemetry.io' },
    { label: 'clinic.js',                    url: 'clinicjs.org' },
    { label: 'Node Diagnostic Reports',      url: 'nodejs.org/api/report.html' },
    { label: '@next/bundle-analyzer',        url: 'npmjs.com/package/@next/bundle-analyzer' },
  ];

  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 500, height: 500, background: 'rgba(0,255,136,0.03)', top: -150, right: -50 }} />
      <div className="slide-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid-2" style={{ gap: 48, alignItems: 'start' }}>

          {/* Left — meme + name + QR */}
          <div>
            <div className="eyebrow">end</div>
            <img
              src="/thank-you-meme.webp"
              alt="Thank you! You rock!"
              style={{ marginTop: 8, width: '100%', height: 420, objectFit: 'contain', objectPosition: 'left top', borderRadius: 8, display: 'block' }}
            />
            <div className="flex items-center gap-20 mt-20">
              <div className="flex-col gap-6">
                <div style={{ fontWeight: 700 }}>Yaroslav Matushevych</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Senior Software Engineer @ Zoopla</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <img src="/linkedin-qr.png" alt="LinkedIn QR code" style={{ width: 120, height: 120, borderRadius: 8, display: 'block' }} />
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--dim)' }}>LinkedIn</div>
              </div>
            </div>
          </div>

          {/* Right — resources */}
          <div className="card" style={{ padding: '12px 16px' }}>
            <div className="card-label">resources</div>
            <div className="flex-col gap-10">
              {links.map(l => (
                <div key={l.label} className="flex items-center gap-8">
                  <span style={{ color: 'var(--dim)', fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace' }}>→</span>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>{l.label}</span>
                    <span style={{ color: 'var(--dim)', fontSize: '0.78rem', marginLeft: 8, fontFamily: 'JetBrains Mono, monospace' }}>{l.url}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
