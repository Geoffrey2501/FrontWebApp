import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';

export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        adminAPI.getDashboard().then(res => setStats(res.data));
    }, []);

    if (!stats) return <p>Chargement du dashboard...</p>;

    return (
        <div>
            <h1>Tableau de Bord Gestionnaire</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div className="card">
                    <h3>Articles en stock</h3>
                    <p style={{ fontSize: '24px' }}>{stats.total_articles}</p>
                </div>
                <div className="card">
                    <h3>Abonnés actifs</h3>
                    <p style={{ fontSize: '24px' }}>{stats.total_subscribers}</p>
                </div>
            </div>
            {/* Tu pourras ajouter des graphiques ici plus tard */}
        </div>
    );
}