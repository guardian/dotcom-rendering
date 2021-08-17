# Extra Classes For Interactives

## What is the contract?

We have added extra classes to the standfirst and main meta sections of the interactives layout:

- Standfirst: class class `content__standfirst` applied to the div that contains the standfirst paragraph.
- Meta container: class `content__meta_container_dcr` applied to the div that contains the article meta. Note that the class name in frontend (`content__meta_container`) comes with extra horizontal lines which is duplicated in DCR. The the slight name change avoids this duplication.
- Byline: class `byline` applied to the div that contains the authors of the article.
- Share icons: class `meta__social` applied to the div that contains the list of share icons.

We have not included classes on all grid elements, only on those identified as most useful when customising interactives.

## Where is it relied upon?

These classes are relied upon in interactive articles.

## Why is it required?

Without these extra classes the Visuals team found it tricky to apply custom styling and layout changes to the page. We want to do this to reduce DCR opt-outs for new interactives.
