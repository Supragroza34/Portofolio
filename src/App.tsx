import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/hero/Hero'
import { About } from './components/about/About'
import { ExperienceTimeline } from './components/experience/ExperienceTimeline'
import { ProjectGrid } from './components/projects/ProjectGrid'
import { GitHubRepos } from './components/github/GitHubRepos'
import { PlaygroundShell } from './components/playground/PlaygroundShell'
import { SkillsGrid } from './components/skills/SkillsGrid'
import { EducationAchievements } from './components/education/EducationAchievements'
import { Contact } from './components/contact/Contact'

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-copper focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <ExperienceTimeline />
        <ProjectGrid />
        <GitHubRepos />
        <PlaygroundShell />
        <SkillsGrid />
        <EducationAchievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
