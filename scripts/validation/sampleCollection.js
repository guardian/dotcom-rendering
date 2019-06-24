'use strict';
const fetch = require('node-fetch');
const fs = require('fs');

const fetchIDsToJson = async () => {
    let count = 1;
    let idList = [];
    console.log('Fetching article and liveblog ids');
    try {
        while (count <= 20) {
            const url = `http://internal.content.guardianapis.com/search?page-size=200&page=${count}`;
            const ids = await fetch(url)
                .then(res => res.json())
                .then(json =>
                    json.response.results.map(content =>
                        content.type === 'article' ||
                        content.type === 'liveblog'
                            ? content.id
                            : null,
                    ),
                );
            idList = [...idList, ...ids.filter(id => id !== null)];
            count = count + 1;
        }
        return idList;
    } catch (e) {
        return e;
    }
};

const fetchJsonData = idList => {
    try {
        console.log('Fetching JSON guui data');
        idList.map(async id => {
            const json = await fetch(`https://www.gu.com/${id}.json?guui`)
                .then(res => res.json())
                .then(json => json);

            const articleJson = JSON.stringify(json, null, 2);
            const regex = /\//gi;
            const name = id.replace(regex, '-');

            const path = __dirname + `/samples/discard2/${name}.json`;

            fs.writeFile(path, articleJson, err => {
                if (err) throw err;
            });
        });
    } catch (e) {
        return e;
    }
};

fetchIDsToJson()
    .then(ids => fetchJsonData(ids))
    .catch(e => console.log(error));
