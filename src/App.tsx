import { useState, useEffect, useCallback } from 'react';
import { TitleSlide } from './slides/01-Title';
import { Bug1Slide } from './slides/02c-Bug1';
import { Bug2Slide } from './slides/02d-Bug2';
import { BootSlide } from './slides/02e-Boot';
import { ConsoleLogsSlide } from './slides/02f-ConsoleLogs';
import { ReRendersProblemSlide } from './slides/03-ReRenders-Problem';
import { ReRendersDetectionSlide } from './slides/03b-ReRenders-Detection';
import { WDYRVideoSlide } from './slides/03c-WDYR-Video';
import { ReactScanSetupSlide } from './slides/03e-ReactScan-Setup';
import { ReactScanVideoSlide } from './slides/03f-ReactScan-Video';
import { ReRendersSneakySlide } from './slides/03d-ReRenders-Sneaky';
import { TransitionSlide } from './slides/06b-Transition';
import { XRaySlide } from './slides/06c-XRay';
import { GraphQLStorySlide } from './slides/07-GraphQL-Story';
import { OTelSlide } from './slides/08b-OTel';
import { ClinicGQL2Slide } from './slides/10c-ClinicGQL-Doctor';
import { ClinicGQL4Slide, ClinicGQL4AfterSlide } from './slides/10e-ClinicGQL-Flame';
import { ClinicGQL5Slide } from './slides/10f-ClinicGQL-Fix';
import { ClinicGQL6Slide } from './slides/10g-ClinicGQL-After';
import { BundleAnalysisSlide } from './slides/12b-BundleAnalysis';
import { QASlide } from './slides/14-QA';

const slides = [
  { component: TitleSlide, label: 'Title', section: false },
  { component: Bug1Slide, label: 'A sneaky bug', section: false },
  { component: Bug2Slide, label: 'More than one', section: false },
  { component: BootSlide, label: 'We are here to fix them', section: false },
  { component: ConsoleLogsSlide, label: 'console.log & friends', section: false },
  { component: ReRendersDetectionSlide, label: 'WDYR setup', section: true },
  { component: WDYRVideoSlide, label: 'WDYR usage example', section: false },
  { component: ReRendersProblemSlide, label: 'Re-renders: what we found', section: false },
  { component: ReRendersSneakySlide, label: 'The sneaky ?? {} pattern', section: false },
  { component: ReactScanSetupSlide, label: 'React Scan setup', section: false },
  { component: ReactScanVideoSlide, label: 'React Scan recording', section: false },
  { component: TransitionSlide, label: 'Backend transition', section: false },
  { component: OTelSlide, label: 'OpenTelemetry Setup', section: true },
  { component: XRaySlide, label: 'X-Ray - what you see', section: false },
  { component: GraphQLStorySlide, label: 'GraphQL Story', section: false },
  { component: ClinicGQL2Slide, label: 'clinic doctor - before', section: false },
  { component: ClinicGQL4Slide, label: 'clinic flame - before', section: false },
  { component: ClinicGQL5Slide, label: 'Root cause + fix', section: false },
  { component: ClinicGQL4AfterSlide, label: 'clinic flame - after', section: false },
  { component: ClinicGQL6Slide, label: 'clinic doctor - after', section: false },
  { component: BundleAnalysisSlide, label: 'Bundle Analysis', section: false },
  { component: QASlide, label: 'Q&A', section: false },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < slides.length) {
      setCurrent(idx);
      setKey(k => k + 1);
    }
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
      if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, goTo]);

  const Slide = slides[current].component;

  return (
    <div className="presentation">
      {/* mxdvl-style header at top */}
      <nav className="nav">
        <span className="nav-title">JS Debugging 2026</span>
        <hr className="nav-hr" />
        <div className="nav-dots">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`nav-dot${i === current ? ' active' : ''}${s.section ? ' section' : ''}`}
              onClick={() => goTo(i)}
              title={s.label}
            />
          ))}
        </div>
        <span className="nav-counter">{current + 1} / {slides.length}</span>
        <div className="nav-arrows">
          <button className="nav-btn" onClick={prev} disabled={current === 0}>←</button>
          <button className="nav-btn" onClick={next} disabled={current === slides.length - 1}>→</button>
        </div>
      </nav>

      {/* Slide fills remaining grid row */}
      <Slide key={key} />
    </div>
  );
}
