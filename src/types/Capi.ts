export interface Capi {
    response: {
        content: {
            type: string;
            fields: {
                displayHint: string;
            };
            elements: [{
                relation: string;
                type: string;
                assets: object;
            }];
            tags: [{
                id: string;
            }];
            atoms?: object[];
        };
    };
}
