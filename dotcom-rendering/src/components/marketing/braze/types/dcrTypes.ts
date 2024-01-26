// Newsletter callback
export type NewsletterSubscribeCallback = (id: string) => Promise<void>;

// Retrieve user's email
export type FetchEmail = () => Promise<string | null>;
