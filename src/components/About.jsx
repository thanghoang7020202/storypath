import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4">About StoryPath</h1>
        <p className="lead">Bringing location-based narratives to life.</p>
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <p className="mb-4">
            <strong>StoryPath</strong> is an innovative platform that turns every location into a new adventure. 
            It allows users to create and explore virtual museum exhibits, immersive location-based tours, and treasure hunts with interactive clues.
          </p>
          <p className="mb-4">
            Whether you're crafting educational experiences, designing engaging tours, or building unique treasure hunts, 
            StoryPath provides the tools you need. The platform includes a web app built with React for authoring experiences 
            and a mobile player built with React Native for exploring them in real-world locations.
          </p>
          <p className="mb-5">
            With <strong>StoryPath</strong>, the only limit is your imagination. Start exploring the world around you in a new way.
          </p>
          
          <h2 className="text-center mb-4">Contributors</h2>
          <ul className="list-group mb-5">
            <li className="list-group-item"><strong>Cao Quoc Thang Hoang</strong> - Designer, Project Developer and Owner</li>
            {/*Other contributor please add your name in this format: <li className="list-group-item">Contributor N - Your name</li> */}
          </ul>
          
          <h2 className="text-center mb-4">License</h2>
          <div className="alert alert-info text-center mb-5">
            This project is <strong>private and confidential</strong>, and delicate as an assignment of the course 
            [COMP2140] Web/Mobile Programming from the University of Queensland, Australia <strong>before March 2025</strong>.
            After that, this project will be published under the <strong>MIT License</strong>. Feel free to use, modify, and distribute the software 
            as long as you adhere to the terms of the license.
          </div>
          
          <h2 className="text-center mb-4">Contact</h2>
          <div className="text-center mb-5">
            <p>
              Have questions? Reach out to us via email 
              at <a href="mailto:s4759487@uq.edu.au">s4759487@uq.edu.au</a> or visit our <a href="/contact">Contact page</a>.
            </p>
          </div>

          <h2 className="text-center mb-4">Repository and Contributions</h2>
          <p className="text-center mb-5">
            The source code for StoryPath is available on <a href="https://github.com/thanghoang7020202/storypath" className="text-decoration-none">GitHub</a>. 
            Contributions are always welcome! Fork the repository and submit a pull request to help improve the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
