import React, { useEffect, useRef } from 'react';
import { Send, Users, Sparkles, Pin } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';

const CommonRoomView = () => {
    const { user } = useOutcome();
    const chatEndRef = useRef(null);

    const [messages, setMessages] = React.useState([
        { id: 1, user: "Draco M.", text: "My father will hear about this!", time: "2 mins ago", house: "slytherin" },
        { id: 2, user: "Harry P.", text: "Relax Draco, it's just a div.", time: "1 min ago", house: "gryffindor" },
        { id: 3, user: "Hermione G.", text: "Is anyone else studying for the O.W.L.s in Full Stack Development?", time: "Just now", house: "gryffindor" },
        { id: 4, user: "Luna L.", text: "I suspect the nargles are behind these CSS glitches.", time: "Just now", house: "ravenclaw" }
    ]);
    const [input, setInput] = React.useState("");

    const activeWizards = [
        { name: "Harry Potter", house: "gryffindor", status: "Seeking Snitch" },
        { name: "Ron Weasley", house: "gryffindor", status: "Eating" },
        { name: "Hermione G.", house: "gryffindor", status: "Coding" },
        { name: "Draco Malfoy", house: "slytherin", status: "Complaining" },
        { name: "Luna Lovegood", house: "ravenclaw", status: "Daydreaming" },
        { name: "Cedric Diggory", house: "hufflepuff", status: "Chilling" }
    ];

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage = {
            id: Date.now(),
            user: user.name,
            text: input,
            time: "Just now",
            house: user.house.toLowerCase() || "ravenclaw" // Fallback
        };
        setMessages([...messages, newMessage]);
        setInput("");
    };

    const getHouseColor = (house) => {
        const h = house?.toLowerCase();
        switch (h) {
            case 'gryffindor': return 'text-red-900 bg-red-50 border-red-200';
            case 'slytherin': return 'text-green-900 bg-green-50 border-green-200';
            case 'ravenclaw': return 'text-blue-900 bg-blue-50 border-blue-200';
            case 'hufflepuff': return 'text-yellow-900 bg-yellow-50 border-yellow-200';
            default: return 'text-gray-900 bg-gray-50 border-gray-200';
        }
    };

    const getHouseBadge = (house) => {
        const h = house?.toLowerCase();
        switch (h) {
            case 'gryffindor': return '🦁';
            case 'slytherin': return '🐍';
            case 'ravenclaw': return '🦅';
            case 'hufflepuff': return '🦡';
            default: return '🧙';
        }
    };

    return (
        <div className="animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4">

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-paper border border-ink/20 shadow-sm relative overflow-hidden">
                {/* Magical Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

                {/* Header */}
                <div className="p-4 border-b border-ink/10 bg-white/50 backdrop-blur-sm flex justify-between items-center z-10">
                    <div>
                        <h2 className="font-headline text-2xl font-bold text-ink flex items-center gap-2">
                            <Sparkles className="text-fb-blue" size={20} /> Common Room
                        </h2>
                        <p className="text-xs text-ink/60 italic">The global floo network channel.</p>
                    </div>
                    <div className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {activeWizards.length + 1} Online
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 custom-scrollbar">
                    {/* Pinned Notice */}
                    <div className="bg-[#fff9c4] border-l-4 border-yellow-500 p-3 shadow-sm mb-6 mx-4 transform -rotate-1">
                        <div className="flex items-center gap-2 font-bold text-yellow-800 text-xs uppercase mb-1">
                            <Pin size={12} /> Notice from the Headmaster
                        </div>
                        <p className="font-serif text-sm text-ink/80 italic">
                            "Please refrain from practicing transfiguration spells on the server logs. Thank you."
                        </p>
                    </div>

                    {messages.map(msg => (
                        <div key={msg.id} className={`flex gap-3 group animate-in slide-in-from-bottom-2 ${msg.user === user.name ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border shadow-sm shrink-0 ${getHouseColor(msg.house).split(' ')[2]} bg-white`} title={msg.house}>
                                {getHouseBadge(msg.house)}
                            </div>
                            <div className={`flex flex-col max-w-[80%] ${msg.user === user.name ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-baseline gap-2 mb-1 px-1">
                                    <span className={`font-bold text-xs ${msg.user === user.name ? 'text-fb-blue' : 'text-ink/70'}`}>{msg.user}</span>
                                    <span className="text-[9px] text-ink/30 uppercase">{msg.time}</span>
                                </div>
                                <div className={`p-3 text-sm border shadow-sm font-serif leading-relaxed relative ${msg.user === user.name
                                    ? 'bg-fb-blue text-white rounded-l-xl rounded-tr-xl border-fb-blue-dark'
                                    : 'bg-white text-ink/90 rounded-r-xl rounded-tl-xl border-ink/10'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-ink/10 bg-white/80 backdrop-blur-sm z-10 mb-20 md:mb-0">
                    <div className="flex gap-2 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={`Message the Common Room...`}
                            className="flex-1 bg-white border border-ink/20 rounded-full px-4 py-2.5 text-sm outline-none focus:border-fb-blue focus:ring-2 focus:ring-fb-blue/20 transition-all font-serif shadow-inner placeholder:italic placeholder:text-ink/30"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="bg-fb-blue text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-fb-blue-dark active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="text-[10px] text-center text-ink/30 mt-2 font-serif italic">
                        All messages are encrypted via Protego Totalum.
                    </div>
                </div>
            </div>

            {/* Right Sidebar: Who's Online (Hidden on mobile) */}
            <div className="hidden md:block w-64 bg-white border border-fb-border shadow-sm flex flex-col h-full">
                <div className="p-3 border-b border-fb-border bg-gray-50/50">
                    <h3 className="font-bold text-ink/70 text-xs uppercase tracking-wider flex items-center gap-2">
                        <Users size={14} /> Active Wizards
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {activeWizards.map((wiz, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-fb-blue/5 cursor-pointer group transition-colors">
                            <div className="relative">
                                <div className="w-8 h-8 bg-ink/5 rounded-full flex items-center justify-center text-sm border border-transparent group-hover:border-fb-blue/20">
                                    {getHouseBadge(wiz.house)}
                                </div>
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-xs text-ink/80 truncate group-hover:text-fb-blue">{wiz.name}</div>
                                <div className="text-[10px] text-ink/40 truncate italic">{wiz.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CommonRoomView;
