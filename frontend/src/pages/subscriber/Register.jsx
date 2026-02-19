import { useState } from 'react';
import { subscriberAPI, CATEGORIES, AGE_RANGES } from '../../api';

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '', // Ajouté pour corriger l'erreur "last_name requis"
        email: '',
        child_age_range: 'PE',
        category_preferences: Object.keys(CATEGORIES) // Contient les 6 codes : SOC, FIG, CON, EXT, EVL, LIV
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // On envoie les données au format JSON attendu par l'API
            await subscriberAPI.register(formData);
            alert("Inscription réussie !");
        } catch (err) {
            // On récupère la liste des erreurs renvoyées par le backend
            const backendErrors = err.response?.data?.errors;
            if (backendErrors) {
                alert("Erreurs du serveur :\n- " + backendErrors.join("\n- "));
            } else {
                alert("Une erreur inconnue est survenue.");
            }
        }
    };

    return (
        <div className="container">
            <h1>Inscription ToyBoxing</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>

                <input
                    placeholder="Prénom"
                    value={formData.first_name}
                    onChange={e => setFormData({...formData, first_name: e.target.value})}
                    required
                />

                {/* NOUVEAU CHAMP : Nom de famille */}
                <input
                    placeholder="Nom"
                    value={formData.last_name}
                    onChange={e => setFormData({...formData, last_name: e.target.value})}
                    required
                />

                <input
                    placeholder="Email (ex: test@exemple.com)"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                />

                <label>Tranche d'âge de l'enfant :</label>
                <select
                    value={formData.child_age_range}
                    onChange={e => setFormData({...formData, child_age_range: e.target.value})}
                >
                    {Object.entries(AGE_RANGES).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>

                <h3>Vos préférences :</h3>
                <p><small>(Ordre par défaut : {formData.category_preferences.join(', ')})</small></p>
                <ul style={{ textAlign: 'left' }}>
                    {formData.category_preferences.map(cat => (
                        <li key={cat}>{CATEGORIES[cat]}</li>
                    ))}
                </ul>

                <button type="submit">Créer mon compte</button>
            </form>
        </div>
    );
}