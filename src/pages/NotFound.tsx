import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="content-card">
      <div className="card-header">
        <h1>404 - Strona nie została znaleziona</h1>
        <p>Przepraszamy, strona której szukasz nie istnieje.</p>
      </div>

      <div className="placeholder-content">
        <button className="continue-button" onClick={() => navigate('/')}>
          Powrót do strony głównej
        </button>
      </div>
    </div>
  );
}
