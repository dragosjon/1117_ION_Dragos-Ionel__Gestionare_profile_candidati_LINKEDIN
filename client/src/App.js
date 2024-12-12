import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';
import Home from "./components/Home/Home.js";
import CandidateProfile from './components/CandidateProfile/CandidateProfile.js';
import JobList from './components/JobList/JobList.js';
import JobApplicationForm from './components/JobApplicationForm/JobApplicationForm.js';
import LoginForm from "./components/LoginForm/LoginForm.js";
import Footer from './components/Footer/Footer.js';
import NotFoundPage from './components/404/404.js';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";
import Register from "./components/Register/Register.js";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<CandidateProfile />} />
                        <Route path="/jobs" element={<JobList />} />
                        <Route path="/apply" element={<JobApplicationForm />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;