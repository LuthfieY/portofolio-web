import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Briefcase, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.div
      className="navbar-container"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="navbar">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home size={18} />
          <span className="nav-label">Home</span>
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <User size={18} />
          <span className="nav-label">About</span>
        </NavLink>

        <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Briefcase size={18} />
          <span className="nav-label">Projects</span>
        </NavLink>

        <div className="nav-divider" />

        <a href="mailto:luthfieyannuardy@mail.ugm.ac.id" className="btn-hire">
          <Mail size={18} />
          <span>Contact</span>
        </a>
      </nav>
    </motion.div>
  );
};

export default Navbar;
