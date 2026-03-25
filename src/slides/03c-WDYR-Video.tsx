export function WDYRVideoSlide() {
  return (
    <div className="slide">
      <div className="slide-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-label">part 01 · zoopla-web · wdyr</div>
        <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--text)', fontSize: '1.1rem' }}>🎥 WDYR - usage example</div>
        <video
          src="/wdyr-usage.mov"
          controls
          autoPlay
          muted
          loop
          style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 10, border: '1px solid var(--border2)', display: 'block' }}
        />
      </div>
    </div>
  );
}
