import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, FlaskConical } from 'lucide-react';

const ShatranjCard = () => {
    const [castSpell, setCastSpell] = useState(false);

    const handleCastSpell = () => {
        setCastSpell(true);
        setTimeout(() => setCastSpell(false), 2000); // 2s Spell duration
    };

    const project = {
        title: "Shatranj (Wizard's Chess)",
        description: "A cloud-native multiplayer chess platform featuring real-time peer-to-peer video chat (WebRTC), offline board connectivity, and AI opponents. Scaled to 3.3K+ weekly reads.",
        image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1258&auto=format&fit=crop", // Placeholder: Recommend replacing with actual screenshot
        tags: ["React", "Firebase", "WebRTC", "Chess.js", "Tailwind"],
        link: "https://playshatranj.com",
        github: "https://github.com/GarvJain2003/smart-chess-vite"
    };

    return (
        <div className="group relative bg-white border border-fb-border hover:border-purple-400 transition-all duration-500 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.3)] rounded-lg overflow-hidden flex flex-col hover:-translate-y-2 max-w-md mx-auto font-sans">
            {/* Project Image Container */}
            <div
                className="h-56 overflow-hidden relative border-b border-fb-border cursor-pointer"
                onClick={handleCastSpell}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transform transition-transform duration-1000 ${castSpell ? 'scale-110 blur-sm brightness-125' : 'group-hover:scale-105 group-hover:sepia-0 sepia-[.2]'}`}
                />

                {/* "Spell Cast" Overlay Effect */}
                <div className={`absolute inset-0 bg-purple-600/30 mix-blend-overlay transition-opacity duration-300 ${castSpell ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* Hover Reveal Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-[#fcf5e5] font-bold uppercase tracking-widest text-xs border border-[#fcf5e5]/50 px-3 py-1 rounded backdrop-blur-sm flex items-center gap-2">
                        <Sparkles size={12} /> Click to Cast Revelio
                    </span>
                </div>

                {/* Flash Effect on Click */}
                {castSpell && (
                    <div className="absolute inset-0 bg-white animate-fadeOut z-20 pointer-events-none" style={{ animation: 'fadeOut 0.5s ease-out forwards' }}></div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col relative bg-[#f0e6d2]/30">
                {/* Floating Magical Icon */}
                <div className="absolute -top-6 right-4 w-12 h-12 bg-white border border-fb-border rounded-full flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-500 z-10">
                    <FlaskConical className="text-purple-600" size={20} />
                </div>

                <h3 className="text-2xl text-[#3b5998] font-bold mb-2 group-hover:text-purple-700 transition-colors bg-clip-text">
                    {project.title}
                </h3>
                <p className="text-sm text-[#1a1a1a]/70 mb-5 flex-1 leading-relaxed border-l-2 border-purple-200 pl-3">
                    {project.description}
                </p>

                {/* Tags (Ingredients) */}
                <div className="mb-5">
                    <h4 className="text-[10px] uppercase font-bold text-[#1a1a1a]/40 mb-2 tracking-wider">Potion Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold text-purple-900/80 bg-purple-50 border border-purple-100 px-2 py-1 rounded shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-[#1a1a1a]/10">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#3b5998] text-white text-xs font-bold py-2.5 rounded shadow hover:bg-[#2d4373] hover:shadow-lg transition-all active:scale-95"
                    >
                        <ExternalLink size={14} /> Apparate (Live)
                    </a>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-[#1a1a1a]/70 border border-[#1a1a1a]/20 text-xs font-bold py-2.5 rounded hover:bg-purple-50 hover:text-purple-800 hover:border-purple-200 transition-all"
                    >
                        <Github size={14} /> Incantation (Code)
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes fadeOut {
                    from { opacity: 0.8; }
                    to { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default ShatranjCard;
