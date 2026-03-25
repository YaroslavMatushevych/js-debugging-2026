import { Terminal } from '../components/CodeBlock';

type TLine = { type: 'prompt' | 'cmd' | 'out' | 'err' | 'hl' | 'info' | 'success' | 'blank'; text: string };

export function NodeMemoryStorySlide() {
  const leakyLog: TLine[] = [
    { type: 'prompt', text: '$ ' },
    { type: 'cmd',    text: 'node leaky-server.js' },
    { type: 'out',    text: 'Leaky server running on :3001' },
    { type: 'out',    text: 'Initial heap: 4 MB' },
    { type: 'blank',  text: '' },
    { type: 'prompt', text: '$ ' },
    { type: 'cmd',    text: 'autocannon -c 50 -d 10 http://localhost:3001' },
    { type: 'blank',  text: '' },
    { type: 'out',    text: 'Heap: 461MB  | Cache: 1,662 entries | Listeners: 1,662' },
    { type: 'out',    text: 'Heap: 1607MB | Cache: 5,827 entries | Listeners: 5,827' },
    { type: 'err',    text: 'Heap: 2660MB | Cache: 9,534 entries | Listeners: 9,534' },
    { type: 'blank',  text: '' },
    { type: 'out',    text: 'Throughput:  374 req/s  (avg)' },
    { type: 'out',    text: 'Latency p99: 3,852ms' },
    { type: 'err',    text: 'GC running overtime - CPU at 95%' },
  ];

  const fixedLog: TLine[] = [
    { type: 'prompt', text: '$ ' },
    { type: 'cmd',    text: 'node fixed-server.js' },
    { type: 'out',    text: 'Fixed server running on :3002' },
    { type: 'out',    text: 'Initial heap: 4 MB' },
    { type: 'blank',  text: '' },
    { type: 'prompt', text: '$ ' },
    { type: 'cmd',    text: 'autocannon -c 50 -d 10 http://localhost:3002' },
    { type: 'blank',  text: '' },
    { type: 'out',    text: 'Heap: 47MB  | Cache: 100 entries (bounded)' },
    { type: 'out',    text: 'Heap: 53MB  | Cache: 100 entries (bounded)' },
    { type: 'out',    text: 'Heap: 58MB  | Cache: 100 entries (stable)' },
    { type: 'blank',  text: '' },
    { type: 'hl',     text: 'Throughput:  52,016 req/s  ← 139× faster' },
    { type: 'hl',     text: 'Latency p99: 1ms           ← 3,852× lower' },
    { type: 'out',    text: 'GC idle - CPU at 12%' },
  ];

  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 04 · backend node.js · benchmark</div>
        <h2 className="mb-8">The same leak pattern - Node.js server</h2>
        <p className="mb-20">Map that never gets cleared, closure pushed to a global array on every request. Ran autocannon -c 50 -d 10 against both on the same machine.</p>

        <div className="grid-2" style={{ gap: 24 }}>
          <div>
            <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Leaky server</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--muted)', marginTop: 3 }}>Map never evicted · every request pushes a closure to a global array</div>
            </div>
            <Terminal title="leaky-server.js" lines={leakyLog} />
          </div>
          <div>
            <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Fixed server</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--muted)', marginTop: 3 }}>Bounded LRU cache (max 100 entries) · no closure accumulation</div>
            </div>
            <Terminal title="fixed-server.js" lines={fixedLog} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginTop: 24 }}>
          {[
            { val: '4 MB', sub: 'heap at start', side: 'both' },
            { val: '2.4 GB', sub: 'heap after 10s · leaky', side: 'bad' },
            { val: '58 MB', sub: 'heap after 10s · fixed', side: 'good' },
            { val: '139×', sub: 'more throughput after fix', side: 'good' },
          ].map(s => (
            <div key={s.sub} style={{
              textAlign: 'center',
              padding: '20px 12px',
              borderTop: `2px solid ${s.side === 'bad' ? 'var(--red)' : s.side === 'good' ? 'var(--text)' : 'var(--border2)'}`,
            }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1, color: s.side === 'bad' ? 'var(--red)' : 'var(--text)' }}>{s.val}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 8 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, padding: '14px 18px', borderLeft: '3px solid var(--border2)', background: 'var(--card)' }}>
          <p><strong>Why does throughput collapse?</strong> When heap nears its limit, V8's GC runs synchronously, blocking the event loop - exactly what happened with ZWeb on weekends. Adding more RAM delays the crash. Finding the leak fixes it.</p>
        </div>
      </div>
    </div>
  );
}
