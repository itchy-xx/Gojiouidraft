# TypeScript to JavaScript Conversion Guide

## ✅ Already Converted Files
- `/src/index.js` - Main entry point
- `/src/app/App.jsx` - Main App component
- `/src/app/routes.jsx` - Router configuration
- `/src/app/context/AppContext.jsx` - Application state management
- `/src/app/pages/LoginPage.jsx` - Login page
- `/package.json` - Updated for Create React App
- `/public/index.html` - HTML entry point
- `/jsconfig.json` - JavaScript configuration

## 🔄 Files That Need Manual Conversion

### Pages (High Priority)
Convert all files in `/src/app/pages/`:
- RegisterPage.tsx → RegisterPage.jsx
- HomePage.tsx → HomePage.jsx
- ExplorePage.tsx → ExplorePage.jsx
- ActivityDetailPage.tsx → ActivityDetailPage.jsx
- MessagesPage.tsx → MessagesPage.jsx
- ChatPage.tsx → ChatPage.jsx
- PopularEventsPage.tsx → PopularEventsPage.jsx
- UpcomingEventsPage.tsx → UpcomingEventsPage.jsx
- CreateActivityPage.tsx → CreateActivityPage.jsx
- EditActivityPage.tsx → EditActivityPage.jsx
- MyActivitiesPage.tsx → MyActivitiesPage.jsx
- NotificationsPage.tsx → NotificationsPage.jsx
- SettingsPage.tsx → SettingsPage.jsx
- AnalyticsPage.tsx → AnalyticsPage.jsx
- NotFoundPage.tsx → NotFoundPage.jsx
- OrganiserDashboardPage.tsx → OrganiserDashboardPage.jsx

### Components (High Priority)
- AppLayout.tsx → AppLayout.jsx
- ActivityCard.tsx → ActivityCard.jsx
- ActivityDetailPanel.tsx → ActivityDetailPanel.jsx
- MapView.tsx → MapView.jsx
- figma/ImageWithFallback.tsx → figma/ImageWithFallback.jsx

### UI Components (Can use pattern-based conversion)
All files in `/src/app/components/ui/`:
- Simply remove type annotations
- Change React.FC to regular function
- Remove interface/type definitions
- Change file extension from .tsx to .jsx

## 🛠️ Conversion Steps

### For each .tsx file:

1. **Remove type annotations:**
   ```typescript
   // Before
   export const MyComponent: React.FC<Props> = ({ prop1, prop2 }: Props) => {
   
   // After
   export const MyComponent = ({ prop1, prop2 }) => {
   ```

2. **Remove interface/type definitions:**
   ```typescript
   // Remove these entirely
   interface Props {
     name: string;
     age: number;
   }
   
   type MyType = string | number;
   ```

3. **Remove parameter types:**
   ```typescript
   // Before
   const handleClick = (e: React.MouseEvent) => {
   
   // After
   const handleClick = (e) => {
   ```

4. **Remove return type annotations:**
   ```typescript
   // Before
   const getName = (): string => {
   
   // After
   const getName = () => {
   ```

5. **Remove generic types:**
   ```typescript
   // Before
   useState<string>('')
   
   // After
   useState('')
   ```

6. **Update imports:**
   ```javascript
   // Before
   import { Component } from './Component.tsx';
   
   // After
   import { Component } from './Component.jsx';
   // or simply
   import { Component } from './Component';
   ```

7. **Rename file:**
   - .tsx → .jsx
   - .ts → .js

## 📝 Example Conversion

### Before (TypeScript):
```typescript
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### After (JavaScript):
```javascript
import React from 'react';

export const Button = ({ label, onClick, disabled = false }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

## 🚀 Running the App

After conversion:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## ⚙️ Configuration Files

### package.json
- Updated to use `react-scripts`
- Removed Vite dependencies
- Added Create React App scripts

### jsconfig.json
- Configures JavaScript project settings
- Sets up path aliases
- Enables JSX support

### public/index.html
- Standard Create React App HTML template
- Contains root div for React app

## 🔧 Quick Conversion Tips

1. **Use Find & Replace in your editor:**
   - `: React.FC` → (empty)
   - `: any` → (empty)
   - `: string` → (empty)
   - `: number` → (empty)
   - `.tsx'` → `.jsx'`

2. **Remove entire lines containing:**
   - `interface`
   - `type `
   - `export interface`
   - `export type`

3. **Simplify function signatures:**
   - Remove everything between `)` and `{` or `=>`
   - Remove type annotations after parameter names

## ✅ Final Checklist

- [ ] All .tsx files converted to .jsx
- [ ] All .ts files converted to .js (except .d.ts)
- [ ] All type annotations removed
- [ ] All interfaces/types removed
- [ ] Import paths updated
- [ ] App runs without TypeScript errors
- [ ] All features work as expected
- [ ] Build completes successfully

## 🐛 Troubleshooting

### If you see "Cannot find module" errors:
- Check import paths don't include .tsx extension
- Make sure corresponding .jsx file exists

### If you see syntax errors:
- Look for remaining type annotations (`:` followed by type name)
- Check for remaining generics (`<Type>`)
- Verify all interfaces/types are removed

### If the app doesn't start:
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check that `src/index.js` and `public/index.html` exist
