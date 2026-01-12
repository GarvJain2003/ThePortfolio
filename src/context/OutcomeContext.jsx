import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, query, orderBy, getDocs, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// Import Assets
import adaImg from '../assets/ada_lovelace_witch.png';
import alanImg from '../assets/alan_turing_wizard.png';
import markImg from '../assets/mark_zuckerberg_wizard.png';
import steveImg from '../assets/steve_jobs_wizard.png';

const OutcomeContext = createContext();

export const useOutcome = () => {
    return useContext(OutcomeContext);
};

export const OutcomeProvider = ({ children }) => {
    // --- Initial Data (Seed Data) ---
    const initialUser = {
        name: "Garv Jain",
        house: "Gryffindor",
        level: 24,
        wand: "13\" Silicon",
        avatar: "/profile.png"
    };

    // Modified initial posts with 0 likes for reset
    const seedPosts = [
        {
            id: 0,
            author: "Garv Jain",
            time: "Pinned Post",
            title: "To the Recruiter Reviewing This...",
            content: "I've built this 'TheSocialProphet' interface to demonstrate my ability to ship complex, polished, and interactive front-end experiences. I am ready to bring this same attention to detail to build top-tier products. 🚀",
            image: null,
            likes: 0,
            comments: [
                { id: 999, author: "Mark Z.", text: "The design system is strong with this one.", time: "Just now" }
            ],
            liked: false,
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
            likes: 0,
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
            likes: 0,
            comments: [
                { id: 102, author: "E-Cell Team", text: "The automated scoring saved us hours!", time: "5 hours ago" }
            ],
            liked: false
        },
        {
            id: 3,
            author: "Garv Jain",
            time: "2 days ago",
            title: "Learning the Dark Arts (Networking)",
            content: "Deep diving into WebRTC protocols today. Implementing STUN/TURN servers feels like practicing non-verbal spells—tricky, but powerful when it clicks. ⚡",
            image: null,
            likes: 0,
            comments: [],
            liked: false
        }
    ];

    const initialFriends = [
        { id: 1, name: "Harry Potter", mutuals: 15, image: "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg" },
        { id: 2, name: "Ron Weasley", mutuals: 42, image: "https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg" },
        { id: 3, name: "Hermione Granger", mutuals: 100, image: "https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg" },
        { id: 4, name: "Ada Lovelace", mutuals: 12, image: adaImg },
        { id: 5, name: "Alan Turing", mutuals: 8, image: alanImg },
        { id: 6, name: "Mark Zuckerberg", mutuals: 156, image: markImg },
        { id: 7, name: "Steve Jobs", mutuals: 99, image: steveImg }
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
    const initialGuestUser = {
        name: "Guest Wizard",
        house: "Visitor",
        level: 1,
        wand: "Borrowed Wand",
        avatar: "/wizard_profile_v2.png", // Ensure this path is valid or use a default
        isGuest: true
    };

    const [user, setUser] = useState(initialGuestUser);

    // --- Auth Listener ---
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const adminEmails = ["garvjain2003@gmail.com", "garvjainn2003@gmail.com"];
                setUser({
                    name: currentUser.displayName || currentUser.email.split('@')[0],
                    house: "Gryffindor", // Could be stored in Firestore profile
                    level: 24, // Could be stored in Firestore profile
                    wand: "13\" Silicon",
                    avatar: currentUser.photoURL || "/wizard_profile_v2.png",
                    email: currentUser.email,
                    uid: currentUser.uid,
                    isGuest: false,
                    isAdmin: adminEmails.includes(currentUser.email)
                });
            } else {
                setUser(initialGuestUser);
            }
        });
        return () => unsubscribe();
    }, []);
    // Initialize with seedPosts so they are visible immediately even before DB loads
    const [posts, setPosts] = useState(seedPosts);
    const [friends, setFriends] = useState(initialFriends);
    const [photos, setPhotos] = useState(initialPhotos);
    const [guilds, setGuilds] = useState(initialGuilds);

    // --- History Management ---
    const getInitialView = () => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.replace('#', '');
            return hash || 'landing';
        }
        return 'landing';
    };

    const [currentView, _setCurrentView] = useState(getInitialView);
    const [notifications, setNotifications] = useState([]);

    // Sync with Browser History
    useEffect(() => {
        const handlePopState = (event) => {
            if (event.state && event.state.view) {
                _setCurrentView(event.state.view);
            } else {
                const hash = window.location.hash.replace('#', '');
                _setCurrentView(hash || 'landing');
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const setCurrentView = (view) => {
        _setCurrentView(view);
        window.history.pushState({ view }, "", `#${view}`);
    };

    // --- Persistence (Load & Sync) ---
    useEffect(() => {
        // Load simple data from localStorage
        const load = (key, setter) => {
            const saved = localStorage.getItem(`fb_magic_${key}`);
            if (saved) setter(JSON.parse(saved));
        };
        load('friends', setFriends);
        load('photos', setPhotos);

        // Force avatar update
        setUser(prev => ({ ...prev, avatar: "/wizard_profile_v2.png" }));

        // Check and Seed specific default posts if they are missing
        const seedIfNeeded = async () => {
            for (const post of seedPosts) {
                // Use String ID to ensure we can consistently find it
                const docRef = doc(db, "posts", String(post.id));

                try {
                    const docSnap = await getDoc(docRef);
                    if (!docSnap.exists()) {
                        console.log(`Restoring post ${post.id}...`);
                        await setDoc(docRef, {
                            ...post,
                            createdAt: Date.now()
                        });
                    }
                } catch (e) {
                    console.error("Error checking/seeding post:", e);
                    // Do NOT notify here to avoid spamming usage errors if quota exceeded or offline
                }
            }
        };
        seedIfNeeded();

        // Listen for posts
        const unsubscribe = onSnapshot(
            query(collection(db, "posts")),
            (snapshot) => {
                if (snapshot.empty) {
                    // Valid empty state from DB -> Wait for Seeding to complete. 
                    // To avoid flashing empty, we DO NOT setState([]) here if we already have seedPosts.
                    // However, if the user genuinely deletes everything, this might be tricky.
                    // But for this use-case, we assume we always want the base feed.
                    // Let's just do nothing if empty, or rely on seedPosts which is default state.
                    return;
                }

                const loadedPosts = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: isNaN(Number(doc.id)) ? doc.id : Number(doc.id),
                    firestoreId: doc.id
                }));

                // Custom sort
                loadedPosts.sort((a, b) => {
                    if (a.isPinned) return -1;
                    if (b.isPinned) return 1;
                    return (b.createdAt || 0) - (a.createdAt || 0);
                });

                setPosts(loadedPosts);
            },
            (error) => {
                console.error("Firestore Error:", error);
                // Fallback to local default state if permission denied or offline
                // setPosts(seedPosts); // Already set by default
                notify("Entering Offline Mode (or spell blocked). Feed may be local.");
            }
        );

        return () => unsubscribe();
    }, []);

    // --- Persistence (Save Simple Data) ---
    useEffect(() => localStorage.setItem('fb_magic_friends', JSON.stringify(friends)), [friends]);
    useEffect(() => localStorage.setItem('fb_magic_photos', JSON.stringify(photos)), [photos]);

    // --- Action Wrappers (Graceful Fallback) ---
    const addPost = async (content, image = null, options = {}) => {
        const newPost = {
            id: Date.now(),
            author: user.name,
            time: "Just now",
            title: "Status Update",
            content,
            image,
            likes: 0,
            comments: [],
            liked: false,
            createdAt: Date.now(),
            shareToLinkedin: options.shareToLinkedin || false,
            linkedinStatus: options.shareToLinkedin ? 'PENDING' : null
        };

        try {
            await addDoc(collection(db, "posts"), newPost);
            notify(options.shareToLinkedin ? "Parchment sent to Ministry (and LinkedIn)!" : "Identity Parchment updated.");
        } catch (e) {
            console.error("Error adding post: ", e);
            // Fallback: Update local state only
            setPosts([newPost, ...posts]);
            notify("Posted locally (Owl Service unavailable).");
        }
    };

    const toggleLike = async (postId) => {
        // Optimistic Update
        setPosts(prev => prev.map(p => {
            if (p.id === postId) {
                return { ...p, likes: p.liked ? (p.likes || 0) - 1 : (p.likes || 0) + 1, liked: !p.liked };
            }
            return p;
        }));

        const post = posts.find(p => p.id === postId);
        if (!post || !post.firestoreId) return; // Can't update if no DB ID

        try {
            const postRef = doc(db, "posts", post.firestoreId);
            const newLikedState = !post.liked;
            const newLikesCount = newLikedState ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 0) - 1);

            await updateDoc(postRef, {
                liked: newLikedState,
                likes: newLikesCount
            });
        } catch (e) {
            console.error("Like failed:", e);
        }
    };

    const addComment = async (postId, text) => {
        // Optimistic
        const newComment = { id: Date.now(), author: user.name, text, time: "Just now" };
        setPosts(prev => prev.map(p => {
            if (p.id === postId) {
                return { ...p, comments: [...(p.comments || []), newComment] };
            }
            return p;
        }));

        const post = posts.find(p => p.id === postId);
        if (!post || !post.firestoreId) return;

        try {
            const postRef = doc(db, "posts", post.firestoreId);
            await updateDoc(postRef, {
                comments: [...(post.comments || []), newComment]
            });
        } catch (e) {
            console.error("Comment failed:", e);
            notify("Comment saved locally.");
        }
    };

    const deletePost = async (postId) => {
        // Optimistic
        setPosts(prev => prev.filter(p => p.id !== postId));

        const post = posts.find(p => p.id === postId);
        if (!post || !post.firestoreId) return;

        try {
            await deleteDoc(doc(db, "posts", post.firestoreId));
            notify("Post vanished into non-being.");
        } catch (e) {
            console.error("Delete failed:", e);
            notify("Failed to vanish post.");
        }
    };

    const deleteComment = async (postId, commentId) => {
        // Optimistic
        setPosts(prev => prev.map(p => {
            if (p.id === postId) {
                return { ...p, comments: (p.comments || []).filter(c => c.id !== commentId) };
            }
            return p;
        }));

        const post = posts.find(p => p.id === postId);
        if (!post || !post.firestoreId) return;

        try {
            const postRef = doc(db, "posts", post.firestoreId);
            const updatedComments = (post.comments || []).filter(c => c.id !== commentId);
            await updateDoc(postRef, {
                comments: updatedComments
            });
            notify("Comment vanished.");
        } catch (e) {
            console.error("Delete comment failed:", e);
            notify("Failed to vanish comment.");
        }
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

    // --- Audio System ---
    const [isMuted, setIsMuted] = useState(false);

    // Simple Audio Cache
    const audioCache = {};

    const playSound = (soundName) => {
        if (isMuted) return;

        // Map sound names to URLs (using placeholders or reliable free assets)
        const sounds = {
            'click': 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.m4a', // Typewriter/Click
            'hover': 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.m4a', // Paper rustle
            'train-whistle': 'https://assets.mixkit.co/active_storage/sfx/2744/2744-preview.m4a', // Train
            'magic-chime': 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.m4a', // Chime
            'spell': 'https://assets.mixkit.co/active_storage/sfx/1442/1442-preview.m4a', // Swoosh
        };

        const url = sounds[soundName];
        if (!url) return;

        try {
            if (!audioCache[soundName]) {
                audioCache[soundName] = new Audio(url);
                audioCache[soundName].volume = 0.5;
            }
            const sound = audioCache[soundName];
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Audio play blocked:", e));
        } catch (e) {
            console.error("Audio error:", e);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            notify("You have disapparated (Logged Out).");
        } catch (e) {
            console.error("Logout failed", e);
        }
    };

    // --- UI/Auth Modal ---
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
            deletePost,
            toggleLike,
            addComment,
            deleteComment,
            addFriend,
            addPhoto,
            isMuted,
            setIsMuted,
            playSound,
            logout,
            isAuthModalOpen,
            setIsAuthModalOpen
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
