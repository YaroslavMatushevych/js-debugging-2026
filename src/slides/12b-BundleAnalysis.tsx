export function BundleAnalysisSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 04 · bundle analysis</div>
        <div className="flex items-center gap-16 mb-16">
          <h2>Know what you're actually shipping</h2>
          <span className="badge">ran ANALYSE_BUNDLE=true nx build website just now</span>
        </div>

        <div className="flex-col gap-20">
          {/* Screenshot */}
          <div>
            <img
              src="/screenshots/bundle-stats.png"
              alt="@next/bundle-analyzer treemap of zoopla-web client bundle"
              style={{ width: '100%', maxHeight: 260, objectFit: 'cover', objectPosition: 'top', borderRadius: 6, border: '1px solid var(--border2)', display: 'block' }}
            />
          </div>

          {/* Config + findings */}
          <div className="grid-2" style={{ gap: 24, alignItems: 'start' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: 10 }}>next.config.js setup (3 lines)</div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '14px 18px', fontFamily: 'var(--mono)', fontSize: '0.88rem', color: '#e6edf3', lineHeight: 1.8 }}>
                <div><span style={{ color: '#79c0ff' }}>import</span>{' withBundleAnalyzer '}<span style={{ color: '#79c0ff' }}>from</span> <span style={{ color: '#a5d6ff' }}>'@next/bundle-analyzer'</span></div>
                <div style={{ marginTop: 8 }}><span style={{ color: '#e6edf3' }}>{'export default '}</span><span style={{ color: '#7ee787' }}>withBundleAnalyzer</span><span style={{ color: '#e6edf3' }}>{'({'}</span></div>
                <div style={{ paddingLeft: 20 }}><span style={{ color: '#79c0ff' }}>enabled</span>{': process.env.'}<span style={{ color: '#79c0ff' }}>ANALYSE_BUNDLE</span>{" === 'true'"}</div>
                <div>{'})('}<span style={{ color: '#e6edf3' }}>nextConfig</span>{')'}</div>
              </div>
              <div style={{ marginTop: 10, background: '#161b22', borderRadius: 6, padding: '10px 14px', fontFamily: 'var(--mono)', fontSize: '0.88rem', color: '#e6edf3' }}>
                <span style={{ color: '#6e7681' }}>$ </span>
                <span style={{ color: '#7ee787' }}>ANALYSE_BUNDLE=true</span>{' nx build website'}
                <span style={{ color: '#6e7681' }}> # opens client.html</span>
              </div>
              <div style={{ marginTop: 12 }} className="card">
                <div className="card-title">other stacks</div>
                <div className="flex-col gap-6" style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>
                  <div><span style={{ color: 'var(--dim)' }}>$</span> npx vite-bundle-visualizer <span style={{ color: 'var(--dim)' }}># Vite</span></div>
                  <div><span style={{ color: 'var(--dim)' }}>$</span> npx webpack-bundle-analyzer stats.json <span style={{ color: 'var(--dim)' }}># Webpack</span></div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: 10 }}>What we found in zoopla-web</div>
              <div className="flex-col gap-10">
                {[
                  { label: 'realtime-documentation — 1 MB parsed, 130 KB gz', fix: 'internal API docs only — not shipped to real users, chunk is isolated', color: 'var(--yellow)' },
                  { label: 'victory-core in the client bundle', fix: 'charting lib — check if it can be lazy-loaded or replaced with lighter alternative', color: 'var(--red)' },
                  { label: 'Optimizely BUILD_TIME_DATAFILE.json — appears twice', fix: 'large JSON included at build time — worth checking for deduplication', color: 'var(--red)' },
                  { label: '/for-sale: 245 KB gz · map page: 421 KB gz', fix: '200 pages all code-split — Next.js automatic splitting working well', color: 'var(--green)' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderLeft: `3px solid ${item.color}`, paddingLeft: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)' }}>{item.label}</div>
                      <div style={{ fontSize: '0.83rem', color: 'var(--muted)' }}>{item.fix}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
