
import { useEffect, useState } from 'react';

export const useSpells = () => {
    const [buffer, setBuffer] = useState("");
    const [activeSpell, setActiveSpell] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only capture letters
            if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                setBuffer(prev => (prev + e.key).slice(-10).toLowerCase());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (buffer.endsWith("lumos")) {
            setActiveSpell("lumos");
            setBuffer(""); // Reset
        } else if (buffer.endsWith("nox")) {
            setActiveSpell(null);
            setBuffer("");
        } else if (buffer.endsWith("revelio")) {
            setActiveSpell("revelio");
            setTimeout(() => setActiveSpell(null), 3000); // Temporary
            setBuffer("");
        }
    }, [buffer]);

    return activeSpell;
};
