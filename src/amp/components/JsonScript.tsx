import React from 'react';

export const JsonScript: React.FC<{ o: any }> = ({ o }) => {
    const JSONString: string = JSON.stringify(o);
    return (
        // tslint:disable-next-line:react-no-dangerous-html
        <script
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSONString }}
        />
    );
};
