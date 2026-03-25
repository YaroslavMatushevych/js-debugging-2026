export function ClinicGQL2Slide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 03 · clinic.js · step 1 of 4</div>
        <h2 className="mb-20">clinic doctor - what it's telling you</h2>

        <div className="flex-col gap-20">

          {/* Command */}
          <div style={{ background: '#161b22', borderRadius: 6, padding: '12px 16px', fontFamily: 'var(--mono)', fontSize: '0.78rem', color: '#e6edf3', whiteSpace: 'nowrap', overflow: 'auto' }}>
            {'clinic doctor --autocannon [-c 20 -d 15 -m POST -b '}<span style={{ color: '#a5d6ff' }}>{'\'{"query":"{__typename}"}\''}</span>{' http://localhost:4000/graphql] -- npx tsx src/start-server.ts'}
          </div>

          {/* Screenshot */}
          <div style={{ position: 'relative' }}>
            <img
              src="/screenshots/graphql-clinic-doctor-before.png"
              alt="clinic doctor before fix - sawtooth memory, event loop spikes, CPU at 100%"
              style={{ width: '100%', objectFit: 'contain', borderRadius: 6, border: '2px solid var(--red)', display: 'block' }}
            />
          </div>

          {/* What each chart means */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>

            <div style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: 6, borderTop: '3px solid var(--red)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>Memory - sawtooth</div>
              <p style={{ fontSize: '0.85rem' }}>
                Heap growing then dropping as GC fires, over and over. Constant short-lived allocations being created and thrown away on every request.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: 6, borderTop: '3px solid var(--red)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>Event loop - 139ms floor</div>
              <p style={{ fontSize: '0.85rem' }}>
                Not just spikes - the <em>baseline</em> was 139ms. Every request waited behind synchronous work before the event loop could start on it.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: 6, borderTop: '3px solid var(--red)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>CPU - ~100%</div>
              <p style={{ fontSize: '0.85rem' }}>
                Pegged at 100%. Doctor flagged this and said: run <code style={{ fontFamily: 'var(--mono)' }}>clinic flame</code> to find what's burning it.
              </p>
            </div>

          </div>

          {/* Callout */}
          <div style={{ padding: '14px 18px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--border2)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>💡</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>Doctor's job is diagnosis, not answers</div>
              <p style={{ fontSize: '0.85rem' }}>
                It looks at all three signals together and says "this looks like a CPU issue - go run flame" or "this looks like a heap leak - go run heapprofiler". You don't need to guess which tool to use. Doctor does that for you.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
