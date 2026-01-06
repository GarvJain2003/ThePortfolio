import React, { useState } from 'react';
import { Feather, Send, Check } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const OwlPost = () => {
    const [formState, setFormState] = useState('writing'); // writing, sending, sent
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill out the scroll before sealing it!");
            return;
        }

        setFormState('sending');

        try {
            // Save to Firestore
            await addDoc(collection(db, "messages"), {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                timestamp: new Date()
            });

            // Simulate "Owl Flying" delay (Keep the animation!)
            setTimeout(() => {
                setFormState('sent');
                // Reset form after a few seconds
                setTimeout(() => {
                    setFormState('writing');
                    setFormData({ name: '', email: '', message: '' });
                }, 3000);
            }, 2000); // 2 seconds to match animation

        } catch (error) {
            console.error("Error sending owl:", error);
            alert("The owl got lost in a storm! (Error saving to database)");
            setFormState('writing');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] animate-in fade-in duration-500">

            <div className={`relative transition-all duration-1000 ${formState === 'sending' ? 'scale-75 -translate-y-40 opacity-0' : 'scale-100 opacity-100'}`}>

                {/* Parchment Container */}
                <div className="bg-paper border-2 border-ink/10 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)] p-8 max-w-md w-full relative">

                    {/* Header */}
                    <div className="text-center mb-6 border-b border-ink/10 pb-4">
                        <div className="flex justify-center mb-2 text-ink/40">
                            <Feather size={32} />
                        </div>
                        <h2 className="font-headline text-2xl font-bold text-ink/80">Owl Post Service</h2>
                        <p className="font-serif italic text-xs text-ink/50">"Delivered anywhere, anytime."</p>
                    </div>

                    {formState === 'sent' ? (
                        <div className="text-center py-10 animate-in zoom-in duration-500">
                            <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                                <Check size={32} />
                            </div>
                            <h3 className="font-headline text-xl text-ink/80 mb-2">Owl Dispatched!</h3>
                            <p className="font-serif text-sm text-ink/60">Your message is on its way to Garv.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-bold text-xs uppercase tracking-wider text-ink/40 mb-1">From (Wizard/Witch)</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-paper-dark border-b border-ink/20 p-2 font-serif focus:outline-none focus:border-fb-blue transition-colors placeholder:italic placeholder:text-ink/20"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-xs uppercase tracking-wider text-ink/40 mb-1">Return Address (Owl/Email)</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-paper-dark border-b border-ink/20 p-2 font-serif focus:outline-none focus:border-fb-blue transition-colors placeholder:italic placeholder:text-ink/20"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-xs uppercase tracking-wider text-ink/40 mb-1">Scroll Content</label>
                                <textarea
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-paper-dark border-b border-ink/20 p-2 font-serif min-h-[100px] focus:outline-none focus:border-fb-blue transition-colors placeholder:italic placeholder:text-ink/20 resize-none"
                                    placeholder="Write your message here..."
                                />
                            </div>

                            <div className="pt-4 text-center">
                                <button
                                    type="submit"
                                    className="relative group cursor-pointer"
                                >
                                    {/* Wax Seal Button */}
                                    <div className="w-16 h-16 bg-red-800 rounded-full border-4 border-red-900 shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                        <div className="w-12 h-12 border-2 border-dashed border-red-900/50 rounded-full flex items-center justify-center">
                                            <span className="font-headline font-bold text-red-900/40 text-xs">SEND</span>
                                        </div>
                                    </div>
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-ink/40 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                        Seal & Send
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Simulated Owl Animation Element */}
            {formState === 'sending' && (
                <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[100]">
                    <div className="owl-fly-animation text-6xl drop-shadow-lg">
                        🦉
                    </div>
                </div>
            )}

            <style>{`
                .owl-fly-animation {
                    animation: flyOut 3s ease-in-out forwards;
                }
                @keyframes flyOut {
                    0% { transform: scale(0.5) translateY(200px) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; transform: scale(1) translateY(0px) rotate(-10deg); }
                    40% { transform: scale(1) translate(-20px, -50px) rotate(10deg); }
                    100% { transform: scale(0.2) translate(800px, -800px) rotate(20deg); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default OwlPost;
