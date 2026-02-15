# Quick Start Guide - Database Version

## 1. Prerequisites
- Node.js installed (https://nodejs.org/)
- BarStock files in a directory

## 2. Installation (2 minutes)

Open PowerShell in the BarStock directory:

```powershell
npm install
```

## 3. Run the Server

```powershell
npm start
```

You should see:
```
Connected to SQLite database
Cocktails table initialized
...
BarStock server running at http://localhost:3000
```

## 4. Open the App

Visit: `http://localhost:3000`

Or open `index.html` directly

## Done! 🎉

The app now uses a database instead of localStorage.

---

## What's Different?

| Feature | Before | After |
|---------|--------|-------|
| **Storage** | Browser localStorage | SQLite database |
| **Data Persistence** | Local to browser | Server-based |
| **Multi-device** | ❌ Not possible | ✅ Possible with shared server |
| **Backup** | JSON export | Database file + JSON export |
| **Performance** | Faster (local) | Slightly slower (network) |

---

## Common Tasks

### Export Cocktails
Click the 💾 button in header

### Import Cocktails
Click the 📥 button and select JSON file

### View Database
- Download SQLite Browser: https://sqlitebrowser.org/
- Open `barstock.db` file
- View tables and data

### Stop the Server
Press `Ctrl+C` in PowerShell

### View Server Logs
Check PowerShell output for detailed logs

---

## Troubleshooting

**"Cannot GET /api/cocktails"**
- Server not running
- Visit `http://localhost:3000` instead of opening HTML directly

**"npm: command not found"**
- Node.js not installed or PATH not updated
- Restart PowerShell after installing Node.js

**Port 3000 already in use**
- Change PORT in server.js
- Or close other app using port 3000

**Need Help?**
- See DATABASE_SETUP.md for detailed guide
- Check IMPLEMENTATION_NOTES.md for technical details
