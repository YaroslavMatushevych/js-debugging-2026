export function ReRendersProblemSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 01 · zoopla-web · real finding</div>
        <h2 className="mb-20">UserProvider — re-rendering the whole app</h2>

        <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>

          {/* Left — real code + fix */}
          <div className="flex-col gap-16">

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dim)', marginBottom: 10 }}>
                Real code — <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>libs/user/src/lib/userProvider.tsx</code> · line 295
              </div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: '0.92rem', lineHeight: 2, color: '#e6edf3' }}>
                <div style={{ color: '#6e7681' }}>{'// new object on every render'}</div>
                <div style={{ color: '#f85149' }}>{'const value = { state, dispatch };'}</div>
                <div style={{ color: '#f85149' }}>{'return <Context.Provider value={value}>'}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dim)', marginBottom: 10 }}>
                The fix
              </div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: '0.92rem', lineHeight: 2, color: '#e6edf3' }}>
                <div style={{ color: '#7ee787' }}>{'const value = useMemo('}</div>
                <div style={{ color: '#7ee787', paddingLeft: 20 }}>{'() => ({ state, dispatch }),'}</div>
                <div style={{ color: '#7ee787', paddingLeft: 20 }}>{'[state, dispatch]'}</div>
                <div style={{ color: '#7ee787' }}>{');'}</div>
              </div>
            </div>

            <div style={{ padding: '12px 16px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--blue)' }}>
              <p style={{ fontSize: '0.9rem' }}>
                <strong>Alternative:</strong> replace the context entirely with <strong>Zustand</strong> — store is external to the render tree, subscriptions are per-selector, no cascade by design.
              </p>
            </div>

          </div>

          {/* Right — impact */}
          <div className="flex-col gap-16">

            <div style={{ padding: '16px 18px', background: 'var(--card)', borderRadius: 8, borderLeft: '3px solid var(--red)' }}>
              <div style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>What WDYR logged — </span>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--red)', letterSpacing: '-0.03em' }}>478</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', marginLeft: 8 }}>re-renders on <code style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>/to-rent/property/london/</code> · impacts TBT + INP</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 44px 1fr', gap: '8px 12px', alignItems: 'baseline' }}>
                {[
                  { comp: 'UserProvider', count: '6×', why: 'value object recreated on every dispatch' },
                  { comp: 'Header + Menu', count: '12×', why: 'cascade — wraps _app.tsx, every useUser() consumer follows' },
                  { comp: 'ListingSlim', count: '~20×', why: 'all 20+ cards re-render together' },
                  { comp: 'SearchResults', count: '4×', why: 'consuming SearchProvider context' },
                ].map(r => (
                  <>
                    <code key={r.comp + 'c'} style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem', color: '#79c0ff' }}>{r.comp}</code>
                    <span key={r.comp + 'n'} style={{ color: 'var(--red)', fontWeight: 700 }}>{r.count}</span>
                    <span key={r.comp + 'w'} style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>{r.why}</span>
                  </>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
