export function MemesSlide() {
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="slide-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="eyebrow">relatable content</div>
        <h2 className="mb-20">Before we start</h2>

        <div className="grid-2" style={{ gap: 16, alignItems: 'start' }}>
          <div className="flex-col gap-12">

            {/* Drake meme */}
            <div className="meme">
              <div className="meme-label">the drake meme</div>
              <div className="flex-col gap-10">
                <div className="flex items-start gap-12">
                  <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>😒</div>
                  <div>
                    <div style={{ textDecoration: 'line-through', color: 'var(--muted)', fontSize: '0.9rem' }}>
                      console.log("here1")... "here2"... "here3"... (2 hours later)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-12">
                  <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>😍</div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>
                    <span className="mono">clinic heapprofiler</span> → answer in 30 seconds
                  </div>
                </div>
              </div>
            </div>

            {/* Two buttons */}
            <div className="meme">
              <div className="meme-label">developer sweating over two buttons</div>
              <div style={{ textAlign: 'center', fontSize: '1.6rem', marginBottom: 10 }}>😰</div>
              <div className="grid-2" style={{ gap: 10 }}>
                <div style={{ border: '1px solid rgba(248,113,113,0.35)', borderRadius: 4, padding: '10px 14px', fontSize: '0.82rem', textAlign: 'center', color: 'var(--red)' }}>
                  Add more RAM to the container
                </div>
                <div style={{ border: '1px solid var(--border2)', borderRadius: 4, padding: '10px 14px', fontSize: '0.82rem', textAlign: 'center', color: 'var(--text)' }}>
                  Actually find the memory leak
                </div>
              </div>
            </div>

          </div>

          <div className="flex-col gap-12">

            {/* The weekend bug */}
            <div className="meme">
              <div className="meme-label">the incident lifecycle</div>
              <div className="flex-col gap-8" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                <div><span style={{ color: 'var(--muted)' }}>Mon–Fri  </span><span style={{ color: 'var(--text)' }}>✓ all good, deployments fix it</span></div>
                <div><span style={{ color: 'var(--muted)' }}>Sat 3am  </span><span style={{ color: 'var(--red)' }}>💀 heap: 2660MB, GC at 95% CPU</span></div>
                <div><span style={{ color: 'var(--muted)' }}>Sat 6am  </span><span style={{ color: 'var(--muted)' }}>⚙  cron job restarts server</span></div>
                <div><span style={{ color: 'var(--muted)' }}>Mon 9am  </span><span style={{ color: 'var(--muted)' }}>"seems to be working fine?"</span></div>
                <div style={{ marginTop: 6, color: 'var(--muted)', fontSize: '0.72rem' }}>
                  ↑ this was real. ZWeb. August 2025. For months.
                </div>
              </div>
            </div>

            {/* Surprised Pikachu */}
            <div className="meme">
              <div className="meme-label">surprised pikachu</div>
              <div className="flex-col gap-8">
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Dev: <span style={{ color: 'var(--text)' }}>"the memory leak only happens on weekends so it's not our problem"</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Also dev: <span style={{ color: 'var(--text)' }}>"why is the on-call phone ringing at 3am on Saturday"</span>
                </div>
                <div style={{ textAlign: 'center', fontSize: '2.2rem', marginTop: 4 }}>⚡😱</div>
              </div>
            </div>

          </div>
        </div>

        <div style={{
          marginTop: 20, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem', color: 'var(--dim)'
        }}>
          ok let's actually fix these things →
        </div>
      </div>
    </div>
  );
}
