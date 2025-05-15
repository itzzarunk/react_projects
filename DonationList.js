import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/donations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
      setLoading(false);
    };

    fetchDonations();
  }, []);

  return (
    <div className="donation-list">
      <h2>Your Donations</h2>
      {loading ? (
        <p>Loading donation history...</p>
      ) : (
        donations.map(donation => (
          <div key={donation.id} className="donation-item">
            <p>Date: {new Date(donation.donation_date).toLocaleDateString()}</p>
            <p>Quantity: {donation.quantity} units</p>
            <p>Status: {donation.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DonationList;
