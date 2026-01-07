# Portfolio Integration Guide: Shatranj

I've prepared two ways for you to add "Shatranj" to your "Harry Potter x Meta" portfolio. Since I cannot directly modify your portfolio workspace, please follow the steps below.

## Option 1: Add to Existing Gallery (Recommended)
This is the easiest way. Just add the project data to your existing `ProjectsGallery.jsx` file.

1.  Open your portfolio project.
2.  Navigate to `src/components/ProjectsGallery.jsx`.
3.  Find the `projects` array and add this object:

```javascript
{
    id: 4, // Ensure ID is unique
    title: "Shatranj (Wizard's Chess)",
    description: "A cloud-native multiplayer chess platform featuring real-time peer-to-peer video chat (WebRTC), offline board connectivity, and AI opponents. Scaled to 3.3K+ weekly reads.",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1258&auto=format&fit=crop", // OR your own screenshot URL
    tags: ["React", "Firebase", "WebRTC", "Chess.js", "Tailwind"],
    link: "https://playshatranj.com",
    github: "https://github.com/GarvJain2003/smart-chess-vite"
}
```

## Option 2: Standalone Feature Card
If you want to feature Shatranj heavily (e.g., on your landing page or a separate view), use the custom component I created.

1.  Copy the file `portfolio-assets/ShatranjCard.jsx` from this project.
2.  Paste it into your portfolio at `src/components/ShatranjCard.jsx`.
3.  Import and use it anywhere:

```javascript
import ShatranjCard from './ShatranjCard';

// Inside your component return:
<ShatranjCard />
```

## Assets
The `ShatranjCard.jsx` file is located in the `portfolio-assets/` folder in your current workspace.
