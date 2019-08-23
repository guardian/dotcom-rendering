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
  // "body": "<p>Nicolás Maduro has confirmed top Venezuelan officials have been talking to members of Donald Trump’s White House, after reports his second-in-command had been negotiating his downfall with the United States.</p> <p>“I confirm that for months there have been contacts between senior officials from Donald Trump’s government and from the Bolivarian government over which I preside – with my express and direct permission,” Venezuela’s authoritarian leader said in <a href=\"https://twitter.com/VTVcanal8/status/1163961687399182336?s=20\">a televised address</a> on Tuesday night.</p> <p>“Various contacts through various channels,” Maduro added.</p> <p>Maduro’s remarks came after two reports in the US media claimed Diosdado Cabello, one of Venezuela’s most powerful and feared men, had been engaged in <a href=\"https://www.apnews.com/a3e6b0da8c5648558e61bbaa466fbb42\">“secret communications”</a> with Trump officials.</p> <p>On Sunday <a href=\"https://www.axios.com/scoop-inside-trumps-naval-blockade-obsession-555166b0-06f9-494c-b9fb-9577a589e2ac.html\">Axios claimed</a> that in recent months Cabello, the 56-year-old head of Venezuela’s pro-Maduro constituent assembly, had been communicating with Trump’s top Latin America adviser, Mauricio Claver-Carone. Some Trump officials reportedly considered that a positive sign suggesting Maduro’s circle was “gradually cracking”.</p> <p>The Associated Press claimed Cabello had met someone “in close contact with the Trump administration” in Caracas last month and that a second meeting was envisioned. The US reportedly hoped engaging with Cabello would intensify an internal “knife fight” supposedly raging at the pinnacle of Maduro’s administration.</p> <p>Observers of Venezuelan politics greeted those reports – apparently designed to destablise Maduro’s crisis-stricken administration by stoking paranoia within his inner-circle - with scepticism.</p> <p>Christopher Sabatini, a senior fellow for Latin America at the Chatham House thinktank, said: “I think what the US is trying to do is some sort of psy ops thing<em>,</em> trying to rattle people within Maduro’s administration.”</p> <p>But on Tuesday Maduro confirmed contact with the US, which he painted as proof that he had been seeking ways “for president Donald Trump to truly listen to Venezuela and the truth of the 21st century Bolivarian revolution”.</p> <p>Earlier in the day Trump told reporters: “We’re talking to various representatives of Venezuela. I don’t want to say who, but we are talking at a very high level.”</p> <p>Geoff Ramsey, a Venezuela expert at the Washington Office on Latin America, described reports there had been talks between Cabello and Trump officials as “a very positive sign”.</p> <p>“It suggests an understanding at the top level of [Maduro’s] government that this is unsustainable,” he said of Venezuela’s ongoing economic, political and <a href=\"https://www.ft.com/content/b6459434-b531-11e9-8cb2-799a3a8cf37b\">humanitarian meltdown</a>.</p> <p>“I think what these people are looking for is some kind of guarantee [from the US] that they are not going to end up in a jail cell in Miami,” Ramsey added.</p> <p>Maduro has been fighting for his political life since January when a young opposition leader, Juan Guaidó, declared himself Venezuela’s rightful president and received the backing of more than 50 governments, including the US and UK.</p> <p>More than four million Venezuelans have now fled their oil-rich but economically devastated nation, <a href=\"https://www.theguardian.com/world/2019/jun/07/venezuela-exodus-4-million-un-refugee-agency\">according to the UN’s refugee agency</a>, with at least 1 million people leaving since last November alone.</p>",
  "body": "<p>Amid the myriad joyful images on social media, showing ecstatic pupils and their teachers celebrating <a href=\"https://www.theguardian.com/education/2019/aug/22/gcse-results-more-rigorous-courses-appear-to-benefit-girls\">GCSE results</a>, one particular success story stood out.</p> <p>Michaela community school, a controversial free school known for its strict behaviour policy, picked up its first set of GCSE results on Thursday, five years after opening its doors to its first pupils.</p> <p>“Michaela pupils SMASH it,” <a href=\"https://twitter.com/Miss_Snuffy/status/1164464651054329857?s=20\">tweeted</a> the headteacher, Katharine Birbalsingh. Her colleagues were similarly delighted. “I’m so proud to be a Michaela teacher today,” <a href=\"https://twitter.com/tkendalluk/status/1164471970949410816?s=20\">tweeted</a> the maths teacher Thomas Kendall. “It feels like winning the league. The kids deserve it so much for all their hard work.”</p> <p>Compared with other non-selective state schools, Michaela’s results rank among the best in the country. More than half (54%) of all grades were level 7 or above (equivalent to the old-style A and A*), which was more than twice the national average of 22%. Nearly one in five (18%) of all grades were 9s, compared with 4.5% nationally, and in maths, one in four results were level 9.</p> <aside class=\"element element-rich-link element--thumbnail\"> <p> <span>Related: </span><a href=\"https://www.theguardian.com/education/2016/dec/30/no-excuses-inside-britains-strictest-school\">'No excuses': inside Britain's strictest school</a> </p> </aside>  <p>Birbalsingh’s Twitter feed documented her morning – the girl who got straight 9s, the boy who used to be badly behaved but did brilliantly, the disbelief of another pupil as he read, and reread, his results – “Miss, these can’t be real” – the staff celebration.</p> <p>In a subsequent interview with the Guardian, Birbalsingh could not disguise her delight. “It’s really great. When you think all of our kids are from the inner city, they are from challenging backgrounds, they are deprived kids. I don’t have any white, middle-class kids in the school.”</p> <p>Birbalsingh first attracted controversy when, as deputy head at a school in south London, she criticised school behaviour policies in a <a href=\"https://www.theguardian.com/education/2010/oct/26/katharine-birbalsingh-tory-teacher-interview\">high-profile speech</a> to the Conservative party conference in 2010. The speech alienated many in the teaching profession and she was left shaken and jobless.</p> <p>It has been a long haul since then. Another tweet described her journey:</p>  <figure class=\"element element-tweet\" data-canonical-url=\"https://twitter.com/Miss_Snuffy/status/1164223698871771137\">  <blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">1. Told you will never work in the state sector again. <br><br>2. 3 years fighting detractors to set up a free school, call it Michaela. <br><br>3. 5 years with an amazing team, transforming kids’ lives &amp; fighting the good fight every day!<br><br>4. Thursday August 22: GCSE results finally here 🥳 <a href=\"https://t.co/u2DecBt6UN\">pic.twitter.com/u2DecBt6UN</a></p>&mdash; Katharine Birbalsingh (@Miss_Snuffy) <a href=\"https://twitter.com/Miss_Snuffy/status/1164223698871771137?ref_src=twsrc%5Etfw\">August 21, 2019</a></blockquote>  </figure>  <p>Ever since it <a href=\"https://www.theguardian.com/education/2014/sep/05/katharine-birbalsingh-regret-telling-tories-education-system-broken\">opened</a> in a converted office block close to Wembley football stadium in September 2014, Michaela has been the subject of intense scrutiny and debate, particularly over its <a href=\"https://www.theguardian.com/education/2016/dec/30/no-excuses-inside-britains-strictest-school\">tough behaviour policy</a>.</p> <p>Pupils are given demerits or detention for forgetting to bring a pencil or pen, or for talking in corridors when moving between lessons. The school hit the headlines again when it was reported that children whose parents had failed to pay for their lunches <a href=\"https://www.theguardian.com/education/2016/jul/29/headteacher-defends-policy-of-putting-pupils-in-lunch-isolation\">were made to eat separately</a> from their classmates.</p> <aside class=\"element element-rich-link element--thumbnail\"> <p> <span>Related: </span><a href=\"https://www.theguardian.com/education/2019/aug/22/closing-the-gcse-attainment-gap-cant-be-up-to-schools-alone\">Closing the GCSE attainment gap can’t be up to schools alone | Letters</a> </p> </aside>  <p>“I think it’s hilarious to say we are the strictest school in Britain,” laughed Birbalsingh. “It’s a joyful and happy place. The children are so happy to be here.” Two years ago, the schools’ watchdog Ofsted vindicated her approach when it judged Michaela outstanding in all categories. A second school, following the same model, has been approved and will open in Stevenage in Hertfordshire.</p> <p>Birbalsingh puts Michaela’s success down to “conservative values – with a small c”. She lists them – belief in personal responsibility, respect for authority and a sense of duty towards others. “I’ve always known the school is great, because I’m here every day and the children are wonderful. What I’m most proud of is the young adults they’ve become. They are good people.”</p>",
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
    }
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
