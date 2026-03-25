# JS Debugging in 2026

> Tools, Tricks & Things You Didn't Know Existed

A slide deck built with React + Vite for the **Monthly JS Meetup — March 2026**.

Covers real debugging cases from production at Zoopla across frontend and backend:

- **Frontend** — spotting unnecessary re-renders with `why-did-you-render` and React Scan
- **Backend / GraphQL** — tracing slow queries with OpenTelemetry + AWS X-Ray
- **Node.js profiling** — CPU and memory analysis with `clinic.js` (doctor & flame)
- **Node.js memory** — heap snapshots, diagnostic reports, memory leak patterns
- **Bundle analysis** — `@next/bundle-analyzer`

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Built with

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- TypeScript
