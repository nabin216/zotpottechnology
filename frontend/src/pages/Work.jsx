import { CtaBand, ProjectCard } from '../components/Blocks'
import { usePageTitle } from '../components/usePageTitle'
import { projects } from '../data/portfolio'
import NotFoundPage from './NotFound'

function WorkPage() {
  usePageTitle('Our work', 'Selected client projects: the challenge, what we built, the technology used and the result.')

  // The page only exists once there is real work to show.
  if (projects.length === 0) return <NotFoundPage />

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="kicker">Our work</span>
          <h1>Projects we've delivered</h1>
          <p className="page-hero-copy">
            Each project shows the problem our client faced, what we built, the technology we used and the result.
          </p>
        </div>
      </section>
      <section className="section shell">
        <div className="project-grid">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>
      <CtaBand title="Have a similar project in mind?" />
    </>
  )
}

export default WorkPage
