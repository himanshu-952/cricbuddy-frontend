import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import '../styles/fantasy.css';

export default function FantasySquad() {
  const { id } = useParams(); // match ID from URL
  const [match, setMatch] = useState(null);
  const [selected, setSelected] = useState([]);
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMatch() {
      try {
        const res = await api.get(`/current-match/${id}`);
        setMatch(res.data);

        // In real app: replace below with actual player data from backend
        setPlayers([...res.data.t1Players, ...res.data.t2Players]);
      } catch (err) {
        console.error('Failed to fetch match:', err);
      }
    }
    fetchMatch();
  }, [id]);

  function togglePlayer(player) {
    setSelected((prev) =>
      prev.includes(player)
        ? prev.filter((p) => p !== player)
        : prev.length < 11
        ? [...prev, player]
        : prev
    );
  }

  function submitSquad() {
    if (selected.length !== 11) {
      setMessage('Please select exactly 11 players.');
      return;
    }

    // TODO: Send selected squad to backend
    console.log('Submitted team:', selected);
    setMessage('Fantasy team submitted successfully!');
  }

  if (!match) return <p>Loading match...</p>;

  return (
    <div className="fantasy-container">
      <h2>{match.t1} vs {match.t2} - Fantasy Squad</h2>
      <p><strong>Date:</strong> {new Date(match.dateTimeGMT).toLocaleString()}</p>

      <h3>Select your 11 players</h3>
      <div className="players-grid">
        {players.map((player) => (
          <div
            key={player}
            className={`player-card ${selected.includes(player) ? 'selected' : ''}`}
            onClick={() => togglePlayer(player)}
          >
            {player}
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={submitSquad}>Submit Team</button>
      {message && <p className="msg">{message}</p>}
    </div>
  );
}
