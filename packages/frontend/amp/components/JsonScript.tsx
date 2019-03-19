import React from 'react';

export const JsonScript: React.FC<{ o: any }> = ({ o }) => {
    const JSONString: string = JSON.stringify(o);
    return (
        <script
            type="application/json"
            // tslint:disable-next-line react-no-dangerous-html
            dangerouslySetInnerHTML={{ __html: JSONString }}
        />
    );
};
