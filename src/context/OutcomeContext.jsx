import React, { createContext, useContext, useState, useEffect } from 'react';

const OutcomeContext = createContext();

export const useOutcome = () => {
    return useContext(OutcomeContext);
};

export const OutcomeProvider = ({ children }) => {
    // --- Initial Data ---
    const initialUser = {
        name: "Garv Jain",
        house: "Ravenclaw",
        level: 24,
        wand: "13\" Silicon",
        avatar: "/profile.png"
    };

    const initialPosts = [
        {
            id: 0,
            author: "Garv Jain",
            time: "Pinned Post",
            title: "To the Recruiter Reviewing This...",
            content: "I've built this 'TheSocialProphet' interface to demonstrate my ability to ship complex, polished, and interactive front-end experiences. I am ready to bring this same attention to detail to Meta's products. 🚀",
            image: null,
            likes: 124,
            comments: [
                { id: 999, author: "Mark Z.", text: "The design system is strong with this one.", time: "Just now" }
            ],
            liked: true,
            isPinned: true,
            actions: [
                { label: "View Resume", action: "resume", icon: "Scroll" },
                { label: "See Projects", action: "projects", icon: "Sparkles" },
                { label: "Email Me", action: "owl-post", icon: "Feather" }
            ]
        },
        {
            id: 1,
            author: "Garv Jain",
            time: "2 hours ago",
            title: "Scaling Shatranj ♟️",
            content: "Just checked the logs—Shatranj (my WebRTC chess app) hit 3.3K+ weekly reads! 📈 Scaling peer-to-peer video connections while maintaining low-latency board state sync was a challenge, but Firebase signaling is holding up beautifully.",
            image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000&auto=format&fit=crop",
            likes: 89,
            comments: [
                { id: 101, author: "Ron Weasley", text: "Still haven't beaten the AI level 5...", time: "1 hour ago" }
            ],
            liked: false
        },
        {
            id: 2,
            author: "Garv Jain",
            time: "Yesterday",
            title: "Deployment Successful 🚀",
            content: "The new Recruitment Portal for E-Cell is live. Processed 344+ applicants in the first 48 hours. Firestore security rules: Locked down. Performance: Optimized (40% faster load).",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop", // Coding laptop
            likes: 156,
            comments: [
                { id: 102, author: "E-Cell Team", text: "The automated scoring saved us hours!", time: "5 hours ago" }
            ],
            liked: true
        },
        {
            id: 3,
            author: "Garv Jain",
            time: "2 days ago",
            title: "Learning the Dark Arts (Networking)",
            content: "Deep diving into WebRTC protocols today. Implementing STUN/TURN servers feels like practicing non-verbal spells—tricky, but powerful when it clicks. ⚡",
            image: null,
            likes: 45,
            comments: [],
            liked: false
        }
    ];

    const initialFriends = [
        { id: 1, name: "Harry Potter", mutuals: 15 },
        { id: 2, name: "Ron Weasley", mutuals: 42 },
        { id: 3, name: "Hermione Granger", mutuals: 100 }
    ];

    const initialPhotos = [
        "https://images.unsplash.com/photo-1542281286-9e0a16bb7366",
        "https://images.unsplash.com/photo-1596796929760-d62ab35c1719",
        "https://images.unsplash.com/photo-1623945203372-e15eb5c20eb0",
        "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16",
        "https://images.unsplash.com/photo-1555680202-c86f0e12f086",
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206"
    ];

    const initialGuilds = [
        { id: 'react', name: "React Enchanters", level: 'Master' },
        { id: 'js', name: "JS Alchemists", level: 'Adept' }
    ];

    // --- State ---
    const [user, setUser] = useState(initialUser);
    const [posts, setPosts] = useState(initialPosts);
    const [friends, setFriends] = useState(initialFriends);
    const [photos, setPhotos] = useState(initialPhotos);
    const [guilds, setGuilds] = useState(initialGuilds);
    const [currentView, setCurrentView] = useState('feed');
    const [notifications, setNotifications] = useState([]);

    // --- Persistence (Load) ---
    useEffect(() => {
        const load = (key, setter) => {
            const saved = localStorage.getItem(`fb_magic_${key}`);
            if (saved) setter(JSON.parse(saved));
        };
        load('posts', setPosts);
        load('friends', setFriends);
        load('photos', setPhotos);
    }, []);

    // --- Persistence (Save) ---
    useEffect(() => localStorage.setItem('fb_magic_posts', JSON.stringify(posts)), [posts]);
    useEffect(() => localStorage.setItem('fb_magic_friends', JSON.stringify(friends)), [friends]);
    useEffect(() => localStorage.setItem('fb_magic_photos', JSON.stringify(photos)), [photos]);

    // --- Actions ---
    const addPost = (content, image = null) => {
        const newPost = {
            id: Date.now(),
            author: user.name,
            time: "Just now",
            title: "Status Update",
            content,
            image,
            likes: 0,
            comments: [],
            liked: false
        };
        setPosts([newPost, ...posts]);
    };

    const toggleLike = (postId) => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                return { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked };
            }
            return p;
        }));
    };

    const addComment = (postId, text) => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    comments: [...p.comments, { id: Date.now(), author: user.name, text, time: "Just now" }]
                };
            }
            return p;
        }));
    };

    const addFriend = (name) => {
        if (friends.find(f => f.name === name)) return;
        setFriends([...friends, { id: Date.now(), name, mutuals: 0 }]);
        notify(`You are now friends with ${name}!`);
    };

    const addPhoto = (url) => {
        setPhotos([url, ...photos]);
        notify("New scroll added to your collection!");
    };

    const notify = (msg) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, msg }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
    };

    return (
        <OutcomeContext.Provider value={{
            user,
            posts,
            friends,
            photos,
            guilds,
            currentView,
            setCurrentView,
            notifications,
            addPost,
            toggleLike,
            addComment,
            addFriend,
            addPhoto
        }}>
            {children}
            {/* Notification Toast Overlay */}
            <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[100]">
                {notifications.map(n => (
                    <div key={n.id} className="bg-fb-blue text-white px-4 py-2 rounded shadow-lg text-sm animate-in slide-in-from-right fade-in">
                        {n.msg}
                    </div>
                ))}
            </div>
        </OutcomeContext.Provider>
    );
};
