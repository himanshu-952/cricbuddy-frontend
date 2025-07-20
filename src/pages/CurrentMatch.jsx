import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import '../styles/CurrentMatch.css';

export default function CurrentMatch() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    async function fetchMatch() {
      try {
        const res = await api.get(`/current-match/${id}`);
        setMatch(res.data);
      } catch (err) {
        console.error("Error fetching match details:", err);
      }
    }

    fetchMatch();
  }, [id]);

  if (!match) return <p>Loading...</p>;

  return (
    <div className="match-container">
      <h2 className="match-title">{match.name}</h2>
      <div className="teams-section">
        {match.teamInfo.map((team) => (
          <div className="team" key={team._id}>
            <img src={team.img} alt={team.name} />
            <p>{team.name}</p>
          </div>
        ))}
      </div>

      <p className="status">{match.status}</p>

      <div className="scores">
        {match.score.map((inning, index) => (
          <div className="inning-score" key={inning._id}>
            <h4>{inning.inning}</h4>
            <p><strong>Runs:</strong> {inning.r} | <strong>Wickets:</strong> {inning.w} | <strong>Overs:</strong> {inning.o}</p>
          </div>
        ))}
      </div>

      <div className="info">
        <p><strong>Match Type:</strong> {match.matchType}</p>
        <p><strong>Venue:</strong> {match.venue}</p>
        <p><strong>Toss:</strong> {match.tossWinner} chose to {match.tossChoice}</p>
        <p><strong>Match Winner:</strong> {match.matchWinner}</p>
        <p><strong>Date:</strong> {new Date(match.dateTimeGMT).toLocaleString()}</p>
      </div>
    </div>
  );
}
