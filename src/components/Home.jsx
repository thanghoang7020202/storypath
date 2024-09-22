import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home component for the home page.
 * @returns JSX element
 */
function Home() {

  const imgSrc = "src/assets/MS-storypathHomePage.jpeg";                    // Image source

  return (
    <div className="container-md text-center py-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-start">
          {/* Add a heading and a brief description */}
          <h1 className="mb-3">Welcome to StoryPath</h1>

          {/* Add a list of features */}
          <p>Create engaging tours, hunts, and adventures!</p>
          <ul className="list-unstyled">
            <li>• Museum Tours</li>
            <li>• Campus Tours</li>
            <li>• Treasure Hunts</li>
            <li>• And more!</li>
          </ul>

          {/* Add a button to view projects */}
          <Link to="/projects" className="btn btn-primary">View Projects</Link>
        </div>
        <div className="col-md-6">
          {/* at src/assets/MS-storypathHomePage.jpeg (not in component), resize to 600x400 */}
          <img src={imgSrc} alt="StoryPath" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Home;