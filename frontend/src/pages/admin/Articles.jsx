import { useEffect, useState } from 'react';
import { adminAPI, CATEGORIES, AGE_RANGES, CONDITIONS } from '../../api';

export default function AdminArticles() {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({ designation: '', category: 'SOC', age_range: 'PE', condition: 'N', price: 0, weight: 0 });

    const loadArticles = async () => {
        const res = await adminAPI.getArticles();
        setArticles(res.data.items); // L'API renvoie { items, total... }
    };

    useEffect(() => { loadArticles(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        await adminAPI.addArticle(newArticle);
        loadArticles();
    };

    return (
        <div>
            <h2>Gestion du Stock</h2>
            <form onSubmit={handleAdd}>
                <input placeholder="Désignation" onChange={e => setNewArticle({...newArticle, designation: e.target.value})} required />
                <select onChange={e => setNewArticle({...newArticle, category: e.target.value})}>
                    {Object.entries(CATEGORIES).map(([k,v]) => <option value={k}>{v}</option>)}
                </select>
                <input type="number" placeholder="Poids (g)" onChange={e => setNewArticle({...newArticle, weight: parseInt(e.target.value)})} required />
                <button type="submit">Ajouter l'article</button>
            </form>

            <table>
                <thead><tr><th>ID</th><th>Désignation</th><th>Catégorie</th><th>Âge</th></tr></thead>
                <tbody>
                {articles.map(art => (
                    <tr key={art.id}>
                        <td>{art.id}</td><td>{art.designation}</td><td>{CATEGORIES[art.category]}</td><td>{AGE_RANGES[art.age_range]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}