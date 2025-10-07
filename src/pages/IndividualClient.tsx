import { useNavigate } from 'react-router-dom'

export default function IndividualClient() {
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
        <h1>Klient indywidualny</h1>
        <p>Wybierz produkt dla siebie</p>
      </div>
      
      <div className="placeholder-content">
        <p>Ta strona będzie zawierać formularz dla klientów indywidualnych.</p>
        <p>Możesz dodać tutaj:</p>
        <ul>
          <li>Formularz wniosku</li>
          <li>Kalkulator rat</li>
          <li>Wymagane dokumenty</li>
          <li>Status wniosku</li>
        </ul>
      </div>
    </div>
  )
}
