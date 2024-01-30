import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUser } from '@/lib/contentful';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const data = await getUser(email);
                const user = data?.items[0]?.fields;
                if (!user) return null;
                const passwordsMatch = await bcrypt.compareSync(password, user.password);
                if (passwordsMatch) return user;
            }
            console.log('Invalid credentials');
            return null;
        },
    }),],
});