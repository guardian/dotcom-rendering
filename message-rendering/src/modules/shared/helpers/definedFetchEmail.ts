// email is a legacy parameter to be removed after dcr is updated to only pass fetchEmail

export const defineFetchEmail = (
    email: string | undefined,
    fetchEmail: (() => Promise<string | null>) | undefined,
): (() => Promise<string | null>) => {
    if (fetchEmail) {
        return fetchEmail;
    } else if (email) {
        return () => Promise.resolve(email);
    } else {
        return () => Promise.resolve(null);
    }
};
