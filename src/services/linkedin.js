// This service handles the "Frontend" part of LinkedIn Auth.
// Since we cannot use Client Secret here, we direct the user to the LinkedIn Auth URL.
// The "Code" returned must be sent to your Backend (Functions) to get a Token.

const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID || 'YOUR_CLIENT_ID';
const REDIRECT_URI = window.location.origin + '/admin'; // Assumes admin is where we handle the callback
const SCOPE = 'openid profile w_member_social email'; // Basic scopes

export const linkedinService = {
    // 1. Initiate Login
    login: () => {
        const state = Math.random().toString(36).substring(7);
        localStorage.setItem('linkedin_oauth_state', state);

        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=${encodeURIComponent(SCOPE)}`;

        window.location.href = authUrl;
    },

    // 2. Parse Code from URL (Call this on page load of Redirect URI)
    getAuthCode: () => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const storedState = localStorage.getItem('linkedin_oauth_state');

        if (code && state === storedState) {
            localStorage.removeItem('linkedin_oauth_state');
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return code;
        }
        return null;
    }
};
