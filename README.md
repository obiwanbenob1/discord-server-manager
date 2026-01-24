# Discord Server Manager 🎮

A beautiful web application to analyze and manage your Discord servers. Identify inactive servers, track your activity, and mass-leave servers you no longer engage with.

![Discord Server Manager](https://img.shields.io/badge/Discord-OAuth2-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

## ✨ Features

- 🔐 **Secure Discord OAuth** - Login safely with your Discord account
- 📊 **Server Analytics** - See which servers are active vs inactive
- 🎯 **Smart Selection** - Auto-select servers where you've been inactive 30+ days
- 🚀 **Mass Leave** - Leave multiple servers at once
- 🎨 **Beautiful UI** - Modern cyberpunk-inspired design
- 💾 **Session Persistence** - Stay logged in across sessions

## 🚀 Quick Start

### Prerequisites

- Node.js 14 or higher
- A Discord account
- A Discord Application (we'll create this)

### 1. Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give it a name (e.g., "Server Manager")
4. Go to the "OAuth2" section in the left sidebar
5. Copy your **Client ID** and **Client Secret**
6. Under "Redirects", add your redirect URL:
   - For local development: `http://localhost:3000/callback`
   - For production: `https://your-domain.com/callback`

### 2. Clone and Install

```bash
# Clone the repository (or download the files)
cd discord-server-manager

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

### 3. Configure Environment Variables

Edit `.env` and add your Discord credentials:

```env
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
REDIRECT_URI=http://localhost:3000/callback
PORT=3000
```

### 4. Run Locally

```bash
# Start the server
npm start

# Or use nodemon for development (auto-restart on changes)
npm run dev
```

Visit `http://localhost:3000` and click "Login with Discord"!

## 🌐 Deployment Options

### Deploy to Render (Recommended - Free)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `discord-server-manager`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `REDIRECT_URI` (e.g., `https://discord-server-manager.onrender.com/callback`)
7. Click "Create Web Service"
8. Update your Discord app's redirect URI to match Render's URL

### Deploy to Railway

1. Push your code to GitHub
2. Go to [Railway](https://railway.app/)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy
6. Add environment variables in the "Variables" tab
7. Update Discord redirect URI with Railway's provided URL

### Deploy to Vercel

Note: Vercel works best with serverless functions. You may need to adapt the code.

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Add environment variables via Vercel dashboard
5. Update Discord redirect URI

### Deploy to Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Add environment variables
heroku config:set DISCORD_CLIENT_ID=your_id
heroku config:set DISCORD_CLIENT_SECRET=your_secret
heroku config:set REDIRECT_URI=https://your-app-name.herokuapp.com/callback

# Deploy
git push heroku main
```

## 📁 Project Structure

```
discord-server-manager/
├── server.js           # Express backend with OAuth handling
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variable template
├── .gitignore         # Git ignore rules
├── public/
│   └── index.html     # Frontend application
└── README.md          # This file
```

## 🔒 Security Notes

- Never commit your `.env` file or expose your Client Secret
- The Client Secret stays secure on your server
- Users never see or interact with your Discord credentials
- OAuth tokens are stored locally in the user's browser

## ⚠️ Important Limitations

**Activity Data:**
Discord's user OAuth API has limitations. The "Last Message" and "Messages (7d)" data shown in the app are **simulated** because:
- Discord doesn't provide message timestamps via user OAuth
- Getting real activity data would require:
  - A bot added to each server (not practical)
  - Or tracking data over time with additional storage

The app still shows:
- ✅ Your actual Discord servers
- ✅ Real member counts
- ✅ Which servers you own
- ✅ Actually leaves servers when you click the button

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## 📝 API Endpoints

- `GET /` - Serve the main application
- `GET /api/auth/url` - Get Discord OAuth URL
- `GET /callback` - OAuth callback handler
- `GET /api/user` - Get authenticated user info
- `GET /api/guilds` - Get user's Discord servers
- `DELETE /api/guilds/:guildId` - Leave a specific server
- `GET /api/health` - Health check endpoint

## 🤝 Contributing

Feel free to fork and improve this project!

## 📜 License

MIT License - feel free to use this for any purpose!

## 🐛 Troubleshooting

**"Authentication failed" error:**
- Check that your Client ID and Secret are correct in `.env`
- Verify the redirect URI matches exactly in both Discord and `.env`
- Make sure the redirect URI includes `/callback` at the end

**App doesn't load servers:**
- Check browser console for errors
- Verify your Discord token hasn't expired (logout and login again)
- Ensure your Discord app has the correct OAuth scopes: `identify` and `guilds`

**Can't deploy:**
- Ensure all environment variables are set in your hosting platform
- Check that the hosting platform supports Node.js
- Verify the start command is `npm start` or `node server.js`

## 📞 Support

For issues or questions:
- Check the [Discord Developer Documentation](https://discord.com/developers/docs)
- Review your hosting platform's documentation
- Check browser console for error messages

---

Made with ⚡ by someone tired of too many Discord servers
