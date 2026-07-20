# KBinge Frontend

Welcome to the frontend repository for **KBinge**! This is a modern, responsive web application designed to help you discover, track, and binge your favorite shows and dramas.

### 🌐 Live Demo
The frontend is deployed at Render: **[https://kbinge-frontend.onrender.com/](https://kbinge-frontend.onrender.com/)**

## 🚀 Tech Stack

Here are the core technologies powering this project:

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Render](https://img.shields.io/badge/Render-%2346E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## 📦 Features

- **Modern & Beautiful UI:** Built with Tailwind CSS and Framer Motion for a sleek, interactive, and premium experience.
- **Lightning Fast:** Powered by Vite for instant server start and lightning-fast Hot Module Replacement (HMR).
- **Seamless Navigation:** Smooth and declarative routing using React Router v7.
- **Robust API Integration:** Effortless and reliable data fetching from the backend using Axios.
- **Responsive Design:** Fully optimized for all screen sizes, from mobile devices to large desktop monitors.
- **Interactive Components:** Features touch-enabled carousels and sliders using Swiper.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd KBinge-FrontEnd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add any required frontend environment variables (e.g., API base URL).

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📂 Project Structure

- `src/components/`: Reusable UI components (e.g., Navbar, Cards, Buttons)
- `src/pages/`: Main application pages (e.g., Home, Profile, Filter)
- `src/services/`: API service layers and external integrations (e.g., `api.js`)
- `src/routes/`: Application routing and navigation logic
- `public/`: Static assets such as images and icons

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the application for production.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs Oxlint to quickly analyze and lint the code.
