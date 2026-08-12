# Molecular Modelling 2027 website

Official website for **MM27**, the Association of Molecular Modellers of Australasia conference in Newcastle, Australia. Conference dates are to be confirmed.

## Local development

```bash
npm install
npm run dev
```

The development server prints a local address, usually <http://localhost:5173/mm2027/>. Keep that terminal open while previewing the site.

Before proposing a change, run:

```bash
npm run lint
npm run build
```

## Updating conference content

Most page content and planning data live in `src/App.jsx`:

- `pages` controls routes and metadata;
- `planningDates` controls the Important Dates timeline;
- `programElements` controls the draft program framework;
- `researchThemes` controls the scientific-scope cards; and
- `committeeMembers` controls the organising committee.

Site-wide presentation and responsive behaviour live in `src/App.css`. Shared browser defaults live in `src/index.css`.

## Testing abstract submissions

The abstract form works in local validation-only mode unless a test endpoint is explicitly configured. In that mode, nothing is transmitted or saved.

To test email delivery, copy `.env.example` to `.env.local`, add the endpoint supplied by the temporary form provider, and restart the development server:

```env
VITE_ABSTRACT_FORM_ENDPOINT=https://formsubmit.co/YOUR_PRIVATE_FORM_TOKEN
```

For an initial FormSubmit test, `YOUR_PRIVATE_FORM_TOKEN` may temporarily be the recipient email address. FormSubmit sends an activation email on the first submission; after activation, replace the address with the provider's random endpoint token. Never commit `.env.local`, a personal recipient address or unpublished abstracts.

Vite includes the configured endpoint in browser-delivered code, so the random token reduces casual email-address exposure but is not a secret. Use the personal-address form only for local testing; do not deploy it.

This endpoint is for prototyping only. Before public abstract submission opens, the committee should approve the final recipient, privacy wording, retention arrangements and a University-approved submission service.

The downloadable draft template is `public/MM27_Abstract_Template.docx`.

## Dependency checks

Run `npm audit` after installing from the committed lockfile. Review audit findings before applying fixes, and do not use `npm audit fix --force` without checking the breaking changes it proposes.

`node_modules` should not be added to future commits. It is ignored for new clones, although older repository history still contains a tracked copy that should be removed in a separate maintenance change.

## Publishing

The site is deployed to GitHub Pages automatically when changes are merged into `main`. Work on a separate branch and open a pull request so changes can be reviewed before they appear on the public website.

The live site is <https://uon-comp-chem.github.io/mm2027/>.
