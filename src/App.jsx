import React from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import ProfileView from './components/ProfileView';
import FriendsView from './components/FriendsView';
import PhotosView from './components/PhotosView';
import CommonRoomView from './components/CommonRoomView';
import ResumeView from './components/ResumeView';
import ProjectsGallery from './components/ProjectsGallery';
import OwlPost from './components/OwlPost';
import AdminDashboard from './components/AdminDashboard';
import GuildView from './components/GuildView';
import FeedItem from './components/FeedItem';
import { Image as ImageIcon } from 'lucide-react';
import { OutcomeProvider, useOutcome } from './context/OutcomeContext';
import SimpleModal from './components/SimpleModal';
import MaraudersMapView from './components/MaraudersMapView';

function AppContent() {
  const {
    currentView,
    setCurrentView,
    posts,
    addPost,
    user
  } = useOutcome();

  const [inputValue, setInputValue] = React.useState("");
  const [showPhotoInput, setShowPhotoInput] = React.useState(false);
  const [photoUrl, setPhotoUrl] = React.useState("");

  const handlePost = () => {
    if (!inputValue.trim()) return;
    addPost(inputValue, photoUrl || null);
    setInputValue("");
    setPhotoUrl("");
    setShowPhotoInput(false);
  };

  const renderContent = () => {
    // Dynamic Route Handlers
    if (currentView.startsWith('guild:')) {
      const guildId = currentView.split(':')[1];
      return <GuildView guildId={guildId} />;
    }

    // Future apps can go here
    if (currentView.startsWith('app:')) {
      return (
        <div className="bg-white p-8 text-center border border-fb-border">
          <h2 className="font-headline text-2xl">Application Loading...</h2>
          <p className="italic text-ink/60">The elves are polishing the interface.</p>
        </div>
      );
    }

    switch (currentView) {
      case 'profile': return <ProfileView />;
      case 'resume': return <ResumeView />;
      case 'projects': return <ProjectsGallery />;
      case 'owl-post': return <OwlPost />;
      case 'admin': return <AdminDashboard />;
      case 'friends': return <FriendsView />;
      case 'photos': return <PhotosView />;
      case 'common-room': return <CommonRoomView />;
      case 'app:marauder': return <MaraudersMapView />;
      case 'messages': return (
        <div className="bg-white p-8 text-center border border-fb-border">
          <h2 className="font-headline text-2xl">Owlery</h2>
          <p className="italic text-ink/60">No new owls at this time.</p>
        </div>
      );
      default: return (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* "What's on your mind?" Input */}
          <div className="bg-paper border border-fb-border p-4 shadow-sm">
            <div className="flex gap-2 mb-2 border-b border-ink/10 pb-2">
              <span className="font-bold text-xs text-fb-blue cursor-pointer bg-fb-blue/5 px-2 py-0.5 rounded">Update Status</span>
              <button
                onClick={() => setShowPhotoInput(!showPhotoInput)}
                className={`font-bold text-xs cursor-pointer hover:text-fb-blue px-2 py-0.5 flex items-center gap-1 ${showPhotoInput ? 'text-fb-blue' : 'text-ink/40'}`}>
                <ImageIcon size={12} /> Add Photo
              </button>
            </div>
            <div className="flex gap-3">
              <div className="font-headline font-bold text-lg pt-1 text-fb-blue">
                {user.name.charAt(0)}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePost()}
                  placeholder={`What is on your mind, ${user.name.split(' ')[0]}?`}
                  className="w-full bg-transparent border-none outline-none font-serif text-lg placeholder:text-ink/40 focus:placeholder:text-ink/20"
                />
                {showPhotoInput && (
                  <input
                    type="text"
                    placeholder="Enter Image URL..."
                    className="mt-2 w-full text-xs bg-white border border-ink/20 p-1 rounded"
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className="border-t border-ink/10 mt-3 pt-2 text-right">
              <button
                onClick={handlePost}
                className="bg-fb-blue text-white px-4 py-1 text-xs font-bold rounded-sm border border-fb-blue-dark hover:bg-fb-blue-dark active:translate-y-0.5 transition-all shadow-sm">
                Cast Share
              </button>
            </div>
          </div>

          {/* Feed Items */}
          {posts.map(item => (
            <FeedItem key={item.id} item={item} onNavigate={setCurrentView} />
          ))}

          <div className="text-center p-4 text-ink/40 text-xs italic">
            — End of Magical Feed —
          </div>
        </div>
      );
    }
  };

  return (
    <Layout sidebar={<Sidebar onNavigate={setCurrentView} />} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}

export default function App() {
  return (
    <OutcomeProvider>
      <AppContent />
    </OutcomeProvider>
  );
}
