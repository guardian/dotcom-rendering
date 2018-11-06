import { TextBlockComponent } from '../elements/TextBlockComponent';

import React from 'react';

export const AmpRenderer: React.SFC<{
    elements: CAPIElement[];
    pillar: Pillar;
}> = ({ elements, pillar }) => {
    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.liveblog.TextBlockElement':
                    return (
                        <TextBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                        />
                    );
                default:
                    // tslint:disable-next-line:no-console
                    console.log('Unsupported Element', JSON.stringify(element));
                    return null;
            }
        })
        .filter(_ => _ != null);
    return <>{output}</>;
};
