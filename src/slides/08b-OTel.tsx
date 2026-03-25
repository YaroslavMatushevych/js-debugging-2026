import { Terminal } from '../components/CodeBlock';

type TLine = { type: 'prompt' | 'cmd' | 'out' | 'err' | 'hl' | 'info' | 'success' | 'blank'; text: string };

export function OTelSlide() {
  const setupLines: TLine[] = [
    { type: 'prompt', text: '$ ' },
    { type: 'cmd',    text: 'npm i @opentelemetry/sdk-node @opentelemetry/instrumentation-undici' },
    { type: 'blank',  text: '' },
    { type: 'out',    text: '// instrumentation.ts' },
    { type: 'out',    text: 'export async function register() {' },
    { type: 'out',    text: "  if (process.env.NEXT_RUNTIME === 'nodejs')" },
    { type: 'hl',     text: "    await import('./instrumentation.node');" },
    { type: 'out',    text: '}' },
  ];

  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 02 · backend graphql · opentelemetry + aws x-ray</div>
        <h2 className="mb-20">OpenTelemetry + X-Ray - minimal setup, full visibility</h2>

        <div className="grid-2" style={{ alignItems: 'start', gap: 32 }}>

          {/* Left: setup */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--muted)', marginBottom: 10 }}>Setup</div>
            <Terminal title="instrumentation.ts - Next.js 13.2+" lines={setupLines} />
          </div>

          {/* Right: the story */}
          <div className="flex-col gap-16">
            <div className="timeline" style={{ marginTop: 20 }}>
              <div className="timeline-item">
                <div className="timeline-left">
                  <div className="timeline-dot" style={{ background: 'var(--red)' }} />
                  <div className="timeline-line" />
                </div>
                <div className="timeline-content">
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>Google flags 1M+ House Price URLs as slow</div>
                  <p style={{ fontSize: '1rem' }}>Core Web Vitals failing → search ranking penalty → less traffic</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <div className="timeline-dot" style={{ background: 'var(--border2)' }} />
                  <div className="timeline-line" />
                </div>
                <div className="timeline-content">
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>Traced with OpenTelemetry + AWS X-Ray</div>
                  <p style={{ fontSize: '1rem' }}>zoopla-web → GraphQL Lambda → upstream APIs</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <div className="timeline-dot" style={{ background: 'var(--border2)' }} />
                  <div className="timeline-line" />
                </div>
                <div className="timeline-content">
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>Found it</div>
                  <p style={{ fontSize: '1rem' }}>
                    Resolver calling <span style={{ fontFamily: 'var(--mono)', color: 'var(--red)' }}>Estimates API</span> on <strong>every HPSRP search</strong> - web stopped showing estimates months ago.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <div className="timeline-dot" style={{ background: 'var(--text)' }} />
                </div>
                <div className="timeline-content">
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>Yuki Cheung removed the resolver calls</div>
                  <p style={{ fontSize: '1rem' }}>One PR. Zero functionality change. SR-3955.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
