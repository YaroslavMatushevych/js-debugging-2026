export function Bug1Slide() {
  return (
    <div className="slide" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', paddingBottom: 24, textAlign: 'center' }}>
        <div style={{ fontSize: '10rem', lineHeight: 1, filter: 'drop-shadow(0 0 40px rgba(248,113,113,0.3))' }}>
          🐛
        </div>
      </div>
      <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 24px)', fontSize: '2rem', fontWeight: 600, width: 600, textAlign: 'center', lineHeight: 1.4, color: 'var(--text)', margin: 0 }}>
        There is a sneaky bug in your application
      </p>
    </div>
  );
}
