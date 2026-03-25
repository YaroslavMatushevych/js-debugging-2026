export function Bug2Slide() {
  return (
    <div className="slide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <div style={{
        fontSize: '7rem',
        lineHeight: 1.3,
        filter: 'drop-shadow(0 0 30px rgba(248,113,113,0.25))',
        letterSpacing: '0.05em',
        textAlign: 'center',
      }}>
        🐛🐛🐛🐛🐛<br />
        🐛🐛🐛🐛🐛🐛<br />
        🐛🐛🐛🐛🐛
      </div>
      <p style={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.4, color: 'var(--text)', margin: 0 }}>
        sometimes even more than one
      </p>
    </div>
  );
}
