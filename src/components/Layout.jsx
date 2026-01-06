import React from 'react';

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
                    <div className="flex gap-4">
                        <span className="opacity-80 hover:opacity-100 cursor-pointer" onClick={() => onNavigate && onNavigate('profile')}>Account Settings</span>
                        <span className="opacity-80 hover:opacity-100 cursor-pointer" onClick={() => alert("Logout spell cast! (Mock)")}>Logout</span>
                    </div>
                </div>

                {/* Daily Prophet Branding Header */}
                <div className="bg-paper border-b-4 border-double border-ink/80 py-4 px-6 shadow-md text-center bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
                    <h1 className="text-5xl md:text-7xl font-headline tracking-tighter uppercase text-ink drop-shadow-sm transform scale-y-110 cursor-pointer" onClick={() => onNavigate && onNavigate('feed')}>
                        The Social Prophet
                    </h1>
                    <div className="flex justify-between border-t border-b border-ink mt-2 py-1 text-xs md:text-sm font-bold uppercase tracking-widest">
                        <span>Vol. MVXXIV</span>
                        <span>Wizarding World's First Social Network</span>
                        <span>2 Galleons</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex justify-center p-4 md:p-6 gap-6 max-w-7xl mx-auto w-full">
                {/* Left Sidebar (Profile/Nav) */}
                <aside className="hidden md:block w-48 lg:w-64 flex-shrink-0 space-y-6">
                    {sidebar}
                </aside>

                {/* Center Feed */}
                <main className="flex-grow max-w-2xl bg-white/20 p-px shadow-sm"> {/* White wash for contrast */}
                    {children}
                </main>

                {/* Right Sidebar (Ads/Events - Optional for now) */}
                <aside className="hidden lg:block w-64 flex-shrink-0 space-y-4">
                    <div className="border border-fb-border bg-white p-3 text-xs">
                        <h4 className="text-fb-blue font-bold mb-2">Sponsored</h4>
                        <div className="space-y-2">
                            <div className="group cursor-pointer">
                                <div className="h-20 bg-ink/10 mb-1 group-hover:bg-ink/20 transition-colors"></div>
                                <p className="font-bold text-fb-blue">Oliver's Brooms</p>
                                <p>Nimbus 2025 releases soon!</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Footer */}
            <footer className="text-center p-4 text-xs text-ink/60 border-t border-ink/20 mt-8">
                The Social Prophet &copy; 2026 • A Meta-Magical Production
            </footer>
        </div>
    );
};

export default Layout;
