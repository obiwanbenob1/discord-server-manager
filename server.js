const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${PORT}/callback`;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get Discord OAuth URL
app.get('/api/auth/url', (req, res) => {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds%20guilds.join%20dm_channels.read%20connections`;
    res.json({ url: authUrl });
});

// OAuth callback - exchange code for token
app.get('/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.redirect('/?error=no_code');
    }

    try {
        // Exchange code for access token
        const tokenResponse = await axios.post(
            'https://discord.com/api/oauth2/token',
            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token } = tokenResponse.data;

        // Redirect back to app with token
        res.redirect(`/?token=${access_token}`);
    } catch (error) {
        console.error('OAuth error:', error.response?.data || error.message);
        res.redirect('/?error=auth_failed');
    }
});

// Get user info
app.get('/api/user', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        res.json(userResponse.data);
    } catch (error) {
        console.error('User fetch error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch user info' 
        });
    }
});

// Get user's guilds
app.get('/api/guilds', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds?with_counts=true', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const guilds = guildsResponse.data;

        // Transform guild data
        const serverData = guilds.map(guild => ({
            id: guild.id,
            name: guild.name,
            icon: guild.icon 
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
                : null,
            memberCount: guild.approximate_member_count || 0,
            owner: guild.owner,
            permissions: guild.permissions,
            // Note: Discord's user OAuth doesn't provide activity data
            // These would need to be tracked separately or require bot access
            lastMessageDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
            yourLastActivity: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
            messagesLast7Days: Math.floor(Math.random() * 1000)
        }));

        res.json(serverData);
    } catch (error) {
        console.error('Guild fetch error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch guilds' 
        });
    }
});

// Get user's friends/relationships
app.get('/api/relationships', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const relationshipsResponse = await axios.get('https://discord.com/api/users/@me/relationships', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const relationships = relationshipsResponse.data;

        // Transform relationship data
        const friendData = relationships
            .filter(rel => rel.type === 1) // Type 1 = Friend
            .map(rel => ({
                id: rel.id,
                username: rel.user.username,
                discriminator: rel.user.discriminator,
                avatar: rel.user.avatar 
                    ? `https://cdn.discordapp.com/avatars/${rel.user.id}/${rel.user.avatar}.png?size=128`
                    : null,
                // Note: Discord OAuth doesn't provide DM history or last message times
                // These would be simulated for demonstration
                lastDmDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
                messagesLast30Days: Math.floor(Math.random() * 100),
            }));

        res.json(friendData);
    } catch (error) {
        console.error('Relationships fetch error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch relationships',
            details: error.response?.data
        });
    }
});

// Get user's DM channels
app.get('/api/dm-channels', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const channelsResponse = await axios.get('https://discord.com/api/users/@me/channels', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const channels = channelsResponse.data;

        // Filter and transform DM channels
        const dmData = channels
            .filter(channel => channel.type === 1 || channel.type === 3) // Type 1 = DM, Type 3 = Group DM
            .map(channel => ({
                id: channel.id,
                type: channel.type,
                recipients: channel.recipients || [],
                lastMessageId: channel.last_message_id,
                // Calculate approximate last message date from snowflake ID
                lastMessageDate: channel.last_message_id 
                    ? new Date((parseInt(channel.last_message_id) / 4194304) + 1420070400000)
                    : null,
                name: channel.name || (channel.recipients && channel.recipients.length > 0 
                    ? channel.recipients.map(r => r.username).join(', ')
                    : 'Unknown'),
                icon: channel.icon,
            }));

        res.json(dmData);
    } catch (error) {
        console.error('DM channels fetch error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch DM channels',
            details: error.response?.data
        });
    }
});

// Get user connections (linked accounts)
app.get('/api/connections', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const connectionsResponse = await axios.get('https://discord.com/api/users/@me/connections', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        res.json(connectionsResponse.data);
    } catch (error) {
        console.error('Connections fetch error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch connections',
            details: error.response?.data
        });
    }
});

// Leave a guild
app.delete('/api/guilds/:guildId', async (req, res) => {
    const { guildId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const response = await axios.delete(`https://discord.com/api/users/@me/guilds/${guildId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Successfully left guild:', guildId);
        res.json({ success: true, message: `Left guild ${guildId}` });
    } catch (error) {
        console.error('Leave guild error - Full details:');
        console.error('Status:', error.response?.status);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
        console.error('Headers:', error.response?.headers);
        
        // Check if it's a permission error
        if (error.response?.status === 403) {
            return res.status(403).json({ 
                error: 'Permission denied. You may be the server owner or lack permissions to leave.',
                discordError: error.response?.data
            });
        }
        
        // Check if it's a rate limit
        if (error.response?.status === 429) {
            return res.status(429).json({ 
                error: 'Rate limited. Please wait a moment and try again.',
                discordError: error.response?.data
            });
        }
        
        // For 401, include Discord's exact error
        if (error.response?.status === 401) {
            return res.status(401).json({ 
                error: '401: Unauthorized',
                details: error.response?.data,
                message: 'Discord API returned 401. This may indicate the token lacks proper permissions or has expired.'
            });
        }
        
        res.status(error.response?.status || 500).json({ 
            error: error.response?.data?.message || 'Failed to leave guild',
            details: error.response?.data
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📝 Make sure to set up your .env file with Discord credentials`);
    console.log(`🔗 OAuth callback URL: ${REDIRECT_URI}`);
});
