# Portfolio Resume — PDF Preview and Download Plan

This is an enhancement to the required Portfolio page. It uses React Router and must not replace or delay the required Education, Work, Projects, and approved-resume tasks in `.omi/PROJECT_TASKS.md`.

## Goal

Keep the creative HTML resume visible on the Portfolio page while allowing visitors to preview and download an approved PDF.

The approved standard resume is required and remains the default. A creative fantasy PDF and the selector between versions are optional enhancements after required Portfolio work passes its checkpoint.

## React Router URL

The application uses `react-router-dom` with `HashRouter` for GitHub Pages:

- `/#/portfolio?pdf=standard`
- `/#/portfolio?pdf=creative`

Do not use `/resume?pdf=...` as a server-style production URL. GitHub Pages can return a 404 when that path is loaded directly. A separate Resume route is not required.

## UX behavior

1. Render Education, Work, and Projects as the creative website portfolio/resume. This HTML content does not change when the PDF choice changes.
2. Render a **Resume PDF** section beneath the required Portfolio content.
3. Default to the approved Standard PDF.
4. If the optional Creative PDF is ready and approved, show a labeled selector for Standard and Creative versions.
5. Update the embedded preview and download link when the selection changes.
6. Always provide a normal link that opens the selected PDF when an embedded browser preview is unavailable.
7. On small screens, it is acceptable to omit the large embedded preview and prioritize the open/download actions.

## Public files

Place the files in the root-level Vite public directory:

- `public/assets/resume-standard.pdf` — required approved resume
- `public/assets/resume-creative.pdf` — optional creative version

Because `vite.config.js` uses `base: '/'`, their production URLs are:

- `/assets/resume-standard.pdf`
- `/assets/resume-creative.pdf`

Do not create a `client/public/` directory.

## React implementation blueprint

This component belongs inside the Portfolio page and assumes `react-router-dom` has been installed during the Foundation phase.

```jsx
import { useSearchParams } from 'react-router-dom'

const PDF_VERSIONS = {
  standard: {
    label: 'Standard resume PDF',
    url: '/assets/resume-standard.pdf',
  },
  creative: {
    label: 'Creative fantasy resume PDF',
    url: '/assets/resume-creative.pdf',
  },
}

export default function ResumePdf({ includeCreative = false }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedKey = searchParams.get('pdf')
  const availableVersions = includeCreative
    ? PDF_VERSIONS
    : { standard: PDF_VERSIONS.standard }
  const pdfKey = Object.hasOwn(availableVersions, requestedKey)
    ? requestedKey
    : 'standard'
  const pdf = availableVersions[pdfKey]

  function handleVersionChange(event) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('pdf', event.target.value)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <section className="resume-pdf" aria-labelledby="resume-pdf-title">
      <div className="resume-pdf__header">
        <h2 id="resume-pdf-title">Resume PDF</h2>

        {includeCreative && (
          <label className="resume-pdf__selector">
            PDF version
            <select value={pdfKey} onChange={handleVersionChange}>
              {Object.entries(availableVersions).map(([key, version]) => (
                <option key={key} value={key}>
                  {version.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="resume-pdf__actions">
        <a href={pdf.url} target="_blank" rel="noopener noreferrer">
          Open {pdf.label}
        </a>
        <a href={pdf.url} download>
          Download {pdf.label}
        </a>
      </div>

      <iframe
        className="resume-pdf__preview"
        key={pdf.url}
        src={pdf.url}
        title={`${pdf.label} preview`}
      />
    </section>
  )
}
```

Use project CSS for the classes above. Do not copy Tailwind utility classes unless Tailwind is separately approved, installed, and documented.

## Accessibility and resilience

- Associate the selector with a visible label.
- Give the preview a specific title.
- Keep Open and Download links available even when the `iframe` cannot display PDFs.
- Ensure keyboard focus is visible.
- Do not put essential resume information only inside the PDF; keep it in semantic HTML on Portfolio.
- Keep core PDF text selectable where possible instead of flattening the pages into images.
- Test the download in the deployed GitHub Pages site and test preview fallback on mobile Safari and Chrome.

## Acceptance checklist

- [ ] The required Portfolio HTML remains visible and unchanged when the PDF choice changes.
- [ ] The approved Standard PDF exists, opens, and downloads from the deployed site.
- [ ] The Standard PDF is the default even when the query parameter is missing or invalid.
- [ ] Directly loading `/#/portfolio?pdf=standard` works.
- [ ] The preview has a title and alternative Open/Download links.
- [ ] The optional Creative PDF is exposed only after its content is current and approved.
- [ ] Mobile layout remains usable if the browser cannot embed the PDF.
- [ ] `npm run lint` and `npm run build` pass.
