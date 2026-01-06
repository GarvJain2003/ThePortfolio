import React from 'react';
import { MapPin, Briefcase, GraduationCap, Heart, Calendar, Wand2, Scroll } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';

const ProfileView = () => {
    const { user, friends } = useOutcome();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Cover Photo area (Newspaper Header style) */}
            <div className="bg-paper border border-ink/20 p-2 shadow-sm relative group">
                <div className="h-48 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center border border-dashed border-ink/20 overflow-hidden relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    <span className="font-headline text-2xl text-white/20 uppercase tracking-widest z-10">
                        The Daily Prophet
                    </span>
                </div>
                {/* Profile Pic */}
                <div className="absolute -bottom-12 left-6 border-4 border-paper bg-white w-32 h-32 shadow-md overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img src="/profile.png" className="w-full h-full object-cover" alt="Profile" />
                </div>
            </div>

            {/* Info Header */}
            <div className="pl-40 pt-2 flex justify-between items-end pb-4 border-b border-fb-border">
                <div>
                    <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
                        {user.name}
                        <span className="text-[12px] bg-fb-blue text-white px-2 py-0.5 rounded-full font-sans tracking-wide align-middle opacity-80">
                            Lvl {user.level}
                        </span>
                    </h1>
                    <p className="text-ink/60 font-serif italic max-w-lg">
                        "Full Stack Developer weaving spells with React and Node.js. Seeking a coven (team) to build world-changing magic."
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        className="bg-fb-blue text-white hover:bg-fb-blue-dark px-4 py-1.5 text-xs font-bold rounded shadow-sm transition-colors flex items-center gap-2">
                        <Wand2 size={12} /> Connect
                    </button>
                    <button
                        className="bg-paper hover:bg-paper-dark text-ink/80 px-4 py-1.5 text-xs font-bold rounded border border-ink/10 transition-colors">
                        Message
                    </button>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Col: Info */}
                <div className="space-y-4">
                    <div className="bg-white border border-fb-border p-4 shadow-sm">
                        <h3 className="font-bold text-fb-blue text-sm mb-3 border-b border-fb-border pb-1">Wizard Stats</h3>
                        <ul className="text-xs space-y-3 text-ink/80">
                            <li className="flex items-center gap-2">
                                <Briefcase size={14} className="text-ink/40" />
                                <span>Software Engineer <b>(Open to Work)</b></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <GraduationCap size={14} className="text-ink/40" />
                                <span>Studying at <b>IET DAVV</b></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={14} className="text-ink/40" />
                                <span>From <b>Indore, India</b></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Heart size={14} className="text-ink/40" />
                                <span>Interest: <b>High Scale Systems</b></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Scroll size={14} className="text-ink/40" />
                                <span>Wand: <b>{user.wand}</b></span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white border border-fb-border p-4 shadow-sm">
                        <h3 className="font-bold text-fb-blue text-sm mb-3 border-b border-fb-border pb-1">
                            Magical Network <span className="text-ink/40 font-normal">({friends.length})</span>
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {friends.map((friend) => (
                                <div key={friend.id} className="aspect-square bg-fb-blue/5 rounded-sm overflow-hidden relative group cursor-pointer" title={friend.name}>
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`} className="w-full h-full object-cover" alt={friend.name} />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Timeline/Feed Placeholder */}
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-white border border-fb-border p-6 shadow-sm min-h-[200px] flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-ink/5 rounded-full flex items-center justify-center mb-4">
                            <Wand2 size={24} className="text-ink/30" />
                        </div>
                        <h3 className="font-headline text-xl text-ink/60">No recent scrolls...</h3>
                        <p className="font-serif text-sm text-ink/40 max-w-xs mt-2">
                            Garv is currently busy brewing code for his next big project. Check the <b className="text-fb-blue cursor-pointer">Projects Gallery</b> for his latest artifacts!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
