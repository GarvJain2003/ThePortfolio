/**
 * BACKEND LOGIC FOR LINKEDIN INTEGRATION
 * Deploy this to Firebase Cloud Functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const db = admin.firestore();

// CONFIGURATION (Set these in Firebase functions config)
// firebase functions:config:set linkedin.client_id="YOUR_ID" linkedin.client_secret="YOUR_SECRET"
const CLIENT_ID = functions.config().linkedin.client_id;
const CLIENT_SECRET = functions.config().linkedin.client_secret;
const REDIRECT_URI = "YOUR_APP_URL/admin";

/**
 * 1. EXCHANGE AUTH CODE FOR TOKEN
 * Call this from your Frontend when you get the 'code' back from LinkedIn
 */
exports.linkedinAuth = functions.https.onCall(async (data, context) => {
    // Only allow Admin
    if (!context.auth || context.auth.token.email !== 'garvjain2003@gmail.com') {
        throw new functions.https.HttpsError('permission-denied', 'Only the Minister can auth.');
    }

    const { code } = data;

    try {
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        // Save Token Securely to Firestore (Private Collection)
        await db.collection('secrets').doc('linkedin').set({
            accessToken: accessToken,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error("LinkedIn Auth Failed:", error.response?.data || error);
        throw new functions.https.HttpsError('internal', 'Auth Failed');
    }
});

/**
 * 2. AUTO-POST TRIGGER
 * Listens for new posts with { shareToLinkedin: true }
 */
exports.postToLinkedin = functions.firestore
    .document('posts/{postId}')
    .onCreate(async (snap, context) => {
        const post = snap.data();

        if (!post.shareToLinkedin) return;

        // Get Token
        const secretDoc = await db.collection('secrets').doc('linkedin').get();
        if (!secretDoc.exists) {
            console.log("No LinkedIn Token found.");
            return;
        }
        const accessToken = secretDoc.data().accessToken;

        // Get User URN (Person ID)
        let urn;
        try {
            const me = await axios.get('https://api.linkedin.com/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            urn = me.data.id;
        } catch (e) {
            console.error("Failed to fetch profile", e);
            return;
        }

        // Construct Payload (Simple Text Share)
        const payload = {
            author: `urn:li:person:${urn}`,
            lifecycleState: "PUBLISHED",
            specificContent: {
                "com.linkedin.ugc.ShareContent": {
                    shareCommentary: {
                        text: `${post.title}\n\n${post.content}\n\n- Posted via The Social Prophet`
                    },
                    shareMediaCategory: "NONE"
                }
            },
            visibility: {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        };

        try {
            const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-Restli-Protocol-Version': '2.0.0'
                }
            });

            // Link Success
            const linkedinId = response.data.id;
            return snap.ref.update({
                linkedinPostId: linkedinId,
                linkedinStatus: 'PUBLISHED'
            });

        } catch (error) {
            console.error("LinkedIn Post Failed:", error.response?.data || error);
            return snap.ref.update({ linkedinStatus: 'FAILED', linkedinError: JSON.stringify(error.response?.data) });
        }
    });
