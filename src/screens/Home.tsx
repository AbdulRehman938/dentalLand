import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Treatments from '../components/home/Treatments'
import Quote from '../components/home/Quote'
import Team from '../components/home/Team'
import CaseStudies from '../components/home/caseStudies'
import StackingSection from '../components/common/StackingSection'

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-brand-bg [overflow-x:clip]">
      <Header />
      
      <main className="flex-grow">
        <StackingSection index={1}>
          <Hero />
        </StackingSection>
        
        <StackingSection index={2}>
          <About />
        </StackingSection>

        <StackingSection index={3}>
          <Treatments />
        </StackingSection>
        
        <StackingSection index={4}>
          <Quote />
        </StackingSection>
        
        <StackingSection index={5}>
          <Team />
        </StackingSection>
        
        <StackingSection index={6}>
          <CaseStudies />
        </StackingSection>
      </main>

      <Footer />
    </div>
  )
}

export default Home