import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initDB } from './lib/db';
import { PatientForm } from './components/PatientForm.tsx';
import SearchPage from './components/SearchPage.tsx';
import './index.css';
import Navbar from './components/Navbar.tsx';

function LandingPage() {
  return (
    <div style={{ width: '100vw' }} className="mx-auto items-center justify-center p-10">
      <div className=" text-center ">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2563eb] mb-6">
          Welcome to Mediz
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 mb-10">
          Medical records management made eazzzyyy!
        </p>

        <div className="flex flex-col sm:flex-row gap-20 justify-center">
          <Link style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}
            to="/register"
            className="bg-[#2563eb] text-white font-bold py-3 px-6 rounded-md"
          >
            Register Patient
          </Link>
          <Link style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}
            to="/search"
            className="bg-[#2563eb] text-white font-bold py-3 px-6 rounded-md"
          >
            Search Patients
          </Link>
        </div>
        <footer className="text-center mt-12 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Medblocks — Built with ❤️ and openEHR
        </footer>

      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<PatientForm />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
