export interface GAPProxy {
    transform: (resp: Response) => Response;
}

declare global {

    interface Window { 
        GAP: {
            registerElement: (tag: string, extension: any) => any;
            registerProxy: (prox: GAPProxy) => void,
        }
    }
}
/*~ this line is required as per TypeScript's global-modifying-module.d.ts instructions */
export {};