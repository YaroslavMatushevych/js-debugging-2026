export function ReactScanSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 01 · tools · how to set up</div>
        <h2 className="mb-16">React Scan + WDYR — how we ran these</h2>

        <div className="grid-2" style={{ gap: 24, alignItems: 'start' }}>

          <div className="flex-col gap-16">

            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>React Scan — already wired in zoopla-web</div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: '0.82rem', lineHeight: 1.9, color: '#e6edf3' }}>
                <div style={{ color: '#6e7681' }}>{'# .env'}</div>
                <div><span style={{ color: '#7ee787' }}>NEXT_PUBLIC_REACT_SCAN_ENABLED</span>=true</div>
                <div style={{ marginTop: 8, color: '#6e7681' }}>{'# or inject on any site:'}</div>
                <div style={{ color: '#e6edf3' }}>{'<script src="unpkg.com/react-scan/dist/auto.global.js"></script>'}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>WDYR — patches React before first render</div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: '0.82rem', lineHeight: 1.9, color: '#e6edf3' }}>
                <div style={{ color: '#8b949e' }}>{'// wdyr.ts — must be FIRST import in _app.tsx'}</div>
                <div><span style={{ color: '#ff7b72' }}>import</span> React <span style={{ color: '#ff7b72' }}>from</span> <span style={{ color: '#a5d6ff' }}>'react'</span>;</div>
                <div><span style={{ color: '#ff7b72' }}>if</span> (process.env.NODE_ENV === <span style={{ color: '#a5d6ff' }}>'development'</span>) {'{'}</div>
                <div style={{ paddingLeft: 16 }}><span style={{ color: '#ff7b72' }}>const</span> wdyr = require(<span style={{ color: '#a5d6ff' }}>'@welldone-software/why-did-you-render'</span>);</div>
                <div style={{ paddingLeft: 16 }}>wdyr(React, {'{'} trackAllPureComponents: <span style={{ color: '#79c0ff' }}>true</span>, trackHooks: <span style={{ color: '#79c0ff' }}>true</span>, include: [<span style={{ color: '#a5d6ff' }}>/.*/</span>] {'}'});</div>
                <div>{'}'}</div>
              </div>
            </div>

            <div style={{ padding: '10px 14px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--red)' }}>
              <p style={{ fontSize: '0.85rem' }}>
                <strong>WDYR + React 19:</strong> works but requires <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>include: [/.*/]</code> — without it, only <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>React.memo</code> components are tracked. Must import before React renders anything.
              </p>
            </div>

          </div>

          <div className="flex-col gap-16">
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>React Scan on zoopla search — live</div>
              <img
                src="/screenshots/rs-real-search.png"
                alt="React Scan on zoopla-web"
                style={{ width: '100%', maxHeight: 280, objectFit: 'cover', objectPosition: 'top', borderRadius: 6, border: '1px solid var(--border2)', display: 'block' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                <div style={{ padding: '8px 10px', background: 'var(--card)', borderRadius: 4, borderLeft: '2px solid var(--red)', fontSize: '0.8rem' }}>
                  <strong>Bottom-left "2 issue ×"</strong> — real React errors found. Click to see which components + what.
                </div>
                <div style={{ padding: '8px 10px', background: 'var(--card)', borderRadius: 4, borderLeft: '2px solid var(--border2)', fontSize: '0.8rem' }}>
                  <strong>Bottom-right ms</strong> — render time per cycle. Spike = something re-rendering too much.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
