import { User, Users, Image, Coffee, Scroll, BookOpen, Shield, Feather, Sparkles } from 'lucide-react';

const Sidebar = ({ onNavigate }) => {
    return (
        <div className="space-y-6">
            {/* Profile Card */}
            <div className="border border-ink/40 bg-paper p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                <div className="aspect-square bg-ink/10 mb-2 relative overflow-hidden group border border-ink/20">
                    <img
                        src="https://api.dicebear.com/7.x/bit/svg?seed=Garv&scale=120"
                        alt="Profile"
                        className="w-full h-full object-cover grayscale contrast-125 sepia group-hover:sepia-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                        <button
                            onClick={() => onNavigate('profile')}
                            className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded border border-white/40 hover:bg-white/40">
                            Edit Profile
                        </button>
                    </div>
                </div>
                <h3 className="font-headline font-bold text-xl text-center border-b border-ink/20 pb-1 mb-2">Garv Jain</h3>
                <p className="text-xs text-center italic mb-2 text-ink/70">"Mastering the Dark Arts of Full Stack Development"</p>

                <div className="text-xs space-y-1 px-1">
                    <div className="flex justify-between items-center group cursor-pointer hover:bg-ink/5 p-0.5 rounded">
                        <span className="opacity-70">Level:</span>
                        <b className="text-fb-blue">24 (Senior)</b>
                    </div>
                    <div className="flex justify-between items-center group cursor-pointer hover:bg-ink/5 p-0.5 rounded">
                        <span className="opacity-70">House:</span>
                        <b className="text-indigo-700">Ravenclaw</b>
                    </div>
                    <div className="flex justify-between items-center group cursor-pointer hover:bg-ink/5 p-0.5 rounded">
                        <span className="opacity-70">Wand:</span>
                        <b className="truncate max-w-[100px]" title="13' Silicon Core">13" Silicon</b>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="text-sm font-bold text-fb-blue space-y-1">
                <button
                    onClick={() => onNavigate('feed')}
                    className="w-full flex items-center gap-2 p-2 bg-fb-blue/5 border border-fb-blue/20 rounded hover:bg-fb-blue/10 transition-colors text-left"
                >
                    <Scroll size={16} /> <span className="flex-1">My Feed</span>
                </button>
                <button
                    onClick={() => onNavigate('projects')}
                    className="w-full flex items-center gap-2 p-2 hover:bg-fb-blue/10 rounded transition-colors text-left text-ink/80 hover:text-fb-blue group"
                >
                    <Sparkles size={16} className="text-purple-600 group-hover:text-fb-blue transition-colors" /> <span className="flex-1">Projects Gallery</span>
                    <span className="text-[10px] bg-purple-600 text-white px-1.5 rounded-full animate-pulse">New</span>
                </button>
                <button
                    onClick={() => onNavigate('profile')}
                    className="w-full flex items-center gap-2 p-2 hover:bg-fb-blue/10 rounded transition-colors text-left text-ink/80 hover:text-fb-blue"
                >
                    <User size={16} /> <span className="flex-1">Wizard Profile</span>
                </button>
                <button
                    onClick={() => onNavigate('friends')}
                    className="w-full flex items-center gap-2 p-2 hover:bg-fb-blue/10 rounded transition-colors text-left text-ink/80 hover:text-fb-blue"
                >
                    <Users size={16} /> <span className="flex-1">Fellow Wizards</span>
                </button>
                <button
                    onClick={() => onNavigate('photos')}
                    className="w-full flex items-center gap-2 p-2 hover:bg-fb-blue/10 rounded transition-colors text-left text-ink/80 hover:text-fb-blue"
                >
                    <Image size={16} /> <span className="flex-1">Moving Photos</span>
                </button>
                <button
                    onClick={() => onNavigate('common-room')}
                    className="w-full flex items-center gap-2 p-2 hover:bg-fb-blue/10 rounded transition-colors text-left text-ink/80 hover:text-fb-blue">
                    <Coffee size={16} /> <span className="flex-1">Common Room</span>
                </button>
                <div className="pt-2 mt-2 border-t border-ink/10">
                    <button
                        onClick={() => onNavigate('owl-post')}
                        className="w-full flex items-center gap-2 p-2 bg-red-900/5 text-red-900 font-headline font-bold rounded border border-red-900/10 hover:bg-red-900/10 transition-colors"
                    >
                        <Feather size={16} /> <span className="flex-1">Send Owl (Contact)</span>
                    </button>
                </div>
                <button
                    onClick={() => onNavigate('resume')}
                    className="w-full flex items-center gap-2 p-2 hover:bg-fb-blue/10 rounded transition-colors text-left text-ink/80 hover:text-fb-blue"
                >
                    <Scroll size={16} /> <span className="flex-1">Curriculum Vitae</span>
                </button>
            </nav>

            {/* "Groups" (Tech Stacks) */}
            <div className="pt-4 border-t border-ink/20">
                <h4 className="font-bold text-ink/60 text-xs mb-2 uppercase tracking-wider flex items-center gap-1">
                    <Shield size={10} /> Guilds & Groups
                </h4>
                <nav className="text-sm text-fb-blue space-y-1">
                    <div
                        onClick={() => onNavigate('guild:react')}
                        className="flex items-center gap-2 p-1 hover:bg-fb-blue/5 rounded group cursor-pointer"
                    >
                        <div className="w-4 h-4 bg-sky-500/20 rounded-sm group-hover:bg-sky-500 transition-colors"></div>
                        <span className="text-ink/80 group-hover:text-fb-blue group-hover:underline">React Enchanters</span>
                    </div>
                    <div
                        onClick={() => onNavigate('guild:js')}
                        className="flex items-center gap-2 p-1 hover:bg-fb-blue/5 rounded group cursor-pointer"
                    >
                        <div className="w-4 h-4 bg-yellow-500/20 rounded-sm group-hover:bg-yellow-500 transition-colors"></div>
                        <span className="text-ink/80 group-hover:text-fb-blue group-hover:underline">JS Alchemists</span>
                    </div>
                    <div
                        onClick={() => onNavigate('guild:node')}
                        className="flex items-center gap-2 p-1 hover:bg-fb-blue/5 rounded group cursor-pointer"
                    >
                        <div className="w-4 h-4 bg-green-500/20 rounded-sm group-hover:bg-green-500 transition-colors"></div>
                        <span className="text-ink/80 group-hover:text-fb-blue group-hover:underline">Node.js Potions</span>
                    </div>
                </nav>
            </div>

            {/* "Applications" (Portfolio Projects Links) */}
            <div className="pt-4 border-t border-ink/20">
                <h4 className="font-bold text-ink/60 text-xs mb-2 uppercase tracking-wider flex items-center gap-1">
                    <BookOpen size={10} /> Magical Apps
                </h4>
                <nav className="text-sm text-fb-blue space-y-1">
                    <div onClick={() => onNavigate('projects')} className="block p-1 hover:underline text-ink/80 hover:text-fb-blue cursor-pointer bg-fb-blue/5 rounded">• Shatranj (Chess)</div>
                    <div onClick={() => onNavigate('projects')} className="block p-1 hover:underline text-ink/80 hover:text-fb-blue cursor-pointer bg-fb-blue/5 rounded mt-0.5">• Recruitment SaaS</div>
                    <div onClick={() => onNavigate('app:sorting-hat')} className="block p-1 hover:underline text-ink/80 hover:text-fb-blue cursor-pointer mt-0.5">• Sorting Hat (AI)</div>
                    <div onClick={() => onNavigate('app:marauder')} className="block p-1 hover:underline text-ink/80 hover:text-fb-blue cursor-pointer">• Marauder's Map (Maps)</div>
                    <div onClick={() => onNavigate('admin')} className="block p-1 hover:underline text-red-800/60 hover:text-red-800 cursor-pointer mt-2 border-t border-ink/10 pt-1 text-[10px] uppercase tracking-widest">• Admin Login (Secret)</div>
                </nav>
            </div>

            <div className="text-[10px] text-ink/40 text-center pt-4">
                <p>Owl Post: garv@hogwarts.edu</p>
            </div>
        </div>
    );
};

export default Sidebar;

