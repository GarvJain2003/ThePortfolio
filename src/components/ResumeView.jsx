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
                    <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-fb-blue uppercase tracking-widest flex-wrap">
                        <span className="flex items-center gap-1"><Book size={12} /> IET DAVV</span>
                        <span className="flex items-center gap-1"><Star size={12} /> BE (2026)</span>
                        <span className="flex items-center gap-1"><Feather size={12} /> CGPA: 8.01</span>
                    </div>
                    <div className="flex justify-center gap-4 mt-2 text-xs text-ink/70">
                        <a href="mailto:garvjain2003@gmail.com" className="hover:text-fb-blue hover:underline">garvjain2003@gmail.com</a>
                        <span>•</span>
                        <a href="https://linkedin.com/in/garv-jain-1466721ba" target="_blank" rel="noopener noreferrer" className="hover:text-fb-blue hover:underline">LinkedIn</a>
                        <span>•</span>
                        <a href="https://github.com/GarvJain2003" target="_blank" rel="noopener noreferrer" className="hover:text-fb-blue hover:underline">GitHub</a>
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 opacity-10">
                    <Scroll size={120} />
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Column: Skills & Education */}
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-white border border-fb-border p-4 shadow-sm relative">
                        <h3 className="font-headline text-xl text-fb-blue mb-4 border-b border-fb-border pb-2 flex items-center gap-2">
                            <Star size={18} /> Technical Skills
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2">Languages & Tools</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['JavaScript', 'C++', 'Python', 'R', 'SQL', 'Git', 'Docker'].map(skill => (
                                        <span key={skill} className="bg-fb-blue/5 text-fb-blue text-xs px-2 py-1 rounded border border-fb-blue/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2">Full Stack & Cloud</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React.js', 'Firebase', 'WebRTC', 'GCP', 'Node.js', 'Express', 'Tailwind'].map(skill => (
                                        <span key={skill} className="bg-green-900/5 text-green-900 text-xs px-2 py-1 rounded border border-green-900/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-2">Certifications</h4>
                                <ul className="text-xs list-disc list-inside text-ink/80 space-y-1">
                                    <li>Google IT Support</li>
                                    <li>Google Cloud Foundations</li>
                                    <li>Google Data Analytics</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-fb-border p-6 shadow-sm">
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2">
                            <Book size={18} /> Education
                        </h3>
                        <div className="relative pl-4 border-l-2 border-fb-border">
                            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <h4 className="font-bold text-sm text-ink/90">Institute of Engineering and Technology, DAVV</h4>
                            <div className="text-xs text-ink/50 mb-1">Bachelor of Engineering (BE)</div>
                            <div className="flex justify-between items-center text-xs text-ink/50">
                                <span>2022 - 2026</span>
                                <span className="font-bold text-fb-blue">CGPA: 8.01</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Projects & Leadership */}
                <div className="md:col-span-8 space-y-6">
                    <div className="bg-white border border-fb-border p-6 shadow-sm">
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2">
                            <Briefcase size={18} /> Key Projects
                        </h3>

                        <div className="space-y-8">
                            {/* Project 1: Shatranj */}
                            <div className="relative pl-4 border-l-2 border-fb-border">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue rounded-full"></div>
                                <h4 className="font-bold text-lg text-ink/90 flex items-center gap-2">
                                    SHATRANJ <a href="https://playshatranj.com" target="_blank" rel="noreferrer" className="text-xs text-fb-blue hover:underline font-normal">(playshatranj.com)</a>
                                </h4>
                                <p className="text-xs text-ink/50 mb-2 font-mono">React, Firebase, WebRTC, Chess.js, Tailwind</p>
                                <ul className="list-disc list-outside ml-4 text-sm text-ink/80 space-y-1 font-serif text-justify">
                                    <li>Engineered a cloud-native Chess platform supporting real-time online matches, offline board connection, and AI modes.</li>
                                    <li>Built peer-to-peer video chat using WebRTC with Firebase signaling.</li>
                                    <li>Scaled to support 3.3K+ weekly reads and 31 MAU (11 DAU peak).</li>
                                </ul>
                            </div>

                            {/* Project 2: Recruitment Platform */}
                            <div className="relative pl-4 border-l-2 border-fb-border">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue/60 rounded-full"></div>
                                <h4 className="font-bold text-lg text-ink/90">Recruitment & Evaluation Platform</h4>
                                <p className="text-xs text-ink/50 mb-2 font-mono">JavaScript, Firebase, Canvas API</p>
                                <ul className="list-disc list-outside ml-4 text-sm text-ink/80 space-y-1 font-serif text-justify">
                                    <li>Built internal evaluation system for E-Cell & Robotronics recruitment serving 344+ MAU.</li>
                                    <li>Implemented real-time Firestore backend with automated scoring and CSV exports.</li>
                                    <li>Created client-side image compression and dynamic rendering using Vanilla JS.</li>
                                </ul>
                            </div>

                            {/* Project 3: AI/ML Dashboard */}
                            <div className="relative pl-4 border-l-2 border-fb-border">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-fb-blue/30 rounded-full"></div>
                                <h4 className="font-bold text-lg text-ink/90">AI/ML Dashboard + CNN Model</h4>
                                <p className="text-xs text-ink/50 mb-2 font-mono">Python, TensorFlow, OpenCV, Tkinter</p>
                                <ul className="list-disc list-outside ml-4 text-sm text-ink/80 space-y-1 font-serif text-justify">
                                    <li>Trained CNN on MNIST and classical ML models (Linear/Logistic Regression).</li>
                                    <li>Integrated models into interactive Tkinter dashboard for real-time visualization.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-fb-border p-6 shadow-sm">
                        <h3 className="font-headline text-xl text-fb-blue mb-6 border-b border-fb-border pb-2 flex items-center gap-2">
                            <Award size={18} /> Leadership & Responsibility
                        </h3>
                        <div className="space-y-6">
                            {/* Position 1 */}
                            <div className="relative pl-4 border-l-2 border-fb-border">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-red-800 rounded-full"></div>
                                <h4 className="font-bold text-sm text-ink/90">President — Robotronics Club, IET DAVV</h4>
                                <div className="text-xs text-ink/50 mb-1">2024 - Present</div>
                                <p className="text-sm text-ink/80 font-serif">
                                    Founded and scaled club to 600+ members. Led teams to Smart India Hackathon qualifications. Recognized by Patrika Newspaper.
                                </p>
                            </div>

                            {/* Position 2 */}
                            <div className="relative pl-4 border-l-2 border-fb-border">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-yellow-600 rounded-full"></div>
                                <h4 className="font-bold text-sm text-ink/90">Startup Head — E-Cell, IET DAVV</h4>
                                <div className="text-xs text-ink/50 mb-1">2023 - 2025</div>
                                <p className="text-sm text-ink/80 font-serif">
                                    Initiated Startup Vertical. Organized E-Summit 2023. Contributed to OneChip (Ministry of Education recognized).
                                </p>
                            </div>
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
