# Discord Manager

A comprehensive, privacy-focused web application for managing and organizing your Discord servers.

![Discord Manager](https://img.shields.io/badge/Discord-Manager-00ff88?style=for-the-badge)
![Privacy First](https://img.shields.io/badge/Privacy-First-00d4ff?style=for-the-badge)
![No Tracking](https://img.shields.io/badge/No-Tracking-ff3366?style=for-the-badge)

## 🌐 Live Demo

**Website:** [https://www.discordmanage.com](https://www.discordmanage.com)

## ✨ Features

### 📊 Server Organization
- **Manual Categorization** - Tag servers with custom categories (Gaming, Work, Personal, etc.)
- **Smart Suggestions** - Get AI-powered category suggestions based on server names
- **Bulk Categorization** - Organize multiple servers at once
- **Advanced Filtering** - Filter by category, size, ownership

### 📈 Growth Tracking
- **Automatic Snapshots** - Daily member count tracking (stored locally)
- **Trend Analysis** - See which servers are growing or shrinking
- **90-Day History** - Track changes over time
- **Visual Indicators** - 📈 📉 ➡️ for quick insights

### 🔐 Security & Privacy
- **Permission Auditor** - Identify servers with elevated permissions
- **Security Dashboard** - See which servers have admin access
- **Risk Assessment** - High/Medium/Low risk indicators
- **No Data Storage** - We don't store your Discord data on our servers

### 🔧 Powerful Tools
- **Duplicate Detector** - Find servers you're in multiple times
- **Bulk Actions** - Manage multiple servers simultaneously
- **CSV/JSON Export** - Download your organized server list
- **Smart Search** - Quickly find specific servers

### 📱 User Experience
- **Beautiful UI** - Cyberpunk-themed interface
- **Responsive Design** - Works on desktop and mobile
- **Fast Performance** - Client-side processing
- **No Installation** - Web-based, works in any browser

## 🔐 Privacy & Security

### What We Access
- Discord username and ID (via OAuth)
- List of servers you're in
- Server member counts and icons
- Connected accounts (if you grant permission)

### What We DON'T Access
- ❌ Your Discord password (we never see it)
- ❌ Your messages or DMs
- ❌ Any personal data beyond OAuth
- ❌ We don't use analytics or tracking

### Data Storage
- **Server-Side:** We store NOTHING on our servers
- **Client-Side:** Categories and growth data stored in your browser's localStorage
- **Your Control:** Clear all data by logging out

## 🚀 How It Works

1. **Login with Discord OAuth** - Secure, official authentication
2. **Grant Permissions** - Read-only access to your server list
3. **Organize Servers** - Categorize, filter, and manage
4. **Track Growth** - Automatic daily snapshots
5. **Export Data** - Download anytime as CSV/JSON

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript (no frameworks!)
- **Backend:** Node.js + Express
- **Authentication:** Discord OAuth 2.0
- **Hosting:** Render.com
- **Storage:** localStorage (client-side only)
- **API:** Discord REST API v10

## 📦 Self-Hosting

Want to run your own instance?

1. **Clone the repository**
2. **Install dependencies:** `npm install`
3. **Set up Discord OAuth:**
   - Create an app at [Discord Developer Portal](https://discord.com/developers/applications)
   - Add redirect URI: `http://localhost:3000/callback`
4. **Configure environment variables:**
   ```
   DISCORD_CLIENT_ID=your_client_id
   DISCORD_CLIENT_SECRET=your_client_secret
   REDIRECT_URI=http://localhost:3000/callback
   ```
5. **Run:** `npm start`
6. **Visit:** `http://localhost:3000`

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Contact

Created by [@ObiWanBENobiETH](https://x.com/ObiWanBENobiETH)

- **Twitter/X:** [@ObiWanBENobiETH](https://x.com/ObiWanBENobiETH)
- **Issues:** Use GitHub Issues
- **Questions:** DM on Twitter

## ⚠️ Disclaimer

- Discord Manager is **NOT affiliated** with Discord Inc.
- This is a third-party tool using Discord's official OAuth API
- We cannot modify your servers or send messages
- Use at your own risk (though it's perfectly safe!)

## 📄 License

MIT License - Free to use, modify, and distribute

## 🙏 Acknowledgments

- Discord for their excellent OAuth API
- The open-source community
- Everyone who provides feedback and suggestions

---

**Built with ❤️ for the Discord community**

Not a phishing site! Just a helpful tool. 🚀
