import React, { useState } from 'react';
import axios from 'axios';
const DonorForm = () => {
    const [formData, setFormData] = useState({
        bloodType: '',
        location: '',
        availability: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/donors', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Donor registration successful!');
        } catch (error) {
            alert('Error registering as donor');
        }
    };

    if (!localStorage.getItem('token')) {
        window.location = '/login';
        return null;
    }

    return (
        <form className="donor-form" onSubmit={handleSubmit}>
            <h2>Become a Donor</h2>
            <select
                value={formData.bloodType}
                onChange={e => setFormData({ ...formData, bloodType: e.target.value })}
                required
            >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>

            <input
                type="text"
                placeholder="Your Location"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                required
            />

            <label>
                <input
                    type="checkbox"
                    checked={formData.availability}
                    onChange={e => setFormData({ ...formData, availability: e.target.checked })}
                />
                Available to Donate
            </label>

            <button type="submit">Register as Donor</button>
        </form>
    );
};

export default DonorForm;
