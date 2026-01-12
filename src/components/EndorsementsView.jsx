import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { Star, Award, Feather, ThumbsUp } from 'lucide-react';

const EndorsementsView = () => {
    const [endorsements, setEndorsements] = useState([]);
    const [newEndorsement, setNewEndorsement] = useState({ name: '', role: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Real-time listener for Endorsements
    useEffect(() => {
        const q = query(collection(db, 'endorsements'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEndorsements(data);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newEndorsement.name || !newEndorsement.message) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'endorsements'), {
                ...newEndorsement,
                timestamp: new Date(),
                verified: false // Requires Admin approval clearly
            });
            setNewEndorsement({ name: '', role: '', message: '' });
            alert("Endorsement sent via Owl Post! Waiting for Ministry review.");
        } catch (err) {
            console.error("Error endorsing:", err);
            alert("Failed to send endorsement.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="font-headline text-3xl text-fb-blue flex items-center justify-center gap-2">
                    <Award className="text-yellow-600" /> Ministry Commendations
                </h1>
                <p className="font-serif text-ink/60 italic">"Words of high praise from fellow wizards and muggles alike."</p>
            </div>

            {/* Endorsements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {endorsements.map((item) => (
                    <div key={item.id} className="bg-white border border-ink/10 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Feather size={48} />
                        </div>

                        <p className="font-serif text-lg text-ink mb-4 relative z-10">"{item.message}"</p>

                        <div className="flex items-center gap-3 border-t border-ink/5 pt-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fb-blue to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-fb-blue">{item.name}</h3>
                                <p className="text-xs text-ink/50 uppercase tracking-wider">{item.role || 'Wizard'}</p>
                            </div>
                        </div>

                        {/* LinkedIn Integration Indicator (If synced) */}
                        {item.source === 'linkedin' && (
                            <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-[#0077b5] font-bold bg-[#0077b5]/10 px-2 py-0.5 rounded-full">
                                <span className="w-1 h-1 bg-[#0077b5] rounded-full"></span> LinkedIn
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Endorsement Form */}
            <div className="bg-[#fcf5e5] border border-ink/10 p-6 rounded-sm max-w-2xl mx-auto mt-12">
                <h3 className="font-headline text-xl mb-4 flex items-center gap-2">
                    <Feather size={18} /> Scrawl a Recommendation
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={newEndorsement.name}
                            onChange={e => setNewEndorsement({ ...newEndorsement, name: e.target.value })}
                            className="bg-white border border-ink/20 p-2 text-sm focus:border-fb-blue outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Title / House"
                            value={newEndorsement.role}
                            onChange={e => setNewEndorsement({ ...newEndorsement, role: e.target.value })}
                            className="bg-white border border-ink/20 p-2 text-sm focus:border-fb-blue outline-none"
                        />
                    </div>
                    <textarea
                        placeholder="What makes this wizard extraordinary?"
                        value={newEndorsement.message}
                        onChange={e => setNewEndorsement({ ...newEndorsement, message: e.target.value })}
                        className="w-full bg-white border border-ink/20 p-2 text-sm focus:border-fb-blue outline-none h-24 resize-none"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-fb-blue text-white font-bold px-6 py-2 text-sm uppercase tracking-wider hover:bg-fb-blue-dark transition-colors w-full"
                    >
                        {isSubmitting ? 'Sending Owl...' : 'Submit Endorsement'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EndorsementsView;
