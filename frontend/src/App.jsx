import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/subscriber/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminArticles from './pages/admin/Articles';
import AdminCampaigns from './pages/admin/Campaigns';
import './App.css';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Inscription Client</Link> |
                <Link to="/admin"> Dashboard Admin</Link> |
                <Link to="/admin/articles"> Stock Articles</Link>
            </nav>

            <Routes>
                {/* Espace Client */}
                <Route path="/" element={<Register />} />

                {/* Espace Admin */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/articles" element={<AdminArticles />} />
                <Route path="/admin/campaigns" element={<AdminCampaigns />} />
            </Routes>
        </Router>
    );
}
export default App;