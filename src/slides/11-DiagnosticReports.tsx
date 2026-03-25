import { CodeBlock } from '../components/CodeBlock';
import { Terminal } from '../components/CodeBlock';

export function DiagnosticReportsSlide() {
  type TerminalLine = { type: 'prompt' | 'cmd' | 'out' | 'err' | 'hl' | 'info' | 'success' | 'blank'; text: string };

  const reportLines: TerminalLine[] = [
    { type: 'prompt', text: '$ ' },
    { type: 'cmd', text: 'node --report-on-signal --report-dir=/tmp dist/start-server.js &' },
    { type: 'success', text: '🚀 Server ready at http://localhost:4000/graphql  (PID: 69511)' },
    { type: 'blank', text: '' },
    { type: 'prompt', text: '$ ' },
    { type: 'cmd', text: 'kill -USR2 69511' },
    { type: 'success', text: 'Writing Node.js report to file: report.20260324.190400.69511.0.001.json' },
    { type: 'success', text: 'Node.js report completed' },
  ];

  const reportJson = `{
  "header": {
    "event": "SIGUSR2",
    "nodejsVersion": "v24.13.1",
    "processId": 69511
  },
  "javascriptHeap": {
    "usedMemory":   91500056,
    "totalMemory": 102760448,
    "externalMemory": 37641416,
    "heapSpaces": {
      "old_space":          { "used": 73862864 },
      "new_space":          { "used":     3360 },
      "large_object_space": { "used":  8811072 }
    }
  },
  "libuv": [
    { "type": "tcp",    "localEndpoint": { "port": 4000 } },
    { "type": "timer",  "firesInMsFromNow": 29145 },
    { "type": "signal", "signal": "SIGUSR2" },
    { "type": "signal", "signal": "SIGINT"  },
    { "type": "signal", "signal": "SIGTERM" }
  ],
  "resourceUsage": {
    "userCpuSeconds":   3.50567,
    "kernelCpuSeconds": 1.82937,
    "maxRss": 310640640
  }
}`;

  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 04 · built-in node.js · diagnostic reports</div>
        <div className="flex items-center gap-16 mb-16">
          <h2>Node.js Diagnostic Reports</h2>
          <span className="badge">built-in since v11.8</span>
          <span className="badge">zero deps</span>
        </div>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="flex-col gap-10">
            <div className="card">
              <div className="card-title">what's actually used in production</div>
              <ul className="styled">
                <li><strong>OTel + APM (Datadog / New Relic)</strong> - covers 95% of incidents automatically. Heap, CPU, GC pause, latency - no manual action needed. Zoopla-graphql already has OTel fully wired</li>
                <li><strong>Container memory alerts</strong> - ECS/K8s fires before the OOM kill. You react before the process dies</li>
                <li><strong>Clinic.js</strong> - used locally and in staging to profile (already in this repo). Not run against live prod traffic</li>
                <li><strong>Diagnostic Reports - break-glass only.</strong> A pod is sick, OTel didn't catch it yet, you can't restart it. One signal, full snapshot, no downtime. Also useful as <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>--report-on-fatalerror</code> - Node writes the report automatically before it crashes</li>
              </ul>
            </div>
            <Terminal title="zoopla-graphql - live snapshot (PID 69511)" lines={reportLines} />
          </div>
          <div className="flex-col gap-10">
            <CodeBlock filename="report.20260324.190400.69511.0.001.json" lang="json">{reportJson}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
