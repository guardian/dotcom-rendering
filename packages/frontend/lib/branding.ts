export interface Brand {
    type: 'paid-content';
    sponsorName: string;
    logo: {
        src: string;
        width: number;
        height: number;
        link: string;
    };
    aboutThisLink: string;
}
