import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import type { TwitterProfile } from '@auth/core/providers/twitter'; // Keep this import

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || 'dummy',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || 'dummy',
      authorization: {
        params: {
          scope: 'users.read tweet.read offline.access',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account?: any; profile?: TwitterProfile }) { // Make account optional with ?
      if (account?.provider === 'twitter') {
        // Store user data in Supabase
        const { supabase } = await import('./supabase');
        
        const { error } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            twitter_id: profile?.data?.id, // TypeScript now recognizes data.id
            username: profile?.data?.username, // TypeScript now recognizes data.username
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select();

        if (error) {
          console.error('Error storing user data:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
});