# VS Code Calculator Pro - Run in Termux Proot-Ubuntu

A professional calculator and unit converter web application with VS Code-inspired dark theme. This guide explains how to run the project locally in Termux using Proot-Ubuntu (Ubuntu environment without root).

## Prerequisites

1. **Android Device** with Termux installed (`com.termux`)
2. Basic Unix/Linux command line knowledge

---

## Quick Start

### Step 1: Install Termux & Update Packages

```bash
pkg update && pkg upgrade
```

### Step 2: Install Proot-Distro & Ubuntu

```bash
pkg install proot-distro
proot-distro install ubuntu
proot-distro login ubuntu
```

### Step 3: Set up Ubuntu Environment

Inside Ubuntu (after `proot-distro login ubuntu`):

```bash
apt update && apt upgrade -y

# Install Git
apt install -y git

# Install Python (for simple HTTP server)
apt install -y python3

# Optional: Install a lightweight web server (Node.js)
apt install -y nodejs npm
```

### Step 4: Clone the Repository

```bash
cd ~
git clone https://github.com/nexoai361-png/ReversX-Calculator.git
cd ReversX-Calculator
```

### Step 5: Run with Python (Simplest Method)

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your mobile browser (Chrome/Firefox).

---

## Running with Live Reload (Recommended)

### Install `lite-server` (Auto-refresh)

```bash
# Inside Ubuntu
cd ReversX-Calculator
npm install -g lite-server
npm init -y  # If package.json doesn't exist
```

Create `package.json`:
```json
{
  "name": "vs-code-calculator-pro",
  "version": "2.0.0",
  "scripts": {
    "start": "lite-server"
  }
}
```

Start dev server:
```bash
npm start
```

---

## Accessing from Android Network

If running on `http://localhost:8000`, your phone and computer can access it at:
- `http://<your-device-ip>:8000`

Find your IP:
```bash
ip addr show  # Look for 'inet' value
```

---

## Pro Tips for Termux

1. **Keep Termux Open:** Background servers need Termux active. Use split-screen if needed.
2. **Install ES Module Support:** The app uses `<script type="module">`. No build step needed; modern browsers and Node 14+ support ES modules natively.
3. **Offline Access:** Once cached by the browser, the PWA works offline (enable via Chrome install prompt).

---

## Project Structure Reminder

```
ReversX-Calculator/
├── index.html      # HTML shell with DOM elements
├── src/
│   ├── index.js       # Entry point (module wiring)
│   ├── core/
│   │   ├── calculator.js
│   │   ├── converter.js
│   │   ├── history.js
│   │   ├── programmer.js
│   │   └── theme.js
│   ├── ui/
│   │   └── ui-manager.js
│   └── utils/
│       ├── data.js
│       └── keyboard.js
└── README.md
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8000
fuser -k 8000/tcp
```

### Permission Denied Cloning Git
```bash
git config --global --add safe.directory '*'
```

### Node Not Found
```bash
ln -sf /usr/bin/node /usr/local/bin/node
```

## License
MIT © [nexoai361-png](https://github.com/nexoai361-png)
