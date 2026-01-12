import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useOutcome } from '../context/OutcomeContext';
import { School, Users, Sparkles, Feather, Footprints, Key, Telescope, Scroll } from 'lucide-react';

const LandingPage = () => {
    const { setCurrentView, user, playSound } = useOutcome();
    const [isBoarding, setIsBoarding] = useState(false);
    const [isTraveling, setIsTraveling] = useState(false);

    const [isFlying, setIsFlying] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleBoardTrain = (e) => {
        if (e) e.preventDefault();
        setIsBoarding(true);
        playSound('train-whistle'); // Sound Effect

        // Steam/Smoke Animation sequence
        const timeline = gsap.timeline({
            onComplete: () => {
                // Start Train Ride instead of immediate navigation
                setIsTraveling(true);

                // --- CINEMATIC SEQUENCE ---
                const rideTl = gsap.timeline({
                    onComplete: () => setCurrentView('profile')
                });

                // 1. Setup: Initial Speed
                rideTl.to(".train-interior", { opacity: 1, duration: 1 })

                    // 2. The Reveal: Fade out interior to show Castle
                    .to(".train-interior", {
                        opacity: 0,
                        duration: 2,
                        delay: 3,
                        ease: "power2.inOut",
                        onStart: () => playSound('magic-chime')
                    })

                    // 3. Castle Zoom (Parallax effect on the Castle layer)
                    .to(".hogwarts-castle", {
                        scale: 1.1,
                        opacity: 1,
                        duration: 5,
                        ease: "power1.out"
                    }, "<") // Start with interior fade out

                    // 4. Fade to Black
                    .to(".train-overlay", {
                        backgroundColor: "#000",
                        duration: 1.5,
                        delay: 1 // Hold on castle for a second
                    })
                    .to(".hogwarts-castle", { opacity: 0, duration: 1 }, "<");
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

                    {/* Layer 5: HOGWARTS CASTLE REVEAL (Initially Hidden) */}
                    <div className="hogwarts-castle absolute inset-0 z-20 opacity-0 bg-cover bg-center pointer-events-none transform scale-100"
                        style={{
                            backgroundImage: "url('/hogwarts_castle_night.png')",
                        }}>
                        {/* Castle Glow / Atmosphere */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Layer 6: FABRICATED INTERIOR (Green Screen Removal) */}
                    <div className="train-interior absolute inset-0 z-50 pointer-events-none flex flex-col">

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
                        className="absolute animate-float opacity-20 text-[#d4af37]"
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
                {/* ... existing map flaps ... */}
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

            {/* --- EASTER EGGS LAYER (Desktop Only) --- */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden z-[5]">

                {/* 1. "The Social Network" Window (Far Left) - Dorm Room Style */}
                <div className="absolute left-4 top-[20%] w-[200px] h-[320px] glass-window -rotate-2 transform hover:rotate-0 transition-transform duration-500 pointer-events-auto group flex flex-col items-center pt-4">

                    {/* Visual: FACEMASH Header */}
                    <div className="bg-[#900000] text-white px-2 py-1 font-bold tracking-widest text-[10px] w-[90%] text-center uppercase mb-2 shadow-sm">
                        FACEMASH <span className="opacity-50 mx-1">|</span> EST. 2003
                    </div>

                    {/* The Algorithm (White Marker) */}
                    <div className="px-4 text-white/50 font-marker text-xs leading-relaxed select-none w-full text-left">
                        Ea = 1 / (1 + 10^((Rb-Ra)/400))<br />
                        Eb = 1 / (1 + 10^((Ra-Rb)/400))<br />
                    </div>

                    {/* The Quote (Red Marker - "Merged") */}
                    <div className="mt-4 px-2 font-marker text-red-800/80 text-lg leading-tight -rotate-3 text-center mix-blend-multiply" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.2)" }}>
                        "You know what's<br />cool?<br />
                        <span className="text-xl font-black text-red-900 border-b-2 border-red-900/50">A BILLION DOLLARS.</span>"
                    </div>
                </div>

                {/* 2. "The Face" (Al Pacino) Background Watermark */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none mix-blend-multiply"
                    style={{
                        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg')", // Placeholder - In real app use local asset or CSS shape
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        transform: "translate(30%, -30%)"
                    }}>
                </div>

                {/* 3. Golden Snitch (Far Right) */}
                <div
                    className="absolute right-12 top-[15%] pointer-events-auto cursor-none transition-all duration-300 ease-out z-20"
                    onMouseEnter={(e) => {
                        // "Run Away" logic
                        const target = e.currentTarget;
                        const xMove = (Math.random() - 0.5) * 400; // Move randomly X
                        const yMove = (Math.random() - 0.5) * 400; // Move randomly Y
                        target.style.transform = `translate(${xMove}px, ${yMove}px) scale(0.5)`;
                        target.style.opacity = "0";
                        setTimeout(() => {
                            target.style.transform = "translate(0,0) scale(1)";
                            target.style.opacity = "1";
                        }, 2000); // Reappear after 2s
                    }}
                >
                    <div className="relative w-8 h-8 animate-hover-float">
                        {/* Golden Ball */}
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffd700] via-[#b8860b] to-[#8b4513] shadow-[0_0_15px_#ffd700] border border-[#ffd700]"></div>
                        {/* Wings */}
                        <div className="absolute top-0 left-[-25px] w-[30px] h-[10px] bg-white/60 rounded-full animate-flutter-wing origin-right shadow-[0_0_5px_white]"></div>
                        <div className="absolute top-0 right-[-25px] w-[30px] h-[10px] bg-white/60 rounded-full animate-flutter-wing origin-left shadow-[0_0_5px_white]"></div>
                    </div>
                </div>

                {/* 4. Exhibit A: The Dilution Contract (Formal Prop) */}
                <div className="absolute right-8 top-[30%] w-[270px] bg-[#fdfbf7] shadow-[5px_5px_15px_rgba(0,0,0,0.3)] rotate-2 hover:rotate-0 transition-transform duration-300 z-20 font-serif border border-[#d4c5a6]">

                    {/* Paperclip */}
                    <div className="absolute -top-3 left-6 w-4 h-12 border-2 border-gray-400 rounded-full bg-transparent z-30 shadow-sm"></div>
                    <div className="absolute -top-3 left-6 w-4 h-8 border-2 border-gray-400 rounded-full bg-gray-200 opacity-50 z-20"></div>

                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }}></div>

                    {/* Header */}
                    <div className="p-4 pb-2 border-b border-[#d4c5a6] flex justify-between items-end">
                        <div className="text-[#3b5998] font-bold text-sm tracking-tight font-tahoma opacity-90">[ TheFacebook ]</div>
                        <div className="text-[10px] text-gray-500 font-mono">EXHIBIT A</div>
                    </div>

                    <div className="p-4 relative">
                        <h4 className="text-center font-bold text-xs uppercase underline mb-3 text-ink">Shareholder Equity Schedule</h4>

                        <table className="w-full text-left text-[10px] border-collapse relative z-10">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="py-1 pl-1 w-1/2">Shareholder</th>
                                    <th className="py-1 text-right pr-1">Equity %</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono text-ink/90">
                                <tr>
                                    <td className="py-1 pl-1">Zuckerberg, M.</td>
                                    <td className="text-right pr-1">51.00%</td>
                                </tr>
                                <tr className="relative">
                                    <td className="py-1 pl-1 font-bold bg-yellow-100/50">Saverin, E.</td>
                                    <td className="text-right pr-1 relative bg-yellow-100/50">
                                        <span className="line-through decoration-red-600 decoration-2 opacity-60">30.0%</span>
                                        <div className="absolute top-[-8px] right-0 rotate-[-12deg] text-red-700 font-extrabold text-sm drop-shadow-sm">0.03%</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-1 pl-1">Moskovitz, D.</td>
                                    <td className="text-right pr-1">6.47%</td>
                                </tr>
                                <tr>
                                    <td className="py-1 pl-1">Parker, S.</td>
                                    <td className="text-right pr-1">6.47%</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* The "Ambush" Stamp */}
                        <div className="absolute top-[35%] right-[5%] border-[3px] border-red-700/70 p-1 rounded-sm -rotate-12 pointer-events-none mix-blend-multiply opacity-80 animate-pulse">
                            <span className="text-red-700/90 font-black text-lg tracking-widest uppercase font-mono">DILUTED</span>
                        </div>

                        {/* Sticky Note - The Friendly Advice */}
                        <div className="absolute -bottom-6 -right-4 w-[140px] bg-[#fff9c4] p-3 shadow-[2px_4px_8px_rgba(0,0,0,0.2)] rotate-[-6deg] transform hover:scale-105 transition-transform duration-300 z-40">
                            <div className="w-full h-full text-center">
                                <p className="font-marker text-blue-900 text-[11px] leading-tight rotate-1">
                                    "Always read the documents before signing."
                                </p>
                                <div className="mt-1 text-right">
                                    <span className="font-marker text-[9px] text-red-600">- CFO</span>
                                </div>
                            </div>
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
                            <span className="mr-4 hover:underline cursor-pointer" onClick={() => setModalContent({ title: "Ministry Decree No. 24", body: "Registration is currently closed by order of the Ministry of Magic. Please use your Hogwarts Express Ticket to board." })}>Register</span>
                            <span className="hover:underline cursor-pointer" onClick={() => setModalContent({ title: "About TheSocialProphet", body: "A magical social network reimagining 2004-era connectivity for the Wizarding World. Built by Garv Jain." })}>About</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row gap-8 px-4">


                    {/* Left Column: Info - Ministry Profile Style (Clean & Scannable) */}
                    <div className="md:w-3/5 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-[#f8f5e6] p-8 shadow-lg border border-[#e5e7eb] relative overflow-hidden rounded-sm">
                            {/* Decorative Top Border */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#740001]"></div>

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="font-headline font-bold text-4xl text-[#2c1810]">
                                        Garv Jain
                                    </h2>
                                    <p className="font-serif italic text-xl text-[#740001]">
                                        Chief Magical Architect
                                    </p>
                                </div>

                            </div>

                            <p className="text-lg font-serif text-ink/80 leading-relaxed mb-6">
                                Crafting immersive digital experiences by blending the best of Muggle technology with wizarding design. Specializing in high-performance web spells and full-stack alchemy.
                            </p>

                            <div className="space-y-4">
                                <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-[#740001] border-b border-[#740001]/20 pb-2">
                                    Core Competencies
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {['React.js', 'Next.js', 'TailwindCSS', 'Three.js', 'Node.js', 'Firebase', 'System Architecture'].map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-[#2c1810]/5 text-[#2c1810] text-sm font-bold border border-[#2c1810]/10 rounded-sm hover:bg-[#740001] hover:text-white transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute bottom-4 right-4 opacity-10">
                                <School size={120} />
                            </div>
                        </div>

                        {/* Quick Links (Simplified) */}
                        <div className="flex gap-4 opacity-90">
                            {[
                                { icon: Telescope, label: "Projects", action: "Explore", view: "projects" },
                                { icon: Users, label: "Community", action: "Connect", view: "friends" },
                                { icon: Scroll, label: "Resume", action: "Review", view: "resume" }
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentView(item.view)}
                                    className="poke-hover flex-1 bg-white/50 hover:bg-white border border-ink/10 p-4 rounded-sm transition-all text-left group"
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <item.icon size={18} className="text-[#740001]" />
                                        <span className="font-headline font-bold text-sm text-[#2c1810]">{item.label}</span>
                                    </div>
                                    <span className="text-xs font-serif text-ink/60 group-hover:text-[#740001] transition-colors pl-8 block">
                                        {item.action} &rarr;
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Login */}
                    <div className="md:w-2/5 relative perspective-1000">
                        <div className={`ticket-content relative border-none p-6 shadow-2xl ${isBoarding ? 'animate-pulse' : ''}`}
                            style={{
                                backgroundImage: "var(--background-brick-wall)",
                                backgroundColor: "#2a1b1b",
                                backgroundSize: "40px 40px",
                                boxShadow: "inset 0 0 60px rgba(0,0,0,0.7)",
                                maskImage: "radial-gradient(circle at 0 240px, transparent 20px, black 21px), radial-gradient(circle at 100% 240px, transparent 20px, black 21px)",
                                WebkitMaskImage: "radial-gradient(circle at 0 240px, transparent 20px, black 21px), radial-gradient(circle at 100% 240px, transparent 20px, black 21px)"
                            }}>
                            <div className="absolute inset-x-0 top-[230px] border-b-2 border-dashed border-[#d4af37]/30 opacity-50"></div>

                            {/* Ticket Header */}
                            <div className="flex justify-between items-center border-b-2 border-double border-[#d4af37]/30 pb-4 mb-4">
                                <div className="flex flex-col">
                                    <span className="font-headline font-bold text-3xl text-gold-foil tracking-widest drop-shadow-md">HOGWARTS EXPRESS</span>
                                    <span className="font-serif text-xs text-[#d4af37] uppercase tracking-wide">London to Hogwarts</span>
                                </div>
                            </div>

                            {/* Main Body: Platform 9 3/4 */}
                            <div className="flex flex-col items-center justify-center py-6 space-y-4">
                                <div className="relative w-32 h-32 rounded-full border-4 border-[#d4af37] flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden" style={{ backgroundColor: "#2a1b1b", backgroundImage: "var(--background-brick-wall)", backgroundSize: "30px 30px" }}>

                                    <div className="flex items-start font-headline text-gold-foil translate-x-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                        <span className="text-7xl font-bold leading-none">9</span>
                                        <div className="flex flex-col items-center text-3xl font-bold leading-none ml-1 mt-1">
                                            <span>3</span>
                                            <div className="h-0.5 w-full bg-[#d4af37] my-0.5 animate-shimmer"></div>
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
                            <div className="flex justify-center items-center pt-8 border-t border-[#d4af37]/30">
                                <button
                                    onClick={handleBoardTrain}
                                    className="group relative bg-[#d4af37] hover:bg-[#b08d26] text-[#2c1810] border-2 border-[#ffecb3] px-8 py-3 text-lg font-bold cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] overflow-hidden transition-all rounded-sm scale-100 hover:scale-105 duration-300"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Board Train
                                    </span>
                                    {/* Steam Effect on Hover */}
                                    <div className="absolute inset-0 bg-white/40 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
                            </div>
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
