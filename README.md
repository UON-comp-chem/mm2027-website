# Molecular Modelling 2027 website

Official website for **MM27**, the Association of Molecular Modellers of Australasia conference in Newcastle, Australia, from 26–29 September 2027.

## Local development

```bash
npm install
npm run dev
```

Before proposing a change, run:

```bash
npm run lint
npm run build
```

## Updating conference content

Most page content and planning data live in `src/App.jsx`:

- `pages` controls routes and metadata;
- `planningDates` controls the Important Dates timeline;
- `programDays` controls the four-day program framework;
- `researchThemes` controls the scientific-scope cards; and
- `committeeMembers` controls the organising committee.

Site-wide presentation and responsive behaviour live in `src/App.css`. Shared browser defaults live in `src/index.css`.

## Publishing

The site is deployed to GitHub Pages automatically when changes are merged into `main`. Work on a separate branch and open a pull request so changes can be reviewed before they appear on the public website.

The live site is <https://uon-comp-chem.github.io/mm2027/>.
