import React from 'react';

// tslint:disable:react-no-dangerous-html
export const TweetBlockComponent: React.FC<{
    element: TweetBlockElement;
}> = ({ element }) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: element.html }} />
            <script
                async={true}
                src="https://platform.twitter.com/widgets.js"
            />
        </div>
    );
};
