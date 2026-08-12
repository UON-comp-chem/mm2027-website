import { useEffect, useState } from 'react'
import './App.css'
import acknowledgementBackground from './assets/acknowledgement-background.jpg'
import alisterImage from './assets/alister-page.jpg'
import amirImage from './assets/amir-karton.jpg'
import ammaLogo from './assets/amma-logo.png'
import bannerImage from './assets/mm27-banner.jpg'
import benImage from './assets/ben-noble.jpg'
import beachImage from './assets/newcastle-beach.jpg'
import harbourImage from './assets/newcastle-harbour.jpeg'
import hunterValleyImage from './assets/hunter-valley-vineyards.jpg'
import kasimirImage from './assets/kasimir-gregory.jpg'
import nuspaceImage from './assets/nuspace-building.jpg'
import newcastleLogo from './assets/university-of-newcastle-logo.webp'

const contactEmail = 'mm27.amma@gmail.com'
const abstractFormEndpoint = import.meta.env.VITE_ABSTRACT_FORM_ENDPOINT?.trim() ?? ''
const abstractTemplateUrl = `${import.meta.env.BASE_URL}MM27_Abstract_Template.docx`
const maxAbstractFileBytes = 10 * 1024 * 1024
const allowedAbstractExtensions = ['.doc', '.docx', '.pdf']

const pages = [
  {
    title: 'Home',
    path: '/',
    heading: 'Molecular Modelling 2027',
    description:
      'Australasia’s premier molecular modelling conference is coming to Newcastle, Australia. Conference dates are TBC.',
  },
  {
    title: 'Important Dates',
    path: '/important-dates',
    heading: 'Important Dates',
    description:
      'Track MM27 dates and planning milestones as they are confirmed by the organising committee.',
  },
  {
    title: 'Registration',
    path: '/registration',
    heading: 'Registration',
    description:
      'Registration information for Molecular Modelling 2027 in Newcastle, Australia.',
  },
  {
    title: 'Abstracts',
    path: '/abstract-submission',
    heading: 'Abstract Submission',
    description:
      'Prepare to submit an oral or poster presentation abstract for Molecular Modelling 2027.',
  },
  {
    title: 'Location',
    path: '/location',
    heading: 'Newcastle, Australia',
    description:
      'Venue, travel and destination information for MM27 delegates visiting Newcastle.',
  },
  {
    title: 'Program',
    path: '/program',
    heading: 'Program',
    description:
      'The developing scientific framework and themes for Molecular Modelling 2027.',
  },
  {
    title: 'Sponsors',
    path: '/sponsors',
    heading: 'Sponsors & Partners',
    description:
      'Partnership and sponsorship information for Molecular Modelling 2027.',
  },
]

// The sponsorship page is intentionally kept out of the primary navigation
// until the organising committee is ready to publish the prospectus.
const navigationPages = pages.filter((page) => page.path !== '/sponsors')

const researchThemes = [
  {
    number: '01',
    title: 'Biomolecular modelling',
    description: 'From molecular recognition and drug discovery to membranes, proteins and complex biological systems.',
  },
  {
    number: '02',
    title: 'Materials & sustainability',
    description: 'Modelling materials, interfaces, catalysis, energy technologies and environmental challenges.',
  },
  {
    number: '03',
    title: 'Quantum chemistry',
    description: 'Electronic structure, spectroscopy, reaction mechanisms and emerging quantum approaches.',
  },
  {
    number: '04',
    title: 'Molecular simulation',
    description: 'Molecular dynamics, free energies, enhanced sampling and multiscale methods.',
  },
  {
    number: '05',
    title: 'AI & data-driven science',
    description: 'Machine learning, informatics, surrogate models and new ways to explore chemical space.',
  },
  {
    number: '06',
    title: 'Methods, software & HPC',
    description: 'Algorithms, research software, workflows and high-performance computing for molecular science.',
  },
]

const committeeMembers = [
  {
    name: 'Prof. Alister Page',
    affiliation: 'The University of Newcastle',
    role: 'Chair',
    profileUrl: 'https://www.newcastle.edu.au/profile/alister-page',
    imageUrl: alisterImage,
    initials: 'AP',
  },
  {
    name: "Prof. Megan O'Mara",
    affiliation: 'The University of Queensland',
    profileUrl: 'https://about.uq.edu.au/experts/2137',
    imageUrl: 'https://about.uq.edu.au/sites/default/files/profiles/2137.jpeg',
    initials: 'MO',
  },
  {
    name: 'Prof. Amir Karton',
    affiliation: 'The University of New England',
    profileUrl: 'https://www.une.edu.au/staff-profiles/science-and-technology/amir-karton',
    imageUrl: amirImage,
    initials: 'AK',
  },
  {
    name: 'Dr Martina Lessio',
    affiliation: 'UNSW Sydney',
    profileUrl: 'https://www.unsw.edu.au/staff/martina-lessio',
    imageUrl:
      'https://api.research.unsw.edu.au/sites/default/files/images/profile/202011_UNSWChem_Portraits_SCREEN_035.jpg',
    initials: 'ML',
  },
  {
    name: 'Dr Ben Noble',
    affiliation: 'The University of Newcastle',
    profileUrl: 'https://www.newcastle.edu.au/profile/ben-noble',
    imageUrl: benImage,
    initials: 'BN',
  },
  {
    name: 'Dr Kasimir Gregory',
    affiliation: 'The University of New England',
    profileUrl: 'https://www.une.edu.au/staff-profiles/science-and-technology/kasimir-gregory',
    imageUrl: kasimirImage,
    initials: 'KG',
  },
]

const planningDates = [
  {
    label: 'Registration opens',
    date: 'TBC',
    description: 'Fees, categories and the University of Newcastle registration link will be published here.',
  },
  {
    label: 'Abstract submission opens',
    date: 'TBC',
    description: 'Submission guidance and the online abstract form will be released together.',
  },
  {
    label: 'Oral presentation deadline',
    date: 'TBC',
    description: 'The committee will publish a separate oral deadline if required.',
  },
  {
    label: 'Poster presentation deadline',
    date: 'TBC',
    description: 'Poster format and submission requirements will be confirmed before abstracts open.',
  },
  {
    label: 'Presenter notifications',
    date: 'TBC',
    description: 'Submission outcomes and presentation details will be sent to presenters by email.',
  },
  {
    label: 'Early-bird registration closes',
    date: 'TBC',
    description: 'The early-bird deadline will be confirmed alongside the registration fees.',
  },
]

const programElements = [
  {
    timing: 'TBC',
    title: 'Plenary & keynote sessions',
    label: 'Invited program',
    description: 'Invited speakers and session times will be announced as the scientific program develops.',
  },
  {
    timing: 'TBC',
    title: 'Contributed talks',
    label: 'Oral program',
    description: 'Presentation blocks will be shaped after abstracts have been reviewed and accepted.',
  },
  {
    timing: 'TBC',
    title: 'Poster session',
    label: 'Poster program',
    description: 'Poster format, session timing and display guidance will be confirmed with presenter notifications.',
  },
  {
    timing: 'TBC',
    title: 'Community & networking',
    label: 'Social program',
    description: 'Welcome, networking and other community activities will be added when dates and venues are settled.',
  },
]

function getAbstractFileError(file) {
  if (!file) return 'Choose a Word document or PDF to continue.'

  const lowerName = file.name.toLowerCase()
  const hasAllowedExtension = allowedAbstractExtensions.some((extension) => lowerName.endsWith(extension))

  if (!hasAllowedExtension) return 'Use a .doc, .docx or .pdf file.'
  if (file.size > maxAbstractFileBytes) return 'The file must be no larger than 10 MB.'

  return ''
}

function getCurrentPath() {
  return window.location.hash.replace(/^#/, '') || '/'
}

function getCurrentPage(path) {
  return pages.find((page) => page.path === path) ?? pages[0]
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)
  const [menuOpen, setMenuOpen] = useState(false)
  const currentPage = getCurrentPage(currentPath)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getCurrentPath())
      setMenuOpen(false)
      window.scrollTo({ top: 0, left: 0 })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.title = currentPage.path === '/' ? 'MM27 | Molecular Modelling 2027' : `${currentPage.title} | MM27`

    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', currentPage.description)
  }, [currentPage])

  return (
    <div className="site-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        Skip to main content
      </a>
      <SiteHeader
        currentPath={currentPath}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main id="main-content" tabIndex="-1">
        {currentPage.path === '/' && <HomePage />}
        {currentPage.path === '/important-dates' && <ImportantDatesPage />}
        {currentPage.path === '/registration' && <RegistrationPage />}
        {currentPage.path === '/abstract-submission' && <AbstractSubmissionPage />}
        {currentPage.path === '/location' && <LocationPage />}
        {currentPage.path === '/program' && <ProgramPage />}
        {currentPage.path === '/sponsors' && <SponsorsPage />}
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader({ currentPath, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="site-brand" href="#/" aria-label="MM27 home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <strong>MM27</strong>
            <small>Molecular Modelling 2027</small>
          </span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary"
        >
          {navigationPages.map((page) => (
            <a
              key={page.path}
              href={`#${page.path}`}
              aria-current={currentPath === page.path ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {page.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <img className="hero-image" src={bannerImage} alt="Newcastle coastline and city at sunset" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow light">Newcastle, Australia</p>
          <h1 id="home-title">
            <span>MM27</span>
            Molecular Modelling 2027
          </h1>
          <p className="hero-summary">
            Australasia&apos;s premier molecular modelling conference is coming to Newcastle in 2027. Conference dates are TBC.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#/important-dates">
              View date updates
            </a>
            <a className="button button-ghost" href={`mailto:${contactEmail}`}>
              Contact the organisers
            </a>
          </div>
        </div>
        <div className="hero-date-card" aria-label="Conference dates to be confirmed">
          <small>Conference dates</small>
          <strong>TBC</strong>
          <span>Newcastle · 2027</span>
        </div>
      </section>

      <section className="section-shell home-introduction">
        <div>
          <p className="eyebrow">One community, many scales</p>
          <h2>Where molecular insight becomes shared progress.</h2>
        </div>
        <div className="lead-copy">
          <p>
            The MM series is organised by the{' '}
            <a href="https://mgms-amma.org">
              Association of Molecular Modellers of Australasia (AMMA)
            </a>
            . MM27 will bring together researchers developing and applying computational approaches across chemistry, biology, physics and materials science.
          </p>
          <p>
            Join colleagues from across Australasia and around the world for ideas, methods and conversations on the Newcastle coast.
          </p>
        </div>
      </section>

      <section className="fact-strip" aria-label="Conference summary">
        <div>
          <span>Format</span>
          <strong>In person</strong>
        </div>
        <div>
          <span>Dates</span>
          <strong>To be confirmed</strong>
        </div>
        <div>
          <span>Host city</span>
          <strong>Newcastle, NSW</strong>
        </div>
      </section>

      <section className="section-shell themes-section" aria-labelledby="themes-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Scientific scope</p>
            <h2 id="themes-title">Across the molecular modelling landscape</h2>
          </div>
          <p>
            The final program will be shaped by the community. These broad themes reflect the range of research MM27 aims to connect.
          </p>
        </div>
        <div className="theme-grid">
          {researchThemes.map((theme) => (
            <article className="theme-card" key={theme.title}>
              <span>{theme.number}</span>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell participation-section" aria-labelledby="participation-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Take part</p>
            <h2 id="participation-title">Start planning for MM27</h2>
          </div>
          <p>Registration and abstract submission are not open yet. The pages below explain what happens next.</p>
        </div>
        <div className="feature-link-grid">
          <a className="feature-link" href="#/abstract-submission">
            <span className="status-chip">Coming later</span>
            <h3>Present your research</h3>
            <p>See how oral and poster submission information will be released.</p>
            <strong>Abstract guidance <span aria-hidden="true">→</span></strong>
          </a>
          <a className="feature-link" href="#/registration">
            <span className="status-chip">Not yet open</span>
            <h3>Join us in Newcastle</h3>
            <p>Find current planning details and what to expect from the registration process.</p>
            <strong>Registration information <span aria-hidden="true">→</span></strong>
          </a>
          <a className="feature-link feature-link-photo" href="#/location">
            <img src={beachImage} alt="Newcastle beach and coastline" />
            <div>
              <span className="status-chip">Destination guide</span>
              <h3>Explore Newcastle</h3>
              <strong>Plan your visit <span aria-hidden="true">→</span></strong>
            </div>
          </a>
        </div>
      </section>

      <CommitteeSection />
    </>
  )
}

function CommitteeSection() {
  return (
    <section className="section-shell committee-section" aria-labelledby="committee-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Behind MM27</p>
          <h2 id="committee-title">Organising committee</h2>
        </div>
        <p>A cross-institutional team working to welcome the molecular modelling community to Newcastle.</p>
      </div>
      <ul className="committee-list">
        {committeeMembers.map((member) => (
          <li className="committee-member" key={member.name}>
            {member.imageUrl ? (
              <img src={member.imageUrl} alt={`Portrait of ${member.name}`} />
            ) : (
              <span className="committee-avatar" aria-hidden="true">
                {member.initials}
              </span>
            )}
            <div>
              {member.role && <span className="committee-role">{member.role}</span>}
              <h3>
                <a href={member.profileUrl}>{member.name}</a>
              </h3>
              <p>{member.affiliation}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="page-hero-orbit" aria-hidden="true" />
      <div className="section-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}

function StatusNotice({ label, title, children, action }) {
  return (
    <section className="status-notice">
      <div>
        <span className="status-chip">{label}</span>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
      {action}
    </section>
  )
}

function ImportantDatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan your conference"
        title="Important Dates"
        description="All MM27 dates are currently TBC. Conference, registration, abstract and program milestones will be added as the organising committee confirms them."
      />
      <div className="section-shell page-stack">
        <section className="confirmed-date" aria-label="Conference dates to be confirmed">
          <div>
            <span>Conference dates</span>
            <strong>TBC</strong>
            <small>Newcastle · 2027</small>
          </div>
          <div>
            <p className="eyebrow">Molecular Modelling 2027</p>
            <h2>Dates are being finalised</h2>
            <p>MM27 is planned as an in-person meeting in Newcastle, New South Wales, Australia. The conference dates are not yet confirmed.</p>
            <a className="text-link" href="#/location">Explore the host city <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section aria-labelledby="planning-dates-title">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Planning milestones</p>
              <h2 id="planning-dates-title">Dates still to be confirmed</h2>
            </div>
            <p>These placeholders make the remaining decisions visible without presenting estimates as settled dates.</p>
          </div>
          <ol className="date-timeline">
            {planningDates.map((item) => (
              <li key={item.label}>
                <span className="timeline-marker" aria-hidden="true" />
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                </div>
                <strong>{item.date}</strong>
              </li>
            ))}
          </ol>
        </section>

        <StatusNotice
          label="Stay informed"
          title="Check back as planning progresses"
          action={<a className="button button-dark" href={`mailto:${contactEmail}`}>Contact the committee</a>}
        >
          Confirmed information will appear here and on the relevant registration, abstract and program pages.
        </StatusNotice>
      </div>
    </>
  )
}

function RegistrationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Attend MM27"
        title="Registration"
        description="MM27 is planned as an in-person conference in Newcastle in 2027. Conference dates are TBC and registration is not yet open."
      />
      <div className="section-shell page-stack">
        <StatusNotice label="Not yet open" title="Registration is being prepared">
          Registration and payment will be handled through a University of Newcastle portal. The link, fee categories, inclusions and terms will be published here once finalised.
        </StatusNotice>

        <section className="detail-grid" aria-label="Current registration details">
          <article>
            <span>01</span>
            <p>Conference format</p>
            <strong>In person</strong>
          </article>
          <article>
            <span>02</span>
            <p>Conference dates</p>
            <strong>TBC</strong>
          </article>
          <article>
            <span>03</span>
            <p>Location</p>
            <strong>Newcastle, NSW</strong>
          </article>
          <article>
            <span>04</span>
            <p>Venue</p>
            <strong>To be confirmed</strong>
          </article>
        </section>

        <section aria-labelledby="registration-process-title">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">What happens next</p>
              <h2 id="registration-process-title">A straightforward registration process</h2>
            </div>
          </div>
          <div className="process-grid">
            <article>
              <span>1</span>
              <h3>Review the options</h3>
              <p>Delegate categories, fees, inclusions, cancellation terms and key deadlines will be listed before registration opens.</p>
            </article>
            <article>
              <span>2</span>
              <h3>Register securely</h3>
              <p>The University of Newcastle portal will collect attendee details and process payment outside this website.</p>
            </article>
            <article>
              <span>3</span>
              <h3>Receive confirmation</h3>
              <p>Registration confirmation and practical event information will be sent to the email address supplied in the portal.</p>
            </article>
          </div>
        </section>

        <aside className="planning-note">
          <div>
            <p className="eyebrow">Before booking travel</p>
            <h2>Wait for the venue and accommodation guide</h2>
          </div>
          <p>Newcastle travel information is available now, but delegates may wish to wait for the confirmed venue and recommended accommodation before making non-refundable bookings.</p>
          <a className="text-link" href="#/location">View location information <span aria-hidden="true">→</span></a>
        </aside>
      </div>
    </>
  )
}

function AbstractSubmissionPage() {
  const [fileError, setFileError] = useState('')
  const [previewSubmitted, setPreviewSubmitted] = useState(false)
  const submissionIsConfigured = Boolean(abstractFormEndpoint)

  const handleFileChange = (event) => {
    setFileError(getAbstractFileError(event.target.files?.[0]))
    setPreviewSubmitted(false)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    const fileInput = form.elements.namedItem('abstract_file')
    const nextFileError = getAbstractFileError(fileInput?.files?.[0])

    if (nextFileError) {
      event.preventDefault()
      setFileError(nextFileError)
      fileInput?.focus()
      return
    }

    if (!submissionIsConfigured) {
      event.preventDefault()
      setPreviewSubmitted(true)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Share your research"
        title="Abstract Submission"
        description="Explore the draft submission form and one-page template. The call for abstracts, submission dates and final requirements are all TBC."
      />
      <div className="section-shell page-stack">
        <StatusNotice label="Prototype only" title="This form is open for testing, not real submissions">
          The committee can test the fields, file upload and email delivery now. Final submission rules, privacy arrangements, dates and the production recipient must be approved before the form is opened publicly.
        </StatusNotice>

        <section className="abstract-guidance" aria-labelledby="abstract-guidance-title">
          <div>
            <p className="eyebrow">Draft requirements</p>
            <h2 id="abstract-guidance-title">One page, one optional figure</h2>
            <p>These requirements are a working draft and remain subject to committee approval.</p>
            <a className="button button-dark" href={abstractTemplateUrl} download>
              Download Word template
            </a>
          </div>
          <ul className="check-list">
            <li>Use the supplied A4 Word template</li>
            <li>Keep the complete submission to one page</li>
            <li>Underline the presenting author</li>
            <li>Include no more than one figure</li>
            <li>Upload a Word document or PDF</li>
            <li>Keep the uploaded file at or below 10 MB</li>
          </ul>
        </section>

        <section className="abstract-form-section" aria-labelledby="abstract-form-title">
          <div className="form-heading">
            <div>
              <p className="eyebrow">Submission prototype</p>
              <h2 id="abstract-form-title">Test the abstract form</h2>
              <p>Required fields are marked with an asterisk. Please use dummy or non-sensitive content while testing.</p>
            </div>
            <span className={`form-mode${submissionIsConfigured ? ' is-connected' : ''}`}>
              {submissionIsConfigured ? 'Test email connected' : 'Preview mode — no email sent'}
            </span>
          </div>

          <form
            className="abstract-form"
            action={abstractFormEndpoint || undefined}
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            onChange={() => setPreviewSubmitted(false)}
          >
            <input type="hidden" name="_subject" value="MM27 abstract submission test" />
            <input type="hidden" name="_template" value="table" />
            <input className="honeypot" type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />

            <fieldset>
              <legend>Presenting author</legend>
              <div className="form-grid two-columns">
                <label>
                  <span>Given name *</span>
                  <input type="text" name="given_name" autoComplete="given-name" required />
                </label>
                <label>
                  <span>Family name *</span>
                  <input type="text" name="family_name" autoComplete="family-name" required />
                </label>
                <label>
                  <span>Email address *</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Institution *</span>
                  <input type="text" name="institution" autoComplete="organization" required />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Presentation</legend>
              <div className="form-grid">
                <label>
                  <span>Presentation title *</span>
                  <input type="text" name="presentation_title" required />
                </label>
              </div>
              <div className="form-grid two-columns">
                <label>
                  <span>Preferred format *</span>
                  <select name="preferred_format" defaultValue="" required>
                    <option value="" disabled>Select an option</option>
                    <option value="Oral presentation">Oral presentation</option>
                    <option value="Poster presentation">Poster presentation</option>
                    <option value="Either oral or poster">Either oral or poster</option>
                  </select>
                </label>
                <label>
                  <span>Primary theme *</span>
                  <select name="primary_theme" defaultValue="" required>
                    <option value="" disabled>Select a theme</option>
                    {researchThemes.map((theme) => (
                      <option key={theme.title} value={theme.title}>{theme.title}</option>
                    ))}
                    <option value="Other / interdisciplinary">Other / interdisciplinary</option>
                  </select>
                </label>
              </div>
              <div className="form-grid">
                <label>
                  <span>Co-authors and affiliations</span>
                  <textarea
                    name="coauthors"
                    rows="4"
                    placeholder="List each co-author and institutional affiliation."
                  />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Abstract file</legend>
              <div className={`upload-field${fileError ? ' has-error' : ''}`}>
                <label htmlFor="abstract-file">
                  <strong>Upload Word document or PDF *</strong>
                  <span>.doc, .docx or .pdf · maximum 10 MB</span>
                </label>
                <input
                  id="abstract-file"
                  type="file"
                  name="abstract_file"
                  accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                  aria-describedby={fileError ? 'abstract-file-error' : 'abstract-file-help'}
                  onChange={handleFileChange}
                  required
                />
                <small id="abstract-file-help">Use the template above and remove its blue guidance box before uploading.</small>
                {fileError && <p className="field-error" id="abstract-file-error" role="alert">{fileError}</p>}
              </div>
            </fieldset>

            <fieldset>
              <legend>Submission checks</legend>
              <div className="checkbox-list">
                <label>
                  <input type="checkbox" name="one_page_confirmed" value="Yes" required />
                  <span>I confirm the complete abstract is no longer than one A4 page. *</span>
                </label>
                <label>
                  <input type="checkbox" name="presenter_underlined" value="Yes" required />
                  <span>I confirm the presenting author is underlined. *</span>
                </label>
                <label>
                  <input type="checkbox" name="figure_limit_confirmed" value="Yes" required />
                  <span>I confirm the abstract contains no more than one figure. *</span>
                </label>
                <label>
                  <input type="checkbox" name="data_use_consent" value="Yes" required />
                  <span>I consent to the organising committee using these details and the uploaded file to assess the submission and contact the presenter. *</span>
                </label>
              </div>
            </fieldset>

            <div className="form-grid">
              <label>
                <span>Notes for the organising committee</span>
                <textarea name="committee_notes" rows="4" placeholder="Optional accessibility, scheduling or other relevant information." />
              </label>
            </div>

            <div className="form-actions">
              <button className="button button-dark" type="submit">
                {submissionIsConfigured ? 'Send test submission' : 'Validate test submission'}
              </button>
              <p>
                {submissionIsConfigured
                  ? 'Testing may transfer the entered information and file to the configured external form service.'
                  : 'Preview mode validates the form locally but does not transmit or save anything.'}
              </p>
            </div>

            {previewSubmitted && (
              <div className="form-result" role="status" aria-live="polite">
                <strong>Form validation passed.</strong>
                <p>No email was sent because this local preview has no submission endpoint configured.</p>
              </div>
            )}
          </form>
        </section>

        <StatusNotice
          label="Questions"
          title="Need to plan around an abstract?"
          action={<a className="button button-dark" href={`mailto:${contactEmail}?subject=MM27%20abstract%20enquiry`}>Email the organisers</a>}
        >
          The committee may not yet have every answer, but can help with time-sensitive questions while the final submission process is being approved.
        </StatusNotice>
      </div>
    </>
  )
}

function ProgramPage() {
  return (
    <>
      <PageHeader
        eyebrow="Scientific program"
        title="Program"
        description="The scientific and social program is still being developed. Conference dates, session dates and timetable details are all TBC."
      />
      <div className="section-shell page-stack">
        <StatusNotice label="In development" title="Speaker and session announcements will follow">
          This page will eventually hold the complete timetable, invited speakers, session themes, poster information and downloadable program.
        </StatusNotice>

        <section aria-labelledby="program-framework-title">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Conference framework</p>
              <h2 id="program-framework-title">Program dates TBC</h2>
            </div>
            <p>No dates or session times have been confirmed. These elements show the intended shape of the program without implying a final timetable.</p>
          </div>
          <div className="program-grid">
            {programElements.map((item) => (
              <article key={item.title}>
                <span>{item.label}</span>
                <p>{item.timing}</p>
                <h3>{item.title}</h3>
                <div className="program-placeholder">
                  <i aria-hidden="true" />
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="program-themes" aria-labelledby="program-themes-title">
          <div>
            <p className="eyebrow light">Scientific breadth</p>
            <h2 id="program-themes-title">A program shaped across disciplines</h2>
            <p>MM27 will connect methodological advances with applications spanning health, energy, materials and sustainability.</p>
          </div>
          <ul>
            {researchThemes.map((theme) => <li key={theme.title}>{theme.title}</li>)}
          </ul>
        </section>

        <div className="dual-callout">
          <article>
            <span className="status-chip">Want to contribute?</span>
            <h2>Prepare an abstract</h2>
            <p>Submission requirements and deadlines will be added once the call for abstracts opens.</p>
            <a className="text-link" href="#/abstract-submission">Abstract information <span aria-hidden="true">→</span></a>
          </article>
          <article>
            <span className="status-chip">Planning your visit?</span>
            <h2>Explore Newcastle</h2>
            <p>Start with travel and destination information while the venue and accommodation guide is finalised.</p>
            <a className="text-link" href="#/location">Location guide <span aria-hidden="true">→</span></a>
          </article>
        </div>
      </div>
    </>
  )
}

function LocationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our host city"
        title="Newcastle, Australia"
        description="A coastal city with beaches, a working harbour, a compact centre and the Hunter Valley wine region on its doorstep."
      />
      <div className="section-shell page-stack location-page">
        <div className="location-hero-grid">
          <figure className="location-image-panel location-image-panel-beach">
            <img src={beachImage} alt="Bar Beach and the Newcastle coastline" />
            <figcaption>Bar Beach</figcaption>
          </figure>
          <figure className="location-image-panel location-image-panel-harbour">
            <img src={harbourImage} alt="Newcastle city, harbour and waterfront" />
            <figcaption>Honeysuckle precinct</figcaption>
          </figure>
          <figure className="location-image-panel location-image-panel-vineyards">
            <img src={hunterValleyImage} alt="Hunter Valley vineyard landscape" />
            <figcaption>
              <a href="https://www.winecountry.com.au">Hunter Valley wine region</a>
            </figcaption>
          </figure>
          <figure className="location-image-panel location-image-panel-nuspace">
            <img src={nuspaceImage} alt="University of Newcastle NUspace building" />
            <figcaption>
              <a href="https://www.newcastle.edu.au/campus-life/newcastle-city-campus">University of Newcastle city campus</a>
            </figcaption>
          </figure>
        </div>

        <section className="location-overview" aria-labelledby="newcastle-overview-title">
          <div>
            <p className="eyebrow">Coast, city & connection</p>
            <h2 id="newcastle-overview-title">An easy city to explore between sessions</h2>
          </div>
          <div>
            <p>Newcastle sits on the New South Wales coast, roughly 160 kilometres north of Sydney. Its city centre links beaches, ocean baths, the harbour foreshore, restaurants and cultural venues within a relatively compact area.</p>
            <p>Conditions in Newcastle vary through the year, and coastal weather can change quickly. Seasonal guidance and a forecast link will be added after the conference dates are confirmed.</p>
          </div>
        </section>

        <section className="travel-grid" aria-label="Travel and venue information">
          <article>
            <span className="travel-icon" aria-hidden="true">✦</span>
            <h2>Conference venue</h2>
            <p>The venue is still to be confirmed. Address, accessibility, campus maps and room information will be published here once finalised.</p>
          </article>
          <article>
            <span className="travel-icon" aria-hidden="true">↗</span>
            <h2>Via Newcastle Airport</h2>
            <p>Newcastle Airport (NTL) is at Williamtown, around 25–30 minutes by road from central Newcastle. Public coach, taxi, rideshare and car-hire options are available.</p>
            <a className="text-link" href="https://www.newcastleairport.com.au/parking-transport/">Airport transport options <span aria-hidden="true">→</span></a>
          </article>
          <article>
            <span className="travel-icon" aria-hidden="true">⌁</span>
            <h2>Via Sydney</h2>
            <p>Intercity trains connect Sydney with Newcastle Interchange. From the interchange, light rail, buses, taxis and rideshare serve the city centre.</p>
            <a className="text-link" href="https://transportnsw.info/trip">Plan with Transport for NSW <span aria-hidden="true">→</span></a>
          </article>
          <article>
            <span className="travel-icon" aria-hidden="true">⌂</span>
            <h2>Accommodation</h2>
            <p>Recommended accommodation and any delegate booking arrangements will be added after the conference venue is confirmed.</p>
          </article>
        </section>

        <section className="attendee-links" aria-labelledby="attendee-links-title">
          <div>
            <p className="eyebrow">Useful links</p>
            <h2 id="attendee-links-title">Plan your time in Newcastle</h2>
          </div>
          <div className="attendee-link-grid">
            <a href="https://visitnewcastle.com.au/visitor-information/visitor-information-centre">
              <span>Visitor information</span>
              <strong>Visit Newcastle <span aria-hidden="true">↗</span></strong>
            </a>
            <a href="https://transportnsw.info/trip">
              <span>Public transport</span>
              <strong>Transport for NSW <span aria-hidden="true">↗</span></strong>
            </a>
            <a href="https://www.newcastleairport.com.au/parking-transport/public-transport/">
              <span>Airport connections</span>
              <strong>Newcastle Airport <span aria-hidden="true">↗</span></strong>
            </a>
            <a href="https://newcastle.nsw.gov.au/explore/things-to-do">
              <span>Local experiences</span>
              <strong>Things to do <span aria-hidden="true">↗</span></strong>
            </a>
            <a href="https://www.visitnsw.com/destinations/north-coast/newcastle-area">
              <span>Destination guide</span>
              <strong>Visit NSW <span aria-hidden="true">↗</span></strong>
            </a>
            <a href="https://www.winecountry.com.au">
              <span>Beyond the city</span>
              <strong>Hunter Valley <span aria-hidden="true">↗</span></strong>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support the community"
        title="Sponsors & Partners"
        description="MM27 offers organisations an opportunity to connect with researchers across molecular modelling, computational chemistry and scientific computing."
      />
      <div className="section-shell page-stack">
        <StatusNotice
          label="Prospectus in development"
          title="Partnership opportunities are being prepared"
          action={<a className="button button-dark" href={`mailto:${contactEmail}?subject=MM27%20sponsorship%20enquiry`}>Register your interest</a>}
        >
          Sponsorship levels, benefits and terms will be published after approval by the organising committee. Early enquiries are welcome.
        </StatusNotice>

        <section className="split-section" aria-labelledby="sponsor-value-title">
          <div>
            <p className="eyebrow">Why partner with MM27?</p>
            <h2 id="sponsor-value-title">Connect with a specialist scientific community</h2>
          </div>
          <div className="lead-copy">
            <p>MM27 will bring together researchers, students, research software specialists and scientific leaders working across molecular simulation, quantum chemistry, machine learning and data-driven molecular science.</p>
            <p>The final prospectus will describe available visibility, engagement and community-support opportunities without committing partners before the package is agreed.</p>
          </div>
        </section>

        <div className="detail-grid three-columns">
          <article>
            <span>01</span>
            <p>Build visibility</p>
            <strong>Reach a focused research audience</strong>
          </article>
          <article>
            <span>02</span>
            <p>Support participation</p>
            <strong>Help strengthen an inclusive scientific meeting</strong>
          </article>
          <article>
            <span>03</span>
            <p>Start conversations</p>
            <strong>Meet researchers and emerging talent</strong>
          </article>
        </div>
      </div>
    </>
  )
}

function SiteFooter() {
  return (
    <footer>
      <section className="footer-cta">
        <div>
          <p className="eyebrow light">Molecular Modelling 2027</p>
          <h2>See you in Newcastle.</h2>
        </div>
        <div>
          <p>Conference dates TBC</p>
          <a className="button button-ghost" href={`mailto:${contactEmail}`}>Contact the organisers</a>
        </div>
      </section>

      <div className="footer-main">
        <div className="footer-brand">
          <strong>MM27</strong>
          <p>Australasia&apos;s premier molecular modelling conference.</p>
        </div>
        <div className="footer-links">
          <h2>Conference</h2>
          <a href="#/important-dates">Important dates</a>
          <a href="#/registration">Registration</a>
          <a href="#/abstract-submission">Abstracts</a>
          <a href="#/program">Program</a>
          <a href="#/location">Location</a>
        </div>
        <div className="footer-links">
          <h2>Connect</h2>
          <a href="https://mgms-amma.org">AMMA website</a>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
        <div className="partner-logos" aria-label="Conference partners">
          <a href="https://mgms-amma.org" aria-label="Association of Molecular Modellers of Australasia">
            <img className="amma-footer-logo" src={ammaLogo} alt="AMMA logo" />
          </a>
          <a href="https://www.newcastle.edu.au" aria-label="The University of Newcastle">
            <img className="newcastle-footer-logo" src={newcastleLogo} alt="The University of Newcastle logo" />
          </a>
        </div>
      </div>

      <section
        className="acknowledgement"
        style={{ backgroundImage: `url(${acknowledgementBackground})` }}
      >
        <p>
          AMMA and the University of Newcastle acknowledge that MM27 will take
          place on the traditional lands of the Awabakal and Worimi nations. We
          acknowledge and pay our respect to the Elders past, present and
          emerging. We recognise that First Nations sovereignty was never ceded.
          Australia always was and always will be Aboriginal Land.
        </p>
      </section>
    </footer>
  )
}

export default App
