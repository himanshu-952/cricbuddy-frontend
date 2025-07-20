import { useEffect, useState } from 'react';
import api from '../api/axios';
import '../styles/upcoming.css';
import ClipLoader from 'react-spinners/ClipLoader';


export default function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
 const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const res = await api.get('/upcoming-matches');
        setMatches(res.data.data || res.data); // depending on backend shape
      } catch (err) {
        console.error('Error fetching upcoming matches:', err);
        setError('Could not load upcoming matches.');
      } finally {
        setLoading(false); 
      }
    }
    fetchUpcoming();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color="#2563eb" />
      </div>
    );
  }

  if (error) return <p className="error-msg">{error}</p>;
  if (!matches.length) return <p>Loading upcoming matches...</p>;

  return (
    <div className="upcoming-container">
      <h2>Upcoming Matches</h2>
      <div className="upcoming-grid">
        {matches.map((match) => (
          <div className="upcoming-card" key={match.id}>
            <h3>{match.t1} vs {match.t2}</h3>
            <p><strong>Type:</strong> {match.matchType}</p>
            <p><strong>Status:</strong> {match.status}</p>
            <p><strong>Venue:</strong> {match.venue}</p>
            <p><strong>Time:</strong> {new Date(match.dateTimeGMT).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
