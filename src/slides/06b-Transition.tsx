export function TransitionSlide() {
  return (
    <div className="slide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/transition-meme.jpg"
        alt="Frontend dev vs backend dev"
        style={{ maxHeight: '80vh', maxWidth: '80%', objectFit: 'contain', borderRadius: 8 }}
      />
    </div>
  );
}
