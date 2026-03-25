export function ReactScanVideoSlide() {
  return (
    <div className="slide">
      <div className="slide-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-label">part 01 · zoopla-web · react scan</div>
        <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--text)', fontSize: '1.1rem' }}>🎥 React Scan - usage example</div>
        <video
          src="/react-scan-usage.mp4"
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
