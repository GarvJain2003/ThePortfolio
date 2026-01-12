import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';
import SimpleModal from './SimpleModal';

const FriendsView = () => {
    const { friends, addFriend } = useOutcome();
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleAddFriend = (name) => {
        addFriend(name);
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-white border border-fb-border p-4 shadow-sm mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-headline text-2xl font-bold flex items-center gap-2">
                        <span className="text-fb-blue">All Friends</span>
                        <span className="text-ink/40 text-lg font-normal">({friends.length})</span>
                    </h2>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-fb-blue text-white px-3 py-1 text-xs font-bold rounded hover:bg-fb-blue-dark">
                        + Find Friends
                    </button>
                </div>

                {/* Search */}
                <div className="relative bg-fb-bg border border-ink/10 p-2 rounded flex items-center gap-2">
                    <Search size={16} className="text-ink/40" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search for wizards..."
                        className="bg-transparent outline-none w-full text-sm placeholder:text-ink/30"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4">
                {filteredFriends.map((friend) => (
                    <div key={friend.id} className="bg-white border border-fb-border p-3 flex gap-3 shadow-sm items-center">
                        <div className="w-16 h-16 bg-ink/10 border border-ink/10 flex-shrink-0">
                            <img src={friend.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`} className="w-full h-full object-cover" alt={friend.name} />
                        </div>
                        <div className="flex-grow min-w-0">
                            <h3 className="font-bold text-fb-blue text-sm truncate cursor-pointer hover:underline">{friend.name}</h3>
                            <p className="text-xs text-ink/50 truncate mb-2">{friend.mutuals || 0} Mutual Friends</p>
                            <button className="flex items-center gap-1 text-[10px] bg-ink/5 hover:bg-ink/10 text-ink/60 px-2 py-1 rounded border border-ink/10 w-fit">
                                <MessageCircle size={10} /> Send Owl
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <SimpleModal
                    title="Find a Wizard"
                    placeholder="Enter wizard's name..."
                    buttonText="Send Request"
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddFriend}
                />
            )}
        </div>
    );
};

export default FriendsView;
