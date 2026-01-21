import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

const About = () => {
    return (
        <>
            {/* Fixed Background Layer */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'var(--bg-primary)', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.03)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            </div>
            <Navbar />
            <div className="container" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
                <div className="grid-cols-2" style={{ alignItems: 'start', gridTemplateColumns: '1.2fr 1.8fr', gap: '60px' }}>

                    {/* Profile Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div style={{
                            aspectRatio: '3/4',
                            maxWidth: '320px',
                            background: '#f0f0f0',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            position: 'sticky',
                            top: '120px'
                        }}>
                            <img
                                src="/images/foto_aboutme.png"
                                alt="Luthfie Yannuardy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </motion.div>

                    {/* Bio Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-display" style={{ marginBottom: '16px' }}>Luthfie Yannuardy</h1>
                        <p className="text-lg text-secondary" style={{ marginBottom: '32px', fontWeight: 500 }}>
                            Internet Engineering Undergraduate Student<br />
                            Web Development, Cyber Security, IoT, and AI Enthusiast
                        </p>

                        <div className="text-lg text-secondary space-y-6" style={{ lineHeight: 1.8 }}>
                            <p style={{ marginBottom: '24px' }}>
                                Internet Engineering undergraduate student with strong interests in Web Development, Cyber Security, IoT, and AI. I have experience in building scalable backend services using FastAPI, deploying secure web applications with Docker, Nginx, CI/CD pipelines (Jenkins), and Cloudflare.
                            </p>

                            {/* EXPERIENCE */}
                            <h3 className="text-2xl" style={{ color: 'var(--text-primary)', marginTop: '56px', marginBottom: '24px' }}>Experience</h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <li style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '24px' }}>
                                    <div className="flex-between" style={{ marginBottom: '8px' }}>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.2rem' }}>PT. Teknologi Server Indonesia (X-Code)</div>
                                        <div className="text-sm font-medium">Jun 2025 – Aug 2025</div>
                                    </div>
                                    <div className="text-sm" style={{ marginBottom: '12px', fontStyle: 'italic' }}>Internship - Yogyakarta, Indonesia</div>
                                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '0.95rem' }} className="space-y-2">
                                        <li>Designed and implemented a SOAR-based automated incident response pipeline using Wazuh, Shuffle, TheHive, and Cortex to streamline SOC workflows and alert management.</li>
                                        <li>Conducted penetration testing on internal web applications and participated in CTF challenges to identify system vulnerabilities and sharpen exploitation skills.</li>
                                        <li>Monitored internal infrastructure health, investigated resource anomalies, and executed direct remediation on affected virtual environments to isolate threats.</li>
                                    </ul>
                                </li>
                            </ul>

                            {/* EDUCATION TIMELINE */}
                            <h3 className="text-2xl" style={{ color: 'var(--text-primary)', marginTop: '40px', marginBottom: '32px' }}>Education</h3>

                            <div style={{ position: 'relative', marginLeft: '8px' }}>
                                {/* Timeline Item 1 */}
                                <div style={{ paddingBottom: '40px', paddingLeft: '32px', position: 'relative' }}>
                                    {/* Connecting Line (Only between dots) */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '0',
                                        width: '2px',
                                        height: '100%',
                                        background: '#e0e0e0'
                                    }}></div>

                                    {/* Timeline Dot */}
                                    <div style={{
                                        position: 'absolute',
                                        left: '-7px',
                                        top: '4px',
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: 'var(--text-primary)',
                                        border: '3px solid var(--bg-card)',
                                        boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                                        zIndex: 1
                                    }}></div>

                                    <div className="flex-between" style={{ marginBottom: '4px', alignItems: 'flex-start' }}>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.2rem' }}>Universitas Gadjah Mada</div>
                                        <div className="text-sm font-medium" style={{ whiteSpace: 'nowrap', marginLeft: '16px' }}>Aug 2023 – Present</div>
                                    </div>
                                    <div className="text-sm text-secondary" style={{ marginBottom: '8px' }}>Applied Bachelor of Internet Engineering</div>
                                    <div className="text-sm text-secondary">GPA: 3.85/4.00</div>
                                </div>

                                {/* Timeline Item 2 */}
                                <div style={{ position: 'relative', paddingLeft: '32px' }}>
                                    {/* Timeline Dot */}
                                    <div style={{
                                        position: 'absolute',
                                        left: '-7px',
                                        top: '4px',
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: 'var(--text-primary)', // Same color
                                        border: '3px solid var(--bg-card)',
                                        boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                                        zIndex: 1
                                    }}></div>

                                    <div className="flex-between" style={{ marginBottom: '4px', alignItems: 'flex-start' }}>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.2rem' }}>Politeknik Negeri Bandung</div>
                                        <div className="text-sm font-medium" style={{ whiteSpace: 'nowrap', marginLeft: '16px' }}>Aug 2021 – Dec 2022</div>
                                    </div>
                                    <div className="text-sm text-secondary">Associate of Informatics Engineering</div>
                                </div>
                            </div>

                            {/* SKILLS */}
                            <h3 className="text-2xl" style={{ color: 'var(--text-primary)', marginTop: '40px', marginBottom: '24px' }}>Skills</h3>
                            <div className="grid-cols-1" style={{ gap: '12px', fontSize: '0.95rem' }}>
                                <p><strong>Web Development:</strong> Python, FastAPI, REST API, WebSockets, JWT Authentication</p>
                                <p><strong>Languages:</strong> Python, C, SQL</p>
                                <p><strong>DevOps & Tools:</strong> Git, GitHub, Docker, Nginx, Jenkins, Cloudflare</p>
                                <p><strong>Databases:</strong> MySQL, MongoDB, Firebase</p>
                                <p><strong>IoT & Networking:</strong> Arduino IDE, ESP, MQTT, Mikrotik</p>
                                <p><strong>Cybersecurity:</strong> Nmap, Wireshark, Wazuh, Burp Suite, GoBuster, SQLMap</p>
                                <p><strong>Soft Skills:</strong> Logical Thinking, Adaptability, Collaboration, Critical Thinking</p>
                                <p><strong>Languages:</strong> Indonesian (Native), English (Professional)</p>
                            </div>

                            <h3 className="text-2xl" style={{ color: 'var(--text-primary)', marginTop: '56px', marginBottom: '24px' }}>Connect</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <a href="mailto:luthfieyannuardy@mail.ugm.ac.id" className="text-secondary hover:text-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Mail size={20} />
                                    <span>luthfieyannuardy@mail.ugm.ac.id</span>
                                </a>
                                <a href="https://linkedin.com/in/luthfie-yannuardy-10b568288" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Linkedin size={20} />
                                    <span>Linkedin</span>
                                </a>
                                <a href="https://github.com/LuthfieY" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Github size={20} />
                                    <span>GitHub</span>
                                </a>
                                <span className="text-secondary" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Phone size={20} />
                                    <span>+62 822 1869 1852</span>
                                </span>
                            </div>

                        </div>
                    </motion.div>

                </div>

                {/* Responsive fix for About page grid */}
                <style>{`
          @media (max-width: 768px) {
            .grid-cols-2 {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .grid-cols-2 > div:first-child {
               order: -1;
            }
            .grid-cols-2 > div:first-child > div {
               position: static !important;
               aspectRatio: 16/9 !important;
            }
          }
        `}</style>
            </div>
        </>
    );
};

export default About;
