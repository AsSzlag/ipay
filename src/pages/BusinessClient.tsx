import { useNavigate } from 'react-router-dom'

export default function BusinessClient() {
  const navigate = useNavigate()

  return (
    <div className="content-card">
      <div className="card-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Powrót
        </button>
        <h1>Klient firmowy</h1>
        <p>Rozwiązania dla Twojej firmy</p>
      </div>
      
      <div className="placeholder-content">
        <p>Ta strona będzie zawierać formularz dla klientów firmowych.</p>
        <p>Możesz dodać tutaj:</p>
        <ul>
          <li>Formularz dla firm</li>
          <li>Kalkulator finansowy</li>
          <li>Dokumenty firmowe</li>
          <li>Panel zarządzania</li>
        </ul>
      </div>
    </div>
  )
}
