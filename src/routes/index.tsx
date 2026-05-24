import { Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import Services from '../screens/Services';
import Contact from '../screens/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-3xl p-10 m-4 shadow-lg text-center mt-28">
          <h2 className="text-3xl font-bold text-brand-black mb-4">Screen Under Construction</h2>
          <p className="text-gray-400 mb-6 max-w-md">Our team is currently polishing this section to fit the premium aesthetic of Dental Land.</p>
          <a href="/" className="px-6 py-2.5 bg-brand-secondary text-white font-bold rounded-full shadow-md transition-transform hover:scale-105">
            Return Home
          </a>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;