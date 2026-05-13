# References Page Implementation

## Overview
A modern, anime-inspired Python reference page with a Bento Grid layout and liquid venom-like animations (inspired by JJK/Lofi Girl aesthetic).

## File Structure
```
src/
├── pages/
│   ├── ReferencesPage.tsx       # Main page component
│   └── ReferencesPage.css       # Page-level styles
├── components/references/
│   ├── BentoGrid.tsx            # Grid container
│   ├── BentoGrid.css            # Grid layout styles
│   ├── BentoTile.tsx            # Individual tiles with CSS visuals
│   ├── BentoTile.css            # Tile styles & animations
│   ├── ReferenceModal.tsx       # Expandable modal
│   └── ReferenceModal.css       # Modal with venom animations
└── data/
    └── referenceData.ts         # All Python concepts data
```

## Features

### Bento Grid Layout
- **Responsive grid** with thick black borders (4px gap)
- **Curved tiles** (border-radius: 20px)
- **Auto-fit layout** adapts to screen size
- **Staggered entrance animation** for tiles

### Tile Interactions
1. **Default State**: Calm and static
2. **Hover**: Subtle growth (scale 1.05) with glow effect
3. **Click**: Liquid venom expansion to full modal
4. **Close**: Reverse liquid contraction back to tile

### Visual Elements (Pure CSS)
Each tile has a monochromatic anime-style visual:
- **print()**: Bracket symbols with text
- **Variables**: Assignment visualization (x = 42)
- **Operators**: Grid of operator symbols (+, -, *, /)
- **Lists**: Bracket with colored squares
- **Dictionaries**: Curly braces with key:value pairs
- **Functions**: def keyword with parentheses
- **Matplotlib**: Chart with plotted lines
- And 16 more unique visuals!

### Modal Features
- **Terminal-style code display** with macOS window buttons
- **Syntax highlighting** via color-coded text
- **Output section** showing example results
- **Notes section** with important tips
- **Liquid venom animation** on open/close

### Animation Details

#### Venom Expansion (venomExpand)
```
0%   → scale(0.3), opacity 0, border-radius 50%
30%  → scale(0.5), opacity 0.3, border-radius 40%
60%  → scale(1.1), opacity 0.8, border-radius 30%
80%  → scale(0.95), border-radius 26%
100% → scale(1), opacity 1, border-radius 24px
```

#### Venom Contraction (venomContract)
```
0%   → scale(1), opacity 1, border-radius 24px
20%  → scale(1.05), border-radius 26%
40%  → scale(0.9), opacity 0.8, border-radius 30%
70%  → scale(0.5), opacity 0.3, border-radius 40%
100% → scale(0.2), opacity 0, border-radius 50%
```

## Design Philosophy

### Color Palette (Lofi/JJK Inspired)
- **Primary**: #b2f65f (lime green)
- **Secondary**: #00d4ff (cyan blue)
- **Accent**: #ff6b9d (pink)
- **Error**: #ff003c (red)
- **Background**: #0f0f12 to #1a1a24 (dark gradient)

### Typography
- **Headers**: Bold, gradient text
- **Code**: Monospace (Courier New)
- **Body**: Clean, readable sans-serif

### UX Principles
1. **No motion without intent** - tiles don't animate unless user interacts
2. **Progressive disclosure** - info revealed on click, not overwhelming
3. **Professional feel** - clean, organized, easy to scan
4. **Visual learning** - CSS graphics reinforce concepts

## Python Concepts Covered
- print() and string formatting
- Variable naming rules
- Basic operators (+, -, *, /)
- Advanced operators (//, %, **)
- Math module functions
- If statements
- For loops
- While loops
- Type conversion
- Conversion quirks and errors
- Lists
- Dictionaries
- Tuples
- Functions
- File operations
- Error handling
- Matplotlib (4 different chart types)

## Usage

### Adding to Your App
```tsx
import ReferencesPage from './pages/ReferencesPage'

// In your router or App component:
<Route path="/references" element={<ReferencesPage />} />
```

### Adding New Concepts
Edit `src/data/referenceData.ts`:

```typescript
{
  id: "new-concept",
  title: "Concept Name",
  visualType: "custom-visual",
  description: "What it does...",
  example: `code here`,
  output: `expected output`,
  notes: ["Tip 1", "Tip 2"]
}
```

Then add the visual in `BentoTile.tsx`:
```typescript
case "custom-visual":
  return (
    <div className="visual-custom">
      {/* Your CSS shapes */}
    </div>
  )
```

## Responsive Behavior
- **Desktop (1200px+)**: 4 columns
- **Tablet (768px-1199px)**: 3 columns
- **Mobile (<768px)**: 1 column

## Performance Notes
- CSS-only animations (no JavaScript for visuals)
- Lazy loading could be added for many tiles
- Modal prevents body scroll when open
- Smooth 60fps animations using transform/opacity

## Accessibility
- Keyboard navigation supported (click = Enter key)
- High contrast colors for readability
- Clear close button with X icon
- Scrollable modal for long content

## Future Enhancements
- Search/filter functionality
- Categories/tags for concepts
- Favorites/bookmarks
- Dark/light mode toggle
- Copy code button
- Interactive code playground
