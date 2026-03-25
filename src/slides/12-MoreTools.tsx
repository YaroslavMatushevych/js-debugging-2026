export function MoreToolsSlide() {
  const tools = [
    {
      name: 'React Scan',
      tag: 'NEW 2024',
      tagline: 'Visual re-render overlay for any React app',
      desc: 'Script tag on any site — prod or dev. Red flashes = re-renders. Shows count + which props changed. Zero config.',
      cmd: 'npx react-scan@latest http://localhost:3000',
    },
    {
      name: 'why-did-you-render',
      tag: 'deep dive',
      tagline: 'Console-level re-render detective',
      desc: 'Patches React to log prev/next props + state on every unnecessary render. Shows you exactly what changed.',
      cmd: 'npm i @welldone-software/why-did-you-render',
    },
    {
      name: 'Chrome Memory Tab',
      tag: 'built-in',
      tagline: 'Heap snapshot diffing — find leaked objects',
      desc: 'Take snapshot → interact → take snapshot. Comparison view shows retained DOM nodes, event listeners, closures.',
      cmd: 'DevTools → Memory → Heap Snapshot',
    },
    {
      name: 'Replay.io',
      tag: 'time-travel',
      tagline: 'Time-travel debugging — record, share, replay',
      desc: 'Record a browser session as a Replay. Share a URL — anyone opens DevTools at any point in time. No "can\'t reproduce".',
      cmd: 'npm i @replayio/playwright  # or Chrome extension',
    },
    {
      name: 'clinic.js',
      tag: 'backend',
      tagline: 'Node.js perf suite: Doctor + Flame + Heap',
      desc: 'Doctor diagnoses, HeapProfiler finds leaks, Flame spots CPU hogs, Bubbleprof visualizes async I/O. HTML reports.',
      cmd: 'npm i -g clinic && clinic doctor -- node server.js',
    },
    {
      name: '0x',
      tag: 'flamegraph',
      tagline: 'Zero-config CPU flamegraph for Node.js',
      desc: 'Wrap any Node command with 0x, run load, Ctrl+C. Flamegraph opens automatically. Wide bars = hot paths.',
      cmd: 'npx 0x -- node server.js',
    },
    {
      name: 'Node Diagnostic Reports',
      tag: 'built-in v11.8+',
      tagline: 'Production heap snapshot, zero downtime',
      desc: 'Send SIGUSR2 to any running process: get full heap breakdown, active handles, CPU time as JSON. No restart.',
      cmd: 'node --report-on-signal server.js  # then kill -USR2 <PID>',
    },
    {
      name: 'Sentry Session Replay',
      tag: 'session replay',
      tagline: 'Video of exactly what the user did before the error',
      desc: 'Pixel-perfect replay with network requests, console logs, and errors overlaid. Solves "can\'t reproduce" forever.',
      cmd: 'npm i @sentry/browser  # enable sessionReplay integration',
    },
  ];

  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 04 · the toolkit</div>
        <h2 className="mb-20">Debugging tools worth knowing</h2>
        <div className="grid-4" style={{ gap: 12 }}>
          {tools.map(t => (
            <div key={t.name} className="tool-card" style={{ borderTop: '2px solid var(--border2)' }}>
              <div className="flex items-center gap-8 mb-4">
                <span className="tool-name">{t.name}</span>
                {t.tag && <span className="tag">{t.tag}</span>}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 5 }}>{t.tagline}</div>
              <div className="tool-desc">{t.desc}</div>
              <div className="tool-cmd">{t.cmd}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
