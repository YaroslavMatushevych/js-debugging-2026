export function BootSlide() {
  return (
    <div className="slide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src="/bug-meme.jpg"
          alt="bug attacking"
          style={{ height: 580, objectFit: 'contain', borderRadius: 8, display: 'block' }}
        />
        <p style={{
          position: 'absolute', top: 16, left: 0, right: 0,
          textAlign: 'center', margin: 0,
          fontSize: '2rem', fontWeight: 900,
          color: '#fff',
          textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
          letterSpacing: '0.01em',
        }}>
          POV: I thought it was an innocent bug
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.4 }}>so this never happens to you in production</p>
      </div>
    </div>
  );
}
