import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';

import Article from './dist/components/news/Article';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use("/public", express.static(path.resolve(__dirname, 'public')));
app.use(compression());

const articleId = 'world/2019/sep/03/hong-kong-protests-carrie-lam-denies-she-considered-resigning';
const capiEndpoint = `https://content.guardianapis.com/${articleId}?format=json&api-key=teleporter-view&show-elements=all&show-atoms=all&show-rights=all&show-fields=all&show-tags=all&show-blocks=all&show-references=all`;

const capiFields = {
  "displayImages": [
    {
      "urlTemplate": "https://i.guim.co.uk/img/media/90870ec12d9cb8af47d20a76457c9538e418ad78/0_0_3500_2101/master/3500.jpg?w=2101&h=3500&q=85&fit=bounds&sig-ignores-params=true&s=c31d8fb40c8a1bcfaf510a6407ba5334",
      "height": 2101,
      "width": 3500,
      "caption": "Venezuela’s president Nicolas Maduro with national assembly chief Diosdado Cabello, who has reportedly been speaking to Trump advisers. Photograph: Photograph: Manaure Quintero/Reuters",
      "credit": "Manaure Quintero/Reuters",
      "altText": "Venezuela’s president Nicolas Maduro with national assembly chief Diosdado Cabello, who has reportedly been speaking to Trump advisers.",
      "cleanCaption": "Venezuela’s president Nicolas Maduro with national assembly chief Diosdado Cabello, who has reportedly been speaking to Trump advisers.",
      "cleanCredit": "Photograph: Manaure Quintero/Reuters"
    }
  ]
}

app.get('/', (req, res) => {
    try {
        fs.readFile(path.resolve('./src/html/articleTemplate.html'), 'utf8', (err, data) => {
            if (err) {
              console.error(err)
              return res.status(500).send('An error occurred')
            }
            
            fetch(capiEndpoint)
              .then(resp => resp.json())
              .then(capi => {
                const content = capi.response.content;
                const articleProps = {...content.fields, pillarId: content.pillarId, tags: content.tags, feature: false, ...capiFields};
                const body = renderToString(React.createElement(Article, articleProps));
                return res.send(
                  data.replace(
                    '<div id="root"></div>',
                    `<div id="root">${body}</div>`
                  )
                )
              })

          })
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.listen(3040);
