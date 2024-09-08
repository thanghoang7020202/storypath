import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

// header links
import Home from './components/Home';
import ProjectList from './components/ProjectsList';
import ProjectForm from './components/ProjectForm';
import { projects } from './data/projects';
// (example) 
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import { recipes } from './data/recipes';
// footer links
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const headerLinks = [
    { path: '/', text: 'Home' },
    { path: '/projects', text: 'Projects' },
    { path: '/recipes', text: 'Recipes' }
  ];

  // footer links include About, Contact, and Privacy Policy
  const footerLinks = [
    { path: '/about', text: 'About' },
    { path: '/contact', text: 'Contact' },
    { path: '/privacy', text: 'Privacy Policy' }
  ];

  return (
    <Router>
      <div>
        <Header brandText="STORYPATH" headerLinks={headerLinks} />

        <div className="container mt-5">
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectList projects={projects} />} />
            <Route path="/project/add" element={<ProjectForm />} />
            <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
            <Route path="/recipe/:id" element={<Recipe recipes={recipes} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>

        <Footer footerLinks={footerLinks} />
      </div>
    </Router>
  );
}

export default App;