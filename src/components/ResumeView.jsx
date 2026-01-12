
import React, { useRef, useLayoutEffect, useState } from 'react';
import { Scroll, Star, Award, Book, Feather, Briefcase, Wand2 } from 'lucide-react';
import gsap from 'gsap';

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
    const containerRef = useRef(null);
    const [isSpellCast, setIsSpellCast] = useState(false);
    const timeline = useRef(null);

    // Initial Chaos Setup
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Scatter Skills
            gsap.set(".skill-item", {
                x: () => Math.random() * 400 - 200,
                y: () => Math.random() * 400 - 200,
                rotation: () => Math.random() * 360 - 180,
                opacity: 0.6,
                scale: () => 0.8 + Math.random() * 0.4
            });

            // Tilt Sections
            // Tilt & Scatter Sections (More Chaos!)
            gsap.set(".section-card", {
                x: () => Math.random() * 60 - 30,
                y: () => Math.random() * 60 - 30,
                rotation: () => Math.random() * 10 - 5,
                opacity: 0.9
            });

            // ⚠️ TOTAL CHAOS: Scatter specific text elements inside cards
            gsap.set(".section-card h3, .section-card h4, .section-card p, .section-card li, .section-card .skill-item", {
                x: () => Math.random() * 40 - 20,
                y: () => Math.random() * 40 - 20,
                rotation: () => Math.random() * 15 - 7,
                scale: () => 0.9 + Math.random() * 0.2,
                opacity: () => 0.7 + Math.random() * 0.3
            });

            // Initial blur for header
            gsap.set(".resume-header", {
                filter: "blur(1px) grayscale(50%)"
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const castSpell = () => {
        if (isSpellCast) return;
        setIsSpellCast(true);

        // Play Sound Effect
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'); // Magic Chime
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed (user interaction needed first):', e));

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Swish and Flick (Incantation)
            tl.to(".incantation-text", {
                duration: 1.5,
                opacity: 1,
                scale: 1.2,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            })

                // 2. Levitate (Everything floats up slightly)
                .to([".section-card", ".section-card h3", ".section-card h4", ".section-card p", ".section-card li", ".skill-item"], {
                    duration: 1,
                    y: "-=30", // Float up
                    rotation: "+=2", // Gentle twist
                    ease: "sine.inOut",
                    stagger: { amount: 0.5, from: "random" }
                }, "<0.2")

                // 3. The Correction (Snap to grid)
                .to([".section-card", ".section-card h3", ".section-card h4", ".section-card p", ".section-card li", ".skill-item"], {
                    duration: 1.2,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    ease: "elastic.out(1, 0.5)",
                    stagger: {
                        amount: 0.5,
                        from: "center"
                    }
                }, "-=0.5")

                // 4. Reveal Text
                .to(".resume-header", {
                    filter: "blur(0px) grayscale(0%)",
                    duration: 1
                }, "<");

        }, containerRef);
    };

    return (
        <div ref={containerRef} className="space-y-6 pb-10 print:pb-0 relative resume-container">

            {/* Procedural CSS Wand & Incantation */}
            {/* Procedural CSS Wand & Incantation */}
            {!isSpellCast && (
                <div className="fixed bottom-10 right-10 z-[100] cursor-pointer group print:hidden flex flex-col items-center gap-2"
                    onClick={castSpell}>

                    {/* Helper Text */}
                    <div className="bg-white/90 text-ink px-4 py-2 rounded-full shadow-xl border-2 border-purple-500/50 font-bold animate-bounce mb-2 text-sm whitespace-nowrap">
                        ✨ Messy? Click to Fix!
                    </div>

                    {/* CSS Wand Icon (Miniaturized) */}
                    <div className="wand-icon-wrapper relative w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/40 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 hover:rotate-12 hover:bg-white/20 animate-pulse-slow">
                        {/* Mini CSS Wand */}
                        <div className="relative w-12 h-1.5 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-200 rounded-full shadow-sm flex items-center -rotate-45">
                            {/* Handle */}
                            <div className="absolute left-0 w-4 h-2 bg-gradient-to-r from-amber-950 to-amber-800 rounded-l-full"></div>
                            {/* Tip Glow */}
                            <div className="absolute right-0 w-2 h-2 bg-purple-400 rounded-full blur-[2px] opacity-80 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Visual Incantation Text */}
            <div className="incantation-text fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-purple-300 to-amber-100 opacity-0 pointer-events-none z-[100] text-center whitespace-nowrap tracking-wider drop-shadow-2xl"
                style={{
                    fontFamily: '"Cinzel Decorative", cursive',
                    textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(234, 179, 8, 0.6)',
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
                }}>
                Wingardium Leviosa!
            </div>

            {/* Header / Title */}
            <div className="resume-header bg-paper border border-ink/20 p-8 shadow-md relative overflow-hidden group print:border-none print:shadow-none print:p-0 print:mb-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ink/40 to-transparent print:hidden"></div>
                <div className="text-center">
                    <h1 className="font-headline text-4xl mb-2 tracking-wider text-ink/90">Curriculum Vitae</h1>
                    <p className="font-serif italic text-ink/60 text-lg print:text-ink/80">of Garv Jain</p>
                    <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-fb-blue uppercase tracking-widest flex-wrap print:text-black">
                        <span className="flex items-center gap-1"><Book size={12} /> IET DAVV</span>
                        <span className="flex items-center gap-1"><Star size={12} /> BE (2026)</span>
                        <span className="flex items-center gap-1"><Feather size={12} /> CGPA: 8.01</span>
                    </div>
                    <div className="text-center mt-2 text-xs font-serif italic text-ink/60 print:text-black">
                        Relevant Coursework: DSA, OS, DBMS, Networks, System Design
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
                    <div className="section-card bg-white border border-fb-border p-4 shadow-sm relative print:border-none print:shadow-none print:p-0">
                        <h3 className="font-headline text-xl text-fb-blue mb-4 border-b border-fb-border pb-2 flex items-center gap-2 print:text-black print:border-black">
                            <Star size={18} /> Technical Skills
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2 print:text-black">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['JavaScript (ES6+)', 'Python', 'C++', 'SQL', 'HTML5/CSS3'].map((skill) => (
                                        <span key={skill} className="bg-fb-blue/5 text-fb-blue text-xs px-2 py-1 rounded border border-fb-blue/10 print:border-gray-300 block">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2 print:text-black">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Node.js', 'Firebase', 'Zustand', 'WebRTC', 'Jest/Testing Library', 'Docker', 'Git'].map((skill) => (
                                        <span key={skill} className="bg-green-900/5 text-green-900 text-xs px-2 py-1 rounded border border-green-900/10 print:border-gray-300 block">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2 print:text-black">Concepts</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['System Design', 'Microservices', 'CI/CD', 'REST APIs', 'OOP', 'Unit Testing'].map((skill) => (
                                        <span key={skill} className="bg-purple-900/5 text-purple-900 text-xs px-2 py-1 rounded border border-purple-900/10 print:border-gray-300 block">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2 print:text-black">Meta Certifications</h4>
                                <ul className="text-xs list-disc list-inside text-ink/80 space-y-1 print:text-black">
                                    {['Back-End Development Professional', 'Front-End Development', 'Database Structures (MySQL)', 'iOS Mobile App Development', 'Meta Data Analyst'].map(c => (
                                        <li key={c}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="section-card bg-white border border-fb-border p-6 shadow-sm print:border-none print:shadow-none print:p-0 print:mt-6">
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
                    <div className="section-card bg-white border border-fb-border p-6 shadow-sm print:border-none print:shadow-none print:p-0">
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2 print:text-black print:border-black">
                            <Briefcase size={18} /> Key Projects
                        </h3>

                        <div className="space-y-8">
                            {/* Project 1: Shatranj */}
                            <div className="relative pl-4 border-l-2 border-fb-border print:border-l-gray-300">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue rounded-full print:bg-black"></div>
                                <h4 className="font-bold text-lg text-ink/90 flex items-center gap-2 print:text-black">
                                    SHATRANJ — Real-Time Multiplayer Chess
                                    <a href="https://playshatranj.com" target="_blank" rel="noreferrer" className="text-xs px-2 py-0.5 bg-fb-blue/10 text-fb-blue rounded hover:bg-fb-blue hover:text-white transition-colors font-normal print:no-underline print:text-black print:bg-transparent">
                                        playshatranj.com
                                    </a>
                                </h4>
                                <p className="text-xs text-ink/50 mb-2 font-mono print:text-gray-600">React, Firebase, WebRTC, Zustand, Electron, Capacitor</p>
                                <ul className="list-disc list-outside ml-4 text-sm text-ink/80 space-y-1 font-serif text-justify print:text-black">
                                    <li>Architected a <strong>cross-platform</strong> chess ecosystem unifying physical and digital play, deployed to Web, Desktop, and Mobile.</li>
                                    <li>Engineered a <strong>fault-tolerant multiplayer engine</strong> using Firestore Transactions and <strong>optimistic UI</strong> for sub-second sync.</li>
                                    <li>Built a <strong>complex social graph</strong> enabling bidirectional friendships, feeds, and private clubs with <strong>RBAC</strong> security.</li>
                                    <li>Integrated <strong>IoT hardware</strong> for physical boards using ESP+LDR to bridge physical moves with digital engine.</li>
                                    <li>Implemented <strong>Feature-Sliced Architecture</strong> with rigorous state management (Zustand) to maintain 60fps analysis.</li>
                                    <li>Scaled to <strong>220+ MAU</strong> (58 peak DAU), validating system reliability under real-world concurrency.</li>
                                </ul>
                            </div>

                            {/* Project 2: Recruitment SaaS */}
                            <div className="relative pl-4 border-l-2 border-fb-border print:border-l-gray-300">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue/60 rounded-full print:bg-black"></div>
                                <h4 className="font-bold text-lg text-ink/90 flex items-center gap-2 print:text-black">
                                    Recruitment SaaS Platform
                                    <a href="https://recruitment-saas-b5cb8.web.app" target="_blank" rel="noreferrer" className="text-xs px-2 py-0.5 bg-fb-blue/10 text-fb-blue rounded hover:bg-fb-blue hover:text-white transition-colors font-normal print:no-underline print:text-black print:bg-transparent">
                                        Demo
                                    </a>
                                </h4>
                                <p className="text-xs text-ink/50 mb-2 font-mono print:text-gray-600">JS, Cloud Functions, Firestore, SortableJS, Node.js</p>
                                <ul className="list-disc list-outside ml-4 text-sm text-ink/80 space-y-1 font-serif text-justify print:text-black">
                                    <li>Engineered a <strong>multi-tenant SaaS platform</strong> to unify recruitment for clubs, serving <strong>500+ candidates</strong>.</li>
                                    <li>Designed a <strong>URL-based architecture</strong> allowing infinite organizations to coexist with isolated branding and data.</li>
                                    <li>Built a <strong>schema-driven form engine</strong> where UI renders dynamically from JSON configs, decoupling frontend from DB.</li>
                                    <li>Architected a <strong>serverless microservices layer</strong> for secure payments (Razorpay) and email automation.</li>
                                    <li>Developed a custom <strong>drag-and-drop form builder</strong> empowering non-technical admins to build complex forms.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="section-card bg-white border border-fb-border p-6 shadow-sm print:border-none print:shadow-none print:p-0 print:mt-6">
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
                                    Founded and scaled a robotics & innovation club with <strong>27 core members</strong> and a community of over <strong>600+ members</strong>. Led teams to Smart India Hackathon qualifications. Recognized by Patrika Newspaper.
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
                                    Initiated Startup Vertical connecting <strong>1000+ students</strong> with startups. Organized major events (E-Summit). Recognized by Ministry of Education.
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
