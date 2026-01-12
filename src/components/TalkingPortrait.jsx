
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';

const TalkingPortrait = ({ name, imageSrc, quote, audioUrl }) => {
    const { isMuted } = useOutcome();
    const [isHovered, setIsHovered] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);

    // Audio Ref
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioUrl) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.volume = 0.5;
        }
    }, [audioUrl]);

    useEffect(() => {
        let typingTimeout;
        if (isHovered) {
            setShowSpeechBubble(true);
            setIsTyping(true);
            setDisplayedText("");

            // Play Audio
            if (audioRef.current && !isMuted) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            }

            let charIndex = 0;

            const typeChar = () => {
                if (charIndex < quote.length) {
                    setDisplayedText(quote.slice(0, charIndex + 1));
                    charIndex++;
                    typingTimeout = setTimeout(typeChar, 50); // Typing speed
                } else {
                    setIsTyping(false);
                }
            };
            typeChar();
        } else {
            // Stop Audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            // Reset when not hovered (optional: could wait before hiding)
            setShowSpeechBubble(false);
            setDisplayedText("");
            setIsTyping(false);
            if (typingTimeout) clearTimeout(typingTimeout);
        }

        return () => {
            if (typingTimeout) clearTimeout(typingTimeout);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [isHovered, quote, isMuted]);


    return (
        <div
            className="relative group w-full aspect-[4/5] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Frame */}
            <div className={`absolute inset-0 border-[16px] border-[#5d4037] rounded-sm shadow-xl z-20 transition-all duration-500 ${isHovered ? 'scale-105 border-[#8d6e63]' : ''}`}>
                {/* Inner Gold border */}
                <div className="absolute inset-0 border-[4px] border-[#ffd700] opacity-50"></div>
            </div>

            {/* Image Container */}
            <div className="absolute inset-2 z-10 overflow-hidden bg-[#2b1b17]">
                <img
                    src={imageSrc}
                    alt={`Portrait of ${name}`}
                    className={`w-full h-full object-cover transition-all duration-[2000ms] ${isHovered ? 'sepia-0 scale-110 saturate-100' : 'sepia-[0.6] scale-100 saturate-50'}`}
                />

                {/* Magical Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                {/* Audio Indicator */}
                {audioUrl && isHovered && (
                    <div className="absolute top-2 right-2 text-[#fff9c4] bg-black/30 p-1 rounded-full animate-pulse">
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </div>
                )}
            </div>

            {/* Name Plate */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] px-4 py-1 rounded shadow-lg border border-[#5c4033] min-w-[120px] text-center">
                <p className="font-serif text-[#3e2723] font-bold text-xs uppercase tracking-widest">{name}</p>
            </div>

            {/* Speech Bubble */}
            <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 z-40 w-64 transition-all duration-500 ${showSpeechBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="bg-[#fff9c4] text-[#3e2723] p-4 rounded-xl shadow-2xl border-2 border-[#5c4033] relative font-serif text-sm italic leading-relaxed">
                    "{displayedText}"
                    {isTyping && <span className="animate-pulse">|</span>}

                    {/* Triangle pointer */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#fff9c4] border-b-2 border-r-2 border-[#5c4033] rotate-45"></div>
                </div>
            </div>
        </div>
    );
};

export default TalkingPortrait;
