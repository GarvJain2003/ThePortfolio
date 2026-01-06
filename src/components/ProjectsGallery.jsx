import React from 'react';
import { ExternalLink, Github, Code, Sparkles, BookOpen } from 'lucide-react';

const ProjectsGallery = () => {
    const projects = [
        {
            id: 1,
            title: "Shatranj (Wizard's Chess)",
            description: "A fully interactive chess experience inspired by the classic wizarding game. Features include move validation, checkmate detection, and a touch of magical animations.",
            image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000&auto=format&fit=crop",
            tags: ["React", "Chess.js", "DnD Kit"],
            link: "#", // Placeholder
            github: "#" // Placeholder
        },
        {
            id: 2,
            title: "Recruitment SaaS",
            description: "An automated recruitment platform designed to streamline the hiring process. Think of it as a magical quill that filters candidates and schedules owls automatically.",
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop",
            tags: ["Next.js", "Supabase", "Tailwind"],
            link: "#",
            github: "#"
        },
        {
            id: 3,
            title: "Sorting Hat AI",
            description: "An AI-powered personality analyzer that sorts users into their rightful houses based on their digital footprint and writing style.",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
            tags: ["OpenAI API", "Node.js", "Express"],
            link: "#",
            github: "#"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="bg-paper border border-ink/20 p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fb-blue/60 to-transparent"></div>
                <div className="flex items-center gap-4">
                    <div className="bg-fb-blue/10 p-3 rounded-full border border-fb-blue/20">
                        <Sparkles className="text-fb-blue" size={24} />
                    </div>
                    <div>
                        <h1 className="font-headline text-3xl text-ink/90">Department of Magical Projects</h1>
                        <p className="font-serif italic text-ink/60">"Artifacts of code and creativity"</p>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="group bg-white border border-fb-border hover:border-fb-blue/50 transition-all duration-300 shadow-sm hover:shadow-md rounded-sm overflow-hidden flex flex-col">
                        {/* Project Image */}
                        <div className="h-48 overflow-hidden relative border-b border-fb-border">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 sepia-[.2] group-hover:sepia-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                                <span className="text-white text-xs font-bold px-2 py-1 bg-black/40 backdrop-blur-sm rounded border border-white/20">
                                    View Artifact
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-headline text-xl text-fb-blue font-bold mb-2 group-hover:underline cursor-pointer">
                                {project.title}
                            </h3>
                            <p className="font-serif text-sm text-ink/70 mb-4 flex-1 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase font-bold text-ink/50 bg-ink/5 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-3 border-t border-fb-border">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-fb-blue text-white text-xs font-bold py-2 rounded-sm shadow hover:bg-fb-blue-dark transition-colors">
                                    <ExternalLink size={14} /> Launch
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-white text-ink/70 border border-ink/20 text-xs font-bold py-2 rounded-sm hover:bg-ink/5 transition-colors">
                                    <Github size={14} /> Incantation
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Placeholder / "Work in Progress" card */}
                <div className="bg-paper border border-dashed border-ink/20 flex flex-col items-center justify-center p-8 text-center min-h-[300px] opacity-70 hover:opacity-100 transition-opacity cursor-pointer hover:bg-paper-dark">
                    <BookOpen size={48} className="text-ink/30 mb-4" />
                    <h3 className="font-headline text-xl text-ink/50 mb-1">Unfinished Manuscripts</h3>
                    <p className="font-serif text-sm text-ink/40 max-w-xs">
                        More magical projects are currently being brewed in the cauldron. Check back later!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectsGallery;
