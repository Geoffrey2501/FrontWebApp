import { useState } from 'react';
import { subscriberAPI, CATEGORIES, AGE_RANGES } from '../../api';

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', email: '',
        child_age_range: 'PE',
        category_preferences: Object.keys(CATEGORIES) // Ordre par défaut
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await subscriberAPI.register(formData);
            alert("Inscription réussie !");
        } catch (err) {
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div>
            <h1>Rejoindre ToyBoxing</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Prénom" onChange={e => setFormData({...formData, first_name: e.target.value})} required />
                <input placeholder="Email" type="email" onChange={e => setFormData({...formData, email: e.target.value})} required />

                <label>Âge de l'enfant :</label>
                <select onChange={e => setFormData({...formData, child_age_range: e.target.value})}>
                    {Object.entries(AGE_RANGES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>

                <h3>Classez vos préférences (drag & drop à implémenter plus tard) :</h3>
                {/* Liste simple pour le moment */}
                <ul>{formData.category_preferences.map(cat => <li key={cat}>{CATEGORIES[cat]}</li>)}</ul>

                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}