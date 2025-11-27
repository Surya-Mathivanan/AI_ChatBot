# Theme Guide - Gemini Chat

## 🎨 Color Scheme

The application uses a modern color palette inspired by:
- **Supabase Green** (`#3ECF8E`) - Primary accent color
- **GitHub Blue** (`#0969DA`) - Secondary accent color
- **Black Background** (`#000000`) - Dark theme base

## 🌓 Theme Modes

### Dark Mode (Default)
- Background: Pure black (#000000) to dark gray (#1c2128)
- Text: Light gray (#e6edf3) 
- Accent: Supabase green for primary actions
- Borders: Subtle dark borders (#30363d)

### Light Mode
- Background: White (#ffffff) to light gray (#f6f8fa)
- Text: Dark gray (#1f2328)
- Accent: Darker green for better contrast
- Borders: Light gray borders (#d0d7de)

## 🔧 Theme Variables

All theme colors are defined in `src/theme.css` using CSS custom properties:

```css
--bg-primary       /* Main background */
--bg-secondary     /* Secondary surfaces */
--bg-tertiary      /* Tertiary surfaces */
--bg-elevated      /* Elevated components */

--text-primary     /* Main text */
--text-secondary   /* Secondary text */
--text-tertiary    /* Tertiary text */

--border-primary   /* Main borders */
--border-secondary /* Secondary borders */

--accent-primary   /* Primary buttons/links */
--accent-secondary /* Secondary accent */
--accent-hover     /* Hover states */

--message-user-bg  /* User message bubbles */
--message-ai-bg    /* AI message bubbles */

--sidebar-bg       /* Sidebar background */
--sidebar-hover    /* Sidebar hover state */
--sidebar-active   /* Sidebar active item */
```

## 🎯 Component Updates

### Login Page
- Removed white card/box
- Centered "Gemini Chat" title
- Black background
- Minimalist design with just title and login button

### Sidebar
- Supabase green "New Chat" button
- Active chat highlighted with green border
- Smooth hover effects
- User info at bottom

### Chat Interface
- GitHub blue user message bubbles
- Dark/light AI message bubbles based on theme
- Supabase green send button
- Theme toggle button (☀️/🌙) in header
- Smooth transitions between themes

### Buttons & Inputs
- Rounded corners (8px-12px)
- Supabase green primary buttons
- Hover effects with shadow and transform
- Proper focus states with green accent

## 🔄 Theme Toggle

Located in the chat header (top-right):
- Click sun (☀️) icon to switch to light mode
- Click moon (🌙) icon to switch to dark mode
- Theme preference saved in localStorage
- Smooth transitions on theme change

## 📝 Usage

The theme system uses React Context:

```javascript
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

## 🎨 Customization

To customize colors, edit `src/theme.css`:

1. Update root color variables for global changes
2. Modify `[data-theme="dark"]` for dark mode
3. Modify `[data-theme="light"]` for light mode

All components will automatically use the new colors!

## ✨ Features

- ✅ Day/night mode toggle
- ✅ Smooth color transitions
- ✅ Persistent theme preference
- ✅ Supabase green & GitHub blue accents
- ✅ Black background in dark mode
- ✅ Responsive on all devices
- ✅ Accessible color contrasts
