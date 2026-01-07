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
    },
    {
        title: "Smart Home Prototype",
        category: "IoT & Web App",
        image: "/images/homytech.png",
        description: "A Smart Home application that allows users to control and monitor home utilities through a web dashboard, including remote door access, automated clothesline operation, smart lighting control, and real-time activity logging.",
        techStack: ["NextJS", "FastAPI", "MongoDB", "MQTT", "C++"],
        githubLink: "https://github.com/LuthfieY/Homytech",
        demoLink: "https://homytech.my.id/"
    },
    {
        title: "Adult Income Classification",
        category: "Machine Learning",
        image: "/images/ml-model.png",
        description: "Ensemble learning model and CNN-LSTM deep learning model for adult income classification using census data",
        techStack: ["Python", "TensorFlow", "Keras", "Scikit-Learn"],
        demoLink: [
            "https://colab.research.google.com/drive/1u3SnMA6gnfp62G4nWBGEi3Pk8Mtwr8Eu?usp=sharing#scrollTo=GMJ7aSoZoXbQ",
            "https://colab.research.google.com/drive/1HasJbhMRzxx3QfJlVRhpmVCVsA6sn32J?usp=sharing"
        ]
    },
    {
        title: "IoT Room Monitor",
        category: "IoT & Embedded",
        image: "/images/temp_humidity.png",
        description: "Real-time room temperature and humidity monitoring system using ESP8266, integrated with Blynk and Firebase.",
        techStack: ["C++", "ESP8266", "Blynk", "Firebase"],
    },
    {
        title: "Traveloka  Web Scraper",
        category: "Data Engineering",
        image: "/images/web_scraper.png",
        description: "Terminal based Python web scraper using BeautifulSoup and Selenium to extract Traveloka Hotel data into Google Cloud Datastore.",
        techStack: ["Python", "Selenium", "BeautifulSoup", "GCP"],
        githubLink: "https://github.com/LuthfieY/traveloka-webscraper",
    }
];

const Projects = () => {
    return (
        <>
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
