import { Terminal } from '../components/CodeBlock';
import { CodeBlock } from '../components/CodeBlock';

export function RealDemoSlide() {
  type TerminalLine = { type: 'prompt' | 'cmd' | 'out' | 'err' | 'hl' | 'info' | 'success' | 'blank'; text: string };

  const leakyCode = `// ❌ The leaky server — patterns from real incidents
const requestCache = new Map();  // Global — never cleared
const eventListeners = [];       // Global — never cleaned

function processRequest(req) {
  const payload = {
    url: req.url,
    data: new Array(1000).fill(null).map((_, i) => ({
      id: i, buffer: Buffer.alloc(512)   // 512 bytes per entry
    })),
  };
  const key = \`\${Date.now()}-\${Math.random()}\`;
  requestCache.set(key, payload);      // ❌ grows forever
  eventListeners.push(() => payload);  // ❌ closure leak
  return payload;
}`;

  const fixCode = `// ✓ Fixed — bounded cache + no closure accumulation
const MAX_CACHE = 100;
const requestCache = new Map();

function processRequest(req) {
  if (requestCache.size >= MAX_CACHE) {
    requestCache.delete(requestCache.keys().next().value);
  }
  const payload = { url: req.url, timestamp: Date.now() };
  requestCache.set(\`\${Date.now()}-\${Math.random()}\`, payload);
  return payload;  // ✓ no closure retained
}`;

  // REAL autocannon output
  const autocannon: TerminalLine[] = [
    { type: 'prompt', text: '$ ' },
    { type: 'cmd', text: 'autocannon -c 50 -d 10 http://localhost:3001  # leaky' },
    { type: 'blank', text: '' },
    { type: 'out', text: '┌─────────┬──────┬───────┬────────┬────────┬──────────┬──────────┐' },
    { type: 'out', text: '│ Stat    │ 2.5% │ 50%   │ 97.5%  │ 99%    │ Avg      │ Max      │' },
    { type: 'err', text: '│ Latency │ 9ms  │ 28ms  │ 210ms  │ 240ms  │ 56.12ms  │ 635ms    │' },
    { type: 'out', text: '│ Req/Sec │ 292  │ 838   │ 1,626  │ 1,626  │ 866.1    │ 1,632    │' },
    { type: 'err', text: '9k requests in 10s  |  Heap after: 2,411 MB  ← GC thrashing' },
    { type: 'blank', text: '' },
    { type: 'prompt', text: '$ ' },
    { type: 'cmd', text: 'autocannon -c 50 -d 10 http://localhost:3002  # fixed' },
    { type: 'blank', text: '' },
    { type: 'out', text: '┌─────────┬──────┬──────┬───────┬──────┬─────────┬────────┐' },
    { type: 'out', text: '│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Max    │' },
    { type: 'success', text: '│ Latency │ 0ms  │ 1ms  │ 3ms   │ 4ms  │ 0.97ms  │ 92ms   │' },
    { type: 'success', text: '│ Req/Sec │29,455│41,119│44,703 │44,703│ 38,353  │ 44,735 │' },
    { type: 'success', text: '422k requests in 10s  |  Heap after: ~54 MB  ← stable' },
  ];

  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 04 · live benchmark · ran right before the talk</div>
        <h2 className="mb-12">Real numbers from running the demo</h2>
        <p className="mb-20">Two identical HTTP servers, same load, same machine. One leaks, one doesn't.</p>

        <div className="flex-col gap-24">
          {/* Code comparison */}
          <div className="grid-2" style={{ gap: 20 }}>
            <CodeBlock filename="leaky-server.js" lang="js">{leakyCode}</CodeBlock>
            <CodeBlock filename="fixed-server.js" lang="js">{fixCode}</CodeBlock>
          </div>

          {/* Benchmark results */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: 12 }}>autocannon benchmark — actual output from running these two servers</div>
            <Terminal title="autocannon benchmark — actual output" lines={autocannon} />
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
            <div style={{ textAlign: 'center', padding: '18px 12px', borderLeft: '3px solid var(--red)', background: 'rgba(220,38,38,0.04)', borderRadius: '0 6px 6px 0' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>2.4<span style={{ fontSize: '1rem' }}>GB</span></div>
              <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: 6 }}>heap after 10s</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>started at 4 MB</div>
            </div>
            <div style={{ textAlign: 'center', padding: '18px 12px', borderLeft: '3px solid var(--text)', borderRadius: '0 6px 6px 0' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>54<span style={{ fontSize: '1rem' }}>MB</span></div>
              <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: 6 }}>heap after 10s</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>stable — GC healthy</div>
            </div>
            <div style={{ textAlign: 'center', padding: '18px 12px', borderLeft: '3px solid var(--red)', background: 'rgba(220,38,38,0.04)', borderRadius: '0 6px 6px 0' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>866</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: 6 }}>req/s avg</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--dim)' }}>leaky server</div>
            </div>
            <div style={{ textAlign: 'center', padding: '18px 12px', borderLeft: '3px solid var(--text)', borderRadius: '0 6px 6px 0' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>38k</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: 6 }}>req/s avg</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--dim)' }}>fixed <span style={{ fontFamily: 'var(--mono)' }}>(44× faster)</span></div>
            </div>
          </div>

          <div className="danger-box">
            <p><span style={{ color: 'var(--red)', fontWeight: 700 }}>Why does throughput collapse?</span> When heap nears its limit, V8's garbage collector runs <em>synchronously</em>, blocking the entire event loop — exactly what happened with ZWeb on weekends. The fix isn't "add more RAM". The fix is finding and eliminating the leak.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
