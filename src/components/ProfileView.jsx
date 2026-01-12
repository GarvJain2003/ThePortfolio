import React from 'react';
import { MapPin, Briefcase, GraduationCap, Heart, Calendar, Wand2, Scroll, Sparkles, Feather, Printer } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';
import FeedItem from './FeedItem';
import StatusUpdate from './StatusUpdate';

const ProfileView = () => {
    const { user, friends, posts, setCurrentView, notify } = useOutcome();

    // Mock Skills Data (O.W.L.s)
    const skills = [
        { name: "React Charms", level: 95, grade: "O" }, // Outstanding
        { name: "Node.js Transfiguration", level: 88, grade: "E" }, // Exceeds Expectations
        { name: "Firebase Potions", level: 92, grade: "O" },
        { name: "CSS Illusions", level: 85, grade: "E" },
        { name: "System Arch. Divination", level: 90, grade: "O" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">

            {/* MINISTRY IDENTITY HEADER */}
            <div className="bg-[#fcf5e5] border border-ink/20 shadow-lg relative overflow-hidden rounded-sm">

                {/* Vintage Paper Texture Overlay */}
                <div className="absolute inset-0 bg-[#f4e4bc] opacity-20 pointer-events-none mix-blend-multiply"></div>
                <div className="absolute inset-0 border-4 border-double border-ink/40 pointer-events-none m-1"></div>

                {/* Top Banner - Ministry Header */}
                <div className="bg-[#2a1b3d] text-[#fcf5e5] p-6 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-200 via-transparent to-transparent"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 border-2 border-[#fcf5e5]/30 rounded-full bg-white/5 backdrop-blur-sm">
                                <Wand2 size={32} className="text-[#fcf5e5]" />
                            </div>
                            <div>
                                <h2 className="font-serif text-[#eaddcf] text-xs tracking-[0.3em] uppercase opacity-80 mb-1">Ministry of Magic</h2>
                                <h1 className="font-headline text-2xl md:text-3xl tracking-widest uppercase text-white">
                                    Personnel Record
                                </h1>
                            </div>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="font-mono text-xs text-[#eaddcf]/60 tracking-wider">FILE NO.</div>
                            <div className="font-mono text-lg text-[#fcf5e5] tracking-widest">MOM-894-322-X</div>
                        </div>
                    </div>
                </div>

                {/* ID Card Section */}
                <div className="p-6 md:p-8 relative">
                    <div className="flex flex-col md:flex-row gap-8 items-start">

                        {/* LEFT: Profile Photo (Ministry ID Style - Refined) */}
                        <div className="flex-shrink-0 mx-auto md:mx-0 relative group">
                            {/* Photo Container */}
                            <div className="w-48 h-56 bg-[#eaddcf] p-2 shadow-xl rotate-[-2deg] transition-transform duration-300 group-hover:rotate-0 border border-ink/20 transform-gpu preserve-3d relative">
                                <div className="w-full h-full border border-ink/10 relative overflow-hidden bg-[#2a1b3d]">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 mix-blend-overlay z-10 pointer-events-none"></div>
                                    <img
                                        src={user.avatar}
                                        className="w-full h-full object-cover sepia-[.2] contrast-110 brightness-100 animate-moving-portrait"
                                        alt="Wizard Portrait"
                                    />
                                    <style jsx>{`
                                        @keyframes movePortrait {
                                            0% { object-position: 50% 50%; transform: scale(1.15) rotate(0deg); }
                                            25% { object-position: 55% 50%; transform: scale(1.2) rotate(1deg); }
                                            50% { object-position: 50% 55%; transform: scale(1.15) rotate(0deg); }
                                            75% { object-position: 45% 50%; transform: scale(1.2) rotate(-1deg); }
                                            100% { object-position: 50% 50%; transform: scale(1.15) rotate(0deg); }
                                        }
                                        .animate-moving-portrait {
                                            animation: movePortrait 20s infinite ease-in-out alternate;
                                        }
                                    `}</style>
                                    {/* "Moving" Effect Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                </div>

                                {/* Paper Clip - Simpler, Top Right, Smaller */}
                                <div className="absolute -top-3 -right-3 z-30 opacity-90 transform rotate-[15deg] pointer-events-none">
                                    <div className="w-3 h-8 border-2 border-gray-500 rounded-full border-b-0 bg-transparent shadow-sm"></div>
                                </div>
                            </div>

                            {/* Stamped Seal - Vintage Ink Style */}
                            <div className="absolute -bottom-2 -right-2 rotate-[-12deg] z-30 opacity-80 mix-blend-multiply pointer-events-none">
                                <div className="w-16 h-16 border-[3px] border-red-900 rounded-full flex items-center justify-center p-1">
                                    <div className="w-full h-full border border-red-900 rounded-full flex items-center justify-center">
                                        <div className="text-center transform skew-x-[-5deg]">
                                            <div className="text-[6px] font-bold tracking-[0.2em] text-red-900 uppercase mb-0.5">Ministry of</div>
                                            <div className="text-[10px] font-black tracking-widest text-red-900 uppercase leading-none">Magic</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: User Details */}
                        <div className="flex-grow w-full md:w-auto text-center md:text-left space-y-4">
                            <div>
                                <h1 className="font-headline text-4xl md:text-5xl text-ink font-bold tracking-tight mb-2">
                                    {user.name}
                                </h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2 items-center text-sm font-serif text-ink/70">
                                    <span className="px-3 py-1 bg-purple-100/50 border border-purple-200 text-purple-900 rounded-full uppercase tracking-wider text-xs font-bold flex items-center gap-2">
                                        <Sparkles size={12} /> Level {user.level} Wizard
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100/50 border border-blue-200 text-blue-900 rounded-full uppercase tracking-wider text-xs font-bold">
                                        {user.house}
                                    </span>
                                </div>
                            </div>

                            <p className="font-serif italic text-lg text-ink/80 border-l-4 border-purple-900/20 pl-4 py-1 max-w-2xl mx-auto md:mx-0 bg-white/40">
                                "Enchanting the web one pixel at a time."
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-2xl">
                                <div className="flex items-center gap-3 p-3 bg-white/50 border border-ink/5 rounded-sm">
                                    <div className="p-2 bg-purple-50 rounded-full text-purple-800"><Briefcase size={16} /></div>
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">Occupation</div>
                                        <div className="text-sm font-serif font-bold text-ink">Arch-Mage Developer</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/50 border border-ink/5 rounded-sm">
                                    <div className="p-2 bg-purple-50 rounded-full text-purple-800"><Wand2 size={16} /></div>
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">Wand</div>
                                        <div className="text-sm font-serif font-bold text-ink">{user.wand}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                                <button
                                    onClick={() => setCurrentView('owl-post')}
                                    className="px-6 py-2.5 bg-[#2a1b3d] text-[#fcf5e5] text-xs font-bold tracking-[0.15em] uppercase hover:bg-purple-900 transition-all shadow-md flex items-center gap-2 group"
                                >
                                    <Feather size={14} className="group-hover:rotate-12 transition-transform" />
                                    Send Owl
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="px-6 py-2.5 bg-transparent border-2 border-ink/10 text-ink text-xs font-bold tracking-[0.15em] uppercase hover:bg-ink/5 transition-all flex items-center gap-2"
                                >
                                    <Printer size={14} />
                                    Print Record
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
                {/* LEFT COLUMN: Skills & Stats */}
                <div className="md:col-span-4 space-y-6">
                    {/* O.W.L. Results */}
                    <div className="bg-white p-6 shadow-sm border border-ink/10 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-500"></div>
                        <h3 className="font-headline font-bold text-lg mb-6 text-ink flex items-center gap-2">
                            <Scroll size={18} className="text-purple-700" />
                            O.W.L. Transcripts
                        </h3>

                        <div className="space-y-5">
                            {skills.map((skill, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs font-bold font-serif mb-1.5 items-end">
                                        <span className="text-ink/80">{skill.name}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${skill.grade === 'O'
                                            ? 'bg-purple-50 text-purple-700 border-purple-100'
                                            : 'bg-blue-50 text-blue-700 border-blue-100'
                                            }`}>
                                            {skill.grade === 'O' ? 'Outstanding' : 'Exceeds Exp.'}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-ink/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 relative transition-all duration-1000 ease-out"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-dashed border-ink/10 text-[10px] text-center font-serif text-ink/40 uppercase tracking-widest">
                            Wizarding Examinations Authority
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Posts & Activity */}
                <div className="md:col-span-8 space-y-8">

                    {/* Friends Section Preview */}
                    <div className="bg-white p-6 border border-ink/10 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-headline font-bold text-lg">Known Associates ({friends.length})</h3>
                            <button onClick={() => setCurrentView('friends')} className="text-xs text-purple-700 font-bold hover:underline font-serif uppercase tracking-wider">
                                View All
                            </button>
                        </div>
                        <div className="flex -space-x-3 overflow-hidden pb-2">
                            {friends.slice(0, 6).map((friend) => (
                                <div key={friend.id} className="relative group cursor-pointer transition-transform hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200">
                                        <img
                                            src={friend.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`}
                                            className="w-full h-full object-cover"
                                            alt={friend.name}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-purple-50 flex items-center justify-center text-[10px] font-bold text-purple-700 shadow-sm z-10">
                                +{friends.length - 6 > 0 ? friends.length - 6 : ''}
                            </div>
                        </div>
                    </div>

                    {/* Timeline / Pensieve Header */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px bg-ink/10 flex-grow"></div>
                        <h2 className="font-headline text-xl text-ink/40 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Sparkles size={14} /> The Pensieve <Sparkles size={14} />
                        </h2>
                        <div className="h-px bg-ink/10 flex-grow"></div>
                    </div>

                    {/* Status Update Input */}
                    <StatusUpdate />

                    {/* Feed Content */}
                    <div className="space-y-6">
                        {posts && posts.map((post) => (
                            <FeedItem key={post.id} item={post} onNavigate={setCurrentView} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
