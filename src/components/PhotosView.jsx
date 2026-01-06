import React, { useState } from 'react';
import { Image, ExternalLink } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';
import SimpleModal from './SimpleModal';
import TalkingPortrait from './TalkingPortrait';
import steveJobsImg from '../assets/steve_jobs_wizard.png';
import adaLovelaceImg from '../assets/ada_lovelace_witch.png';
import alanTuringImg from '../assets/alan_turing_wizard.png';
import markZuckerbergImg from '../assets/mark_zuckerberg_wizard.png';

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

            {/* Hall of Visionaries */}
            <div className="p-4 mb-8">
                <h3 className="font-headline text-xl font-bold text-[#5d4037] mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚡</span> Hall of Visionaries
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <TalkingPortrait
                        name="Steve Jobs"
                        imageSrc={steveJobsImg}
                        quote="Stay hungry, stay foolish."
                    />
                    <TalkingPortrait
                        name="Ada Lovelace"
                        imageSrc={adaLovelaceImg}
                        quote="That brain of mine is something more than merely mortal."
                    />
                    <TalkingPortrait
                        name="Alan Turing"
                        imageSrc={alanTuringImg}
                        quote="We can see plenty there that needs to be done."
                    />
                    <TalkingPortrait
                        name="Mark Zuckerberg"
                        imageSrc={markZuckerbergImg}
                        quote="The biggest risk is not taking any risk."
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {photos.map((src, i) => (
                    <div key={i} className="aspect-[4/5] relative group overflow-hidden border-[12px] border-[#3e2723] outline outline-2 outline-[#bea472] outline-offset-[-6px] shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer transform hover:scale-105 transition-all duration-500 rotate-1 hover:rotate-0 hover:z-10 bg-[#1a120b]">
                        {/* "Moving" Effect via CSS Scale/Pan */}
                        <div className="absolute inset-0 overflow-hidden bg-sepia-200">
                            <img
                                src={src.includes('?') ? src : `${src}?w=500&h=600&fit=crop`}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-125 group-hover:translate-x-2 transition-all duration-[3000ms] ease-linear sepia-[.3] group-hover:sepia-0"
                                alt={`Moving Memory ${i}`}
                            />
                        </div>

                        {/* Film Grain / Old Photo Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 pointer-events-none"></div>

                        {/* Brass Plaque Caption */}
                        <div className="absolute inset-x-4 bottom-4 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] p-1 shadow-lg transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 rounded-sm border border-[#5c4033]">
                            <div className="border border-[#7c5636]/50 p-1">
                                <p className="text-[#3e2723] text-[10px] font-headline font-bold text-center uppercase tracking-widest drop-shadow-sm">
                                    Enchanted Memory #{i + 1}
                                </p>
                            </div>
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
