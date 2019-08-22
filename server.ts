import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import React from 'react';
import { renderToString } from 'react-dom/server';

import Article from './dist/Article';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use("/public", express.static(path.resolve(__dirname, 'public')));
app.use(compression());

const capiFields = {
  "headline": "Venezuelan leader Nicolás Maduro confirms months of secret US talks",
  "standfirst": "<p>‘Various contacts’ made, says embattled president, amid reports he is negotiating a way to stand down </p>",
  "trailText": "‘Various contacts’ made, says embattled president, amid reports he is negotiating a way to stand down",
  "byline": "Tom Phillips Latin America correspondent",
  "body": "<p>Nicolás Maduro has confirmed top Venezuelan officials have been talking to members of Donald Trump’s White House, after reports his second-in-command had been negotiating his downfall with the United States.</p> <p>“I confirm that for months there have been contacts between senior officials from Donald Trump’s government and from the Bolivarian government over which I preside – with my express and direct permission,” Venezuela’s authoritarian leader said in <a href=\"https://twitter.com/VTVcanal8/status/1163961687399182336?s=20\">a televised address</a> on Tuesday night.</p> <p>“Various contacts through various channels,” Maduro added.</p> <p>Maduro’s remarks came after two reports in the US media claimed Diosdado Cabello, one of Venezuela’s most powerful and feared men, had been engaged in <a href=\"https://www.apnews.com/a3e6b0da8c5648558e61bbaa466fbb42\">“secret communications”</a> with Trump officials.</p> <p>On Sunday <a href=\"https://www.axios.com/scoop-inside-trumps-naval-blockade-obsession-555166b0-06f9-494c-b9fb-9577a589e2ac.html\">Axios claimed</a> that in recent months Cabello, the 56-year-old head of Venezuela’s pro-Maduro constituent assembly, had been communicating with Trump’s top Latin America adviser, Mauricio Claver-Carone. Some Trump officials reportedly considered that a positive sign suggesting Maduro’s circle was “gradually cracking”.</p> <p>The Associated Press claimed Cabello had met someone “in close contact with the Trump administration” in Caracas last month and that a second meeting was envisioned. The US reportedly hoped engaging with Cabello would intensify an internal “knife fight” supposedly raging at the pinnacle of Maduro’s administration.</p> <p>Observers of Venezuelan politics greeted those reports – apparently designed to destablise Maduro’s crisis-stricken administration by stoking paranoia within his inner-circle - with scepticism.</p> <p>Christopher Sabatini, a senior fellow for Latin America at the Chatham House thinktank, said: “I think what the US is trying to do is some sort of psy ops thing<em>,</em> trying to rattle people within Maduro’s administration.”</p> <p>But on Tuesday Maduro confirmed contact with the US, which he painted as proof that he had been seeking ways “for president Donald Trump to truly listen to Venezuela and the truth of the 21st century Bolivarian revolution”.</p> <p>Earlier in the day Trump told reporters: “We’re talking to various representatives of Venezuela. I don’t want to say who, but we are talking at a very high level.”</p> <p>Geoff Ramsey, a Venezuela expert at the Washington Office on Latin America, described reports there had been talks between Cabello and Trump officials as “a very positive sign”.</p> <p>“It suggests an understanding at the top level of [Maduro’s] government that this is unsustainable,” he said of Venezuela’s ongoing economic, political and <a href=\"https://www.ft.com/content/b6459434-b531-11e9-8cb2-799a3a8cf37b\">humanitarian meltdown</a>.</p> <p>“I think what these people are looking for is some kind of guarantee [from the US] that they are not going to end up in a jail cell in Miami,” Ramsey added.</p> <p>Maduro has been fighting for his political life since January when a young opposition leader, Juan Guaidó, declared himself Venezuela’s rightful president and received the backing of more than 50 governments, including the US and UK.</p> <p>More than four million Venezuelans have now fled their oil-rich but economically devastated nation, <a href=\"https://www.theguardian.com/world/2019/jun/07/venezuela-exodus-4-million-un-refugee-agency\">according to the UN’s refugee agency</a>, with at least 1 million people leaving since last November alone.</p>",
  "tags": [
    {
      "id": "world/venezuela",
      "type": "keyword",
      "sectionId": "world",
      "sectionName": "World news",
      "webTitle": "Venezuela",
      "webUrl": "https://www.theguardian.com/world/venezuela",
      "apiUrl": "https://content.guardianapis.com/world/venezuela",
      "references": [],
      "internalName": "Venezuela (News)"
    },
    {
      "id": "world/nicolas-maduro",
      "type": "keyword",
      "sectionId": "world",
      "sectionName": "World news",
      "webTitle": "Nicolás Maduro",
      "webUrl": "https://www.theguardian.com/world/nicolas-maduro",
      "apiUrl": "https://content.guardianapis.com/world/nicolas-maduro",
      "references": [],
      "internalName": "Nicolas Maduro"
    },
    {
      "id": "world/americas",
      "type": "keyword",
      "sectionId": "world",
      "sectionName": "World news",
      "webTitle": "Americas",
      "webUrl": "https://www.theguardian.com/world/americas",
      "apiUrl": "https://content.guardianapis.com/world/americas",
      "references": [],
      "internalName": "Americas (News)"
    },
  ],
  "pillarId": "pillar/news",
  "pillarName": "News"
}

app.get('/', (req, res) => {
    try {
        fs.readFile(path.resolve('./src/html/articleTemplate.html'), 'utf8', (err, data) => {
            if (err) {
              console.error(err)
              return res.status(500).send('An error occurred')
            }
            
            const body = renderToString(React.createElement(Article, capiFields));

            return res.send(
              data.replace(
                '<div id="root"></div>',
                `<div id="root">${body}</div>`
              )
            )
          })
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.listen(3040);
