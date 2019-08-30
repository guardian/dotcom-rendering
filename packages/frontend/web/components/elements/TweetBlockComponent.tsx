import React from 'react';

// tslint:disable:react-no-dangerous-html
export const TweetBlockComponent: React.FC<{
    element: TweetBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    // return <div dangerouslySetInnerHTML={{ __html: element.html }} />;
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
