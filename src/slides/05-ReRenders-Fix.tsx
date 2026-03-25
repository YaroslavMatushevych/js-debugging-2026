export function ReRendersFixSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 01 · real bug · zoopla-web</div>
        <h2 className="mb-8">An old workaround that became a bug</h2>
        <p className="mb-20" style={{ maxWidth: 760 }}>
          React Scan has an <strong>issues badge</strong> — it aggregates React's own <code style={{ fontFamily: 'var(--mono)', fontSize: '0.9em' }}>console.error</code> warnings and shows a persistent count on every page load.
          That's what surfaced <strong>"Invalid DOM property `fetchpriority`"</strong> on every listing image. Not the re-render overlay — React's own DOM reconciler was throwing the warning. React Scan just made it impossible to ignore.
        </p>

        <div className="flex-col gap-20">

          {/* The bug */}
          <div className="grid-2" style={{ gap: 20, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: 10 }}>
                The bug — in 4 places across libs
              </div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 20px', fontFamily: 'var(--mono)', fontSize: '0.82rem', lineHeight: 1.9, color: '#e6edf3' }}>
                <div style={{ color: '#6e7681' }}>{'// libs/image/src/lib/image.tsx'}</div>
                <div style={{ color: '#6e7681' }}>{'// libs/listing-search/listings/.../ListingGallerySlim.tsx'}</div>
                <div style={{ color: '#6e7681' }}>{'// + 2 more files'}</div>
                <div style={{ marginTop: 12 }}>{'<img'}</div>
                <div style={{ paddingLeft: 20 }}>src={'{src}'}</div>
                <div style={{ paddingLeft: 20 }}>loading="lazy"</div>
                <div style={{ paddingLeft: 20, color: '#f85149', fontWeight: 700 }}>fetchpriority="high"   {/* ← wrong */}</div>
                <div>{'/>'}  </div>
              </div>
              <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--red)' }}>
                <p style={{ fontSize: '0.85rem', marginBottom: 6 }}>
                  In React 18, <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>fetchPriority</code> (camelCase) broke Jest tests — React Testing Library used <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>ReactDOM.render</code> which didn't support it.
                  So lowercase was used as a workaround. It worked because Next.js patched it internally.
                </p>
                <p style={{ fontSize: '0.85rem' }}>
                  Then the codebase moved to <strong>React 19</strong>, which supports <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>fetchPriority</code> properly. The workaround became a bug — and nobody caught it until React Scan did.
                </p>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', marginBottom: 10 }}>
                The fix
              </div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 20px', fontFamily: 'var(--mono)', fontSize: '0.82rem', lineHeight: 1.9, color: '#e6edf3' }}>
                <div style={{ color: '#6e7681' }}>{'// Same files, same prop, one character change'}</div>
                <div style={{ marginTop: 12 }}>{'<img'}</div>
                <div style={{ paddingLeft: 20 }}>src={'{src}'}</div>
                <div style={{ paddingLeft: 20 }}>loading="lazy"</div>
                <div style={{ paddingLeft: 20, color: '#7ee787', fontWeight: 700 }}>fetchPriority="high"   {/* ← correct */}</div>
                <div>{'/>'}  </div>
              </div>
              <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--text)' }}>
                <p style={{ fontSize: '0.85rem' }}>
                  React 19 handles this natively — no patching needed. The LCP fetch priority hint actually reaches the browser.
                  The fix was already raised as a PR but stalled on the Jest test failures. The issues badge showing on every page load made it undeniable.
                </p>
              </div>
            </div>
          </div>

          {/* The workflow */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { step: '1', title: 'Enable React Scan', body: 'NEXT_PUBLIC_REACT_SCAN_ENABLED=true in .env. Run dev. Toolbar appears bottom-right immediately.', color: 'var(--border2)' },
              { step: '2', title: 'Look for the badge', body: '"N issue ×" bottom-left = React found real problems. Click it. See the component list and console errors.', color: 'var(--border2)' },
              { step: '3', title: 'Find the code', body: 'Console Error tells you the prop name and the value. Grep the codebase. Fix it in every place.', color: 'var(--red)' },
              { step: '4', title: 'Verify', body: 'Reload. Badge goes away or issue count drops. Render time in bottom-right should be lower.', color: 'var(--text)' },
            ].map(s => (
              <div key={s.step} className="card" style={{ borderTop: `2px solid ${s.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', color: s.color === 'var(--text)' ? 'var(--bg)' : '#fff', flexShrink: 0 }}>{s.step}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.title}</div>
                </div>
                <p style={{ fontSize: '0.82rem' }}>{s.body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
