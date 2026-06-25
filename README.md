# ✦ Lumen Client | Premium Social Media Frontend

> An enterprise-grade, luxury-aesthetic social platform built with a zero-compromise approach to frontend architecture, type safety, and user experience.

This repository contains the client-side application for the Lumen Social Platform. Engineered to seamlessly consume a complex, high-security Node.js backend (11k+ LOC), this frontend is built upon **Strict Feature-Sliced Design (FSD)** principles, ensuring scalable module boundaries, predictable state management, and a premium "Emerald & Gold" user interface.

---

## Architecture & Stack Metrics

This project rejects the chaotic "flat folder" structure in favor of a pragmatic, highly scalable architecture.

| Metric | Implementation / Technology |
| :--- | :--- |
| **Architecture Standard** | Strict Feature-Sliced Design (FSD) |
| **Core Framework** | React 18 + TypeScript + Vite |
| **Routing** | TanStack Router (100% Type-Safe File-Based Routing) |
| **Server State / Caching** | TanStack Query (React Query) |
| **Client State** | Zustand (Modular Stores) |
| **Form Architecture** | React Hook Form + Zod Validation |
| **UI System** | shadcn/ui + Tailwind CSS |
| **API Layer** | Axios with centralized interceptors & error boundaries |

---

## 🎨 UI/UX Philosophy: Flat Luxury

We abandoned the generic neon and heavy-shadow trends to create a sophisticated, eye-comforting experience:
- **Emerald & Gold Palette:** Deep, rich teals (`#072f31`, `#051111`) contrasted with elegant gold accents (`#d09b4c`, `#8c5414`).
- **Zero Drop-Shadow Policy:** Replaced heavy `box-shadows` with crisp 1px borders (`border-border`) and soft glows, heavily reducing visual fatigue.
- **Flawless Dark/Light Modes:** Recalculated CSS HSL variables ensure perfect contrast ratios across both modes without changing the business logic.

---

## Strict Authentication Lifecycle

The frontend flawlessly mirrors the backend's high-security authentication pipeline. We do not use "magic links" or optimistic logins; the flow is strictly phased:

1. **Phase 1: Registration (`/auth`)**
   - Zod-validated payloads are sent to `POST /api/auth/register`.
   - *Constraint:* The user is created, but **NO** tokens or cookies are issued. The UI enters a pending verification state.
2. **Phase 2: Verification (`/verify-otp`)**
   - User inputs the 6-digit OTP sent via email.
   - Upon `POST /api/otp/verify-email` success:
     - The backend sets an `HttpOnly` Refresh Token cookie.
     - The frontend intercepts the short-lived `accessToken` and hydrates the Zustand Auth Store.
3. **Phase 3: Session Initialization**
   - Global Axios interceptors automatically attach the `Bearer` token to all subsequent requests.
   - The user is smoothly redirected to the protected `/feed` route.

---

## Feature-Sliced Design (FSD) Structure

The codebase is strictly organized by business domains, not by technical types.

```
src/
├── app/        # App-wide settings, global styles, and providers (ThemeProvider)
├── pages/      # Route components (AuthPage, FeedPage) - Thin wrappers combining widgets
├── widgets/    # Complex, self-contained UI blocks (LeftSidebar, FeedList)
├── features/   # Business logic & interactions (auth logic, post mutations)
├── entities/   # Business entities & types (User, Post models)
├── shared/     # Reusable UI primitives (shadcn), API instances (Axios), and utilities
└── routes/     # TanStack Router definitions linking to the `pages/` layer
```

## Key Engineering Features
Type-Safe Routing: Dead links are impossible. TanStack router ensures all route params and search queries are statically typed.
Optimistic UI Updates: TanStack Query mutations (likes, comments) update the UI instantly before the server responds, ensuring a snappy feel.
Centralized API Error Handling: Axios interceptors catch 401s, trigger token refreshes (if applicable), and map backend error payloads to consistent UI toast notifications.
Performant Rendering: Component re-renders are strictly isolated. React Hook Form prevents full-page renders during typing, and Zustand prevents unnecessary state propagations.

## Local Development Setup
1. Environment Configuration
Create a .env file in the root directory. Connect this to your running local backend instance.
VITE_API_BASE_URL=http://localhost:5000

2. Installation & Execution
# Install dependencies
npm install

# Start the Vite development server
npm run dev
Developed as the client-side counterpart to the 11-Domain Secure Backend Architecture.
