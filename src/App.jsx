// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage1';
import Contact_Institution from './components/Contact_Institution';
import Enroll from './components/CoursePage/Enroll';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/Contact_Institution" element={<Contact_Institution />} />
      <Route path="/Course/:id" element={<CoursePage />} />
      <Route path="/Enroll/:id" element={<Enroll />} />
    </Routes>
  );
};

export default App;
