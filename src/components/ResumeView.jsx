import React from 'react';
import { Scroll, Star, Award, Book, Feather, Briefcase } from 'lucide-react';

const ResumeView = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header / Title */}
            <div className="bg-paper border border-ink/20 p-8 shadow-md relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ink/40 to-transparent"></div>
                <div className="text-center">
                    <h1 className="font-headline text-4xl mb-2 tracking-wider text-ink/90">Curriculum Vitae</h1>
                    <p className="font-serif italic text-ink/60 text-lg">of Garv Jain</p>
                    <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-fb-blue uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Book size={12} /> Ravenclaw House</span>
                        <span className="flex items-center gap-1"><Star size={12} /> Senior Sorcerer Level</span>
                        <span className="flex items-center gap-1"><Feather size={12} /> Wand Holder</span>
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 opacity-10">
                    <Scroll size={120} />
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Column: Skills & specialized knowledge */}
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-white border border-fb-border p-4 shadow-sm relative">
                        <h3 className="font-headline text-xl text-fb-blue mb-4 border-b border-fb-border pb-2 flex items-center gap-2">
                            <Star size={18} /> Known Spells
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2">Frontend Charms</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React.js', 'Next.js', 'Tailwind CSS', 'Redux', 'TypeScript'].map(skill => (
                                        <span key={skill} className="bg-fb-blue/5 text-fb-blue text-xs px-2 py-1 rounded border border-fb-blue/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2">Backend Potions</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Node.js', 'Express', 'Firebase', 'PostgreSQL', 'Python'].map(skill => (
                                        <span key={skill} className="bg-green-900/5 text-green-900 text-xs px-2 py-1 rounded border border-green-900/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2">Tools & Artifacts</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Git', 'Docker', 'AWS', 'Figma'].map(skill => (
                                        <span key={skill} className="bg-purple-900/5 text-purple-900 text-xs px-2 py-1 rounded border border-purple-900/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-paper-dark border border-ink/20 p-4 shadow-sm text-center">
                        <p className="font-serif italic text-sm text-ink/70">
                            "I solemnly swear that I am up to no good code."
                        </p>
                    </div>
                </div>

                {/* Right Column: Experience */}
                <div className="md:col-span-8 space-y-6">
                    <div className="bg-white border border-fb-border p-6 shadow-sm">
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2">
                            <Briefcase size={18} /> Magical Involvements
                        </h3>

                        <div className="space-y-8">
                            {/* Experience Item 1 */}
                            <div className="relative pl-4 border-l-2 border-fb-border">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue rounded-full"></div>
                                <h4 className="font-bold text-lg text-ink/90">Senior Frontend Enginer</h4>
                                <div className="flex justify-between items-center text-xs text-ink/50 mb-2">
                                    <span>Meta (The Network)</span>
                                    <span>2024 - Present</span>
                                </div>
                                <p className="font-serif text-sm leading-relaxed text-ink/80 text-justify">
                                    Leading the development of the new mesmerizing interface for the wizarding world.
                                    Optimizing rendering spells to ensure 60fps performance on all crystal balls and mirrors.
                                    Mentoring junior wizards in the arts of component composition and state management.
                                </p>
                            </div>

                            {/* Experience Item 2 */}
                            <div className="relative pl-4 border-l-2 border-fb-border">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue/40 rounded-full"></div>
                                <h4 className="font-bold text-lg text-ink/90">Full Stack Developer</h4>
                                <div className="flex justify-between items-center text-xs text-ink/50 mb-2">
                                    <span>Freelance / Ministry of Magic</span>
                                    <span>2022 - 2024</span>
                                </div>
                                <p className="font-serif text-sm leading-relaxed text-ink/80 text-justify">
                                    Contracted to build various magical tools and automated parchment systems.
                                    Implemented secure owl-post messaging protocols using WebSockets.
                                    Reduced potion brewing time (build time) by 40% using modern bundlers.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-fb-border p-6 shadow-sm">
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2">
                            <Award size={18} /> Education & O.W.L.s
                        </h3>
                        <div className="relative pl-4 border-l-2 border-fb-border">
                            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <h4 className="font-bold text-lg text-ink/90">Hogwarts School of Witchcraft and Wizardry</h4>
                            <div className="flex justify-between items-center text-xs text-ink/50 mb-2">
                                <span>Ravenclaw House</span>
                                <span>Graduated with Honors</span>
                            </div>
                            <p className="font-serif text-sm leading-relaxed text-ink/80">
                                Specialized in Arithmancy (Algorithms) and Ancient Runes (Coding Languages).
                                Captain of the Coding Gobstones Club.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={() => window.print()}
                    className="bg-fb-blue text-white px-6 py-2 rounded-sm font-bold shadow-md hover:bg-fb-blue-dark transition-colors flex items-center gap-2 mx-auto"
                >
                    <Feather size={16} /> Send Owl (Download PDF)
                </button>
            </div>
        </div>
    );
};

export default ResumeView;
