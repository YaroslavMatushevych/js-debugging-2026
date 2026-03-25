export function ReRendersDetectionSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 01 · tools · wdyr setup</div>
        <h2 className="mb-20">why-did-you-render - setup</h2>

        <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>

          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dim)', marginBottom: 10 }}>Step 1 - create <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>src/wdyr.ts</code></div>
            <div style={{ background: '#161b22', borderRadius: 6, padding: '14px 18px', fontFamily: 'var(--mono)', fontSize: '0.9rem', lineHeight: 2, color: '#e6edf3' }}>
              <div style={{ color: '#ff7b72' }}>import <span style={{ color: '#e6edf3' }}>React</span> from <span style={{ color: '#a5d6ff' }}>'react'</span>;</div>
              <div style={{ color: '#6e7681', marginTop: 4 }}>{'// must run before React renders anything'}</div>
              <div><span style={{ color: '#ff7b72' }}>if</span> (process.env.NODE_ENV === <span style={{ color: '#a5d6ff' }}>'development'</span>) {'{'}</div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: '#ff7b72' }}>const</span> wdyr = require(<span style={{ color: '#a5d6ff' }}>'@welldone-software/why-did-you-render'</span>);</div>
              <div style={{ paddingLeft: 20 }}>wdyr(React, {'{'}</div>
              <div style={{ paddingLeft: 40 }}>trackAllPureComponents: <span style={{ color: '#79c0ff' }}>true</span>,</div>
              <div style={{ paddingLeft: 40 }}>trackHooks: <span style={{ color: '#79c0ff' }}>true</span>,</div>
              <div style={{ paddingLeft: 40 }}>include: [<span style={{ color: '#a5d6ff' }}>/.*/</span>],  <span style={{ color: '#6e7681' }}>{'// React 19: track all'}</span></div>
              <div style={{ paddingLeft: 20 }}>{'}'});</div>
              <div>{'}'}</div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dim)', marginBottom: 10 }}>Step 2 - first import in <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>pages/_app.tsx</code></div>
            <div style={{ background: '#161b22', borderRadius: 6, padding: '14px 18px', fontFamily: 'var(--mono)', fontSize: '0.9rem', lineHeight: 2, color: '#e6edf3' }}>
              <div style={{ color: '#f85149' }}>{'// ⚠ must be the very first import'}</div>
              <div style={{ color: '#8b949e' }}>{'// if not first: React patches too late - some components miss tracking'}</div>
              <div><span style={{ color: '#ff7b72' }}>import</span> <span style={{ color: '#a5d6ff' }}>'../wdyr'</span>;</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
