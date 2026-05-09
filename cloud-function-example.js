const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // Enable CORS for all origins

// Initialize Firebase Admin (if not already initialized)
if (!admin.apps.length) {
    admin.initializeApp();
}

exports.submitLeadForm = functions.https.onRequest((req, res) => {
    // Handle CORS
    cors(req, res, async () => {
        // Only accept POST requests
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        try {
            const {
                firstName,
                lastName,
                email,
                phone,
                employeeRange,
                recaptchaToken
            } = req.body;

            // Basic validation
            if (!firstName || !lastName || !email || !phone || !employeeRange) {
                return res.status(400).json({ 
                    error: 'Missing required fields' 
                });
            }

            // Validate reCAPTCHA (optional but recommended)
            if (recaptchaToken) {
                const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `secret=${functions.config().recaptcha.secret_key}&token=${recaptchaToken}`
                });

                const recaptchaResult = await recaptchaResponse.json();
                
                if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
                    return res.status(400).json({ 
                        error: 'reCAPTCHA verification failed' 
                    });
                }
            }

            // Save to Firestore (or your preferred database)
            await admin.firestore().collection('leads').add({
                firstName,
                lastName,
                email,
                phone,
                employeeRange,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                source: 'website_form'
            });

            // Send success response
            res.status(200).json({ 
                success: true, 
                message: 'Lead submitted successfully' 
            });

        } catch (error) {
            console.error('Error submitting lead:', error);
            res.status(500).json({ 
                error: 'Internal server error' 
            });
        }
    });
}); 