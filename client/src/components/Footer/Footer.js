import React from 'react';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const displayYear = currentYear > startYear ? `${startYear}-${currentYear}` : startYear;

    return (
        <footer className="footer">
            <p>Copyright &copy; {displayYear} Ion Dragos</p>
        </footer>
    );
}

export default Footer;
