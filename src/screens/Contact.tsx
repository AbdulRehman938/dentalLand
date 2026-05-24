import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Hero from '../components/contact/Hero'
import ContactForms from '../components/contact/contactForms'

const Contact = () => {
  return (
    <div className="flex flex-col w-full bg-brand-bg [overflow-x:clip]">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ContactForms />
      </main>
      <Footer />
    </div>
  )
}

export default Contact