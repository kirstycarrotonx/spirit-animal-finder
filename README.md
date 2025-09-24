# Spirit Animal Finder

A Next.js application that allows users to authenticate with their X (Twitter) account and access a dashboard.

## Features

- Beautiful home page with "Find My Spirit Animal" button
- X (Twitter) OAuth authentication
- Protected dashboard page
- User data storage in Supabase
- Responsive design with Tailwind CSS

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Twitter/X OAuth Configuration
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL commands from `supabase-schema.sql` to create the users table and policies

### 3. Twitter/X Developer Setup

1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Create a new app or use an existing one
3. In the app settings, add the following callback URL: `http://localhost:3000/api/auth/callback/twitter`
4. Copy the Client ID and Client Secret to your `.env.local` file

### 4. NextAuth Secret

Generate a random secret for NextAuth:

```bash
openssl rand -base64 32
```

Add this to your `.env.local` file as `NEXTAUTH_SECRET`.

### 5. Install Dependencies and Run

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `src/app/page.tsx` - Home page with authentication button
- `src/app/dashboard/page.tsx` - Protected dashboard page
- `src/lib/auth.ts` - NextAuth configuration
- `src/lib/supabase.ts` - Supabase client configuration
- `src/components/providers.tsx` - NextAuth session provider

## How It Works

1. User visits the home page and clicks "Find My Spirit Animal"
2. They are redirected to Twitter/X for authentication
3. After successful authentication, user data is stored in Supabase
4. User is redirected to the dashboard showing "you're logged in"
5. User can sign out to return to the home page

## Database Schema

The `users` table stores:
- `id` - Unique user identifier
- `email` - User's email address
- `name` - User's display name
- `image` - User's profile image URL
- `twitter_id` - Twitter user ID
- `username` - Twitter username
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp