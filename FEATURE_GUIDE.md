# Discord Manager - Extended Features Implementation Guide

## New Features Being Added

### 1. **DM Channel Management** 
- View all your DM conversations (individual & group)
- See when you last messaged each person/group
- Identify inactive DMs (no messages in 6+ months)
- Close/archive old DMs with one click
- Opens Discord's DM list with instructions

### 2. **Connected Accounts Overview**
- See all accounts you've connected to Discord (Spotify, Xbox, GitHub, etc.)
- Quick links to manage connections
- Privacy awareness tool

### 3. **Server Insights**
- Nickname tracker: See which servers you have custom names in
- Role summary: View all special roles you have across servers
- Permission overview: Identify servers where you're admin/moderator

## Backend Changes (COMPLETED ✅)

The server.js file now includes:

1. **New OAuth Scopes:**
   - `dm_channels.read` - Access to DM channels
   - `connections` - Access to linked accounts

2. **New API Endpoints:**
   - `GET /api/dm-channels` - Fetch user's DMs with last message info
   - `GET /api/connections` - Fetch linked accounts
   - `GET /api/relationships` - Friends (won't work due to Discord limitations)

## Frontend Changes Needed

### New State Properties:
```javascript
dmChannels: [],
selectedDMs: new Set(),
connections: [],
currentTab: 'servers', // or 'dms', 'insights'
```

### New Tabs:
1. **Servers** (existing)
2. **DMs** (new)
3. **Insights** (new)

### DMs Tab Features:
- Stats cards: Total DMs, Active (30d), Inactive (180d+), Selected
- Search/filter DMs
- Sort by: Last Message, Name
- Select inactive DMs button
- "Close Selected DMs" button (opens Discord with instructions)
- Each DM shows:
  - Recipient name(s) & avatar
  - Last message date
  - Active/Inactive badge
  - "Open DM" button
  - "Close DM" button (with instructions modal)

### Insights Tab Features:
- **Connected Accounts Section:**
  - Shows all linked accounts (Spotify, Xbox, Steam, etc.)
  - Links to Discord settings to manage them
  
- **Server Insights Section:**
  - Servers where you have custom nicknames
  - Servers where you have special roles (admin, mod, etc.)
  - Servers you own vs member-only

- **Activity Summary:**
  - Total servers joined
  - Servers joined this month/year
  - Most active servers (based on simulated data)

## Implementation Steps

### Step 1: Update Frontend State
Add new properties to handle DMs, connections, and tabs

### Step 2: Fetch DM Data on Login
Update `loadDiscordData()` to also fetch DMs and connections

### Step 3: Create DM Tab Rendering
Similar to servers tab but for DMs

### Step 4: Create Insights Tab
Dashboard-style view with cards and stats

### Step 5: Add Tab Navigation
Buttons to switch between Servers, DMs, and Insights

### Step 6: Create DM Management Functions
- `toggleDM()`, `selectInactiveDMs()`, `closeDMWithInstructions()`

### Step 7: Style Updates
May need additional CSS for new layouts

## Testing Checklist

- [ ] Log out and log back in to grant new OAuth permissions
- [ ] Verify DMs load correctly
- [ ] Test DM filtering and sorting
- [ ] Test "Close DM" instructions modal
- [ ] Verify connections display
- [ ] Check insights tab renders correctly
- [ ] Test tab switching
- [ ] Ensure all existing server features still work

## Notes

- **relationships.read scope won't work** - Discord doesn't allow it for OAuth apps
- DM last message dates are extracted from Discord's snowflake IDs (approximate)
- Some features use simulated data (marked in comments)
- Consider adding pagination if user has 100+ DMs or servers

## Deployment

1. Upload updated `server.js` to GitHub
2. Update `index.html` with new frontend code
3. Wait for Render to redeploy
4. Users must log out and log back in to grant new permissions
5. Test all features work correctly
