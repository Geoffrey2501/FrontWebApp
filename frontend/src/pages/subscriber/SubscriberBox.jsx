import { useState } from 'react';
import { subscriberAPI, CATEGORIES } from '../../api';

export default function SubscriberBox() {
    const [email, setEmail] = useState('');
    const [box, setBox] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setBox(null);
        setError('');

        try {
            const res = await subscriberAPI.getBox(email);
            setBox(res.data);
        } catch (err) {
            if (err.response?.status === 404) {
                setError("Aucune box validée n'a été trouvée pour cet email.");
            } else {
                setError("Une erreur est survenue lors de la recherche.");
            }
        }
    };

    return (
        <div className="container">
            <h1>Consulter ma ToyBox</h1>
            <form onSubmit={handleSearch} style={{ marginBottom: '30px' }}>
                <input
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', width: '250px' }}
                />
                <button type="submit" style={{ marginLeft: '10px' }}>Voir ma box</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {box && (
                <div className="box-card" style={{ border: '2px solid #4CAF50', padding: '20px', borderRadius: '8px' }}>
                    <h2>Félicitations {box.subscriber_name} !</h2>
                    <p>Votre box de la campagne <strong>{box.campaign_id}</strong> est prête.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
                        {box.articles.map(article => (
                            <div key={article.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '4px', textAlign: 'left' }}>
                                <strong style={{ fontSize: '1.1em' }}>{article.designation}</strong>
                                <p style={{ margin: '5px 0', color: '#666' }}>
                                    Catégorie : {CATEGORIES[article.category]}<br />
                                    Prix : {article.price} €
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px', fontWeight: 'bold' }}>
                        <p>Poids total : {box.total_weight}g / Valeur totale : {box.total_price}€</p>
                    </div>
                </div>
            )}
        </div>
    );
}