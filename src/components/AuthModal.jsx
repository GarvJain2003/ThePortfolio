import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Lock, User, Wand, X } from 'lucide-react';

const AuthModal = ({ onClose, onSuccess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegistering) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Update profile with name
                await updateProfile(userCredential.user, {
                    displayName: name
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            let msg = 'Authentication failed.';
            if (err.code === 'auth/invalid-email') msg = 'Invalid email address.';
            if (err.code === 'auth/user-not-found') msg = 'No wizard found with this email.';
            if (err.code === 'auth/wrong-password') msg = 'Incorrect password.';
            if (err.code === 'auth/email-already-in-use') msg = 'Email already registered.';
            if (err.code === 'auth/weak-password') msg = 'Password should be at least 6 characters.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-paper border border-ink/20 p-8 shadow-2xl max-w-sm w-full relative rounded-sm">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 text-gray-600 p-1 rounded-full transition-colors z-50"
                    title="Close"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-6">
                    <div className="mx-auto bg-fb-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 text-fb-blue">
                        {isRegistering ? <Wand size={20} /> : <Lock size={20} />}
                    </div>
                    <h2 className="font-headline text-2xl font-bold text-fb-blue">
                        {isRegistering ? 'New Identity' : 'Verify Identity'}
                    </h2>
                    <p className="text-xs text-ink/50 italic">
                        {isRegistering ? 'Register your wand with the Ministry.' : 'Please identifying yourself to cast spells.'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-xs p-3 mb-4 rounded border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-ink/30"><User size={14} /></span>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-white/50 border border-ink/20 focus:border-fb-blue focus:outline-none text-sm font-serif rounded-sm"
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-ink/30">@</span>
                        <input
                            type="email"
                            placeholder="Owl Post Address (Email)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white/50 border border-ink/20 focus:border-fb-blue focus:outline-none text-sm font-serif rounded-sm"
                            required
                        />
                    </div>

                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-ink/30">***</span>
                        <input
                            type="password"
                            placeholder="Secret Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white/50 border border-ink/20 focus:border-fb-blue focus:outline-none text-sm font-serif rounded-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-fb-blue text-white font-bold py-2 rounded-sm hover:bg-fb-blue-dark transition-colors text-sm disabled:opacity-70"
                    >
                        {loading ? 'Casting...' : (isRegistering ? 'Issue Identity' : 'Log In')}
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-ink/5 pt-4">
                    <p className="text-xs text-ink/60 mb-2">
                        {isRegistering ? 'Already registered?' : 'Need a new identity?'}
                    </p>
                    <button
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setError('');
                        }}
                        className="text-fb-blue text-xs font-bold hover:underline"
                    >
                        {isRegistering ? 'Log In instead' : 'Register New Account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
