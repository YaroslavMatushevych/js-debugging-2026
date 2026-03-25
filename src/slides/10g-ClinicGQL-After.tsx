export function ClinicGQL6Slide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 03 · clinic.js · step 4 of 4</div>
        <h2 className="mb-8">clinic doctor — after the fix</h2>
        <p className="mb-20" style={{ maxWidth: 700 }}>
          Same command, same load. The difference is immediate and obvious.
        </p>

        <div className="flex-col gap-20">

          {/* Screenshot */}
          <img
            src="/screenshots/graphql-clinic-doctor-after.png"
            alt="clinic doctor after fix — flat memory, no event loop spikes, CPU high but stable"
            style={{ width: '100%', objectFit: 'contain', borderRadius: 6, border: '2px solid var(--border2)', display: 'block' }}
          />

          {/* What changed */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: 6, borderTop: '3px solid var(--text)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>Memory — sawtooth gone</div>
              <p style={{ fontSize: '0.85rem' }}>
                Heap no longer churns. GC scavenger runs are faster (2.4ms avg vs 5.7ms) and major GC cycles drop (24 vs 35).
              </p>
            </div>
            <div style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: 6, borderTop: '3px solid var(--text)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>Event loop — 11× better</div>
              <p style={{ fontSize: '0.85rem' }}>
                p50 delay: 139ms → 12ms. The 139ms floor is gone — event loop no longer backing up behind synchronous datasource construction.
              </p>
            </div>
            <div style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: 6, borderTop: '3px solid var(--text)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>Throughput — 9.3× higher</div>
              <p style={{ fontSize: '0.85rem' }}>
                549 req/s → 5,131 req/s. p50 latency: 162ms → 17ms. 100 connections, same load.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
