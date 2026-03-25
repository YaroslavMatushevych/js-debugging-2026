export function GraphQLCodeSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 02 · backend graphql</div>
        <h2 className="mb-16">One line removed. 67% faster.</h2>

        <div className="grid-2" style={{ alignItems: 'start', gap: 24 }}>

          {/* Left: code diff */}
          <div className="flex-col gap-12">
            <div style={{ background: '#161b22', borderRadius: 6, padding: '14px 18px', fontFamily: 'var(--mono)', fontSize: '0.8rem', color: '#e6edf3', lineHeight: 1.9 }}>
              <div style={{ color: '#8b949e', marginBottom: 8, fontSize: '0.75rem' }}>addressSearch.ts — BEFORE</div>
              <div style={{ color: '#f85149' }}>{'// ❌ Called on EVERY search — estimates not shown for months'}</div>
              <div style={{ color: '#f85149' }}>{'const estimatesDTO = await fetchEstimates('}</div>
              <div style={{ color: '#f85149', paddingLeft: 20 }}>{'context.dataSources, addresses'}</div>
              <div style={{ color: '#f85149' }}>{');'}</div>
              <div style={{ color: '#f85149' }}>{'const trackedPropertiesDTO = await fetchTrackedProperties(context);'}</div>
              <div style={{ color: '#f85149' }}>{'mapPropertiesSearch(address, estimatesDTO, trackedPropertiesDTO, ...)'}</div>

              <div style={{ borderTop: '1px solid #30363d', margin: '14px 0' }} />

              <div style={{ color: '#8b949e', marginBottom: 8, fontSize: '0.75rem' }}>getHousePricesSearchResults.ts — AFTER · Yuki Cheung · SR-3955</div>
              <div style={{ color: '#7ee787' }}>{'const trackedPropertiesDTO = await fetchTrackedProperties(context);'}</div>
              <div style={{ color: '#8b949e' }}>{'// Note: Estimates not fetched — not shown on HPSRP'}</div>
              <div style={{ color: '#7ee787' }}>{'mapPropertiesSearch(address, null, trackedPropertiesDTO, ...)'}</div>
            </div>

            <div style={{ padding: '10px 14px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--border2)' }}>
              <p style={{ fontSize: '0.85rem' }}>
                <strong>How to prevent this:</strong> check field selection before calling upstream APIs.{' '}
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>info.fieldNodes</code> tells you exactly what the client asked for.
              </p>
            </div>
          </div>

          {/* Right: stats */}
          <div className="flex-col gap-16">
            <div className="grid-2" style={{ gap: 12 }}>
              <div style={{ textAlign: 'center', padding: '20px 14px', borderLeft: '2px solid var(--text)' }}>
                <div className="stat">67%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 6 }}>faster response</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>1.8s → 0.59s</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px 14px', borderLeft: '2px solid var(--text)' }}>
                <div className="stat">55%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 6 }}>faster visual load</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>2.02s → 0.90s</div>
              </div>
            </div>

            <div className="card">
              <div className="card-label">classic resolver over-fetching</div>
              <p style={{ fontSize: '0.85rem' }}>
                The API did its job. The resolver called it. Nobody needed the data. The fix wasn't clever — it was just removing dead code that happened to be an expensive upstream call.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
