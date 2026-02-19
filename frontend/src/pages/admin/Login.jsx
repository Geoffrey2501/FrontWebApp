import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api';

export default function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await adminAPI.login(credentials.username, credentials.password);
            // On stocke le token "fake-jwt-token-for-admin"
            localStorage.setItem('admin_token', res.data.token);
            navigate('/admin'); // Redirection vers le dashboard
        } catch (err) {
            alert("Identifiants incorrects (admin / toyboxing2026)");
        }
    };

    return (
        <div style={{ padding: '50px' }}>
            <h2>Connexion Gestionnaire</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    onChange={e => setCredentials({...credentials, username: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={e => setCredentials({...credentials, password: e.target.value})}
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}