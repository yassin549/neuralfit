# NeuralFit - macOS-inspired SPA

This project is a single-page application (SPA) for NeuralFit, featuring a macOS-inspired desktop environment. It includes a bottom-centered dock for navigation, which opens draggable and resizable windows with fluid animations.

## 1. Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm
- A Supabase project for the database.

### Local Setup

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

2.  **Set Up Environment Variables:**
    Create a `.env` file and add your Supabase `DATABASE_URL`.
    ```
    DATABASE_URL="..."
    ```

3.  **Run Database Migrations:**
    ```bash
    npx prisma migrate dev
    ```

4.  **Run the Development Server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

## 2. Component Usage

The core of the UI is built around a few key components:

-   `components/Desktop.tsx`: The main container for the entire application. It renders the dock, windows, and the landing page background.
-   `components/Dock.tsx`: The macOS-style navigation dock.
-   `components/Window.tsx`: A generic, reusable component for draggable and resizable windows.
-   `lib/store/windowStore.ts`: A Zustand store that manages the state of all windows.

## 3. MVP Test Checklist

### Interactions
- [ ] **Dock:** Icons magnify on hover.
- [ ] **Window:** Opens with a pull-out animation when a dock icon is clicked.
- [ ] **Window:** Can be dragged by its title bar.
- [ ] **Window:** Can be resized from its corners and edges.
- [ ] **Window:** Clicking a window brings it to the front (updates z-index).
- [ ] **Window:** Closes with a return-to-dock animation.
- [ ] **Window Controls:** Close, Minimize, and Maximize buttons are functional.
- [ ] **DMs Window:** Can send and receive messages (locally mocked).

### Keyboard Shortcuts
- [ ] **Esc:** Closes the active window.
- [ ] **Cmd/Ctrl + M:** Minimizes the active window.
- [ ] **Cmd/Ctrl + F:** Maximizes the active window.
