import React, { useState } from 'react';
import { useOutcome } from '../context/OutcomeContext';
import { Feather, Image as ImageIcon } from 'lucide-react';

const StatusUpdate = () => {
    const { addPost, user, setIsAuthModalOpen } = useOutcome();
    const [content, setContent] = useState('');
    const [shareToLinkedin, setShareToLinkedin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        // Auth Check
        if (user.isGuest) {
            setIsAuthModalOpen(true);
            return;
        }

        addPost(content, null, { shareToLinkedin });
        setContent('');
        setShareToLinkedin(false);
    };

    return (
        <div className="bg-white border border-ink/10 p-4 shadow-sm mb-6 rounded-sm">
            <h3 className="font-headline font-bold text-ink/60 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <Feather size={12} /> Update Status
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-ink/10">
                        <img src={user.avatar} className="w-full h-full object-cover" alt="Me" />
                    </div>
                    <div className="flex-grow">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`What's on your mind, ${user.name}?`}
                            className="w-full border-none focus:ring-0 text-sm font-serif resize-none h-16 bg-transparent placeholder-ink/30"
                        />

                        <div className="flex justify-between items-center mt-2 border-t border-ink/5 pt-2">
                            {/* Actions */}
                            <div className="flex gap-2">
                                <button type="button" className="text-ink/40 hover:text-fb-blue transition-colors p-1" title="Add Image (Coming Soon)">
                                    <ImageIcon size={16} />
                                </button>

                                {/* LinkedIn Toggle */}
                                <label className="flex items-center gap-1.5 cursor-pointer select-none group">
                                    <div className={`w-3 h-3 rounded-sm border transition-colors flex items-center justify-center ${shareToLinkedin ? 'bg-[#0077b5] border-[#0077b5]' : 'border-ink/20 group-hover:border-[#0077b5]'}`}>
                                        {shareToLinkedin && <div className="w-1.5 h-1.5 bg-white rounded-[1px]" />}
                                    </div>
                                    <span className={`text-xs font-bold transition-colors ${shareToLinkedin ? 'text-[#0077b5]' : 'text-ink/40 group-hover:text-[#0077b5]'}`}>
                                        Post to LinkedIn
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!content.trim()}
                                className="bg-fb-blue text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-fb-blue-dark transition-colors disabled:opacity-50 rounded-sm"
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default StatusUpdate;
