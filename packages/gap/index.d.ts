declare global {

    interface Window { 
        GAP: {
            registerElement: (tag: string, extension: any) => any;
        }
    }
}
/*~ this line is required as per TypeScript's global-modifying-module.d.ts instructions */
export {};