import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useOutcome } from '../context/OutcomeContext';
import { School, Users, Sparkles, Feather, Footprints, Key } from 'lucide-react';

const LandingPage = () => {
    const { setCurrentView, user } = useOutcome();
    const [isBoarding, setIsBoarding] = useState(false);
    const [isTraveling, setIsTraveling] = useState(false);

    const [isFlying, setIsFlying] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleBoardTrain = (e) => {
        if (e) e.preventDefault();
        setIsBoarding(true);

        // Steam/Smoke Animation sequence
        const timeline = gsap.timeline({
            onComplete: () => {
                // Start Train Ride instead of immediate navigation
                setIsTraveling(true);

                // Ride for 4 seconds then arrive
                setTimeout(() => {
                    gsap.to(".train-overlay", {
                        opacity: 0,
                        duration: 1,
                        onComplete: () => setCurrentView('profile')
                    });
                }, 4000);
            }
        });

        // Steam fills the ticket
        timeline.to(".ticket-content", { opacity: 0, scale: 1.1, duration: 0.5, ease: "power1.in" })
            .to(".landing-content", { opacity: 0, duration: 1, delay: 0.2 });

        // Map fold happens in parallel/slightly after
        gsap.to(".map-left", { rotateY: 0, duration: 1.5, delay: 0.5, ease: "power2.inOut" });
        gsap.to(".map-right", { rotateY: 0, duration: 1.5, delay: 0.5, ease: "power2.inOut" });

    };

    // Map Unfold Animation
    useEffect(() => {
        const timeline = gsap.timeline();
        timeline
            .to(".map-left", { rotateY: -100, opacity: 0, duration: 2.5, ease: "power2.inOut", delay: 1 })
            .to(".map-right", { rotateY: 100, opacity: 0, duration: 2.5, ease: "power2.inOut" }, "<");
    }, []);

    const [keys, setKeys] = useState([]);

    // Generate random flying keys
    useEffect(() => {
        const newKeys = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 10,
            scale: 0.5 + Math.random() * 0.5
        }));
        setKeys(newKeys);
    }, []);

    return (
        <div className="min-h-screen bg-paper font-sans text-ink bg-repeat overflow-hidden relative" style={{ backgroundImage: "var(--background-image-paper-texture)" }}>

            {/* Train Ride Visual Overlay */}
            {/* Photorealistic Cinematic Train Ride Visual Overlay */}
            {isTraveling && (
                <div className="train-overlay fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden animate-shake">

                    {/* Layer 0: The Dark Void */}
                    <div className="absolute inset-0 z-10 bg-[#020202]"></div>

                    {/* Layer 1: Moving Background (Hogwarts Mountains) - Slow */}
                    <div className="absolute inset-0 z-12 animate-scenery"
                        style={{
                            backgroundImage: "url('/hogwarts_mountains_real.png')",
                            backgroundSize: "cover",
                            backgroundRepeat: "repeat-x",
                            animationDuration: "30s", // Distant mountains move slowly
                            filter: "brightness(0.6)"
                        }}>
                    </div>

                    {/* Layer 2: Moving Midground (Forbidden Forest) - FAST */}
                    <div className="absolute inset-0 z-13 animate-scenery-mid mix-blend-multiply"
                        style={{
                            backgroundImage: "url('/forbidden_forest_real.png')",
                            backgroundSize: "auto 100%",
                            backgroundRepeat: "repeat-x",
                            animationDuration: "4s", // Much faster for parallax
                            filter: "brightness(0.4)"
                        }}>
                    </div>

                    {/* Layer 3: Foreground Ground Blur (Ultra Fast) */}
                    <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-14 animate-scenery-mid mix-blend-multiply opacity-80"
                        style={{
                            backgroundImage: "url('/motion_blur_ground.png')", // Generated motion blur texture
                            backgroundSize: "auto 100%",
                            backgroundRepeat: "repeat-x",
                            animationDuration: "0.5s", // Extremely fast
                            filter: "brightness(0.3) blur(2px)"
                        }}>
                    </div>

                    {/* Layer 3.5: Easter Egg - Flying Car Fly-By (Bigger & Slower) */}
                    <div className="absolute inset-0 z-15 pointer-events-none flex items-center justify-center animate-car-fly-by">
                        {/* Increased size and duration in CSS ensures user can see Harry and Ron */}
                        <img src="/flying_car_wave.png" alt="Flying Ford Anglia" className="w-[500px] h-auto object-contain drop-shadow-[0_0_20px_rgba(200,200,255,0.4)]" />
                    </div>

                    {/* Layer 4: Rain Overlay (Atmosphere) */}
                    <div className="absolute inset-0 z-16 opacity-40 pointer-events-none mix-blend-overlay">
                        {[...Array(30)].map((_, i) => (
                            <div key={`rain-${i}`} className="absolute w-[2px] h-[80px] bg-gradient-to-b from-transparent via-blue-200 to-transparent animate-rain"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `-${Math.random() * 20}%`,
                                    animationDuration: `${0.3 + Math.random() * 0.3}s`,
                                    animationDelay: `${Math.random() * 1}s`
                                }}>
                            </div>
                        ))}
                    </div>

                    {/* Layer 6: FABRICATED INTERIOR (Green Screen Removal) */}
                    <div className="absolute inset-0 z-50 pointer-events-none flex flex-col">

                        {/* 1. Mahogany Wall with Window Cutout (Using radial mask for 100% Transparency) */}
                        <div className="absolute inset-0 z-10 bg-no-repeat shadow-[inset_0_0_200px_black]"
                            style={{
                                backgroundImage: "url('/mahogany_panel.png')",
                                backgroundSize: "600px",
                                // The mask creates a transparent circle in the center. Everything else is wood.
                                maskImage: "radial-gradient(circle at center, transparent 35%, black 45%)",
                                WebkitMaskImage: "radial-gradient(circle at center, transparent 35%, black 45%)"
                            }}>
                        </div>

                        {/* 2. Red Velvet Curtains (Overlay with Multiply Blend) */}
                        {/* The asset 'red_velvet_curtains.png' has a white center. We use mix-blend-multiply to make white transparent. */}
                        <div className="absolute inset-0 z-20 mix-blend-multiply"
                            style={{
                                backgroundImage: "url('/red_velvet_curtains.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "contrast(1.2)"
                            }}>
                        </div>

                        {/* 3. Vintage Lamp (Overlay with Screen Blend) */}
                        {/* The asset 'vintage_wall_lamp.png' has a black background. We use mix-blend-screen to make black transparent. */}
                        <div className="absolute top-[20%] right-[5%] w-[150px] h-[200px] z-30 mix-blend-screen opacity-90"
                            style={{
                                backgroundImage: "url('/vintage_wall_lamp.png')",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat"
                            }}>
                        </div>
                        {/* Lamp Mirror (Left Side) */}
                        <div className="absolute top-[20%] left-[5%] w-[150px] h-[200px] z-30 mix-blend-screen opacity-90 transform scale-x-[-1]"
                            style={{
                                backgroundImage: "url('/vintage_wall_lamp.png')",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat"
                            }}>
                        </div>

                        {/* 4. Vignette / Shadows (To blend edges) */}
                        <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_80%)]"></div>

                        {/* 5. Brass Plaque (Re-added for detail) */}
                        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-50">
                            <div className="px-6 py-2 bg-gradient-to-b from-[#bf953f] via-[#b38728] to-[#fbf5b7] shadow-[0_4px_10px_rgba(0,0,0,0.8)] rounded-[2px] border border-[#72542a] flex items-center gap-4">
                                <span className="font-headline font-bold text-[#3e2723] text-sm tracking-[0.2em] uppercase">Hogwarts Express</span>
                            </div>
                        </div>
                    </div>

                    {/* Layer 7: Interior Glass Reflection */}
                    <div className="absolute inset-0 z-22 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
                    <div className="absolute inset-0 z-22 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80 pointer-events-none"></div>

                </div>
            )}

            {/* Flying Winged Keys Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {keys.map((key) => (
                    <div
                        key={key.id}
                        className="absolute animate-float opacity-30 text-[#d4af37]"
                        style={{
                            left: `${key.left}%`,
                            top: `${key.top}%`,
                            animationDelay: `${key.delay}s`,
                            animationDuration: `${key.duration}s`,
                            transform: `scale(${key.scale})`
                        }}
                    >
                        <div className="relative">
                            <Key size={24} className="rotate-45" />
                            <div className="absolute -top-2 -left-2 w-4 h-3 bg-white/40 rounded-full animate-flutter blur-[1px]"></div> {/* Wing Left */}
                            <div className="absolute -top-2 -right-2 w-4 h-3 bg-white/40 rounded-full animate-flutter blur-[1px]"></div> {/* Wing Right */}
                        </div>
                    </div>
                ))}
            </div>


            {/* Marauder's Map Overlay */}
            <div className={`fixed inset-0 z-[60] flex pointer-events-none perspective-[2000px] transition-opacity duration-1000 ${isTraveling ? 'opacity-0' : 'opacity-100'}`}>
                {/* Left Flap */}
                <div className="map-left w-1/2 h-full bg-paper border-r border-ink/20 shadow-2xl origin-left flex items-center justify-end p-12 relative overflow-hidden"
                    style={{
                        backgroundImage: "url('/map_sketch.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'left center',
                        transformStyle: 'preserve-3d',
                        backgroundBlendMode: 'multiply'
                    }}>
                    <div className="absolute inset-0 bg-amber-900/10 mix-blend-sepia"></div>

                    {/* Footsteps Animation Left */}
                    <div className="absolute top-1/3 right-1/4 opacity-60">
                        <Footprints size={24} className="text-ink rotate-45 animate-pulse delay-75" />
                    </div>
                    <div className="absolute bottom-1/4 right-1/3 opacity-40">
                        <Footprints size={24} className="text-ink rotate-12 animate-pulse delay-700" />
                    </div>

                    <div className="flex flex-col items-end space-y-2 z-10 opacity-90 mix-blend-color-burn">
                        <span className="font-serif italic text-lg text-[#4a3728]">Messrs.</span>
                        <div className="font-headline font-bold text-4xl leading-[0.9] text-[#2c1810] text-right tracking-wider">
                            <p>MOONY,</p>
                            <p>WORMTAIL,</p>
                            <p>PADFOOT,</p>
                            <p>& PRONGS</p>
                        </div>
                    </div>
                </div>

                {/* Right Flap */}
                <div className="map-right w-1/2 h-full bg-paper border-l border-ink/20 shadow-2xl origin-right flex items-center justify-start p-12 relative overflow-hidden"
                    style={{
                        backgroundImage: "url('/map_sketch.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'right center',
                        transformStyle: 'preserve-3d',
                        backgroundBlendMode: 'multiply'
                    }}>
                    <div className="absolute inset-0 bg-amber-900/10 mix-blend-sepia"></div>

                    {/* Footsteps Animation Right */}
                    <div className="absolute top-1/2 left-1/4 opacity-50">
                        <Footprints size={24} className="text-ink -rotate-12 animate-pulse delay-300" />
                    </div>

                    <div className="flex flex-col items-start space-y-4 z-10 opacity-90 mix-blend-color-burn">
                        <div className="font-serif italic text-lg text-[#4a3728] leading-tight">
                            Purveyors of<br />Aids to Magical<br />Mischief-Makers
                        </div>
                        <div className="font-serif text-sm text-[#4a3728] tracking-[0.2em] uppercase">
                            are proud to present
                        </div>
                        <div className="font-headline font-bold text-3xl leading-none text-[#7f1d1d] tracking-widest border-t-2 border-b-2 border-[#7f1d1d]/40 py-2 transform -rotate-1">
                            THE SOCIAL<br />PROPHET
                        </div>
                    </div>
                </div>
            </div>

            <div className="landing-content">
                {/* Header */}
                <div className="bg-[#3b5998] p-0 border-b border-[#29487d]">
                    <div className="max-w-4xl mx-auto flex justify-between items-center py-2 px-4">
                        <h1 className="text-white text-3xl font-bold tracking-tight font-headline">
                            [ TheSocialProphet ]
                        </h1>
                        <div className="text-white text-sm">
                            <span className="mr-4 hover:underline cursor-pointer" onClick={() => setModalContent({ title: "Ministry Decree No. 24", body: "Registration is currently closed by order of the Ministry of Magic. Please present a Guest Pass (Take a Tour)." })}>Register</span>
                            <span className="hover:underline cursor-pointer" onClick={() => setModalContent({ title: "About TheSocialProphet", body: "A magical social network reimagining 2004-era connectivity for the Wizarding World. Built by Garv Jain." })}>About</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row gap-8 px-4">

                    {/* Left Column: Info - Daily Prophet Style */}
                    <div className="md:w-3/5 space-y-6">
                        <div className="space-y-4 border-b-2 border-ink/10 pb-6">
                            <h2 className="font-headline font-bold text-4xl text-[#2c1810] leading-none mb-2">
                                WIZARDING TALENT<br />DISCOVERED!
                            </h2>
                            <div className="flex items-center gap-2 text-xs font-serif text-ink/60 border-y border-ink/20 py-1 mb-4">
                                <span>VOL. DCCXIII</span>
                                <span>•</span>
                                <span>The Daily Prophet</span>
                                <span>•</span>
                                <span>Latest Edition</span>
                            </div>

                            {/* Portfolio Subheading */}
                            <div className="font-serif italic text-xl text-[#740001] mb-2">
                                Garv Jain Appointed Chief Magical Architect
                            </div>

                            <p className="text-lg font-serif relative leading-relaxed text-justify">
                                <span className="float-left text-5xl font-headline font-bold text-[#740001] mr-2 mt-[-10px] bg-paper px-1">T</span>
                                he Ministry of Magic is proud to unveil the digital portfolio of <span className="font-bold">Garv Jain</span>, a wizard of exceptional skill in the arcane arts of Full Stack Development.
                                <span className="absolute -right-8 -top-4 text-ink/40 animate-write">
                                    <Feather size={20} />
                                </span>
                            </p>
                            <p className="text-lg font-serif text-justify">
                                This "TheSocialProphet" network serves as a living demonstration of his ability to weave complex code into magical user experiences.
                            </p>
                        </div>

                        {/* Ministry Decree Features */}
                        <div className="bg-[#f8f5e6] p-6 border border-ink/10 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#740001]/40 to-transparent"></div>

                            <p className="font-headline font-bold text-center text-xl text-[#2c1810] mb-4 border-b border-ink/10 pb-2">
                                KNOWN SPELLS & ABILITIES
                            </p>

                            <ul className="space-y-3 font-serif text-ink/80">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#740001]"></div>
                                    <p><span className="italic font-bold text-[#740001]">Visual Charms</span>: Mastery of React.js, TailwindCSS, and Three.js for stunning interfaces.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#740001]"></div>
                                    <p><span className="italic font-bold text-[#740001]">Potions & Alchemy</span>: Expert brewing of Node.js backends and Firebase databases.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#740001]"></div>
                                    <p><span className="italic font-bold text-[#740001]">Defense Against Bugs</span>: Robust testing and architectural patterns for secure applications.</p>
                                </li>
                            </ul>

                            <div className="mt-4 pt-3 border-t border-ink/10 flex justify-center opacity-60">
                                <span className="font-headline text-[10px] tracking-[0.2em] uppercase text-[#740001]">Certified by The Ministry</span>
                            </div>
                        </div>

                        <div className="flex gap-6 justify-center py-4 opacity-80 scale-90">
                            <div className="flex flex-col items-center gap-1 group cursor-help">
                                <div className="p-2 border border-ink/20 rounded-full hover:border-[#740001] transition-colors">
                                    <School size={20} className="text-ink/60 group-hover:text-[#740001]" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Connect</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 group cursor-help">
                                <div className="p-2 border border-ink/20 rounded-full hover:border-[#740001] transition-colors">
                                    <Users size={20} className="text-ink/60 group-hover:text-[#740001]" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Compete</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 group cursor-help">
                                <div className="p-2 border border-ink/20 rounded-full hover:border-[#740001] transition-colors">
                                    <Sparkles size={20} className="text-ink/60 group-hover:text-[#740001]" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Discover</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Login */}
                    <div className="md:w-2/5 relative perspective-1000">
                        <div className={`ticket-content relative border-2 border-dashed border-[#d4af37]/30 p-6 shadow-2xl ${isBoarding ? 'animate-pulse' : ''}`} style={{ backgroundImage: "var(--background-brick-wall)", backgroundColor: "#2a1b1b", backgroundSize: "40px 40px", boxShadow: "inset 0 0 60px rgba(0,0,0,0.7)" }}>

                            {/* Ticket Header */}
                            <div className="flex justify-between items-center border-b-2 border-double border-[#d4af37]/30 pb-4 mb-4">
                                <div className="flex flex-col">
                                    <span className="font-headline font-bold text-2xl text-white tracking-widest drop-shadow-md">HOGWARTS EXPRESS</span>
                                    <span className="font-serif text-xs text-[#d4af37] uppercase tracking-wide">London to Hogwarts</span>
                                </div>
                                <Sparkles className="text-[#d4af37] w-8 h-8 animate-pulse" />
                            </div>

                            {/* Main Body: Platform 9 3/4 */}
                            <div className="flex flex-col items-center justify-center py-6 space-y-4">
                                <div className="relative w-32 h-32 rounded-full border-4 border-[#d4af37] flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden" style={{ backgroundColor: "#2a1b1b", backgroundImage: "var(--background-brick-wall)", backgroundSize: "30px 30px" }}>

                                    <div className="flex items-start font-headline text-[#d4af37] translate-x-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                        <span className="text-7xl font-bold leading-none">9</span>
                                        <div className="flex flex-col items-center text-3xl font-bold leading-none ml-1 mt-1">
                                            <span>3</span>
                                            <div className="h-0.5 w-full bg-current my-0.5"></div>
                                            <span>4</span>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-3 bg-[#2a1b1b] px-2 text-[#d4af37] font-bold text-xs uppercase tracking-widest border border-[#d4af37]">Platform</div>
                                </div>

                                <div className="w-full flex justify-between text-xs font-serif text-[#d4af37]/80 mt-4 px-2">
                                    <div className="flex flex-col">
                                        <span className="uppercase text-[10px] text-[#d4af37]/60">Passenger</span>
                                        <span className="font-bold text-white tracking-wider">{user?.name || "Guest"}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="uppercase text-[10px] text-[#d4af37]/60">Departure</span>
                                        <span className="font-bold text-white tracking-wider">11:00 AM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Action */}
                            <div className="flex justify-center items-center pt-4 border-t border-[#d4af37]/30">
                                <button
                                    onClick={handleBoardTrain}
                                    className="group relative bg-[#d4af37] hover:bg-[#b08d26] text-[#2c1810] border-2 border-[#ffecb3] px-8 py-3 text-lg font-bold cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)] overflow-hidden transition-all rounded-sm"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Board Train <Sparkles size={18} />
                                    </span>
                                    {/* Steam Effect on Hover */}
                                    <div className="absolute inset-0 bg-white/40 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <button className="bg-[#42b72a] hover:bg-[#36a420] text-white border border-[#2b8a1d] px-4 py-1.5 text-sm font-bold w-full shadow-sm">
                                Sorting Ceremony (Register)
                            </button>
                        </div>

                        <div className="mt-4 text-center border-t border-[#d8dfea] pt-4">
                            <span className="text-xs text-gray-500 block mb-2">Just visiting Hogwarts?</span>
                            <button
                                onClick={handleBoardTrain}
                                className="group relative bg-white hover:bg-gray-50 text-[#3b5998] border-2 border-[#3b5998] px-4 py-2 text-sm font-bold w-full shadow-lg overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Sparkles size={14} className="animate-pulse" /> Take a Tour (Guest Access)
                                </span>
                                <div className="absolute inset-0 bg-[#3b5998]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>
                        </div>

                        {/* Simple Modal Overlay */}
                        {modalContent && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                                <div className="bg-paper border-4 border-double border-ink p-6 max-w-md w-full shadow-2xl relative">
                                    <h3 className="font-headline font-bold text-xl mb-2 text-center border-b border-ink/20 pb-2">{modalContent.title}</h3>
                                    <p className="font-serif text-sm mb-6 text-center">{modalContent.body}</p>
                                    <button
                                        onClick={() => setModalContent(null)}
                                        className="w-full bg-ink text-white font-bold py-2 hover:bg-ink/80"
                                    >
                                        Acknowledged
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default LandingPage;
