# GoJio - Community Events Platform

A fully-integrated community-based web platform for discovering and joining neighbourhood events in Singapore.

## 🎨 Features

- **User Authentication** - Login/Register with neighbourhood selection
- **Event Discovery** - Browse and search events by category and location
- **Interactive Map** - Visual event discovery with hover previews
- **Event Management** - Create, edit, and manage community events
- **Messaging System** - Private chats and group event discussions
- **Real-time Notifications** - Stay updated on event changes and interests
- **Organiser Dashboard** - Analytics and participant management
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Technology Stack

- **React 18.3.1** - UI library
- **React Router 7** - Navigation
- **Tailwind CSS 4** - Styling
- **Motion (Framer Motion)** - Animations
- **Radix UI** - Accessible UI components
- **Lucide React** - Icons
- **Recharts** - Data visualization

## 📦 Project Structure

```
gojio-app/
├── public/
│   └── index.html
├── src/
│   ├── index.js (entry point)
│   ├── app/
│   │   ├── App.jsx
│   │   ├── routes.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx (global state)
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── ExplorePage.jsx
│   │   │   ├── ActivityDetailPage.jsx
│   │   │   ├── MessagesPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── PopularEventsPage.jsx
│   │   │   ├── UpcomingEventsPage.jsx
│   │   │   └── ... (other pages)
│   │   └── components/
│   │       ├── AppLayout.jsx
│   │       ├── ActivityCard.jsx
│   │       ├── ActivityDetailPanel.jsx
│   │       ├── MapView.jsx
│   │       └── ui/ (shared UI components)
│   ├── styles/
│   │   ├── fonts.css
│   │   └── theme.css
│   └── imports/ (Figma assets)
├── package.json
├── jsconfig.json
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd gojio-app

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

## 🔄 TypeScript to JavaScript Conversion

This project was converted from TypeScript to JavaScript. If you have TypeScript files (.tsx, .ts), follow these guides:

1. **Quick Conversion:** See `QUICK_CONVERT.md`
2. **Detailed Guide:** See `CONVERSION_GUIDE.md`
3. **Automated Script:** Run `bash convert_all.sh`

### Conversion Status

✅ **Completed:**
- Core app files (App.jsx, routes.jsx)
- Context management (AppContext.jsx)
- Authentication pages (LoginPage.jsx)
- Configuration files (package.json, jsconfig.json)

🔄 **Remaining:**
- See QUICK_CONVERT.md for one-command solution
- ~65 files can be batch converted

## 📱 Key Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | LoginPage | User login |
| `/register` | RegisterPage | New user registration |
| `/home` | HomePage | Booked, popular, and upcoming events |
| `/explore` | ExplorePage | Map/list view of all events |
| `/activity/:id` | ActivityDetailPage | Detailed event information |
| `/messages` | MessagesPage | All conversations (private & groups) |
| `/messages/:chatId` | ChatPage | Individual chat interface |
| `/events/popular` | PopularEventsPage | Top events by popularity |
| `/events/upcoming` | UpcomingEventsPage | Events sorted by date |
| `/activity/create` | CreateActivityPage | Create new event |
| `/notifications` | NotificationsPage | User notifications |
| `/settings` | SettingsPage | User settings |

## 🎨 Design System

### Brand Colors

```css
/* Primary */
--primary: #5661F6 (brand purple-blue)

/* Backgrounds */
--background: #F5F5F7 (light gray)
--card-background: #FFFFFF (white)

/* Text */
--text-primary: #0C1421 (dark)
--text-secondary: #6B7280 (gray)

/* Status Colors */
--success: #10B981 (green)
--error: #EF4444 (red)
--warning: #F59E0B (orange)
```

### Typography

- Headings: System font stack with font-semibold
- Body: 14px-16px with comfortable line-height
- Buttons: 16px-20px with medium weight

### Components

- **Cards:** Rounded-2xl (16px) with subtle shadows
- **Buttons:** Rounded-xl (12px) with hover transitions
- **Inputs:** Rounded-xl with #F7FBFF background
- **Spacing:** 4px base unit (Tailwind scale)

## 🔑 Key Features

### 1. Event Discovery & Exploration

- **Split View:** Sidebar list + Interactive map
- **Real-time Filtering:** Category, neighbourhood, date
- **Map Previews:** Hover over pins to see event details
- **Expanded Details:** Modal view without leaving explore page

### 2. Registration & Authentication

- **Split-screen Design:** Form + Hero image
- **Neighbourhood Selection:** 16 Singapore neighbourhoods
- **Clean UX:** Minimal fields, clear CTAs

### 3. Event Management

- **Sign Up/Cancel:** One-click registration
- **Group Chat:** Automatic chat creation for participants
- **Status Tracking:** "Registered", "Spots Left" indicators

### 4. Messaging System

- **Tabs:** All / Private / Groups
- **File Upload:** Images and documents
- **Anonymous Mode:** Hide identity in group chats
- **Group Chats:** Auto-created for each event

### 5. Home Dashboard

- **Three Sections:**
  - Booked Events (your registrations)
  - Popular Events (most participants)
  - Upcoming Events (by date)
- **Quick Actions:** "See all" links to filtered views

## 🧩 Component Architecture

### State Management

Global state managed via Context API (`AppContext.jsx`):

```javascript
import { useApp } from './context/AppContext';

const { 
  currentUser,           // Current logged-in user
  activities,            // All events
  toggleInterest,        // Register/unregister
  conversations,         // Chat conversations
  notifications,         // User notifications
  unreadMessageCount,    // Badge counter
  // ... more
} = useApp();
```

### Routing

React Router with protected routes:

```javascript
// Public routes
/login, /register

// Protected routes (require login)
/home, /explore, /activity/:id, /messages, etc.
```

## 🎯 User Flows

### 1. Discovery → Registration → Chat

```
Explore Page → Click Event → View Details → Sign Up → Chat Button
```

### 2. Home → Filtered Lists

```
Home Page → "See all" on Popular → PopularEventsPage (filtered list)
```

### 3. Map Interaction

```
Explore Page → Hover Pin → Preview Card → "View Details" → Activity Page
```

## 🐛 Troubleshooting

### App won't start

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### "Cannot find module" errors

- Check import paths don't include `.tsx` extensions
- Verify all TypeScript files have been converted
- Ensure corresponding `.jsx` files exist

### Styling issues

- Verify Tailwind CSS is properly configured
- Check `src/styles/theme.css` is imported
- Clear browser cache

### Build fails

```bash
# Check for remaining TypeScript syntax
grep -r ": React" src/
grep -r "interface " src/
```

## 📚 Documentation

- **QUICK_CONVERT.md** - Fast TypeScript to JavaScript conversion
- **CONVERSION_GUIDE.md** - Detailed conversion instructions
- **convert_all.sh** - Automated conversion script

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- **Design:** Figma designs provided by client
- **Icons:** Lucide React
- **UI Components:** Radix UI primitives
- **Maps:** Custom implementation
- **Animations:** Motion (Framer Motion)

---

**Built with ❤️ in Singapore** 🇸🇬
