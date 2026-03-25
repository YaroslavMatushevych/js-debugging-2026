import { CodeBlock } from '../components/CodeBlock';

export function FrontendMemoryLeakSlide() {
  const leakCode = `// ❌ Pattern 1: event listener never removed
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // missing: return () => window.removeEventListener(...)
}, []);

// ❌ Pattern 2: interval never cleared
useEffect(() => {
  const id = setInterval(fetchData, 5000);
  // missing: return () => clearInterval(id)
}, []);

// ❌ Pattern 3: setState after unmount
useEffect(() => {
  fetchUserData().then(data => {
    setUser(data); // component might be gone by now
  });
}, []);

// ✓ Pattern 3 fixed: AbortController
useEffect(() => {
  const controller = new AbortController();
  fetchUserData({ signal: controller.signal }).then(setUser);
  return () => controller.abort();
}, []);`;

  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 02 · frontend memory</div>
        <div className="flex items-center gap-20 mb-16">
          <h2>Memory leaks in React</h2>
          <div style={{ borderLeft: '2px solid var(--red)', paddingLeft: 14 }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--red)' }}>100MB+</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--muted)', marginLeft: 10 }}>Alto Core · real incident</span>
          </div>
        </div>

        <div className="flex-col gap-24">
          {/* Step 1: The patterns */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>1</div>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>Patterns that cause leaks (copy-paste into your own codebase to test)</span>
            </div>
            <CodeBlock filename="common-leaks.tsx" lang="tsx">{leakCode}</CodeBlock>
          </div>

          {/* Step 2: Chrome DevTools */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>2</div>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>
                Chrome DevTools → Memory → Heap snapshot comparison (ran this live in demo page)
              </span>
            </div>
            <img
              src="/screenshots/devtools-comparison-real.png"
              alt="Chrome DevTools Memory panel: Snapshot 1 (1.3 MB baseline) vs Snapshot 2 (103 MB after leak) with Comparison view showing new HTMLDivElement and EventListener allocations"
              style={{ width: '100%', borderRadius: 6, border: '1px solid var(--border2)', display: 'block' }}
            />
            <p style={{ marginTop: 8, fontSize: '0.88rem', color: 'var(--muted)' }}>
              Snapshot 1: 1.3 MB baseline. Snapshot 2: 103 MB after 3000 leak iterations.
              Comparison view → sort by <strong># New</strong> → Detached DOM nodes + EventListeners are the smoking gun.
            </p>
          </div>

          {/* How to do it */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: '1', text: 'DevTools → Memory tab → Take snapshot (baseline)' },
              { label: '2', text: 'Reproduce the action that causes the leak (navigate, scroll, etc.)' },
              { label: '3', text: 'Take 2nd snapshot → click it in sidebar → switch to Comparison view' },
              { label: '4', text: 'Sort by # New → look for Detached DOM / Closure with many instances' },
            ].map(s => (
              <div key={s.label} className="card" style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--border2)', color: 'var(--text)', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.label}</div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{s.text}</p>
              </div>
            ))}
          </div>

          <div className="callout red">
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 4 }}>Alto Core incident</div>
            <p style={{ fontSize: '0.9rem' }}>Chris Boakes tracked <span className="red font-bold">jsHeapSizeUsed</span> above 100MB in production monitoring.
            Same pattern as demo — Detached DOM nodes + closure leak growing unboundedly over a session.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
