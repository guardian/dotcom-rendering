// tslint:disable:react-no-dangerous-html
import React from 'react';

export const AMPJSON: React.FC<{ o: any }> = ({ o }) => {
    const JSONString: string = JSON.stringify(o);
    return (
        <script
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSONString }}
        />
    );
};
