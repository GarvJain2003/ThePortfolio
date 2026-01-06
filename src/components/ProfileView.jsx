import React from 'react';
import { MapPin, Briefcase, GraduationCap, Heart, Calendar } from 'lucide-react';

const ProfileView = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Cover Photo area (Newspaper Header style) */}
            <div className="bg-paper border border-ink/20 p-2 shadow-sm relative">
                <div className="h-48 bg-ink/5 flex items-center justify-center border border-dashed border-ink/20">
                    <span className="font-headline text-2xl text-ink/20 uppercase tracking-widest">Cover Portrait Area</span>
                </div>
                <div className="absolute -bottom-12 left-6 border-4 border-paper bg-white w-32 h-32 shadow-md">
                    <img src="https://api.dicebear.com/7.x/bit/svg?seed=Garv&scale=120" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Info Header */}
            <div className="pl-40 pt-2 flex justify-between items-end pb-4 border-b border-fb-border">
                <div>
                    <h1 className="font-headline text-3xl font-bold">Garv Jain</h1>
                    <p className="text-ink/60 font-serif italic">"I solemnly swear that I am up to no good code."</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => alert("Profile editing requires a quill and parchment! (Mock)")}
                        className="bg-fb-border/20 hover:bg-fb-border/40 text-ink/80 px-3 py-1 text-xs font-bold rounded border border-ink/10">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left Col: Info */}
                <div className="space-y-4">
                    <div className="bg-white border border-fb-border p-3 shadow-sm">
                        <h3 className="font-bold text-fb-blue text-sm mb-2 border-b border-fb-border pb-1">Wizard Stats</h3>
                        <ul className="text-xs space-y-2 text-ink/80">
                            <li className="flex items-center gap-2"><Briefcase size={12} /> <span>Senior Sorcerer at <b>Meta</b></span></li>
                            <li className="flex items-center gap-2"><GraduationCap size={12} /> <span>Studied at <b>Hogwarts</b></span></li>
                            <li className="flex items-center gap-2"><MapPin size={12} /> <span>Lives in <b>Diagon Alley</b></span></li>
                            <li className="flex items-center gap-2"><Heart size={12} /> <span>Single</span></li>
                            <li className="flex items-center gap-2"><Calendar size={12} /> <span>Joined 2024</span></li>
                        </ul>
                    </div>

                    <div className="bg-white border border-fb-border p-3 shadow-sm">
                        <h3 className="font-bold text-fb-blue text-sm mb-2 border-b border-fb-border pb-1">Friends (1,024)</h3>
                        <div className="grid grid-cols-3 gap-1">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="aspect-square bg-ink/10">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-full h-full object-cover" />
                                    <div className="text-[9px] text-center truncate pt-0.5">Friend {i + 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Timeline */}
                <div className="md:col-span-2 space-y-4">
                    {/* Stub for recent activity */}
                    <div className="bg-white border border-fb-border p-4 shadow-sm text-center py-8">
                        <p className="text-ink/40 italic font-serif">-- End of Parchment --</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
