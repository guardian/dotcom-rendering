// @flow
// totally hacky way of adding fonts temporarily
// @preval

module.exports = `
@font-face {
    font-family: 'GH Guardian Headline';
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: 'GH Guardian Headline';
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Egyptian Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.svg#GuardianTextEgyptianWeb-Regular") format("svg");
    font-weight: 400;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Egyptian Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.svg#GuardianTextEgyptianWeb-RegularItalic") format("svg");
    font-weight: 400;
    font-style: italic;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Egyptian Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.svg#GuardianTextEgyptianWeb-Medium") format("svg");
    font-weight: 500;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Egyptian Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.svg#GuardianTextEgyptianWeb-MediumItalic") format("svg");
    font-weight: 500;
    font-style: italic;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Egyptian Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.svg#GuardianTextEgyptianWeb-Bold") format("svg");
    font-weight: 700;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Egyptian Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.svg#GuardianTextEgyptianWeb-BoldItalic") format("svg");
    font-weight: 700;
    font-style: italic;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Egyptian Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.svg#GuardianTextEgyptianWeb-Black") format("svg");
    font-weight: 800;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Egyptian Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.svg#GuardianTextEgyptianWeb-BlackItalic") format("svg");
    font-weight: 800;
    font-style: italic;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Sans Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.svg#GuardianTextSansWeb-Regular") format("svg");
    font-weight: 400;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Sans Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.svg#GuardianTextSansWeb-RegularItalic") format("svg");
    font-weight: 400;
    font-style: italic;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Sans Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.svg#GuardianTextSansWeb-Medium") format("svg");
    font-weight: 500;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Sans Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.svg#GuardianTextSansWeb-MediumItalic") format("svg");
    font-weight: 500;
    font-style: italic;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Sans Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.svg#GuardianTextSansWeb-Bold") format("svg");
    font-weight: 700;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Sans Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.svg#GuardianTextSansWeb-BoldItalic") format("svg");
    font-weight: 700;
    font-style: italic;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Sans Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.svg#GuardianTextSansWeb-Black") format("svg");
    font-weight: 800;
    font-style: normal;
    font-stretch: normal; }

  @font-face {
    font-family: "Guardian Text Sans Web";
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.eot");
    src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.svg#GuardianTextSansWeb-BlackItalic") format("svg");
    font-weight: 800;
    font-style: italic;
    font-stretch: normal; }

    @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.svg#GuardianEgyptianWeb-Light") format("svg");
        font-weight: 200;
        font-style: normal;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.svg#GuardianEgyptianWeb-Regular") format("svg");
        font-weight: 400;
        font-style: normal;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.svg#GuardianEgyptianWeb-RegularItalic") format("svg");
        font-weight: 400;
        font-style: italic;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.svg#GuardianEgyptianWeb-Semibold") format("svg");
        font-weight: 600;
        font-style: normal;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.svg#GuardianEgyptianWeb-SemiboldItalic") format("svg");
        font-weight: 600;
        font-style: italic;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.svg#GuardianEgyptianWeb-Medium") format("svg");
        font-weight: 500;
        font-style: normal;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.svg#GuardianEgyptianWeb-Bold") format("svg");
        font-weight: 700;
        font-style: normal;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.svg#GuardianEgyptianWeb-BoldItalic") format("svg");
        font-weight: 700;
        font-style: italic;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.svg#GuardianEgyptianWeb-BoldItalic") format("svg");
        font-weight: 900;
        font-style: italic;
        font-stretch: normal; }

        @font-face {
        font-family: "Guardian Egyptian Web";
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot");
        src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.svg#GuardianEgyptianWeb-Bold") format("svg");
        font-weight: 900;
        font-style: normal;
        font-stretch: normal; }
`;
