import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Lock, LogOut, Mail, Calendar, User } from 'lucide-react';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                fetchMessages();
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchMessages = async () => {
        try {
            const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            const msgs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Invalid credentials. Are you sure you are the Minister of Magic?');
        }
    };

    const handleLogout = () => {
        signOut(auth);
    };

    if (loading) return <div className="p-8 text-center">Casting authenticating spells...</div>;

    // Login View
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] animate-in fade-in">
                <div className="bg-paper border border-ink/20 p-8 shadow-lg max-w-sm w-full text-center">
                    <div className="mx-auto bg-ink/5 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Lock size={24} className="text-ink/60" />
                    </div>
                    <h2 className="font-headline text-2xl font-bold mb-1">Restricted Area</h2>
                    <p className="text-xs text-ink/50 italic mb-6">"Authorized Ministry Personnel Only"</p>

                    {error && <div className="bg-red-100 text-red-800 text-xs p-2 mb-4 border border-red-200">{error}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Ministry Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/50 border border-ink/20 p-2 font-serif text-sm focus:outline-none focus:border-fb-blue"
                        />
                        <input
                            type="password"
                            placeholder="Secret Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/50 border border-ink/20 p-2 font-serif text-sm focus:outline-none focus:border-fb-blue"
                        />
                        <button type="submit" className="w-full bg-fb-blue text-white font-bold py-2 hover:bg-fb-blue-dark transition-colors text-sm rounded-sm">
                            Alohomora (Unlock)
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Access Denied (if logged in but not Garv)
    if (user.email !== 'garvjain2003@gmail.com') {
        return (
            <div className="p-10 text-center">
                <h2 className="font-headline text-2xl text-red-800 mb-2">Access Denied</h2>
                <p>You are logged in as <b>{user.email}</b>, but you are not the High Inquisitor.</p>
                <button onClick={handleLogout} className="mt-4 text-fb-blue underline">Log Out</button>
            </div>
        );
    }

    // Dashboard View
    return (
        <div className="bg-white min-h-screen p-6">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="font-headline text-2xl text-fb-blue font-bold">Minister's Desk</h1>
                    <p className="text-xs text-gray-500">Managing Owl Post communications</p>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-red-600">
                    <LogOut size={14} /> Log Out
                </button>
            </div>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">No owls have arrived yet.</div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-paper border border-ink/10 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-fb-blue/10 text-fb-blue p-1 rounded"><User size={14} /></span>
                                    <span className="font-bold text-ink/80">{msg.name}</span>
                                </div>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                    <Calendar size={10} />
                                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleString() : 'Time-turner error'}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 border-b border-ink/5 pb-2">
                                <Mail size={12} />
                                <a href={`mailto:${msg.email}`} className="hover:underline hover:text-fb-blue">{msg.email}</a>
                            </div>
                            <p className="font-serif text-sm text-ink/80 whitespace-pre-wrap pl-4 border-l-2 border-fb-blue/20">
                                {msg.message}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
