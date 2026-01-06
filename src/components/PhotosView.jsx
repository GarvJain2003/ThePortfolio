import React, { useState } from 'react';
import { Image, ExternalLink } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';
import SimpleModal from './SimpleModal';

const PhotosView = () => {
    const { photos, addPhoto } = useOutcome();
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="animate-in fade-in duration-500">
            <div className="bg-white border border-fb-border p-4 shadow-sm mb-4 flex justify-between items-center">
                <h2 className="font-headline text-2xl font-bold flex items-center gap-2">
                    <span className="text-fb-blue">Your Moving Photos</span>
                </h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-xs font-bold text-fb-blue hover:underline">
                    + Add New Scroll
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {photos.map((src, i) => (
                    <div key={i} className="aspect-square relative group overflow-hidden border border-ink/10 bg-black cursor-pointer">
                        <img
                            src={src.includes('?') ? src : `${src}?w=400&h=400&fit=crop`}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            alt={`Photo ${i}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs font-serif italic">"Enchanted Memory #{i + 1}"</p>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <SimpleModal
                    title="Add a Motion Picture"
                    placeholder="Enter image URL..."
                    buttonText="Enchant"
                    onClose={() => setShowModal(false)}
                    onSubmit={addPhoto}
                />
            )}
        </div>
    );
};

export default PhotosView;
