import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import ProjectList from './components/ProjectsList';
import ProjectForm from './components/ProjectForm';
import LocationsList from './components/LocationsList';
import LocationForm from './components/LocationForm';
import { ProjectsContext } from './data/ProjectsContext';

// Example Recipe imports
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import { recipes } from './data/recipes';

// footer links
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';

// Importing API functions from api.js
import { getProjects, addProject, updateProject, deleteProject } from './api';
function App() {
  const headerLinks = [
    { path: '/', text: 'Home' },
    { path: '/projects', text: 'Projects' }
    // { path: '/recipes', text: 'Recipes' }
  ];

  const footerLinks = [
    { path: '/about', text: 'About' },
    { path: '/contact', text: 'Contact' },
    { path: '/privacy', text: 'Privacy Policy' }
  ];

  // State to manage projects
  const [projects, setProjects] = useState([]);

  // Fetch projects from API when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects(); // Get projects from API
        setProjects(data); // Set fetched projects to state
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
    fetchData();
  }, []);

  // Function to handle adding a project (calls API)
  const handleAddProject = async (newProject) => {
    try {
      const addedProject = await addProject(newProject);
      setProjects((prevProjects) => [...prevProjects, addedProject]); // Add new project to state
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  // Function to handle updating a project (calls API)
  const handleUpdateProject = async (projectId, updatedData) => {
    try {
      const updatedProject = await updateProject(projectId, updatedData);
      setProjects((prevProjects) =>
        prevProjects.map((proj) => (proj.id === projectId ? updatedProject : proj))
      );
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <Router>
      <div>
        <Header brandText="STORYPATH" headerLinks={headerLinks} />
        <div className="container mt-5">
          <ProjectsContext.Provider value={projects}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectList projects={projects} />} />
              <Route path="/project/add" element={<ProjectForm isNewProject={true}/>} />
              <Route path="/project/edit/:id" element={<ProjectForm isNewProject={false} />}/>
              <Route path="/locations/:project_id" element={<LocationsList />} />
              <Route path="/location/add/:id" element={<LocationForm isNewLocation={true} />} />
              <Route path="/location/edit/:id" element={<LocationForm isNewLocation={false} />} />
              {/* <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
              <Route path="/recipe/:id" element={<Recipe recipes={recipes} />} /> */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </ProjectsContext.Provider>
        </div>
        <Footer footerLinks={footerLinks} />
      </div>
    </Router>
  );
}

export default App;
