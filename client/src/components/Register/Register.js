import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        name: '',  // Schimbat de la 'username' la 'name'
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setMessage('Înregistrare reușită! Redirecționare...');
                navigate('/profile');
            } else {
                const errorMessage = await response.text();
                setMessage(`Eroare la înregistrare. Vă rugăm să încercați din nou. ${errorMessage}`);
            }
        } catch (error) {
            console.error('Eroare la înregistrare:', error);
            setMessage(`Eroare la înregistrare. Vă rugăm să verificați conexiunea: ${error}`);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="mb-3">Înregistrare</h2>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nume</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"  // Schimbat de la 'username' la 'name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Introdu numele tău"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Introdu email-ul tău"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Parolă</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Introdu o parolă"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Înregistrează-te</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
