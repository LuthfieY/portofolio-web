import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            {/* Fixed Background Layer */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'var(--bg-primary)', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.05)', filter: 'blur(120px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.03)', filter: 'blur(120px)', pointerEvents: 'none' }} />
            </div>

            <Navbar />

            <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '100px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 style={{ fontSize: '8rem', fontWeight: 800, lineHeight: 1, marginBottom: '24px', background: 'linear-gradient(to bottom, #ffffff, #666666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Page Not Found</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto 40px auto' }}>
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <Link
                        to="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            backgroundColor: 'var(--text-primary)',
                            color: 'var(--bg-card)',
                            padding: '12px 32px',
                            borderRadius: '100px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            textDecoration: 'none',
                            transition: 'transform 0.2s'
                        }}
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default NotFound;
