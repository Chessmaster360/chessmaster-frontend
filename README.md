# Chessmaster 360 - Frontend

React-based frontend for the Chessmaster 360 chess analysis platform. Provides an interactive interface for analyzing chess games with engine-powered insights.

## Production

Deployed on Netlify: https://chessmaster360.netlify.app

## Features

- **Interactive Chessboard**: Visual board with piece highlighting and move indicators
- **Game Analysis**: Deep analysis with move-by-move classification display
- **Best Move Arrow**: Green SVG arrow showing the engine's suggested move
- **Classification Icons**: Visual badges for each move quality (Brilliant, Best, Mistake, etc.)
- **Evaluation Bar**: Real-time position evaluation display
- **Chess.com Integration**: Import games directly from Chess.com by username
- **Game Selector**: Browse and select games by month with result indicators
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Zustand (state management)
- chess.js (move validation)
- react-icons

## Project Structure

```
src/
├── components/
│   ├── Chess/
│   │   ├── ChessBoard.tsx      # Main board with arrow overlay
│   │   ├── GameReport.tsx      # Analysis panel and controls
│   │   ├── GameReviewSummary.tsx
│   │   ├── GameModal.tsx       # Game selector with W/L indicators
│   │   ├── EvaluationBar.tsx   # Position evaluation display
│   │   └── Controls.tsx        # Navigation controls
│   ├── Bars/
│   │   └── Navbar.tsx
│   └── Footer.tsx
├── pages/
│   └── AnalyzeScreen.tsx       # Main analysis page
├── store/
│   └── useGameStore.ts         # Zustand state management
├── assets/
│   └── Moves/                  # Classification icons
└── App.tsx
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Configuration

The frontend connects to the backend at `http://localhost:3001` by default. To change this, update the API calls in `GameReport.tsx`.

## Usage

1. Enter a Chess.com username
2. Click the checkmark to load game archives
3. Select a month and game from the modal
4. Adjust analysis depth (15-20) as needed
5. Click "Analyze" to start engine analysis
6. Navigate through moves using arrow controls

## Move Classifications

| Icon | Classification | Meaning |
|------|---------------|---------|
| Star (cyan) | Brilliant | Perfect move with sacrifice |
| Star (green) | Best | Engine's top recommendation |
| Check (green) | Excellent | Near-perfect (<=10cp loss) |
| Check (light) | Good | Minor inaccuracy (<=25cp) |
| Book | Book | Opening theory move |
| Warning (yellow) | Inaccuracy | Noticeable error (<=100cp) |
| X (orange) | Mistake | Significant error (<=350cp) |
| X (red) | Blunder | Critical error (>350cp) |

## Development

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build and preview
npm run build && npm run preview
```

## Production

Deployed on Netlify: https://chessmaster360.netlify.app

## License

MIT
