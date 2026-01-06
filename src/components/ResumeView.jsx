```javascript
import React, { useState, useEffect, useMemo } from 'react';
import { Scroll, Star, Award, Book, Feather, Briefcase, Wand2 } from 'lucide-react';

// Magical Descriptions for Skills
const skillDescriptions = {
    'React.js': 'A charm for summoning dynamic user interfaces',
    'Next.js': 'Advanced transmutation for server-side rendering',
    'Tailwind': 'Styling potions for rapid visual enhancement',
    'Redux': 'Global state mana management',
    'TypeScript': 'Strict type enforcement spells',
    'Node.js': 'Server-side sorcery',
    'Firebase': 'Backend-as-a-Service alchemy',
    'WebRTC': 'Real-time communication crystal ball',
    'Python': 'Parseltongue scripting language',
    'Docker': 'Containerization containment spells'
};

const ResumeView = () => {
    const [isSpellCast, setIsSpellCast] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Trigger animation readiness after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const castSpell = () => {
        setIsSpellCast(true);
    };

    // Helper to generate stable random positions
    const generateRandomPos = () => {
        const x = Math.floor(Math.random() * 200 - 100); // -100 to 100
        const y = Math.floor(Math.random() * 200 - 100); // -100 to 100
        const r = Math.floor(Math.random() * 360);
        return { transform: `translate(${ x }px, ${ y }px) rotate(${ r }deg)` };
    };

    // Skills data wrapping
    const skillsData = useMemo(() => ({
        languages: ['JavaScript', 'C++', 'Python', 'R', 'SQL', 'Git', 'Docker'].map(s => ({ name: s, style: generateRandomPos() })),
        fullstack: ['React.js', 'Firebase', 'WebRTC', 'GCP', 'Node.js', 'Express', 'Tailwind'].map(s => ({ name: s, style: generateRandomPos() })),
        certs: ['Google IT Support', 'Google Cloud Foundations', 'Google Data Analytics'].map(s => ({ name: s, style: generateRandomPos() }))
    }), []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10 print:pb-0 print:animate-none relative">
            
            {/* Wand Button - Floating Action */}
            {!isSpellCast && (
                <div className="absolute top-4 right-4 z-50 animate-bounce print:hidden">
                    <button 
                        onClick={castSpell}
                        className="bg-purple-600 text-white p-3 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:bg-purple-700 hover:scale-110 transition-all group flex items-center gap-2"
                        title="Cast 'Orchideous' to organize!"
                    >
                        <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        <span className="font-headline font-bold pr-2">Organize!</span>
                    </button>
                    <div className="absolute top-full mt-2 right-0 text-xs bg-ink/80 text-white px-2 py-1 rounded w-32 text-center">
                        The resume is in chaos! Cast a spell!
                    </div>
                </div>
            )}

            {/* Header / Title */}
            <div className={`bg - paper border border - ink / 20 p - 8 shadow - md relative overflow - hidden group print: border - none print: shadow - none print: p - 0 print: mb - 6 transition - all duration - 1000 ${ isSpellCast ? '' : 'blur-[1px] grayscale-[50%]' } `}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ink/40 to-transparent print:hidden"></div>
                <div className="text-center">
                    <h1 className="font-headline text-4xl mb-2 tracking-wider text-ink/90">Curriculum Vitae</h1>
                    <p className="font-serif italic text-ink/60 text-lg print:text-ink/80">of Garv Jain</p>
                    <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-fb-blue uppercase tracking-widest flex-wrap print:text-black">
                        <span className="flex items-center gap-1"><Book size={12} /> IET DAVV</span>
                        <span className="flex items-center gap-1"><Star size={12} /> BE (2026)</span>
                        <span className="flex items-center gap-1"><Feather size={12} /> CGPA: 8.01</span>
                    </div>
                     <div className="flex justify-center gap-4 mt-2 text-xs text-ink/70 print:text-black">
                        <a href="mailto:garvjain2003@gmail.com" className="hover:text-fb-blue hover:underline">garvjain2003@gmail.com</a>
                        <span className="print:mx-2">•</span>
                        <a href="https://linkedin.com/in/garv-jain-1466721ba" target="_blank" rel="noopener noreferrer" className="hover:text-fb-blue hover:underline">LinkedIn</a>
                        <span className="print:mx-2">•</span>
                        <a href="https://github.com/GarvJain2003" target="_blank" rel="noopener noreferrer" className="hover:text-fb-blue hover:underline">GitHub</a>
                        <span className="hidden print:inline mx-2">•</span>
                        <span className="hidden print:inline">+91-9424088851</span>
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 opacity-10 print:hidden">
                    <Scroll size={120} />
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 print:block">

                {/* Left Column: Skills & Education */}
                <div className="md:col-span-4 space-y-6 print:w-full print:mb-6">
                    <div className={`bg - white border border - fb - border p - 4 shadow - sm relative print: border - none print: shadow - none print: p - 0 transition - all duration - 1000 ${ isSpellCast ? '' : 'rotate-1' } `}>
                        <h3 className="font-headline text-xl text-fb-blue mb-4 border-b border-fb-border pb-2 flex items-center gap-2 print:text-black print:border-black">
                            <Star size={18} /> Technical Skills
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2 print:text-black">Languages & Tools</h4>
                                <div className="flex flex-wrap gap-2 relative min-h-[50px]">
                                    {skillsData.languages.map((skill) => (
                                        <div 
                                            key={skill.name} 
                                            className={`group relative cursor - help transition - all duration - 1000 ease - [cubic - bezier(0.34, 1.56, 0.64, 1)]`}
                                            style={isSpellCast || !mounted ? {} : { ...skill.style, position: 'absolute', opacity: 0.6 }}
                                        >
                                            <span className="bg-fb-blue/5 text-fb-blue text-xs px-2 py-1 rounded border border-fb-blue/10 hover:bg-fb-blue hover:text-white transition-colors print:bg-transparent print:text-black print:border-gray-300 block">
                                                {skill.name}
                                            </span>
                                            {skillDescriptions[skill.name] && isSpellCast && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-ink text-[#fcf5e5] text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 print:hidden text-center">
                                                    {skillDescriptions[skill.name]}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink"></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2 print:text-black">Full Stack & Cloud</h4>
                                <div className="flex flex-wrap gap-2 relative min-h-[50px]">
                                    {skillsData.fullstack.map((skill) => (
                                         <div 
                                            key={skill.name} 
                                            className={`group relative cursor - help transition - all duration - 1000 ease - [cubic - bezier(0.34, 1.56, 0.64, 1)]`}
                                            style={isSpellCast || !mounted ? {} : { ...skill.style, position: 'absolute', opacity: 0.6 }}
                                        >
                                            <span className="bg-green-900/5 text-green-900 text-xs px-2 py-1 rounded border border-green-900/10 hover:bg-green-900 hover:text-white transition-colors print:bg-transparent print:text-black print:border-gray-300 block">
                                                {skill.name}
                                            </span>
                                            {skillDescriptions[skill.name] && isSpellCast && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-ink text-[#fcf5e5] text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 print:hidden text-center">
                                                    {skillDescriptions[skill.name]}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink"></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2 print:text-black">Certifications</h4>
                                <ul className={`text - xs list - disc list - inside text - ink / 80 space - y - 1 print: text - black transition - all duration - 1000 ${ isSpellCast ? '' : 'blur-sm translate-y-4' } `}>
                                    {skillsData.certs.map(c => (
                                        <li key={c.name}>{c.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                     <div className={`bg - white border border - fb - border p - 6 shadow - sm print: border - none print: shadow - none print: p - 0 print: mt - 6 transition - all duration - 1000 delay - 100 ${ isSpellCast ? '' : '-rotate-1 translate-y-2' } `}>
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2 print:text-black print:border-black">
                            <Book size={18} /> Education
                        </h3>
                        <div className="relative pl-4 border-l-2 border-fb-border print:border-l-gray-300">
                            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-yellow-500 rounded-full print:bg-black"></div>
                            <h4 className="font-bold text-sm text-ink/90 print:text-black">Institute of Engineering and Technology, DAVV</h4>
                            <div className="text-xs text-ink/50 mb-1 print:text-gray-600">Bachelor of Engineering (BE)</div>
                            <div className="flex justify-between items-center text-xs text-ink/50 print:text-gray-600">
                                <span>2022 - 2026</span>
                                <span className="font-bold text-fb-blue print:text-black">CGPA: 8.01</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Projects & Leadership */}
                <div className="md:col-span-8 space-y-6 print:w-full">
                    <div className={`bg - white border border - fb - border p - 6 shadow - sm print: border - none print: shadow - none print: p - 0 transition - all duration - 1000 delay - 200 ${ isSpellCast ? '' : 'rotate-1 translate-x-2' } `}>
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2 print:text-black print:border-black">
                            <Briefcase size={18} /> Key Projects
                        </h3>

                        <div className="space-y-8">
                            {/* Project 1: Shatranj */}
                            <div className="relative pl-4 border-l-2 border-fb-border print:border-l-gray-300">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue rounded-full print:bg-black"></div>
                                <h4 className="font-bold text-lg text-ink/90 flex items-center gap-2 print:text-black">
                                    SHATRANJ
                                    <a href="https://playshatranj.com" target="_blank" rel="noreferrer" className="text-xs px-2 py-0.5 bg-fb-blue/10 text-fb-blue rounded hover:bg-fb-blue hover:text-white transition-colors font-normal print:no-underline print:text-black print:bg-transparent">
                                        playshatranj.com
                                    </a>
                                </h4>
                                <p className="text-xs text-ink/50 mb-2 font-mono print:text-gray-600">React, Firebase, WebRTC, Chess.js, Tailwind</p>
                                <ul className="list-disc list-outside ml-4 text-sm text-ink/80 space-y-1 font-serif text-justify print:text-black">
                                    <li>Engineered a cloud-native Chess platform supporting real-time online matches, offline board connection, and AI modes.</li>
                                    <li>Built peer-to-peer video chat using WebRTC with Firebase signaling.</li>
                                    <li>Scaled to support 3.3K+ weekly reads and 31 MAU (11 DAU peak).</li>
                                </ul>
                            </div>

                            {/* Project 2: Recruitment Platform */}
                            <div className="relative pl-4 border-l-2 border-fb-border print:border-l-gray-300">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue/60 rounded-full print:bg-black"></div>
                                <h4 className="font-bold text-lg text-ink/90 print:text-black">Recruitment & Evaluation Platform</h4>
                                <p className="text-xs text-ink/50 mb-2 font-mono print:text-gray-600">JavaScript, Firebase, Canvas API</p>
                                <ul className="list-disc list-outside ml-4 text-sm text-ink/80 space-y-1 font-serif text-justify print:text-black">
                                    <li>Built internal evaluation system for E-Cell & Robotronics recruitment serving 344+ MAU.</li>
                                    <li>Implemented real-time Firestore backend with automated scoring and CSV exports.</li>
                                    <li>Created client-side image compression and dynamic rendering using Vanilla JS.</li>
                                </ul>
                            </div>

                             {/* Project 3: AI/ML Dashboard */}
                            <div className="relative pl-4 border-l-2 border-fb-border print:border-l-gray-300">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue/30 rounded-full print:bg-black"></div>
                                <h4 className="font-bold text-lg text-ink/90 print:text-black">AI/ML Dashboard + CNN Model</h4>
                                <p className="text-xs text-ink/50 mb-2 font-mono print:text-gray-600">Python, TensorFlow, OpenCV, Tkinter</p>
                                <ul className="list-disc list-outside ml-4 text-sm text-ink/80 space-y-1 font-serif text-justify print:text-black">
                                    <li>Trained CNN on MNIST and classical ML models (Linear/Logistic Regression).</li>
                                    <li>Integrated models into interactive Tkinter dashboard for real-time visualization.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={`bg - white border border - fb - border p - 6 shadow - sm print: border - none print: shadow - none print: p - 0 print: mt - 6 transition - all duration - 1000 delay - 300 ${ isSpellCast ? '' : '-rotate-1 translate-y-4' } `}>
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2 print:text-black print:border-black">
                            <Award size={18} /> Leadership & Responsibility
                        </h3>
                         <div className="space-y-6">
                             {/* Position 1 */}
                            <div className="relative pl-4 border-l-2 border-fb-border print:border-l-gray-300">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-red-800 rounded-full print:bg-black"></div>
                                <h4 className="font-bold text-sm text-ink/90 flex items-center gap-2 print:text-black">
                                    President — Robotronics Club, IET DAVV
                                    <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded border border-red-200 print:hidden">HEAD</span>
                                </h4>
                                <div className="text-xs text-ink/50 mb-1 print:text-gray-600">2024 - Present</div>
                                <p className="text-sm text-ink/80 font-serif print:text-black">
                                    Founded and scaled club to 600+ members. Led teams to Smart India Hackathon qualifications. Recognized by Patrika Newspaper.
                                </p>
                            </div>

                            {/* Position 2 */}
                             <div className="relative pl-4 border-l-2 border-fb-border print:border-l-gray-300">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-yellow-600 rounded-full print:bg-black"></div>
                                <h4 className="font-bold text-sm text-ink/90 flex items-center gap-2 print:text-black">
                                    Startup Head — E-Cell, IET DAVV
                                    <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded border border-yellow-200 print:hidden">LEAD</span>
                                </h4>
                                <div className="text-xs text-ink/50 mb-1 print:text-gray-600">2023 - 2025</div>
                                <p className="text-sm text-ink/80 font-serif print:text-black">
                                    Initiated Startup Vertical. Organized E-Summit 2023. Contributed to OneChip (Ministry of Education recognized).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="text-center print:hidden">
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
