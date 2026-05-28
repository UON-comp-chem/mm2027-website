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

const pages = [
  {
    title: 'Home',
    path: '/',
    heading: 'MM27',
    subheading: 'September 26-29, 2027 | Newcastle, Australia',
  },
  {
    title: 'Important Dates',
    path: '/important-dates',
    heading: 'Important Dates',
    subheading: 'Details Coming Soon',
  },
  {
    title: 'Registration',
    path: '/registration',
    heading: 'Registration',
    subheading: 'Details Coming Soon',
  },
  {
    title: 'Abstract Submission',
    path: '/abstract-submission',
    heading: 'Abstract Submission',
    subheading: 'Details Coming Soon',
  },
  {
    title: 'Location',
    path: '/location',
    heading: 'Location',
    subheading: 'Venue and travel information for Newcastle will be added here.',
  },
  {
    title: 'Program',
    path: '/program',
    heading: 'Program',
    subheading: 'Details Coming Soon',
  },
  {
    title: 'Sponsors',
    path: '/sponsors',
    heading: 'Sponsors',
    subheading: 'Sponsor information will be added here.',
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
    affiliation: 'University of New South Wales',
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

function getCurrentPath() {
  return window.location.hash.replace(/^#/, '') || '/'
}

function getCurrentPage(path) {
  return pages.find((page) => page.path === path) ?? pages[0]
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)
  const currentPage = getCurrentPage(currentPath)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getCurrentPath())
      window.scrollTo({ top: 0, left: 0 })
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <div className="site-shell">
      <main>
        {currentPage.path === '/' && <HomePage />}
        {currentPage.path !== '/' && <ContentPage page={currentPage} />}
      </main>
      <SiteFooter />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="banner-placeholder" aria-label="Conference banner image placeholder">
        <img src={bannerImage} alt="Newcastle coastline and city at sunset" />
      </section>

      <section className="content-placeholder">
        <div className="intro-copy">
          <h1>MM27</h1>
          <p className="subtitle">Molecular Modelling 2027</p>
          <p className="conference-date">September 26-29, 2027</p>
          <p className="conference-location">Newcastle, Australia</p>
        </div>
      </section>

      <Navigation />

      <section className="home-description">
        <p>
          The MM series is Australasia&apos;s premier molecular modelling
          conference, organised by the{' '}
          <a href="https://mgms-amma.org">
            Association of Molecular Modellers of Australasia (AMMA)
          </a>
          . MM27 will be an in-person event highlighting the forefront of
          research across the molecular modelling landscape, from methodology
          development and machine learning to applications in health, energy,
          and sustainability.
        </p>
        <p>
          The conference will bring together researchers from across Australasia
          and around the world who are pushing the boundaries of molecular
          modelling.
        </p>
        <p>
          We look forward to welcoming you to Newcastle, Australia, from
          September 26-29, 2027.
        </p>
      </section>

      <section className="organising-committee">
        <h2>Organising Committee</h2>
        <ul className="committee-list">
          {committeeMembers.map((member) => (
            <li className="committee-member" key={member.name}>
              {member.imageUrl ? (
                <img src={member.imageUrl} alt={member.name} />
              ) : (
                <span className="committee-avatar" aria-hidden="true">
                  {member.initials}
                </span>
              )}
              <div>
                <h3>
                  <a href={member.profileUrl}>{member.name}</a>
                </h3>
                <p>{member.affiliation}</p>
                {member.role && <p className="committee-role">{member.role}</p>}
              </div>
            </li>
          ))}
        </ul>
        <p className="committee-contact">
          <strong>Contact Us: mm27.amma@gmail.com</strong>
        </p>
      </section>
    </>
  )
}

function ContentPage({ page }) {
  if (page.path === '/location') {
    return <LocationPage />
  }

  return (
    <>
      <Navigation />
      <section className="page-content">
        <h1>{page.heading}</h1>
        <p>{page.subheading}</p>
      </section>
    </>
  )
}

function LocationPage() {
  return (
    <>
      <Navigation />
      <section className="page-content location-page">
        <h1>Newcastle, Australia</h1>
        <p>
          MM27 will be held in Newcastle, Australia&apos;s 2nd oldest city.
          Home to the University of Newcastle, it is known for its beaches,
          working harbour, ocean baths, cafes and easy access to renowned Hunter
          Valley Wineries.
        </p>

        <div className="location-hero-grid">
          <figure className="location-image-panel location-image-panel-beach">
            <img src={beachImage} alt="Newcastle beach and coastline" />
            <figcaption>Bar Beach</figcaption>
          </figure>
          <figure className="location-image-panel location-image-panel-harbour">
            <img src={harbourImage} alt="Newcastle city, harbour, and waterfront" />
            <figcaption>Honeysuckle Precinct</figcaption>
          </figure>
          <figure className="location-image-panel location-image-panel-vineyards">
            <img src={hunterValleyImage} alt="Hunter Valley vineyard landscape" />
            <figcaption>
              <a href="https://www.winecountry.com.au">Hunter Valley Wine Region</a>
            </figcaption>
          </figure>
          <figure className="location-image-panel location-image-panel-nuspace">
            <img src={nuspaceImage} alt="University of Newcastle NUspace building" />
            <figcaption>
              <a href="https://www.newcastle.edu.au">University of Newcastle</a>
            </figcaption>
          </figure>
        </div>

        <div className="location-info-grid">
          <article>
            <h2>About Newcastle</h2>
            <p>
              Newcastle is a coastal city in New South Wales, about two to
              three hours north of Sydney by road or rail. Newcastle has a
              population of around 550,000, with the broader Hunter region home
              to around 800,000 people. Late September and early October are
              mild spring months: typical averages are around 21°C maximum and
              13°C minimum in September, rising to about 23°C maximum and 15°C
              minimum in October, with occasional coastal showers.
            </p>
          </article>

          <article>
            <h2>Conference Venue &amp; Accommodation</h2>
            <p>Conference venue to be confirmed.</p>
          </article>

          <article>
            <h2>Getting Here</h2>
            <p>
              Newcastle Airport (NTE Williamtown) has direct flights from all
              Australian capital cities, and international connections via
              Denpasar. Newcastle Airport is located 20 minutes north of the
              CBD, and provides regular shuttle bus transfers to the Newcastle
              Interchange Station. Taxi and rideshare transfers are also
              available.
            </p>
            <p>
              Attendees arriving via Sydney can use NSW public transport
              connections to the Newcastle Interchange Station. From there,
              light rail, buses, taxis or rideshare are available for transfer
              to your accommodation &amp; the conference venue.
            </p>
          </article>

        </div>

        <section className="attendee-links" aria-labelledby="attendee-links-title">
          <h2 id="attendee-links-title">Useful Links for Attendees</h2>
          <div>
            <a href="https://visitnewcastle.com.au/visitor-information/visitor-information-centre">
              Newcastle Visitors Centre
            </a>
            <a href="https://transportnsw.info/trip">
              Plan a trip with Transport for NSW
            </a>
            <a href="https://www.newcastletransport.info/tickets-and-travel-info/opal-cards-and-fares/">
              Newcastle Transport tickets and Opal
            </a>
            <a href="https://www.newcastleairport.com.au/parking-transport/">
              Newcastle Airport Parking and Transport
            </a>
            <a href="https://newcastle.nsw.gov.au/explore/things-to-do">
              Things to do in Newcastle
            </a>
            <a href="https://www.visitnsw.com/destinations/north-coast/newcastle-area">
              Visit NSW Newcastle guide
            </a>
          </div>
        </section>
      </section>
    </>
  )
}

function Navigation() {
  return (
    <nav className="primary-nav" aria-label="Primary">
      {pages.map((page) => (
        <a key={page.path} href={`#${page.path}`}>
          {page.title}
        </a>
      ))}
    </nav>
  )
}

function SiteFooter() {
  return (
    <footer>
      <div className="site-footer" aria-label="Conference partners">
        <a href="https://mgms-amma.org" aria-label="Association of Molecular Modellers of Australasia">
          <img className="amma-footer-logo" src={ammaLogo} alt="AMMA logo" />
        </a>
        <a href="https://www.newcastle.edu.au" aria-label="The University of Newcastle">
          <img
            className="newcastle-footer-logo"
            src={newcastleLogo}
            alt="The University of Newcastle logo"
          />
        </a>
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
