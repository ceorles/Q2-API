// NOT NECESSARY, I'M JUST TRYING TO USE AN API AND IT'S NOT WORKING SO

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get('/api/manga', async (req, res) => {
    try {
        console.log("Client ID:", process.env.MANGADEX_CLIENT_ID);
        console.log("Client Secret:", process.env.MANGADEX_CLIENT_SECRET);

        const tokenResponse = await fetch('https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.MANGADEX_CLIENT_ID,
                client_secret: process.env.MANGADEX_CLIENT_SECRET
            })
        });

        if (!tokenResponse.ok) {
            const errorDetails = await tokenResponse.text();
            console.error("Token request failed:", errorDetails);
            throw new Error("Failed to fetch token from MangaDex");
        }

        const tokenData = await tokenResponse.json();
        console.log("Token received:", tokenData);
        const accessToken = tokenData.access_token;

        const apiResponse = await fetch('https://api.mangadex.org/manga', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!apiResponse.ok) {
            const errorDetails = await apiResponse.text();
            console.error("Manga fetch failed:", errorDetails);
            throw new Error("Failed to fetch manga from MangaDex API");
        }

        const apiData = await apiResponse.json();
        console.log("Manga data fetched:", apiData);
        res.json(apiData); 

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
