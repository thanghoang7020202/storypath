import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

  const imgSrc = "src/assets/MS-storypathHomePage.jpeg";

  return (
    <div className="container-md text-center py-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-start">
          <h1 className="mb-3">Welcome to StoryPath</h1>
          <p>Create engaging tours, hunts, and adventures!</p>
          <ul className="list-unstyled">
            <li>• Museum Tours</li>
            <li>• Campus Tours</li>
            <li>• Treasure Hunts</li>
            <li>• And more!</li>
          </ul>
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