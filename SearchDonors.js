import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const SearchDonors = () => {
  const [filters, setFilters] = useState({
    bloodType: '',
    location: ''
  });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/donors', {
          params: filters
        });
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
      setLoading(false);
    };

    fetchDonors();
  }, [filters]);

  return (
    <div className="search-donors">
      <div className="filters">
        <select
          value={filters.bloodType}
          onChange={e => setFilters({...filters, bloodType: e.target.value})}
        >
          <option value="">All Blood Types</option>
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
          placeholder="Location"
          value={filters.location}
          onChange={e => setFilters({...filters, location: e.target.value})}
        />
      </div>

      {loading ? (
        <p>Loading donors...</p>
      ) : (
        <div className="donor-list">
          {donors.map(donor => (
            <div key={donor.id} className="donor-card">
              <h3>{donor.full_name}</h3>
              <p>Blood Type: {donor.blood_type}</p>
              <p>Location: {donor.location}</p>
              <p>Last Donation: {new Date(donor.last_donation_date).toLocaleDateString()}</p>
              <button>Contact Donor</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
