import { Routes, Route } from 'react-router-dom';

// Public Pages
import NewHome from './pages/public/NewHome';
import Projects from './pages/public/Projects';
import ProjectDetail from './pages/public/ProjectDetail';
import SkillsNew from './pages/public/SkillsNew';
import ExperienceNew from './pages/public/ExperienceNew';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Profile from './pages/admin/Profile';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import SkillsManagement from './pages/admin/SkillsManagement';
import ExperienceManagement from './pages/admin/ExperienceManagement';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<NewHome />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/skills" element={<SkillsNew />} />
      <Route path="/experience" element={<ExperienceNew />} />

      {/* Admin Login (public) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/projects" element={<ProjectsManagement />} />
          <Route path="/admin/skills" element={<SkillsManagement />} />
          <Route path="/admin/experience" element={<ExperienceManagement />} />
        </Route>
      </Route>

      {/* 404 - Catch all */}
      <Route path="*" element={<NewHome />} />
    </Routes>
  );
}

export default App;