import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { User, Lock, ArrowRight, Home, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await api.login(username, password);
            localStorage.setItem('token', data.access_token);
            navigate('/admin');
        } catch {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            {/* Fixed Background Layer - Always covers viewport */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#111111', zIndex: -1 }}>
                {/* Background Glows */}
                <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.03)', filter: 'blur(120px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.03)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-col" style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', position: 'relative', padding: '1rem', fontFamily: 'Inter, sans-serif', paddingBottom: '100px', backgroundColor: 'transparent' }}>

                {/* Top Navigation Pill - Fixed Header */}
                <motion.div
                    style={{ position: 'fixed', top: '24px', left: '50%', transform: "translateX(-50%)", zIndex: 100 }}
                    initial={{ y: -100, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '9999px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' }}>
                        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500, color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }}>
                            <Home size={18} />
                            <span>Home</span>
                        </a>
                        <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '8px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500, color: '#ffffff', textDecoration: 'none' }}>
                            <LogIn size={18} />
                            <span>Login</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content - Centered */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full relative z-10"
                    style={{ maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '140px' }}
                >
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '32px', textAlign: 'center', color: '#ffffff' }}>Admin Portal</h1>

                    <div style={{ width: '100%', backgroundColor: '#1A1A1A', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        {error && (
                            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.875rem', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#999999', marginLeft: '4px' }}>Username</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666666', zIndex: 10 }}>
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={{ width: '100%', height: '48px', paddingLeft: '48px', paddingRight: '16px', backgroundColor: '#111111', border: '1px solid transparent', borderRadius: '12px', color: '#ffffff', outline: 'none', transition: 'all 0.2s', fontSize: '0.875rem' }}
                                        placeholder="Username"
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#999999', marginLeft: '4px' }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666666', zIndex: 10 }}>
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ width: '100%', height: '48px', paddingLeft: '48px', paddingRight: '16px', backgroundColor: '#111111', border: '1px solid transparent', borderRadius: '12px', color: '#ffffff', outline: 'none', transition: 'all 0.2s', fontSize: '0.875rem' }}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{ width: '100%', backgroundColor: '#ffffff', color: '#000000', fontWeight: 700, padding: '14px', borderRadius: '12px', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px', transition: 'transform 0.1s' }}
                            >
                                <span>Login</span>
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Login;
