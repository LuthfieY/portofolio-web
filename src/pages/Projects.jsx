import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { api, API_URL } from '../services/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.getProjects();
                // Map the API data to match the ProjectCard expected props
                const formattedProjects = data.map(p => ({
                    title: p.title,
                    category: p.category,
                    description: p.description,
                    image: p.image_url?.startsWith('/uploads/') ? `${API_URL}${p.image_url}` : p.image_url,
                    techStack: p.tags || [],
                    demoLink: p.project_url || [],  // Pass array directly
                    githubLink: p.github_url || []   // Pass array directly
                }));
                setProjects(formattedProjects);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            {/* Fixed Background Layer */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'var(--bg-primary)', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.03)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            </div>
            <Navbar />
            <div className="container" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '60px' }}
                >
                    <h1 className="text-display" style={{ marginBottom: '24px' }}>Projects</h1>
                    <p className="text-xl text-secondary" style={{ maxWidth: '600px', lineHeight: 1.6 }}>
                        A collection of my work in Cybersecurity, AI, IoT, and Web Development.
                    </p>
                </motion.div>

                <div className="grid-cols-2">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} delay={index * 0.1} />
                    ))}
                </div>

                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <p className="text-secondary">More projects coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default Projects;
