export function TitleSlide() {
  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: 860 }}>

        <div className="flex gap-6 mb-20" style={{ flexWrap: 'wrap' }}>
          <span className="tag accent">frontend</span>
          <span className="tag purple">backend</span>
          <span className="tag blue">node.js</span>
          <span className="tag">real zoopla cases</span>
        </div>

        <h1 style={{ marginBottom: 14 }}>
          JS Debugging in 2026
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', maxWidth: 520, marginBottom: 40 }}>
          Tools, Tricks & Things You Didn't Know Existed
        </p>

        <div style={{ width: 40, height: 2, background: 'var(--accent)', marginBottom: 32 }} />

        <div className="flex items-center gap-28" style={{ flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--dim)', marginBottom: 4 }}>presented by</div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>Yaroslav Matushevych</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: 2 }}>Senior Software Engineer @ Zoopla</div>
          </div>
          <div style={{ width: 1, height: 32, background: 'var(--border2)' }} />
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--dim)', marginBottom: 4 }}>event</div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>Monthly JS Meetup</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: 2 }}>March 2026</div>
          </div>
          <div style={{ width: 1, height: 32, background: 'var(--border2)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <img src="/linkedin-qr.png" alt="LinkedIn QR code" style={{ width: 120, height: 120, borderRadius: 6, display: 'block' }} />
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--dim)' }}>LinkedIn</div>
          </div>
        </div>

      </div>
    </div>
  );
}
