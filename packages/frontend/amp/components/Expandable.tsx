import React from 'react';

export const Expandable: React.FC<{
    id: string;
    type: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
}> = ({ id, type, title, img, html, credit }) => (
    <aside>
        <span>{type}</span>
        <h1>{title}</h1>
        {img && <amp-img src={img} alt={`Image for ${title} explainer`} />}
        <div // tslint:disable-line:react-no-dangerous-html
            id={id}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
        <span>{credit}</span>
        <button on={`tap:${id}.toggleVisibility`}>Toggle</button>
    </aside>
);
