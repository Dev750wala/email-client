declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        CLERK_SECRET_KEY: string;
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
        AURINKO_CLIENT_ID: string;
        AURINKO_CLIENT_SECRET: string
        AURINKO_SIGNING_SECRET: string
        NEXT_PUBLIC_URL: string;
    }
}
