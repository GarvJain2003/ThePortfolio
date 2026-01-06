import React, { useState } from 'react';
import { X } from 'lucide-react';

const SimpleModal = ({ title, placeholder, onClose, onSubmit, buttonText = "Confirm" }) => {
    const [val, setVal] = useState("");

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-paper border-2 border-ink/20 p-6 w-full max-w-md shadow-2xl relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-ink/40 hover:text-red-600">
                    <X size={20} />
                </button>
                <h3 className="font-headline text-xl font-bold mb-4">{title}</h3>
                <input
                    autoFocus
                    type="text"
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-paper-dark border-b-2 border-ink/20 p-2 mb-6 font-serif focus:outline-none focus:border-fb-blue transition-colors"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-ink/60 hover:bg-ink/5 rounded">Cancel</button>
                    <button
                        onClick={() => { if (val.trim()) onSubmit(val); onClose(); }}
                        className="px-4 py-2 bg-fb-blue text-white text-xs font-bold rounded shadow hover:bg-fb-blue-dark">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SimpleModal;
