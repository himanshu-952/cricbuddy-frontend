import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import '../styles/AllMatches.css';
import ClipLoader from 'react-spinners/ClipLoader';


export default function AllMatches() {
  const [matches, setMatches] = useState([]);
 const [loading, setLoading] = useState(true); 


  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await api.get('/all-matches');
        console.log("✅ Response from backend:", res.data);
        setMatches(res.data);
      } catch (err) {
        console.error('Error fetching all matches:', err);
      } finally {
        setLoading(false); 
      }
    } 
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="matches-container">
      <h2>All Matches</h2>
      {matches.length === 0 ? (
        <p>Loading or no matches found.</p>
      ) : (
        matches.map((match) => (
          <Link
            to={`/match/${match.id}`}
            key={match.id}
            className="match-card-link"
          >
            <div className="match-card">
              <div className="match-header">
                <img src={match.teamInfo[0]?.img} alt={match.teams[0]} />
                <span>{match.teams[0]}</span>
                <span>vs</span>
                <span>{match.teams[1]}</span>
                <img src={match.teamInfo[1]?.img} alt={match.teams[1]} />
              </div>
              <p className="match-status">{match.status}</p>
              <p><strong>Type:</strong> {match.matchType.toUpperCase()}</p>
              <p><strong>Venue:</strong> {match.venue}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
