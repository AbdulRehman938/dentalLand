import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Hero from '../components/services/Hero'
import CaseStudies from '../components/home/caseStudies'
import StackingSection from '../components/common/StackingSection'

const Services = () => {
  return (
    <div className="flex flex-col w-full bg-brand-bg [overflow-x:clip]">
      <Header />
      <main className="flex-grow">
        <StackingSection index={1}>
          <Hero />
        </StackingSection>
        
        <StackingSection index={2}>
          <CaseStudies />
        </StackingSection>
      </main>
      <Footer />
    </div>
  )
}

export default Services