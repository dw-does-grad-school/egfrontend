# Authentication Setup

This app uses Clerk for authentication with a public-by-default approach.

## What's Protected?

- ✅ **Public (No login required):**
  - Homepage `/`
  - Exhibitions `/exhibits`
  - All other pages by default

- 🔒 **Protected (Requires login):**
  - Profile page `/profile`

## Quick Setup

### 1. Get Clerk API Keys

1. Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Sign up or log in
3. Create a new application
4. Copy your API keys from the dashboard

### 2. Create `.env.local` file

Create a file named `.env.local` in the project root:

```bash
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/profile
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile
```

### 3. Configure Clerk Dashboard

In your Clerk dashboard settings:

- **Sign-in URL:** `/sign-in`
- **Sign-up URL:** `/sign-up`  
- **After sign-in redirect:** `/profile`
- **After sign-up redirect:** `/profile`

### 4. Restart Development Server

```bash
pnpm dev
```

## How It Works

### Public Access
- Users can browse the homepage and exhibitions without logging in
- The app is public by default

### Protected Routes
- When users try to access `/profile`, they'll be automatically redirected to sign-in if not authenticated
- After signing in, they're redirected back to their profile

### Adding More Protected Routes

Edit `middleware.ts` to add more protected routes:

```typescript
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',
  '/collections(.*)',  // Add this
  '/admin(.*)',        // Add this
]);
```

## Pages

- `/` - Public homepage
- `/exhibits` - Public exhibitions page
- `/profile` - Protected profile page (requires login)
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

## Features

- 🌐 Public homepage by default
- 🔐 Protected profile page
- 👤 User profile with account information
- 🎨 MoMA-inspired design throughout
- 📱 Responsive on all devices

## Testing

1. Visit homepage - should work without login ✓
2. Visit exhibitions - should work without login ✓
3. Try to visit `/profile` - should redirect to sign-in
4. Sign in or sign up
5. After login, you'll be on your profile page
6. Click the user button in nav to manage account/sign out

