# Working with Interactives

Interactive is a Design type for rich content pieces - typically with custom
Javascript for interactive effects.

DCR aims to support interactive development in a variety of ways.

_Note, this document is a work in progress and more will be added shortly._

## Templating

Interactives support placeholders for key article metadata. This is particularly
useful for immersive interactives, which do not come with a standard top-meta
section, but they work for any interactive page.

To use, simply add a variable to your interactive markup and DCR will populate
it when it builds the page. Square brackets are used as follows:

    <div>Written by [[ byline ]].</div>

Becomes:

    <div>Written by Kath Viner.</div>

Unsupported variables will be left as-is (including the square brackets). E.g.
this will be left unaltered:

    <div>Some content with an [[ unknown ]] in it.</div>

Supported variables are:

    byline
    sectionTag
    standfirst
    trailText
    webPublicationDate
    webTitle
    webURL

E.g.

    byline: "Jamie Grierson"
    sectionTag: "Coronavirus"
    standfirst: "<p>Neil Ferguson says immunity levels falling behind other countries that have jabbed 12- to 15-year-olds</p><ul><li><a href=\"https://www.theguardian.com/world/series/coronavirus-live/latest\">Coronavirus – latest updates</a></li><li><a href=\"https://www.theguardian.com/world/coronavirus-outbreak\">See all our coronavirus coverage</a></li></ul>"
    trailText: "Neil Ferguson says immunity levels falling behind other countries that have jabbed 12- to 15-year-olds"
    webPublicationDate: "Mon 13 Sep 2021 08.53 BST"
    webTitle: "Vaccinating teenagers against Covid is priority, says UK epidemiologist"
    webURL: "https://www.theguardian.com/world/2021/sep/13/vaccinating-teenagers-against-covid-is-priority-says-uk-epidemiologist"

If there are others you would find useful, please contact the Dotcom team to
discuss as anything we add will need to be supported indefinitely.
