import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, BookOpen, Wand2, FlaskConical } from 'lucide-react';

const ProjectsGallery = () => {
    const [castSpell, setCastSpell] = useState(null);

    const projects = [
        {
            id: 1,
            title: "Shatranj (Wizard's Chess)",
            description: "A cross-platform chess ecosystem unifying physical and digital play. Features atomic matchmaking, social graph with private clubs, and IoT board integration.",
            image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1258&auto=format&fit=crop", // Chess board
            tags: ["React", "Firebase", "WebRTC", "IoT/ESP", "Electron"],
            link: "https://playshatranj.com",
            github: "https://github.com/GarvJain2003/CHESS"
        },
        {
            id: 2,
            title: "Recruitment SaaS Platform",
            description: "Multi-tenant SaaS platform serving 500+ users. Features schema-driven dynamic forms, URL-based orchestration, and serverless payment microservices.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop", // Digital/Tech abstract
            tags: ["React", "Cloud Functions", "SaaS Architecture"],
            link: "https://recruitment-saas-b5cb8.web.app",
            github: "https://github.com/GarvJain2003/recruitment-saas"
        },
        {
            id: 3,
            title: "Sortable AI & ML Dashboard",
            description: "Interactive Python dashboard visualizing custom-trained CNN models (MNIST) and classical regression algorithms. Bridges the gap between raw data and visual magic.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1065&auto=format&fit=crop", // AI/Brain
            tags: ["Python", "TensorFlow", "OpenCV", "Tkinter"],
            link: "#",
            github: "https://github.com/GarvJain2003"
        }
    ];

    const handleCastSpell = (id) => {
        setCastSpell(id);
        setTimeout(() => setCastSpell(null), 4000); // 4s Spell duration
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="bg-paper border border-ink/20 p-6 shadow-md relative overflow-hidden group">
                {/* Mystical Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-fb-blue/20 to-purple-900/10 opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative flex items-center gap-4 z-10">
                    <div className="bg-white/80 p-3 rounded-full border-2 border-fb-blue/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Sparkles className="text-fb-blue" size={24} />
                    </div>
                    <div>
                        <h1 className="font-headline text-3xl text-ink/90 flex items-center gap-2">
                            Department of Magical Projects
                        </h1>
                        <p className="font-serif italic text-ink/60 flex items-center gap-2">
                            "Artifacts of code and creativity" <Wand2 size={12} className="text-purple-600" />
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Grid - Added Perspective */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1000px]">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => handleCastSpell(project.id)}
                        className={`group relative bg-white border border-fb-border transition-all duration-700 ease-out rounded-lg overflow-hidden flex flex-col 
                            ${castSpell === project.id
                                ? 'z-50 animate-levitate shadow-[0_35px_60px_-15px_rgba(147,51,234,0.6)] border-purple-500/50'
                                : 'hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.3)] hover:border-purple-400 shadow-sm'
                            }
                        `}
                        style={{
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* Project Image Container */}
                        <div className="h-56 overflow-hidden relative border-b border-fb-border cursor-pointer">
                            <img
                                src={project.image}
                                alt={project.title}
                                className={`w-full h-full object-cover transform transition-transform duration-1000 ${castSpell === project.id ? 'scale-110 brightness-110' : 'group-hover:scale-105 group-hover:sepia-0 sepia-[.2]'}`}
                            />

                            {/* "Spell Cast" Overlay Effect - Magical shimmer */}
                            <div className={`absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-400/10 to-transparent mix-blend-overlay transition-opacity duration-500 ${castSpell === project.id ? 'opacity-100' : 'opacity-0'}`}></div>

                            {/* Hover Reveal Text */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 flex items-end justify-center pb-4 ${castSpell === project.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                                <span className="text-[#fcf5e5] font-headline font-bold uppercase tracking-widest text-xs border border-[#fcf5e5]/50 px-3 py-1 rounded backdrop-blur-sm flex items-center gap-2">
                                    <Sparkles size={12} /> Wingardium Leviosa
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col relative bg-paper/30">
                            {/* Floating Magical Icon */}
                            <div className={`absolute -top-6 right-4 w-12 h-12 bg-white border border-fb-border rounded-full flex items-center justify-center shadow-md transition-transform duration-500 z-10 ${castSpell === project.id ? 'rotate-180 scale-110 text-purple-700 border-purple-300' : 'group-hover:rotate-12'}`}>
                                <FlaskConical className={`${castSpell === project.id ? 'text-purple-700' : 'text-purple-600'}`} size={20} />
                            </div>

                            <h3 className="font-headline text-2xl text-fb-blue font-bold mb-2 group-hover:text-purple-700 transition-colors">
                                {project.title}
                            </h3>
                            <p className="font-serif text-sm text-ink/70 mb-5 flex-1 leading-relaxed border-l-2 border-purple-200 pl-3">
                                {project.description}
                            </p>

                            {/* Tags (Ingredients) */}
                            <div className="mb-5">
                                <h4 className="text-[10px] uppercase font-bold text-ink/40 mb-2 tracking-wider">Potion Ingredients</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold text-purple-900/80 bg-purple-50 border border-purple-100 px-2 py-1 rounded shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-ink/10">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-fb-blue text-white text-xs font-bold py-2.5 rounded shadow hover:bg-fb-blue-dark hover:shadow-lg transition-all active:scale-95"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={14} /> Apparate (Live)
                                </a>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-white text-ink/70 border border-ink/20 text-xs font-bold py-2.5 rounded hover:bg-purple-50 hover:text-purple-800 hover:border-purple-200 transition-all"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github size={14} /> Incantation (Code)
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Placeholder / "Work in Progress" card */}
                <div className="bg-paper border-2 border-dashed border-ink/20 flex flex-col items-center justify-center p-8 text-center min-h-[350px] opacity-70 hover:opacity-100 transition-opacity cursor-pointer hover:bg-paper-dark hover:border-purple-300 group rounded-lg">
                    <div className="w-16 h-16 bg-ink/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                        <BookOpen size={32} className="text-ink/30 group-hover:text-purple-500 transition-colors" />
                    </div>
                    <h3 className="font-headline text-xl text-ink/50 mb-1 group-hover:text-purple-700">Unfinished Manuscripts</h3>
                    <p className="font-serif text-sm text-ink/40 max-w-xs leading-relaxed">
                        "More magical projects are currently being brewed in the cauldron. Check back later!"
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes levitate {
                    0% { transform: rotateX(0deg) translateY(0) scale(1) translateZ(0); }
                    10% { transform: rotateX(5deg) translateY(-20px) scale(1.02) translateZ(50px); }
                    50% { transform: rotateX(7deg) translateY(-30px) scale(1.02) translateZ(60px); }
                    100% { transform: rotateX(5deg) translateY(-20px) scale(1.02) translateZ(50px); }
                }
                .animate-levitate {
                    animation: levitate 4s ease-in-out infinite;
                }
            `}</style>
        </div >
    );
};

export default ProjectsGallery;
