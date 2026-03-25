export function WDYRVideoSlide() {
  return (
    <div className="slide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <div style={{
        width: '80%', height: 400,
        border: '2px dashed var(--border2)',
        borderRadius: 12,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <div style={{ fontSize: '3rem' }}>🎥</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--muted)' }}>WDYR — usage example</div>
      </div>
    </div>
  );
}
