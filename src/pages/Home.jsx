import React from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Lumina Research",
        category: "Autonomous AI Agent",
        image: "/images/lumina2.png",
        description: "An AI-powered application for automating research tasks, helping users transform complex topics into structured, citation-based reports.",
        techStack: ["Python", "LangGraph", "Gemini", "Streamlit", "SQLite"],
        githubLink: "https://github.com/LuthfieY/ai-research-agent",
        demoLink: "https://lumina-research.streamlit.app/"
    },
    {
        title: "AI Vulnerability Scanner",
        category: "Cybersecurity & AI",
        image: "/images/ai_scanner.png",
        description: "An AI-powered web application used to scan systems for security vulnerabilities and produce penetration testing reports.",
        techStack: ["FastAPI", "Nmap", "LLM", "Laravel"],
        githubLink: "https://github.com/LuthfieY/Auto-Pentest-Report-Generator",
        demoLink: "https://autopentest.my.id/"
    }
];

const Home = () => {
    return (
        <>
            {/* Fixed Background Layer */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'var(--bg-primary)', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.03)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            </div>
            <Navbar />
            <div className="container" style={{ paddingTop: '140px', paddingBottom: '100px' }}>

                {/* Hero Section */}
                <section style={{ marginBottom: '100px', maxWidth: '800px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.5rem' }}>
                            Hi, I'm Luthfie Yannuardy
                        </h2>

                        <h1 className="text-display" style={{ marginBottom: '32px', color: 'var(--text-primary)', fontSize: '3rem', lineHeight: '1.1', fontWeight: 600 }}>
                            Building secure and intelligent <br /> <span style={{ color: 'var(--text-tertiary)' }}>systems for the future.</span>
                        </h1>

                        <p className="text-xl text-secondary" style={{ maxWidth: '600px', lineHeight: 1.6 }}>
                            Internet Engineering student passionate about Cybersecurity, Automation, and Artificial Intelligence.
                        </p>

                        <div style={{ marginTop: '32px' }}>
                            <a
                                href="/CV_Luthfie_Yannuardy.pdf"
                                download
                                className="btn-hire"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'var(--text-primary)',
                                    color: 'var(--bg-card)',
                                    padding: '12px 28px',
                                    borderRadius: '100px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textDecoration: 'none'
                                }}
                            >
                                Download CV
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* Projects Section */}
                <section>
                    <motion.div
                        className="flex-between"
                        style={{ marginBottom: '40px' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl">Featured Projects</h2>
                        <a href="/projects" className="text-sm text-secondary hover:text-primary transition-colors">View all projects &rarr;</a>
                    </motion.div>

                    <div className="grid-cols-2">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} {...project} delay={index * 0.1} />
                        ))}
                    </div>
                </section>



            </div>
        </>
    );
};

export default Home;
