
import React, { useEffect, useState } from 'react';
import { Footprints } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';

const MaraudersMapView = () => {
    const { setCurrentView } = useOutcome();
    const [footprints, setFootprints] = useState([]);

    // Generate random footprints
    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const x = Math.random() * 80 + 10; // 10-90%
            const y = Math.random() * 80 + 10;
            const rotation = Math.random() * 360;

            setFootprints(prev => [...prev.slice(-10), { id, x, y, rotation }]);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animate-in fade-in duration-1000 h-[calc(100vh-140px)] relative overflow-hidden bg-[#d7c49e] border-[16px] border-[#5d4037] shadow-2xl p-8 font-serif text-[#3e2723]">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-80 pointer-events-none"></div>

            {/* Map Fold Lines */}
            <div className="absolute inset-0 flex">
                <div className="flex-1 border-r border-[#5d4037]/20"></div>
                <div className="flex-1 border-r border-[#5d4037]/20"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold tracking-widest uppercase drop-shadow-md mb-2" style={{ fontFamily: 'Times New Roman' }}>
                    The Marauder's Map
                </h2>
                <p className="text-sm md:text-lg italic opacity-80">
                    "Messrs Moony, Wormtail, Padfoot, and Prongs are proud to present..."
                </p>
            </div>

            {/* Map Content - Dummy Locations */}
            <div className="relative z-10 grid grid-cols-2 gap-20 text-center opacity-70">
                <div className="border-2 border-[#5d4037] p-4 rounded-lg bg-[#bcaaa4]/20 absolute top-20 left-10 w-40">
                    <span className="font-bold uppercase text-xs">Gryffindor<br />Common Room</span>
                </div>
                <div className="border-2 border-[#5d4037] p-4 rounded-lg bg-[#bcaaa4]/20 absolute bottom-40 right-20 w-40">
                    <span className="font-bold uppercase text-xs">Great Hall</span>
                </div>
                <div className="border-2 border-[#5d4037] p-4 rounded-lg bg-[#bcaaa4]/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48">
                    <span className="font-bold uppercase text-xs">Facebook HQ<br />(Restricted Section)</span>
                </div>
            </div>

            {/* Live Footprints Animation */}
            {footprints.map(fp => (
                <div
                    key={fp.id}
                    className="absolute text-[#3e2723] transition-all duration-1000 opacity-60"
                    style={{
                        top: `${fp.y}%`,
                        left: `${fp.x}%`,
                        transform: `rotate(${fp.rotation}deg)`
                    }}
                >
                    <Footprints size={24} className="animate-pulse" />
                    <span className="text-[10px] font-bold block ml-6 whitespace-nowrap">
                        {Math.random() > 0.5 ? 'Garv Jain' : 'Unknown Wizard'}
                    </span>
                </div>
            ))}

            {/* Footer / Close Button */}
            <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                <button
                    onClick={() => setCurrentView('feed')}
                    className="bg-[#5d4037] text-[#d7c49e] px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg border-2 border-[#8d6e63]"
                >
                    Mischief Managed
                </button>
            </div>
        </div>
    );
};

export default MaraudersMapView;
