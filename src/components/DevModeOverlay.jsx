import React, { useEffect, useState } from 'react';

const DevModeOverlay = ({ isActive, children }) => {
    const [hoveredInfo, setHoveredInfo] = useState(null);

    useEffect(() => {
        if (!isActive) return;

        const handleMouseOver = (e) => {
            const target = e.target.closest('[data-component]');
            if (target) {
                const componentName = target.getAttribute('data-component');
                const rect = target.getBoundingClientRect();
                setHoveredInfo({
                    name: componentName,
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                });
                target.style.outline = "2px dashed #00ff00";
                target.style.backgroundColor = "rgba(0, 255, 0, 0.05)";
                e.stopPropagation();
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest('[data-component]');
            if (target) {
                target.style.outline = "";
                target.style.backgroundColor = "";
                setHoveredInfo(null);
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            // Cleanup styles
            document.querySelectorAll('[data-component]').forEach(el => {
                el.style.outline = "";
                el.style.backgroundColor = "";
            });
        };
    }, [isActive]);

    return (
        <div className="relative">
            {isActive && (
                <div className="fixed top-20 right-4 z-[9999] bg-black/80 text-green-400 p-4 font-mono text-xs border border-green-500 shadow-2xl rounded max-w-xs pointer-events-none">
                    <h4 className="font-bold border-b border-green-500/50 mb-2 pb-1">DEV_MODE_ACTIVE</h4>
                    {hoveredInfo ? (
                        <>
                            <div>COMPONENT: <span className="text-white">{hoveredInfo.name}</span></div>
                            <div>DIMENSIONS: {Math.round(hoveredInfo.width)}x{Math.round(hoveredInfo.height)}</div>
                            <div>STATE: <span className="text-yellow-400">Reactive</span></div>
                        </>
                    ) : (
                        <span className="opacity-50">Hover over elements to inspect React components...</span>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export default DevModeOverlay;
