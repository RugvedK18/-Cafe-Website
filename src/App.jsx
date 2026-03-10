import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components & Pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Menu from './pages/Menu';

// Example of other pages you might create later
// import Menu from './pages/Menu'; 
// import Shop from './pages/Shop';

const App = () => {
  return (
    <Router>
      <div className="bg-[#FAF9F6] min-h-screen">

        <Navbar />
        
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          
         
          <Route path="*" element={
            <div className="h-screen flex items-center justify-center font-serif italic text-2xl">
              Page under extraction... ☕
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;