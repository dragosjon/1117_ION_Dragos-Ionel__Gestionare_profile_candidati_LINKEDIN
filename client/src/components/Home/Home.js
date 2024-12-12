import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Asumând că ai un fișier CSS separat pentru stilizare

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="home-title">Bine ai venit la Aplicația Noastră!</h1>
            <p className="home-description">
                Alătură-te comunității noastre și explorează oportunitățile incredibile.
            </p>
            <div className="home-actions">
                <button className="home-button" onClick={() => navigate('/login')}>
                    Logare
                </button>
                <button className="home-button" onClick={() => navigate('/register')}>
                    Înregistrare
                </button>
            </div>
        </div>
    );
}

export default HomePage;
