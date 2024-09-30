# StoryPath QR Code Project

## Description
StoryPath is a React web application designed to manage projects and associated locations. Each location can be linked to a QR code for quick and easy access. The application supports basic CRUD operations for projects and locations and provides an intuitive UI for generating and displaying QR codes. This project is intended for developers and teams looking to implement a location-based management system with QR code integration.

## Features
- **CRUD operations**: Create, read, update, and delete projects and locations.
- **QR Code generation**: Generate QR codes for individual locations or for all locations in a project.
- **Responsive design**: Fully responsive layout with Bootstrap integration.
- **Project preview**: View a preview of the project along with location details (this includes a map view - ***ADVANCED FEATURE 4.2***).
- **Header and Footer**: Sticky footer design that stays at the bottom of the page.
- **API Integration**: Fetch and update data via external API calls.

## Components
- **Header**: Navigation bar with links to the Home and Projects pages.
- **Footer**: Sticky footer with links to About, Contact, and Privacy Policy.
- **ProjectList**: Displays all available projects.
- **ProjectForm**: Allows the user to add or edit project details.
- **LocationsList**: Displays locations associated with a specific project, including options to move, edit, delete, or generate QR codes.
- **LocationForm**: Allows adding or editing location details.
- **QRCodeComponent**: Displays QR codes for all locations or a single location.
- **Preview**: Shows a preview of the current project and its associated locations.

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** package manager
- **React Router Dom**: For client-side routing
- **Bootstrap**: For UI components and responsive layout

Note: the conditions of my local machine are listed in the file **requirements.txt**.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/storypath.git
   cd storypath

2. **Install dependencies**:
   ```bash
    npm install

3. **Start the development server**:
    ```bash
    npm dev run

4. **Open the browser**:
    Open your browser and visit http://localhost:5173/ or the address displayed in the terminal to view the application.

## Usage

### Projects:

- Navigate to the "Projects" section to view all projects.
- Add new projects or edit existing ones.

### Locations:

- Navigate to a specific project to manage its locations.
- Add new locations, edit or delete existing ones, and manage their position order.

### QR Codes:

- Generate QR codes for individual locations or all locations at once.
- Navigate to /qrcode/single/:id for single QR code or /qrcode/all/:id for all QR codes

## API Integration

This project interacts with an external API to manage projects and locations, including creating, reading, updating, and deleting (CRUD) operations. The base URL for the API is `https://0b5ff8b0.uqcloud.net/api`, and the authentication uses a JWT token.

## Authorization
API requests are authorized using a JWT token. The JWT token is included in the request headers as follows:

```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

## Styles & Libraries

- **Bootstrap**: Used for layout and responsive design.
- **QRCode**: QR code generation using the react-qr-code library.
- **React Router Dom**: For navigation and routing between pages.
- **react**: Core library for building the user interface components(React Hooks, Context API, etc).

## License
- This project is private and confidential. Unauthorized distribution or sharing of this project is strictly prohibited before Mach 2025.
- After March 2025, this project will be released under the MIT License.