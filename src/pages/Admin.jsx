import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, API_URL } from '../services/api';
import { Plus, Edit2, Trash2, X, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        image_url: '',
        project_url: '',
        github_url: '',
        tags: '',
        image_file: null // New state for file upload
    });
    const navigate = useNavigate();

    const fetchProjects = useCallback(async () => {
        try {
            const data = await api.getProjects();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        fetchProjects();
    }, [fetchProjects]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('project_url', formData.project_url);
            data.append('github_url', formData.github_url);
            data.append('tags', formData.tags);

            if (formData.image_file) {
                data.append('image', formData.image_file);
            }

            if (currentProject) {
                if (!formData.image_file && !formData.image_url) {
                    alert('Please keep existing image or upload a new one');
                    return;
                }
                await api.updateProject(currentProject.id, data);
            } else {
                if (!formData.image_file) {
                    alert('Please select an image file');
                    return;
                }
                await api.createProject(data);
            }
            setIsModalOpen(false);
            fetchProjects();
            resetForm();
        } catch (error) {
            console.error('Failed to save project:', error);
            alert('Failed to save project');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.deleteProject(id);
                fetchProjects();
            } catch (error) {
                console.error('Failed to delete project:', error);
            }
        }
    };

    const openEditModal = (project) => {
        setCurrentProject(project);
        setFormData({
            title: project.title,
            category: project.category || '',
            description: project.description,
            image_url: project.image_url,
            project_url: Array.isArray(project.project_url) ? project.project_url.join(', ') : (project.project_url || ''),
            github_url: Array.isArray(project.github_url) ? project.github_url.join(', ') : (project.github_url || ''),
            tags: project.tags ? (Array.isArray(project.tags) ? project.tags.join(', ') : project.tags) : '',
            image_file: null
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setCurrentProject(null);
        setFormData({
            title: '',
            category: '',
            description: '',
            image_url: '',
            project_url: '',
            github_url: '',
            tags: '',
            image_file: null
        });
    };

    return (
        <>
            {/* Fixed Background Layer */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'var(--bg-primary)', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(200, 200, 200, 0.03)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            </div>

            {/* Admin Header */}
            <motion.div
                style={{ position: 'fixed', top: '24px', left: '50%', transform: "translateX(-50%)", zIndex: 100 }}
                initial={{ y: -100, opacity: 0, x: "-50%" }}
                animate={{ y: 0, opacity: 1, x: "-50%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '9999px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500, color: '#ffffff' }}>
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </div>
                    <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
                    <button
                        onClick={handleLogout}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: '100px', transition: 'background 0.2s' }}
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </motion.div>

            <div className="container" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex-between" style={{ marginBottom: '40px' }}>
                        <h1 className="text-display">Manage Projects</h1>
                        <button
                            onClick={() => { resetForm(); setIsModalOpen(true); }}
                            className="btn-hire"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'var(--text-primary)',
                                color: 'var(--bg-card)',
                                padding: '12px 24px',
                                borderRadius: '100px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <Plus size={20} />
                            Add Project
                        </button>
                    </div>

                    <div className="grid-cols-2">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={project.image_url?.startsWith('/uploads/') ? `${API_URL}${project.image_url}` : project.image_url}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => openEditModal(project)}
                                            style={{ padding: '8px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', color: '#111', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.9)', borderRadius: '50%', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div style={{ padding: '24px', flex: 1 }}>
                                    <h3 className="text-xl" style={{ fontWeight: 600, marginBottom: '8px' }}>{project.title}</h3>
                                    <p className="text-secondary text-sm" style={{ marginBottom: '16px', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                        {project.description}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {project.tags && (Array.isArray(project.tags) ? project.tags : [project.tags]).map((tag, i) => (
                                            <span key={i} style={{ fontSize: '0.75rem', background: 'var(--bg-primary)', padding: '4px 12px', borderRadius: '100px', color: 'var(--text-secondary)' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 1000, padding: '20px'
                        }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{
                                background: 'var(--bg-card)',
                                width: '90%', maxWidth: '600px', // Wider modal
                                borderRadius: '24px',
                                padding: '32px', // Comfortable padding
                                position: 'relative',
                                boxShadow: 'var(--shadow-lg)',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-xl" style={{ fontWeight: 600, marginBottom: '20px' }}>
                                {currentProject ? 'Edit Project' : 'New Project'}
                            </h2>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px', color: 'var(--text-secondary)' }}>Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px', color: 'var(--text-secondary)' }}>Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., Autonomous AI Agent"
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px', color: 'var(--text-secondary)' }}>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', minHeight: '80px', resize: 'vertical' }}
                                        required
                                    />
                                </div>

                                {/* Image Upload logic for ALL projects (Create & Edit) */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px', color: 'var(--text-secondary)' }}>Project Image</label>

                                    {/* Show preview if editing and existing image available */}
                                    {formData.image_url && !formData.image_file && (
                                        <div style={{ marginBottom: '10px', height: '100px', borderRadius: '8px', overflow: 'hidden' }}>
                                            <img
                                                src={formData.image_url?.startsWith('/uploads/') ? `${API_URL}${formData.image_url}` : formData.image_url}
                                                alt="Preview"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFormData({ ...formData, image_file: e.target.files[0] })}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                                        required={!currentProject && !formData.image_file}
                                    />
                                    {currentProject && <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Leave empty to keep existing image</p>}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px', color: 'var(--text-secondary)' }}>Project URLs (optional, comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.project_url}
                                            onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                                            placeholder="https://demo1.com, https://demo2.com"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px', color: 'var(--text-secondary)' }}>Github URLs (optional, comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.github_url}
                                            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                            placeholder="https://github.com/user/repo1, https://github.com/user/repo2"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px', color: 'var(--text-secondary)' }}>Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="React, NodeJS, Design"
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '100px',
                                        background: 'var(--text-primary)',
                                        color: 'var(--bg-card)',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginTop: '12px'
                                    }}
                                >
                                    {currentProject ? 'Update Project' : 'Create Project'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Admin;
