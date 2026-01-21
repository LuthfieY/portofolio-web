import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, category, description, image, techStack = [], githubLink, demoLink, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="card project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <div style={{
                height: '240px',
                background: '#f0f0f0',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {image ? (
                    <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(45deg, #f3f3f3 0%, #e6e6e6 100%)'
                    }}>
                        <span style={{ color: '#ccc', fontWeight: 600 }}>Project Preview</span>
                    </div>
                )}

                {/* Hover Overlay */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.8)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px',
                                gap: '16px',
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            {/* Tech Stack */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                                {techStack.map((tech, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.75rem',
                                        background: 'rgba(255,255,255,0.2)',
                                        color: '#fff',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontWeight: 500
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                {/* Handle single or multiple GitHub links */}
                                {Array.isArray(githubLink) ? (
                                    githubLink.map((link, idx) => (
                                        <a key={idx} href={link} target="_blank" rel="noopener noreferrer"
                                            style={{ color: '#fff', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                                            className="hover-scale"
                                            title={`View Code ${idx + 1}`}
                                        >
                                            <Github size={20} />
                                        </a>
                                    ))
                                ) : (
                                    githubLink && (
                                        <a href={githubLink} target="_blank" rel="noopener noreferrer"
                                            style={{ color: '#fff', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                                            className="hover-scale"
                                            title="View Code"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )
                                )}

                                {/* Handle single or multiple demo links */}
                                {Array.isArray(demoLink) ? (
                                    demoLink.map((link, idx) => (
                                        <a key={idx} href={link} target="_blank" rel="noopener noreferrer"
                                            style={{ color: '#fff', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                                            className="hover-scale"
                                            title={`Live Demo ${idx + 1}`}
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    ))
                                ) : (
                                    demoLink && (
                                        <a href={demoLink} target="_blank" rel="noopener noreferrer"
                                            style={{ color: '#fff', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                                            className="hover-scale"
                                            title="Live Demo"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    )
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                    <h3 className="text-xl" style={{ fontWeight: 600 }}>{title}</h3>
                </div>
                {category && (
                    <p className="text-secondary text-sm" style={{ marginBottom: '12px', fontWeight: 500 }}>{category}</p>
                )}
                <p className="text-tertiary text-sm" style={{ lineHeight: 1.6 }}>{description}</p>
            </div>

            <style>{`
                .hover-scale:hover {
                    background: rgba(255,255,255,0.25) !important;
                    transform: scale(1.1);
                }
            `}</style>
        </motion.div>
    )
}

export default ProjectCard;
