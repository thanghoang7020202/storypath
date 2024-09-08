import React, { useState } from 'react';
import { projects } from '../data/projects';

const ProjectForm = ({ initialProject = {}, onSave }) => {
  const [title, setTitle] = useState(initialProject.title || '');
  const [description, setDescription] = useState(initialProject.description || '');
  const [instructions, setInstructions] = useState(initialProject.instructions || '');
  const [initialClue, setInitialClue] = useState(initialProject.initialClue || '');
  const [homescreenDisplay, setHomescreenDisplay] = useState(initialProject.homescreenDisplay || 'Display initial clue');
  const [participantScoring, setParticipantScoring] = useState(initialProject.participantScoring || 'Number of Scanned QR Codes');
  const [isPublished, setIsPublished] = useState(initialProject.isPublished || false);

  const handleSave = (e) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      instructions,
      initialClue,
      homescreenDisplay,
      participantScoring,
      isPublished,
    };
    onSave(projectData);
  };

  return (
    <div className="container">
      <h1 className="my-4">{initialProject.id ? 'Edit Project' : 'Add Project'}</h1>

      <form onSubmit={handleSave}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The name of your project"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief description of your project. This is not displayed to participants."
            rows="3"
            required
          ></textarea>
        </div>

        {/* Instructions */}
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions for participants, explaining how to engage with the project."
            rows="3"
          ></textarea>
        </div>

        {/* Initial Clue */}
        <div className="mb-3">
          <label className="form-label">Initial Clue</label>
          <textarea
            className="form-control"
            value={initialClue}
            onChange={(e) => setInitialClue(e.target.value)}
            placeholder="The first clue to start the project. This is optional."
            rows="2"
          ></textarea>
        </div>

        {/* Homescreen Display */}
        <div className="mb-3">
          <label className="form-label">Homescreen Display</label>
          <select
            className="form-select"
            value={homescreenDisplay}
            onChange={(e) => setHomescreenDisplay(e.target.value)}
          >
            <option value="Display initial clue">Display initial clue</option>
            <option value="Display project description">Display project description</option>
          </select>
        </div>

        {/* Participant Scoring */}
        <div className="mb-3">
          <label className="form-label">Participant Scoring</label>
          <select
            className="form-select"
            value={participantScoring}
            onChange={(e) => setParticipantScoring(e.target.value)}
          >
            <option value="Number of Scanned QR Codes">Number of Scanned QR Codes</option>
            <option value="Time Spent on Project">Time Spent on Project</option>
          </select>
        </div>

        {/* Published Checkbox */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            id="publishedCheck"
          />
          <label className="form-check-label" htmlFor="publishedCheck">
            Published
          </label>
        </div>

        {/* Save Button */}
        <button type="submit" className="btn btn-primary">
          Save Project
        </button>
        <button type="button" className="btn btn-danger ms-2" onClick={() => window.history.back()}>
            Cancel
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
