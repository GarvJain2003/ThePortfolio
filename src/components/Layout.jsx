import React, { useState } from 'react';
import DevModeOverlay from './DevModeOverlay';
import { Code, Terminal, Briefcase, Scroll, Sparkles, Feather } from 'lucide-react';

const Layout = ({ children, sidebar, onNavigate }) => {
    return (
        <div className="min-h-screen bg-paper bg-repeat text-ink font-body flex flex-col">
            {/* Fixed Header */}
            <div className="sticky top-0 z-50">
                {/* Facebook Utility Bar */}
                <div className="h-8 bg-fb-blue border-b border-fb-blue-dark flex items-center px-4 justify-between text-white text-xs font-bold shadow-sm">
                    <div className="flex gap-4">
                        <span className="opacity-80 hover:opacity-100 cursor-pointer" onClick={() => onNavigate && onNavigate('feed')}>[ TheSocialProphet ]</span>
                        <span className="opacity-80 hover:opacity-100 cursor-pointer" onClick={() => onNavigate && onNavigate('profile')}>Profile</span>
                        <span className="opacity-80 hover:opacity-100 cursor-pointer" onClick={() => onNavigate && onNavigate('friends')}>Friends</span>
                        <span className="opacity-80 hover:opacity-100 cursor-pointer" onClick={() => onNavigate && onNavigate('messages')}>Owls (3)</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="opacity-80 hover:opacity-100 cursor-pointer" onClick={() => onNavigate && onNavigate('profile')}>Account Settings</span>
                        <span className="opacity-80 hover:opacity-100 cursor-pointer" onClick={() => alert("Logout spell cast! (Mock)")}>Logout</span>
                    </div>
                </div>

                {/* Daily Prophet Branding Header */}
                <div className="bg-paper border-b-4 border-double border-ink/80 py-4 px-6 shadow-md text-center bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] relative overflow-hidden">
                    <h1 className="text-5xl md:text-7xl font-headline tracking-tighter uppercase text-ink drop-shadow-sm transform scale-y-110 cursor-pointer" onClick={() => onNavigate && onNavigate('feed')}>
                        The Social Prophet
                    </h1>
                    <div className="flex justify-between border-t border-b border-ink mt-2 py-1 text-xs md:text-sm font-bold uppercase tracking-widest">
                        <span>Vol. MVXXIV</span>
                        <span>Wizarding World's First Social Network</span>
                        <span>2 Galleons</span>
                    </div>

                    {/* News Ticker */}
                    <div className="absolute bottom-0 left-0 right-0 bg-ink text-[#fcf5e5] text-[10px] font-bold uppercase tracking-widest py-1 overflow-hidden">
                        <div className="whitespace-nowrap animate-marquee inline-block">
                            BREAKING NEWS: Garv Jain applies for Position of Software Engineer at Meta • "A heavy blow to Google" says Rita Skeeter • React 19 Spells Discovered in Ancient Ruins • Ministry of Magic Reforms Coding Standards • Flying Ford Anglia Spotted near Menlo Park •
                        </div>
                    </div>
                </div>
            </div>

            {/* Golden Snitch (Floating Easter Egg) */}
            <div className="fixed z-[60] pointer-events-none animate-fly-random w-8 h-8 opacity-0 hover:opacity-100 transition-opacity duration-300 group">
                <div className="absolute inset-0 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)] animate-pulse"></div>
                <div className="absolute -left-4 top-0 w-6 h-2 bg-white/50 rounded-full animate-flutter-left origin-right"></div>
                <div className="absolute -right-4 top-0 w-6 h-2 bg-white/50 rounded-full animate-flutter-right origin-left"></div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex justify-center p-4 md:p-6 gap-6 max-w-7xl mx-auto w-full relative">

                {/* Floating "Magic Particles" Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                    <div className="absolute top-10 left-10 text-fb-blue animate-float-slow">✨</div>
                    <div className="absolute top-1/2 right-10 text-purple-500 animate-float-delayed">⚡</div>
                    <div className="absolute bottom-20 left-1/4 text-yellow-500 animate-float-reverse">🌟</div>
                </div>

                {/* Left Sidebar (Profile/Nav) */}
                <aside className="hidden md:block w-48 lg:w-64 flex-shrink-0 space-y-6 relative z-10" data-component="Sidebar">
                    {sidebar}
                </aside>

                {/* Center Feed */}
                <main className="flex-grow max-w-2xl bg-white/20 p-px shadow-sm min-h-screen relative z-10" data-component="MainFeed"> {/* White wash for contrast */}
                    {children}
                </main>

                {/* Right Sidebar (Recruiter Dashboard - Ministry Decree Style) */}
                <aside className="hidden lg:block w-64 flex-shrink-0 space-y-4 sticky top-24 h-fit relative z-10" data-component="RecruiterDashboard">
                    <div className="bg-[#fcf5e5] border-4 border-double border-ink p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] text-center relative pointer-events-auto transition-transform hover:scale-105 duration-300">
                        {/* Decorative corners could be added here with pseudos, but keep simple for now */}
                        <div className="mb-4 border-b-2 border-ink pb-2">
                            <h4 className="font-headline font-bold text-2xl tracking-widest text-ink uppercase leading-none mb-1">
                                Proclamation
                            </h4>
                            <p className="font-serif text-[10px] uppercase tracking-widest text-ink/60">
                                By Order of the Applicant
                            </p>
                        </div>

                        <div className="space-y-4 relative">
                            {/* Status Seal */}
                            <div className="absolute -top-12 -right-6 rotate-12 opacity-80">
                                <div className="w-16 h-16 rounded-full border-4 border-double border-red-700 bg-red-800/10 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                    <div className="w-12 h-12 border border-red-700 rounded-full flex items-center justify-center">
                                        <span className="text-[8px] font-bold text-red-900 uppercase text-center leading-none -rotate-12">Hired<br />Approved</span>
                                    </div>
                                </div>
                            </div>

                            <div className="font-serif text-sm leading-relaxed text-ink/90 italic">
                                "Candidate is hereby declared
                                <span className="font-bold border-b border-ink/40 mx-1">Open To Work</span>
                                and seeks immediate audience."
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-3 pt-2">
                                <button
                                    onClick={() => onNavigate && onNavigate('resume')}
                                    className="w-full group relative px-4 py-2 border-2 border-ink bg-transparent hover:bg-ink hover:text-[#fcf5e5] transition-colors font-headline font-bold uppercase tracking-wider text-xs"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Scroll size={14} /> Review Scroll
                                    </span>
                                </button>

                                <button
                                    onClick={() => onNavigate && onNavigate('projects')}
                                    className="w-full group relative px-4 py-2 border-2 border-ink bg-transparent hover:bg-ink hover:text-[#fcf5e5] transition-colors font-headline font-bold uppercase tracking-wider text-xs"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Sparkles size={14} /> View Magic
                                    </span>
                                </button>

                                <button
                                    onClick={() => onNavigate && onNavigate('owl-post')}
                                    className="w-full group relative px-4 py-2 border-2 border-ink bg-transparent hover:bg-ink hover:text-[#fcf5e5] transition-colors font-headline font-bold uppercase tracking-wider text-xs"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Feather size={14} /> Send Owl
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 pt-2 border-t border-ink/20 text-[10px] font-serif">
                            Decree No. 2026
                        </div>
                    </div>

                    <div className="border border-fb-border bg-white p-3 text-xs opacity-60 hover:opacity-100 transition-opacity">
                        <h4 className="text-fb-blue font-bold mb-2">Sponsored</h4>
                        <div className="space-y-2">
                            <div className="group cursor-pointer">
                                <div className="h-10 bg-ink/10 mb-1 group-hover:bg-ink/20 transition-colors"></div>
                                <p className="font-bold text-fb-blue">Weasley's Wizard Wheezes</p>
                                <p>Now hiring Pyrotechnicians!</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Footer */}
            <footer className="text-center p-4 text-xs text-ink/60 border-t border-ink/20 mt-8 relative z-10">
                The Social Prophet &copy; 2026 • A Meta-Magical Production
            </footer>

            {/* Styles for new animations */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                
                @keyframes fly-random {
                    0% { top: 10%; left: 10%; transform: rotate(0deg); opacity: 0; }
                    20% { top: 30%; left: 80%; transform: rotate(10deg); opacity: 1; }
                    40% { top: 70%; left: 20%; transform: rotate(-5deg); opacity: 0.5; }
                    60% { top: 50%; left: 90%; transform: rotate(15deg); opacity: 1; }
                    80% { top: 20%; left: 40%; transform: rotate(-10deg); opacity: 0.8; }
                    100% { top: 10%; left: 10%; transform: rotate(0deg); opacity: 0; }
                }
                .animate-fly-random {
                    animation: fly-random 20s ease-in-out infinite;
                }

                @keyframes flutter-left {
                    0%, 100% { transform: rotate(-10deg); }
                    50% { transform: rotate(30deg); }
                }
                .animate-flutter-left {
                    animation: flutter-left 0.1s linear infinite;
                }

                @keyframes flutter-right {
                    0%, 100% { transform: rotate(10deg); }
                    50% { transform: rotate(-30deg); }
                }
                .animate-flutter-right {
                    animation: flutter-right 0.1s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Layout;
