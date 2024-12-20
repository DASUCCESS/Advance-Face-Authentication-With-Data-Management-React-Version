# Advance Biometric Face Authentication System With Data Management (REACT VERSION)

This is a web application that implements facial recognition for user authentication using **Django** as the backend and **React** for the frontend. The app allows users to register and log in using face data and includes a dashboard for managing user-specific data.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Python** (3.8+)
- **Node.js** (with npm)
- **PostgreSQL**

---

## Instructions on How to Run the Application Locally

### Clone the Repository:
```bash
git clone https://github.com/DASUCCESS/Advance-Face-Authentication-With-Data-Management-React-Version.git
```
Once you clone this project, rename the Advance-Face-Authentication-With-Data-Management-React-Version folder name to reactfaceauth to ensure consistency

---

### Set Up the Frontend:

*(Assuming you have done the basic setup to start a React project)*

1. **Navigate to the frontend directory:**
   ```bash
   cd reactfaceauth
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```
   **Note:** Ensure you have these packages installed if you encounter issues:
   ```bash
   npm install axios bootstrap jwt-decode moment react react-bootstrap react-dom react-helmet react-icons react-router-dom react-scripts react-webcam
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

---

### Access the Application

- **Frontend:** Open your browser and go to `http://localhost:3000`
- **Backend:** Visit `http://localhost:8000`
- **To access the full API for user data management:** `http://localhost:8000/api/get_alluser_info/`

---

## Architecture and Technologies

### Overview
- **Backend:** Django REST Framework, PostgreSQL, Simple JWT for authentication, and `face_recognition` library for facial recognition.
- **Frontend:** React, React-Bootstrap for styling, Axios for API calls, React-Router for navigation, and `react-webcam` for capturing images.
- **Authentication:** Uses JWT tokens for secure communication between frontend and backend.

---

## Key Features

- **User Registration and Login:** Users can sign up and log in using face data.
- **Dashboard:** Authenticated users can create, read, update, and delete personal data for management.
- **Secure Authentication:** JWT tokens ensure secure user authentication and authorization.

---

Developed by: Engr Luqman  (Full Stack Developer)
