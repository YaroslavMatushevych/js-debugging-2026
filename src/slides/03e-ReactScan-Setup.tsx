export function ReactScanSetupSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 01 · tools · react scan setup</div>
        <h2 className="mb-20">React Scan — inject on any site</h2>

        <div style={{ maxWidth: 640 }}>
          <div style={{ background: '#161b22', borderRadius: 6, padding: '14px 18px', fontFamily: 'var(--mono)', fontSize: '0.9rem', lineHeight: 2, color: '#e6edf3' }}>
            <div style={{ color: '#8b949e' }}>{'<!-- paste in <head> or run in DevTools console -->'}</div>
            <div style={{ marginTop: 4 }}>{'<'}<span style={{ color: '#7ee787' }}>script</span> <span style={{ color: '#79c0ff' }}>src</span>=<span style={{ color: '#a5d6ff' }}>"unpkg.com/react-scan/dist/auto.global.js"</span>{'></'}<span style={{ color: '#7ee787' }}>script</span>{'>'}</div>
          </div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--border2)' }}>
            <p>Works on any React app — local dev, staging, or production. No install, no config. The overlay appears instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
