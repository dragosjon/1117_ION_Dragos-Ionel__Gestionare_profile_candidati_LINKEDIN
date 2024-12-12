import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Adaugă useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password
            });
            login(response.data.token); // Actualizați starea de autentificare
            setMessage('Autentificare reușită!'); // Mesaj de succes
            navigate('/profile'); // Redirecționează utilizatorul către pagina de profil
        } catch (error) {
            console.error('Eroare la autentificare', error);
            setMessage('Eroare la autentificare'); // Mesaj de eroare
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            {message && <div className="alert alert-info">{message}</div>} {/* Afișează mesajul */}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Parolă:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="login-button">Login</button>
        </form>
    );
}

export default LoginForm;