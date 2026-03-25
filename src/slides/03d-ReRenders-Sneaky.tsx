export function ReRendersSneakySlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 01 · zoopla-web · sneaky pattern</div>
        <h2 className="mb-20">The subtle one — <code style={{ fontFamily: 'var(--mono)', fontSize: '0.85em' }}>{'?? {}'}</code> in JSX</h2>

        <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>

          {/* Left — the pattern + real impact */}
          <div className="flex-col gap-16">

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dim)', marginBottom: 10 }}>
                Real code — <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>SearchPage.tsx</code> · line 182
              </div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: '0.88rem', lineHeight: 2, color: '#e6edf3' }}>
                <div style={{ color: '#e6edf3' }}>{'<SearchResultsLayoutSlim'}</div>
                <div style={{ paddingLeft: 20 }}>
                  <span style={{ color: '#79c0ff' }}>dfpAdTargeting</span>
                  <span style={{ color: '#e6edf3' }}>=</span>
                  <span style={{ color: '#f85149' }}>{'{dfpAdTargeting ?? {}}'}</span>
                  <span style={{ color: '#6e7681' }}> {'// new {} every render'}</span>
                </div>
                <div style={{ paddingLeft: 20 }}>
                  <span style={{ color: '#79c0ff' }}>seoAccordions</span>
                  <span style={{ color: '#e6edf3' }}>=</span>
                  <span style={{ color: '#f85149' }}>{'{seoAccordions ?? []}'}</span>
                  <span style={{ color: '#6e7681' }}> {'// new [] every render'}</span>
                </div>
                <div style={{ color: '#e6edf3' }}>{'>'}</div>
              </div>
            </div>

            <div style={{ padding: '14px 16px', background: 'rgba(220,38,38,0.05)', borderRadius: 6, borderLeft: '3px solid var(--red)' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>What actually happens</div>
              <div className="flex-col gap-10">
                {[
                  { text: <><code style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem' }}>SearchResultsLayoutSlim</code> is wrapped in <code style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem' }}>React.memo</code> — but the new <code style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem' }}>{'{}'}</code> breaks its shallow equality check every time</>, accent: false },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.9rem', color: item.accent ? 'var(--red)' : 'var(--muted)', lineHeight: 1.6 }}>
                    <span style={{ color: item.accent ? 'var(--red)' : 'var(--dim)', flexShrink: 0, marginTop: 2 }}>–</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>


          </div>

          {/* Right — fix options + useMemo cost */}
          <div className="flex-col gap-16">

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dim)', marginBottom: 10 }}>The fix</div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: '0.88rem', lineHeight: 2, color: '#e6edf3' }}>
                <div style={{ color: '#6e7681' }}>{'// useMemo inside the component — correct, co-located, idiomatic'}</div>
                <div style={{ color: '#7ee787' }}>{'const targeting = useMemo('}</div>
                <div style={{ color: '#7ee787', paddingLeft: 20 }}>{'() => dfpAdTargeting ?? {},'}</div>
                <div style={{ color: '#7ee787', paddingLeft: 20 }}>{'[dfpAdTargeting]'}</div>
                <div style={{ color: '#7ee787' }}>{');'}</div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
