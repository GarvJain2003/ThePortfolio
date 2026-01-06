import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Feather, Scroll, Sparkles, Pin } from 'lucide-react';
import { useOutcome } from '../context/OutcomeContext';

const FeedItem = ({ item, onNavigate }) => {
    const { toggleLike, addComment, user } = useOutcome();
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        addComment(item.id, commentText);
        setCommentText("");
    };

    const iconMap = {
        "Scroll": Scroll,
        "Sparkles": Sparkles,
        "Feather": Feather
    };

    return (
        <div
            data-component="FeedItem"
            className={`bg-white border p-4 shadow-sm group mb-4 transition-all relative overflow-hidden ${item.isPinned ? 'border-4 border-double border-yellow-600/30 bg-[#fffbf0]' : 'border-fb-border'}`}
        >
            {/* Pinned visual cue */}
            {item.isPinned && <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-200/20 to-transparent pointer-events-none"></div>}

            {/* Post Header */}
            <div className="flex justify-between items-start mb-3 relative z-10">
                <div>
                    <h3 className="font-bold text-fb-blue text-sm hover:underline cursor-pointer flex items-center gap-1" onClick={() => onNavigate('profile')}>
                        {item.author}
                        {item.author === "Garv Jain" && <span className="text-[10px] text-white bg-fb-blue px-1 rounded-full" title="Verified Wizard">✓</span>}
                    </h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1">
                        {item.isPinned && <Pin size={10} className="text-yellow-600 fill-yellow-600 rotate-45" />}
                        Published via <Feather size={10} className="inline" /> • {item.time}
                    </p>
                </div>
                {item.title && (
                    <h2 className={`font-headline text-xl font-bold ${item.isPinned ? 'text-yellow-900' : 'text-ink/80'}`}>{item.title}</h2>
                )}
            </div>

            {/* Post Content */}
            <div className="mb-4 relative z-10">
                <p className="font-serif text-base leading-relaxed mb-3 text-justify text-ink/90">
                    {item.content}
                </p>

                {/* Special Actions for Pinned Post */}
                {item.actions && (
                    <div className="flex flex-wrap gap-3 my-4 justify-center md:justify-start">
                        {item.actions.map((action, idx) => {
                            const Icon = iconMap[action.icon] || Feather;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => onNavigate(action.action)}
                                    className="flex items-center gap-2 px-5 py-2 bg-[#fffdf5] border border-yellow-600/40 text-yellow-900 font-headline font-bold text-xs uppercase tracking-wider hover:bg-yellow-50 hover:border-yellow-600 hover:shadow-md transition-all transform hover:-translate-y-0.5 rounded-sm"
                                >
                                    <Icon size={14} /> {action.label}
                                </button>
                            );
                        })}
                    </div>
                )}

                {item.image && (
                    <div className="border-4 border-double border-ink/20 p-1 bg-paper-dark transform rotate-1 hover:rotate-0 transition-transform duration-500 cursor-pointer shadow-md">
                        <img src={item.image} alt="Post Attachment" className="w-full h-64 object-cover sepia-[.3] hover:sepia-0 transition-all duration-700" />
                        <div className="text-center text-[10px] italic text-gray-500 mt-1">Fig 1. A moving picture from the muggle world.</div>
                    </div>
                )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-6 border-t border-fb-border pt-2 text-ink/60 select-none">
                <button
                    onClick={() => toggleLike(item.id)}
                    className={`flex items-center gap-1 text-xs font-bold hover:text-fb-blue transition-colors ${item.liked ? 'text-fb-blue' : ''}`}>
                    <Heart size={14} className={item.liked ? "fill-current" : ""} /> Like {item.likes > 0 && `(${item.likes})`}
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className={`flex items-center gap-1 text-xs font-bold hover:text-fb-blue transition-colors ${showComments ? 'text-fb-blue' : ''}`}>
                    <MessageCircle size={14} /> Comment {item.comments?.length > 0 && `(${item.comments.length})`}
                </button>
                <button
                    onClick={() => alert("Shared to your wall via Floo Network!")}
                    className="flex items-center gap-1 text-xs font-bold hover:text-fb-blue transition-colors">
                    <Share2 size={14} /> Share
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-3 pt-3 border-t border-ink/10 animate-in slide-in-from-top-2">
                    {/* Existing Comments */}
                    <div className="space-y-2 mb-3">
                        {item.comments && item.comments.length > 0 ? (
                            item.comments.map(comment => (
                                <div key={comment.id} className="bg-fb-bg/50 p-2 rounded text-xs">
                                    <span className="font-bold text-fb-blue mr-1">{comment.author}</span>
                                    <span className="text-ink/80">{comment.text}</span>
                                    <div className="text-[10px] text-ink/40 mt-1">{comment.time}</div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-ink/40 italic">No comments yet. Be the first to scrawl!</p>
                        )}
                    </div>

                    {/* Add Comment Input */}
                    <form onSubmit={handleCommentSubmit} className="flex gap-2">
                        <div className="w-6 h-6 bg-ink/10 rounded flex-shrink-0 overflow-hidden">
                            <img src={user.avatar} className="w-full h-full object-cover" alt="Me" />
                        </div>
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="flex-1 bg-white border border-ink/20 rounded px-2 py-1 text-xs focus:outline-none focus:border-fb-blue"
                            placeholder="Write a comment..."
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default FeedItem;
