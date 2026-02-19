import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './pages/subscriber/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminArticles from './pages/admin/Articles';
import AdminCampaigns from './pages/admin/Campaigns';
import Login from './pages/admin/Login';
import SubscriberBox from './pages/subscriber/SubscriberBox';

// Composant de protection
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('admin_token');
    return token ? children : <Navigate to="/admin/login" />;
};

function App() {
    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
    };

    return (
        <Router>
            <nav>
                <Link to="/">Inscription Client</Link> |
                <Link to="/ma-box">Ma Box</Link> |
                <Link to="/admin"> Dashboard</Link> |
                <Link to="/admin/articles"> Stock</Link> |
                <Link to="/admin/campaigns"> Campagnes</Link>
                {localStorage.getItem('admin_token') && (
                    <button onClick={handleLogout} style={{ marginLeft: '20px' }}>Déconnexion</button>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/ma-box" element={<SubscriberBox />} />

                {/* Routes Admin Protégées */}
                <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/articles" element={<PrivateRoute><AdminArticles /></PrivateRoute>} />
                <Route path="/admin/campaigns" element={<PrivateRoute><AdminCampaigns /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}
export default App;