import { useState } from 'react';
import { adminAPI } from '../../api';

export default function Campaigns() {
    const [weight, setWeight] = useState(1200);
    const [currentCampaignId, setCurrentCampaignId] = useState(null);
    const [boxes, setBoxes] = useState([]);

    // 1. Créer la campagne
    const handleCreate = async () => {
        const res = await adminAPI.createCampaign(weight);
        setCurrentCampaignId(res.data.id);
        alert("Campagne créée ! ID: " + res.data.id);
    };

    // 2. Optimiser
    const handleOptimize = async () => {
        await adminAPI.optimizeCampaign(currentCampaignId);
        const res = await adminAPI.getBoxes(currentCampaignId);
        setBoxes(res.data);
    };

    // 3. Valider une box
    const handleValidate = async (subId) => {
        await adminAPI.validateBox(currentCampaignId, subId);
        setBoxes(boxes.filter(b => b.subscriber_id !== subId)); // On l'enlève de la liste visuelle
        alert("Box validée et stock mis à jour !");
    };

    return (
        <div>
            <h1>Gestion des Campagnes (Box)</h1>

            <section>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                <button onClick={handleCreate}>1. Lancer la campagne</button>
                {currentCampaignId && <button onClick={handleOptimize}>2. Optimiser les box</button>}
            </section>

            <hr />

            <section>
                <h2>Box générées</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {boxes.map(box => (
                        <div key={box.subscriber_id} className="box-card" style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h4>Abonné: {box.subscriber_name}</h4>
                            <ul>
                                {box.articles.map(art => <li key={art.id}>{art.designation}</li>)}
                            </ul>
                            <button onClick={() => handleValidate(box.subscriber_id)}>Valider l'envoi</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}