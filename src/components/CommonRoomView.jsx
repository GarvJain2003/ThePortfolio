import React from 'react';
import { Send, User } from 'lucide-react';

const CommonRoomView = () => {
    const [messages, setMessages] = React.useState([
        { id: 1, user: "Draco M.", text: "My father will hear about this!", time: "2 mins ago", house: "slytherin" },
        { id: 2, user: "Harry P.", text: "Relax Draco, it's just a div.", time: "1 min ago", house: "gryffindor" },
        { id: 3, user: "Luna L.", text: "I suspect the nargles are behind these glitches.", time: "Just now", house: "ravenclaw" }
    ]);
    const [input, setInput] = React.useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage = {
            id: Date.now(),
            user: "Garv Jain",
            text: input,
            time: "Just now",
            house: "ravenclaw" // Default for current user
        };
        setMessages([...messages, newMessage]);
        setInput("");
    };

    const getHouseColor = (house) => {
        switch (house) {
            case 'gryffindor': return 'text-red-700 bg-red-50 border-red-200';
            case 'slytherin': return 'text-green-800 bg-green-50 border-green-200';
            case 'ravenclaw': return 'text-blue-700 bg-blue-50 border-blue-200';
            case 'hufflepuff': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
            default: return 'text-gray-700 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col">
            <div className="bg-white border border-fb-border p-4 shadow-sm mb-4">
                <h2 className="font-headline text-2xl font-bold text-fb-blue">Hogwarts Common Room</h2>
                <p className="text-xs text-ink/60">A global floo network for all houses.</p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white border border-fb-border shadow-sm flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${getHouseColor(msg.house).split(' ')[2]} bg-white`}>
                                {msg.user[0]}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className={`font-bold text-xs ${getHouseColor(msg.house).split(' ')[0]}`}>{msg.user}</span>
                                    <span className="text-[10px] text-ink/40">{msg.time}</span>
                                </div>
                                <div className={`p-2 rounded-r-lg rounded-bl-lg text-sm border inline-block max-w-[90%] ${getHouseColor(msg.house)}`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-fb-border bg-gray-50 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Cast a message..."
                        className="flex-1 border border-fb-border rounded px-3 py-2 text-sm outline-none focus:border-fb-blue transition-colors"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-fb-blue text-white p-2 rounded hover:bg-fb-blue-dark transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommonRoomView;
