import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
      setLoading(false);
    };

    fetchRequests();
  }, []);

  return (
    <div className="request-list">
      <h2>Your Blood Requests</h2>
      {loading ? (
        <p>Loading requests...</p>
      ) : (
        requests.map(request => (
          <div key={request.id} className="request-item">
            <p>Patient: {request.patient_name}</p>
            <p>Hospital: {request.hospital}</p>
            <p>Blood Type: {request.blood_type}</p>
            <p>Units: {request.units_required}</p>
            <p>Urgency: {request.urgency}</p>
            <p>Status: {request.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestList;
