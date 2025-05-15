import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = () => {
  const [requestData, setRequestData] = useState({
    patientName: '',
    hospital: '',
    bloodType: '',
    units: 1,
    urgency: 'medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/requests', requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Request submitted successfully!');
    } catch (error) {
      alert('Error submitting request');
    }
  };

  if (!localStorage.getItem('token')) {
    window.location = '/login';
    return null;
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <h2>Create Blood Request</h2>
      <input
        type="text"
        placeholder="Patient Name"
        value={requestData.patientName}
        onChange={e => setRequestData({...requestData, patientName: e.target.value})}
        required
      />

      <input
        type="text"
        placeholder="Hospital Name"
        value={requestData.hospital}
        onChange={e => setRequestData({...requestData, hospital: e.target.value})}
        required
      />

      <select
        value={requestData.bloodType}
        onChange={e => setRequestData({...requestData, bloodType: e.target.value})}
        required
      >
        <option value="">Select Blood Type Needed</option>
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
        type="number"
        min="1"
        value={requestData.units}
        onChange={e => setRequestData({...requestData, units: e.target.value})}
        required
      />

      <select
        value={requestData.urgency}
        onChange={e => setRequestData({...requestData, urgency: e.target.value})}
      >
        <option value="low">Low Urgency</option>
        <option value="medium">Medium Urgency</option>
        <option value="high">High Urgency</option>
      </select>

      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestForm;
