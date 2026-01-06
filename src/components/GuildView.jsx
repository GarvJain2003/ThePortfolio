import React from 'react';
import { Shield, Users, Star } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';

const GuildView = ({ guildId }) => {
    const { guilds } = useOutcome();
    // Mock data for guild details (in a real app this might come from a DB)
    const guildDetails = {
        'react': { name: "React Enchanters", desc: "For those who weave spells with JSX and Hooks.", members: 1240 },
        'js': { name: "JS Alchemists", desc: "Transmuting coffee into code since 1995.", members: 8500 },
        'node': { name: "Node.js Potions", desc: "Backend brewing and server-side sorcery.", members: 3200 }
    };

    const info = guildDetails[guildId] || { name: "Unknown Guild", desc: "This guild is shrouded in mystery.", members: 0 };
    const myRank = guilds.find(g => g.id === guildId)?.level || "Not a Member";
    const isMember = myRank !== "Not a Member";

    return (
        <div className="animate-in fade-in duration-500">
            <div className="bg-white border border-fb-border p-6 text-center shadow-sm">
                <div className="w-24 h-24 bg-fb-blue/10 mx-auto rounded-full flex items-center justify-center mb-4 border-2 border-fb-blue/20">
                    <Shield size={48} className="text-fb-blue" />
                </div>
                <h1 className="font-headline text-3xl font-bold mb-2">{info.name}</h1>
                <p className="font-serif text-ink/60 italic mb-6 max-w-md mx-auto">"{info.desc}"</p>

                <div className="flex justify-center gap-8 text-sm mb-8">
                    <div className="text-center">
                        <div className="font-bold text-lg">{info.members.toLocaleString()}</div>
                        <div className="text-ink/40 uppercase text-[10px] tracking-wider">Members</div>
                    </div>
                    <div className="text-center">
                        <div className={`font-bold text-lg ${isMember ? 'text-green-600' : 'text-ink/60'}`}>{myRank}</div>
                        <div className="text-ink/40 uppercase text-[10px] tracking-wider">Your Rank</div>
                    </div>
                </div>

                <button
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 ${isMember ? 'bg-ink/5 text-ink/60 cursor-default' : 'bg-fb-blue text-white shadow-lg'}`}>
                    {isMember ? 'Member' : 'Join Guild'}
                </button>
            </div>

            <div className="mt-4 bg-paper border border-ink/10 p-4">
                <h3 className="font-bold text-sm mb-2 uppercase tracking-wide text-ink/50">Recent Guild Activity</h3>
                <div className="space-y-2 text-sm text-ink/70 italic">
                    <p>• Merlin just committed a fix to `main`.</p>
                    <p>• Morgana raised a PR: "Fix memory leak in potion loop".</p>
                    <p>• Gandalf deployed to production.</p>
                </div>
            </div>
        </div>
    );
};

export default GuildView;
