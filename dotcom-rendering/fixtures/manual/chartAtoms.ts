export const html =
	'\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <style>\n        @font-face {\n          font-family: "Guardian Agate Sans 1 Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.svg#GuardianAgateSans1Web-Regular") format("svg");\n          font-weight: 400;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Agate Sans 1 Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.svg#GuardianAgateSans1Web-RegularItalic") format("svg");\n          font-weight: 400;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Agate Sans 1 Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.svg#GuardianAgateSans1Web-Bold") format("svg");\n          font-weight: 700;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Agate Sans 1 Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.svg#GuardianAgateSans1Web-BoldItalic") format("svg");\n          font-weight: 700;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.svg#GuardianEgyptianWeb-Light") format("svg");\n          font-weight: 200;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.svg#GuardianEgyptianWeb-Regular") format("svg");\n          font-weight: 400;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.svg#GuardianEgyptianWeb-RegularItalic") format("svg");\n          font-weight: 400;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.svg#GuardianEgyptianWeb-Semibold") format("svg");\n          font-weight: 600;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.svg#GuardianEgyptianWeb-SemiboldItalic") format("svg");\n          font-weight: 600;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.svg#GuardianEgyptianWeb-Medium") format("svg");\n          font-weight: 500;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.svg#GuardianEgyptianWeb-Bold") format("svg");\n          font-weight: 700;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.svg#GuardianEgyptianWeb-BoldItalic") format("svg");\n          font-weight: 700;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.svg#GuardianSansWeb-Light") format("svg");\n          font-weight: 200;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.svg#GuardianSansWeb-Regular") format("svg");\n          font-weight: 400;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.svg#GuardianSansWeb-Semibold") format("svg");\n          font-weight: 600;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.svg#GuardianTextEgyptianWeb-Regular") format("svg");\n          font-weight: 400;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.svg#GuardianTextEgyptianWeb-RegularItalic") format("svg");\n          font-weight: 400;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.svg#GuardianTextEgyptianWeb-Medium") format("svg");\n          font-weight: 500;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.svg#GuardianTextEgyptianWeb-MediumItalic") format("svg");\n          font-weight: 500;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.svg#GuardianTextEgyptianWeb-Bold") format("svg");\n          font-weight: 700;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.svg#GuardianTextEgyptianWeb-BoldItalic") format("svg");\n          font-weight: 700;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.svg#GuardianTextEgyptianWeb-Black") format("svg");\n          font-weight: 800;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Egyptian Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.svg#GuardianTextEgyptianWeb-BlackItalic") format("svg");\n          font-weight: 800;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.svg#GuardianTextSansWeb-Regular") format("svg");\n          font-weight: 400;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.svg#GuardianTextSansWeb-RegularItalic") format("svg");\n          font-weight: 400;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.svg#GuardianTextSansWeb-Medium") format("svg");\n          font-weight: 500;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.svg#GuardianTextSansWeb-MediumItalic") format("svg");\n          font-weight: 500;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.svg#GuardianTextSansWeb-Bold") format("svg");\n          font-weight: 700;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.svg#GuardianTextSansWeb-BoldItalic") format("svg");\n          font-weight: 700;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.svg#GuardianTextSansWeb-Black") format("svg");\n          font-weight: 800;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Text Sans Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.svg#GuardianTextSansWeb-BlackItalic") format("svg");\n          font-weight: 800;\n          font-style: italic;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Compact Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.svg#GuardianCompactWeb-Black") format("svg");\n          font-weight: 800;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Titlepiece Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.svg#GuardianTitlepieceWeb-Regular") format("svg");\n          font-weight: 400;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "Guardian Weekend Cond Web";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.eot");\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.svg#GuardianWeekendCondWeb-Black") format("svg");\n          font-weight: 800;\n          font-style: normal;\n          font-stretch: normal;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.ttf") format("truetype");\n          font-weight: 300;\n          font-style: normal;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.ttf") format("truetype");\n          font-weight: 300;\n          font-style: italic;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.ttf") format("truetype");\n          font-weight: 400;\n          font-style: normal;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.ttf") format("truetype");\n          font-weight: 400;\n          font-style: italic;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.ttf") format("truetype");\n          font-weight: 500;\n          font-style: normal;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.ttf") format("truetype");\n          font-weight: 500;\n          font-style: italic;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.ttf") format("truetype");\n          font-weight: 600;\n          font-style: normal;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.ttf") format("truetype");\n          font-weight: 600;\n          font-style: italic;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.ttf") format("truetype");\n          font-weight: 700;\n          font-style: normal;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.ttf") format("truetype");\n          font-weight: 700;\n          font-style: italic;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.ttf") format("truetype");\n          font-weight: 900;\n          font-style: normal;\n        }\n\n        @font-face {\n          font-family: "GH Guardian Headline";\n          src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.woff2") format("woff2"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.woff") format("woff"),\n          url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.ttf") format("truetype");\n          font-weight: 900;\n          font-style: italic;\n        }\n      .f-bar {\n        font-family: \'Guardian Agate Sans 1 Web\', monospace;\n        color: #f1f1f1; /* n-5 */\n        text-align: right;\n        line-height: 16px;\n        min-width: 2px;\n        white-space: nowrap;\n        overflow-x: hidden;\n      }\n\n      html { -webkit-font-smoothing: antialiased; }\n      .d-n { display: none; }\n\n      /* TOTHINK: style or inline */\n      .graph {\n        color: #333333; /*n-2*/\n        font-size: 13px;\n        font-family: "Guardian Text Sans Web", Helvetica, Arial, "Lucida Grande", sans-serif;\n        -webkit-font-smoothing: antialiased;\n        border-top: 1px solid rgb(220, 220, 220);\n        border-bottom: 1px solid rgb(220, 220, 220);\n        padding: 6px 0 4px 0;\n      }\n      .chart {\n        position: relative;\n      }\n      .graph .headline {\n        color: black;\n        font-size: 18px;\n        font-family: \'GH Guardian Headline\', Georgia, serif;\n        line-height: 24px;\n        margin-bottom: 24px;\n      }\n      .graph .standfirst {\n        font-family: \'Guardian Text Egyptian Web\', Georgia, serif;\n        font-size: 14px;\n        line-height: 18px;\n        margin-top: 12px;\n        margin-bottom: 12px;\n        font-weight: 400;\n      }\n      .graph .legend {\n        line-height: 18px;\n        margin-bottom: 24px;\n      }\n      .graph .legend-item {\n        white-space: nowrap;\n        display: inline-block;\n        margin-right: 12px;\n        position: relative;\n      }\n      .graph .legend-color {\n        position: absolute;\n        top: 1px;\n        display: inline-block;\n        width: 6px;\n        height: 12px;\n        margin-right: 4px;\n        border-radius: 2px;\n      }\n      .graph .legend-label {\n        margin-left: 10px;\n      }\n      .graph .axis-x,\n      .graph .axis-y {\n        color: #bdbdbd; /* n-3 */\n        font-family: "Guardian Text Sans Web", Helvetica, Arial, "Lucida Grande", sans-serif;\n      }\n      .graph .axis-top-text {\n        white-space: nowrap;\n      }\n      .graph .label {\n        color: #333;\n        line-height: 18px;\n        vertical-align: top;\n      }\n      .graph .label-x {\n        font-size: 12px;\n      }\n      .graph .label-x span {\n        word-break: break-word\n      }\n      .graph svg {\n        position: absolute;\n        right: 0;\n      }\n      .graph svg path {\n        stroke-linejoin: round;\n      }\n      .graph footer {\n        font-size: 12px;\n        line-height: 16px;\n        margin-top: 6px;\n        padding-top: 8px;\n        font-family: \'Guardian Text Sans Web\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;\n        color: #767676;\n      }\n      .graph footer > div {\n        word-break: break-word;\n      }\n      .graph .test {\n        font-size: 13px;\n        font-family: \'Guardian Agate Sans 1 Web\', monospace;\n        visibility: hidden;\n      }\n      /* end of TOTHINK */\n\n      /* for iOS safari mobile */\n      body { -webkit-text-size-adjust: 100%; }\n    </style>\n    <script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>\n  </head>\n\n    <div class="graph js-graph" style="width: 100%;"><header class="header"><div class="headline"><span data-offset-key="339f3-0-0" style="font-weight: bold;"><span data-text="true">Apple\'s market capital reached $2tn on Wednesday</span></span></div><div class="standfirst d-n"><span data-offset-key="6ol8o-0-0"><span data-text="true">Standfirst ...</span></span></div><div class="legend" style="margin-left: 0px;"><span data-offset-key="10qjp-0-0"><span data-text="true">Share price </span></span></div></header><div data-id="line" data-res-y="false" class="chart js-chart" style="margin-top: 24px; margin-bottom: 44px; padding-bottom: 60%;"><div class="axis-y" style="position: absolute; width: 100%; height: 100%;"><div class="axis-y-grid" style="position: absolute; top: 100%; width: 100%; border-bottom: 1px solid rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="3kgss-0-0"><span data-text="true">0</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 80%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="3u369-0-0"><span data-text="true">100</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 60%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="c6hju-0-0"><span data-text="true">200</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 40%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="fhrhi-0-0"><span data-text="true">300</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 20%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="4gsb5-0-0"><span data-text="true">400</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 0%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="16k4k-0-0"><span data-text="true">$500</span></span></span></div></div><div class="axis-x" data-x-bottom="true" data-y-indent="32" data-l-indent="0" data-r-indent="0" style="position: absolute; top: calc(100% - 1px); right: 1px; width: calc(100% - 32px); margin-right: 0px;"><div class="axis-x-tick" style="position: absolute; top: 1px; width: 1px; height: 5px; background-color: rgb(220, 220, 220); left: calc(15.36% + 0px);"></div><div class="axis-x-tick" style="position: absolute; top: 1px; width: 1px; height: 5px; background-color: rgb(220, 220, 220); left: calc(39.33% + 0px);"></div><div class="axis-x-tick" style="position: absolute; top: 1px; width: 1px; height: 5px; background-color: rgb(220, 220, 220); left: calc(63.02% + 0px);"></div><div class="axis-x-tick" style="position: absolute; top: 1px; width: 1px; height: 5px; background-color: rgb(220, 220, 220); left: calc(86.72% + 0px);"></div><div class="axis-x-text" style="position: absolute; top: 8px; width: 52px; line-height: 14px; padding-top: 2px; text-align: center; left: 5.59701%; background-color: transparent;"><span data-offset-key="2j5lp-0-0"><span data-text="true">Oct 2019</span></span></div><div class="axis-x-text" style="position: absolute; top: 8px; width: 51px; line-height: 14px; padding-top: 2px; text-align: center; left: 29.6642%; background-color: transparent;"><span data-offset-key="acskd-0-0"><span data-text="true">Jan 2020</span></span></div><div class="axis-x-text" style="position: absolute; top: 8px; width: 52px; line-height: 14px; padding-top: 2px; text-align: center; left: 53.3582%; background-color: transparent;"><span data-offset-key="fbe2c-0-0"><span data-text="true">Apr 2020</span></span></div><div class="axis-x-text" style="position: absolute; top: 8px; width: 49px; line-height: 14px; padding-top: 2px; text-align: center; left: 77.4254%; background-color: transparent;"><span data-offset-key="c1smr-0-0"><span data-text="true">Jul 2020</span></span></div></div><svg viewBox="0 0 300 180" preserveAspectRatio="none" style="top: -2px; width: calc(100% - 33px); padding: 1px; margin-top: 3.792%; height: 55.01%;"><path class="atom-line-color" fill="none" stroke-width="2px" shape-rendering="auto" stroke-linecap="round" stroke-opacity="0.75" d="M0,170.12542261969682L0.78,173.01123350419894L3.13,180L3.91,177.60497327952885L4.69,176.2700403533646L5.47,173.39731704656995L6.25,174.99400152688406L8.59,175.32773475842515L9.38,169.77205802159452L10.16,173.84229468862472L10.94,174.5032173628531L11.72,171.38837386846984L14.06,168.86901515977752L14.84,168.86247137092377L15.63,167.37048751226962L16.41,167.48827571163704L17.19,173.91427636601594L19.53,171.3949176573236L20.31,172.9196204602465L21.09,172.02312138728325L21.88,169.74588286617953L22.66,169.92256516523065L25.78,171.91187697676958L26.56,169.62809466681207L27.34,166.95168502562984L28.13,166.96477260333734L30.47,166.36928781764644L31.25,164.7137092376486L32.03,160.20503871741738L32.81,160.53550005453158L33.59,163.3722325226306L35.94,162.61969680444977L36.72,162.0961936961501L37.5,160.74162940342458L38.28,161.92605518595266L39.06,164.03969898571273L41.41,163.39186388919185L42.19,164.07241792998147L42.97,161.88024866397646L43.75,162.62624059330352L44.53,163.32642600065438L46.88,159.95637474097504L47.66,159.55065983204275L48.44,163.23481295670194L49.22,162.01766822990513L50,157.96706292943617L52.34,157.9343439851674L53.13,159.67499182026393L53.91,157.95397535172864L54.69,155.95157596248228L55.47,151.94677718398952L57.81,152.1692660050169L58.59,152.52917439197296L59.38,153.15083433307888L60.16,152.55534954738792L60.94,151.8159014069146L63.28,149.13294797687863L64.06,149.49285636383465L64.84,147.38575635292835L65.63,147.12400479877851L66.41,145.1608681426546L68.78,143.54455229577925L69.56,147.31377467553716L70.35,147.33340604209837L71.13,143.7343221725379L71.91,139.11440724179303L74.25,138.01505071436364L75.03,138.25717090195224L75.81,138.18518922456101L76.6,136.75209946559056L77.38,136.2874904569746L79.72,134.93946995310287L80.5,135.09652088559278L81.28,133.4540298833024L82.06,134.65154324353801L82.85,132.60988112116917L85.19,131.73301341476716L85.97,132.26306031192058L86.75,134.29163485658196L87.53,135.06380194132404L88.31,135.21430908496023L90.66,132.21071000109063L91.44,133.57181808266986L92.22,131.24877303958993L93.78,131.63485658196097L96.13,133.65688733776858L96.91,136.7390118878831L97.69,135.24048424037517L98.47,132.72766932053662L99.25,129.37070563856474L101.6,131.85080161413458L102.38,130.82997055295016L103.16,129.33144290544226L103.94,128.87992147453377L104.72,126.4652633875014L107.06,123.38313883738687L107.85,123.02323045043079L108.63,123.4616643036318L109.41,123.27843821572694L110.19,123.65797796924421L112.53,120.6740102519359L113.31,120.49732795288475L114.88,116.8066310393718L115.66,116.87861271676302L118,115.75308103391866L118.78,114.3592540080707L120.35,109.97491547606063L121.13,111.88570182135456L123.47,110.33482386301668L124.25,111.25749809139494L125.03,108.1164794415967L125.81,103.90227941978408L126.6,103.44421420002182L128.94,99.10568218998803L129.72,101.90642381939145L130.5,102.78329152579347L131.28,100.23121387283238L132.06,97.9474315628749L135.19,99.36088995528414L135.97,98.6214418148108L136.75,97.62024212018758L137.53,98.22227069473226L139.88,104.34725706183885L140.66,98.62798560366454L141.44,94.27636601592324L142.22,94.58392409204932L143,103.98080488602905L145.35,104.53702693859745L146.13,97.86890609662996L146.91,96.16752099465593L147.69,93.70705638564733L148.47,97.09673901188793L150.81,96.10208310611846L151.6,97.37157814374524L152.38,92.4048424037518L153.16,93.92954520667469L153.94,93.87719489584472L157.06,97.77074926382377L157.85,94.74751881339297L158.63,96.92005671283674L159.41,101.66430363180281L161.75,111.3949176573236L162.53,118.0041443996074L163.31,115.01363289344533L164.1,127.53190097066202L164.88,127.63660159232195L167.22,110.98265895953759L168,117.19271458174286L168.78,108.41094994001527L169.56,114.83695059439415L170.35,117.38248445850151L172.69,132.34158577816555L173.47,119.7971425455339L174.25,126.28203729959647L175.03,144.08114298178646L175.81,124.6199149307449L178.16,148.02050387174174L178.94,141.0513687425019L179.72,145.1019740429709L180.5,146.33875013632894L181.28,156.5077980150507L183.63,159.69462318682517L184.41,144.9645544770422L185.19,145.85450976115172L185.97,137.39993456211147L186.75,144.40178863562002L189.06,139.77532991602138L189.84,140.1156069364162L190.63,148.87119642272876L191.41,146.24059330352276L192.19,148.54400698004147L194.53,134.7627876540517L195.31,136.75209946559056L196.09,132.40702366670303L196.88,131.15061620678372L200,127.70858326971317L200.78,118.67815465154324L201.56,120.39262733122479L202.34,118.91373105027812L203.13,121.45926491438544L205.47,125.30046897153453L206.25,130.90195223034138L207.03,125.84360344639546L207.81,126.54378885374636L208.59,121.34802050387174L210.94,121.21714472679682L211.72,124.2207438106664L212.5,118.2331770094885L213.28,114.26109717526448L214.06,117.3563093030865L216.41,114.67989966190424L217.19,111.80063256625587L217.97,109.79168938815576L218.75,107.75657105464065L219.53,103.57508997709675L221.88,100.38172101646855L222.66,102.73748500381721L223.44,105.19794961282585L224.22,103.96117351946776L225,105.15868687970338L227.34,100.4144399607373L228.13,101.60540953211913L228.91,97.62024212018758L229.69,99.17766386737922L230.47,97.842730941215L233.59,99.25618933362418L234.38,98.3531464718072L235.16,98.26153342785473L235.94,98.46439088232088L238.28,95.90576944050606L239.06,94.93074490129789L239.84,93.765950485331L240.63,95.59821136438L241.41,89.59101319664087L243.75,88.30843058130661L244.53,81.41782091831172L245.31,75.62656778274626L246.09,86.7117461009925L246.88,84.81404733340605L249.22,82.07219980368636L250,76.12389573563097L250.78,76.44454138946455L251.56,76.35292834551205L252.34,77.66822990511507L254.69,71.6806631039372L255.47,66.66812084196754L256.25,70.9019522303414L257.03,67.77402115825066L257.81,75.10960846330028L260.16,69.77642054749705L260.94,67.80019631366564L261.72,68.25171774457412L262.5,68.25171774457412L265.63,61.8780674010252L266.41,62.63714690805979L267.19,56.95713818300799L267.97,56.067182898898466L268.75,55.44552295779257L271.09,56.60377358490567L271.88,52.46809902933799L272.66,50.72090740538775L273.44,53.86846984403974L274.22,54.378885374631935L276.56,49.065328825389926L277.34,52.61860617297418L278.13,51.90533318791585L278.91,63.49438324790057L279.69,64.09641182244523L282.03,58.350965208855946L282.81,62.427745664739916L283.59,57.74893663431127L284.38,54.738793761587985L285.16,28.38041225869781L287.5,21.37201439633551L288.28,19.467771839895313L289.06,18.427309412149658L289.84,8.37604973279534L290.63,15.678918093576215L292.97,11.451630494056062L293.75,20.226851346929905L294.53,10.712182353582726L295.31,5.477151270585667L296.09,5.745446613589317L298.44,6.530701276038833L299.22,4.030973933907784L300,0" style="stroke: rgb(204, 10, 17);"></path></svg><div id="state-holder" data-x-ticks="Sun Sep 29 2019 00:00:00 GMT+0200 (Central European Summer Time),Mon Dec 30 2019 00:00:00 GMT+0100 (Central European Standard Time),Mon Mar 30 2020 00:00:00 GMT+0200 (Central European Summer Time),Mon Jun 29 2020 00:00:00 GMT+0200 (Central European Summer Time)" data-y-ticks="0,100,200,300,400,500" style="display: none;"></div></div><footer class=""><span data-offset-key="6v9r-0-0"><span data-text="true">Guardian graphic | Source: Refinitiv</span></span></footer><span class="test js-test-res"></span></div>\n\n  <body>\n    <script>\n      var elChart = document.querySelector(".js-chart")\n      var elAxisX = document.querySelector(".axis-x")\n      var elsText = elAxisX ? elAxisX.querySelectorAll(".axis-x-text") : []\n      var indentL = elAxisX ? parseInt(elAxisX.dataset.lIndent, 10) : 0\n      var extendR = elAxisX ? parseInt(elAxisX.dataset.rIndent, 10) : 0\n      var isBarBased = elChart.getAttribute("data-id").toLowerCase().indexOf("bar") > -1\n\n      // responsive\n      function responsive() {\n        iframeMessenger.resize()  // 1\n        rescaleSvgElements()      // 2\n        updateYLabelWidths()      // 3\n        updateXAxisTextPosition() // 4\n        updateChartHeight()       // 5\n      }\n      responsive()\n\n      // handle event\n      var timeout = null\n      window.addEventListener(\'resize\', function(evt) {\n        if (timeout) window.clearTimeout(timeout)\n        timeout = window.setTimeout(function() {\n          responsive()\n          timeout = null\n        }, 200)\n      });\n\n      /* 1. iframe resize */\n      // iframeMessenger for embed in guardian\'s page\n\n      /* 2. svg path or circle rescale */\n      function rescaleSvgElements() {\n        var width = 300\n        var elSvg = document.querySelector("svg")\n        if (elSvg) {\n          var svgWidth = elSvg.getBoundingClientRect().width\n          // line chart\n          var strokeWidth = Math.round(2*width*10/svgWidth)/10\n          var paths = Array.prototype.slice.call(document.querySelectorAll("path"))\n          paths.forEach(function(path) { path.setAttribute("stroke-width", strokeWidth); })\n          // plot chart\n          var r = Math.round(3*width*10/svgWidth)/10\n          var circles = Array.prototype.slice.call(document.querySelectorAll("circle"))\n          circles.forEach(function(circle) { circle.setAttribute("r", r); })\n      }}\n\n      /* 3. y label width update */\n      function updateYLabelWidths() {\n        if (elChart.getAttribute("data-res-y") === "false") return\n\n        const elRows = [...elChart.querySelectorAll(".row")]\n        const elGroups = [...elChart.querySelectorAll(".group")]\n        const elLegend = document.querySelector(".legend")\n        const labelWidth = elChart.querySelector(".label").offsetWidth\n        const chartWidth = elChart.offsetWidth\n        const isInline = labelWidth <= chartWidth/3\n\n        elRows.forEach(el => {\n          el.style.height = isInline ? "24px" : "auto"\n        })\n        elGroups.forEach(el => {\n          el.style.width = isInline ? "calc(" + 100 + "% - " + labelWidth + "px)" : "100%"\n          el.style.display = isInline ? "inline-block" : "block"\n        })\n\n        elAxisX.style.width = "calc(100% - " + ((isInline ? labelWidth : 0) + indentL + extendR + 1) + "px)"\n        elLegend.style.marginLeft = isInline ? labelWidth + "px" : 0\n      }\n\n      /* 4. x axis text position update */\n      function updateXAxisTextPosition() {\n        if (!elAxisX) return\n\n        var elsTick = elAxisX.querySelectorAll(".axis-x-tick")\n        var elTest = document.querySelector(".js-test-res")\n\n        // a. default width / left\n        var axisXWidth = elAxisX.offsetWidth\n        var maxWidth = elsTick[1].offsetLeft - elsTick[0].offsetLeft\n        var txtWidths = [].slice.call(elsText).map((el, i) => {\n          elTest.textContent = el.textContent\n          var txtWidth = elTest.offsetWidth + 2\n          var resWidth = Math.min(txtWidth, maxWidth)\n          el.style.width = resWidth + "px"\n          el.style.left = (elsTick[i].offsetLeft - resWidth / 2) * 100 / axisXWidth + "%"\n          el.style.textAlign = "center"\n          return txtWidth\n        })\n        elTest.textContent = ""\n\n        // b. adjust width if multi lines\n        var isMultiLine = txtWidths.find(w => w > maxWidth)\n        if (isMultiLine) {\n          [].slice.call(elsText).forEach((el, i) => {\n            var txtWidth = el.querySelector("span").offsetWidth + 1\n            var resWidth = Math.min(txtWidth, maxWidth)\n            el.style.width = resWidth + "px"\n            el.style.left = (elsTick[i].offsetLeft - resWidth / 2) * 100 / axisXWidth + "%"\n          })\n        }\n\n        // c. adjust two ends if out of frame\n        var iLast = elsTick.length - 1\n        var indent = parseInt(elAxisX.dataset.yIndent, 10) + indentL\n        var textStrLeft = (indent + elsTick[0].offsetLeft) - elsText[0].offsetWidth / 2\n        var textEndRight = (axisXWidth + extendR - elsTick[iLast].offsetLeft) - elsText[iLast].offsetWidth / 2\n        if (textStrLeft < 0) {\n          elsText[0].style.left = ((isBarBased ? 0 : 1) - indent) + "px"\n          elsText[0].style.textAlign = "left"\n        }\n        if (textEndRight < 0) {\n          elsText[iLast].style.left = "auto"\n          elsText[iLast].style.right = (-1) - extendR + "px"\n          elsText[iLast].style.textAlign = "right"\n        }\n      }\n\n      /* chart height update */\n      function updateChartHeight() {\n        var elsLabel = document.querySelectorAll(".label-x .label")\n        var isAxisXBottom = elAxisX ? (elAxisX.dataset.xBottom==="true") : false\n        if (isAxisXBottom || elsLabel.length > 0) {\n          var elsAll = [].slice.call(elsText).concat([].slice.call(elsLabel))\n          var heights = elsAll.map(el => Math.ceil(el.offsetHeight))\n          var maxHeight = Math.max.apply(null, heights)\n          elChart.style.marginBottom = (maxHeight + 14) + "px"\n        }\n      }\n    </script>\n  </body>\n</html>';

export const barChartHtml = `
<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<style>
		@font-face {
			font-family: "Guardian Agate Sans 1 Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.svg#GuardianAgateSans1Web-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Agate Sans 1 Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.svg#GuardianAgateSans1Web-RegularItalic") format("svg");
			font-weight: 400;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Agate Sans 1 Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.svg#GuardianAgateSans1Web-Bold") format("svg");
			font-weight: 700;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Agate Sans 1 Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.svg#GuardianAgateSans1Web-BoldItalic") format("svg");
			font-weight: 700;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.svg#GuardianEgyptianWeb-Light") format("svg");
			font-weight: 200;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.svg#GuardianEgyptianWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.svg#GuardianEgyptianWeb-RegularItalic") format("svg");
			font-weight: 400;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.svg#GuardianEgyptianWeb-Semibold") format("svg");
			font-weight: 600;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.svg#GuardianEgyptianWeb-SemiboldItalic") format("svg");
			font-weight: 600;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.svg#GuardianEgyptianWeb-Medium") format("svg");
			font-weight: 500;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.svg#GuardianEgyptianWeb-Bold") format("svg");
			font-weight: 700;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.svg#GuardianEgyptianWeb-BoldItalic") format("svg");
			font-weight: 700;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.svg#GuardianSansWeb-Light") format("svg");
			font-weight: 200;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.svg#GuardianSansWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.svg#GuardianSansWeb-Semibold") format("svg");
			font-weight: 600;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.svg#GuardianTextEgyptianWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.svg#GuardianTextEgyptianWeb-RegularItalic") format("svg");
			font-weight: 400;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.svg#GuardianTextEgyptianWeb-Medium") format("svg");
			font-weight: 500;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.svg#GuardianTextEgyptianWeb-MediumItalic") format("svg");
			font-weight: 500;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.svg#GuardianTextEgyptianWeb-Bold") format("svg");
			font-weight: 700;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.svg#GuardianTextEgyptianWeb-BoldItalic") format("svg");
			font-weight: 700;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.svg#GuardianTextEgyptianWeb-Black") format("svg");
			font-weight: 800;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.svg#GuardianTextEgyptianWeb-BlackItalic") format("svg");
			font-weight: 800;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.svg#GuardianTextSansWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.svg#GuardianTextSansWeb-RegularItalic") format("svg");
			font-weight: 400;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.svg#GuardianTextSansWeb-Medium") format("svg");
			font-weight: 500;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.svg#GuardianTextSansWeb-MediumItalic") format("svg");
			font-weight: 500;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.svg#GuardianTextSansWeb-Bold") format("svg");
			font-weight: 700;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.svg#GuardianTextSansWeb-BoldItalic") format("svg");
			font-weight: 700;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.svg#GuardianTextSansWeb-Black") format("svg");
			font-weight: 800;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.svg#GuardianTextSansWeb-BlackItalic") format("svg");
			font-weight: 800;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Compact Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.svg#GuardianCompactWeb-Black") format("svg");
			font-weight: 800;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Titlepiece Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.svg#GuardianTitlepieceWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Weekend Cond Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.svg#GuardianWeekendCondWeb-Black") format("svg");
			font-weight: 800;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.ttf") format("truetype");
			font-weight: 300;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.ttf") format("truetype");
			font-weight: 300;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.ttf") format("truetype");
			font-weight: 400;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.ttf") format("truetype");
			font-weight: 400;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.ttf") format("truetype");
			font-weight: 500;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.ttf") format("truetype");
			font-weight: 500;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.ttf") format("truetype");
			font-weight: 600;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.ttf") format("truetype");
			font-weight: 600;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.ttf") format("truetype");
			font-weight: 700;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.ttf") format("truetype");
			font-weight: 700;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.ttf") format("truetype");
			font-weight: 900;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.ttf") format("truetype");
			font-weight: 900;
			font-style: italic;
		}
		.f-bar {
		font-family: 'Guardian Agate Sans 1 Web', monospace;
		color: #f1f1f1; /* n-5 */
		text-align: right;
		line-height: 16px;
		min-width: 2px;
		white-space: nowrap;
		overflow-x: hidden;
		}

		html { -webkit-font-smoothing: antialiased; }
		.d-n { display: none; }

		/* TOTHINK: style or inline */
		.graph {
		color: #333333; /*n-2*/
		font-size: 13px;
		font-family: "Guardian Text Sans Web", Helvetica, Arial, "Lucida Grande", sans-serif;
		-webkit-font-smoothing: antialiased;
		border-top: 1px solid rgb(220, 220, 220);
		border-bottom: 1px solid rgb(220, 220, 220);
		padding: 6px 0 4px 0;
		}
		.chart {
		position: relative;
		}
		.graph .headline {
		color: black;
		font-size: 18px;
		font-family: 'GH Guardian Headline', Georgia, serif;
		line-height: 24px;
		margin-bottom: 24px;
		}
		.graph .standfirst {
		font-family: 'Guardian Text Egyptian Web', Georgia, serif;
		font-size: 14px;
		line-height: 18px;
		margin-top: 12px;
		margin-bottom: 12px;
		font-weight: 400;
		}
		.graph .legend {
		line-height: 18px;
		margin-bottom: 24px;
		}
		.graph .legend-item {
		white-space: nowrap;
		display: inline-block;
		margin-right: 12px;
		position: relative;
		}
		.graph .legend-color {
		position: absolute;
		top: 1px;
		display: inline-block;
		width: 6px;
		height: 12px;
		margin-right: 4px;
		border-radius: 2px;
		}
		.graph .legend-label {
		margin-left: 10px;
		}
		.graph .axis-x,
		.graph .axis-y {
		color: #bdbdbd; /* n-3 */
		font-family: "Guardian Text Sans Web", Helvetica, Arial, "Lucida Grande", sans-serif;
		}
		.graph .axis-top-text {
		white-space: nowrap;
		}
		.graph .label {
		color: #333;
		line-height: 18px;
		vertical-align: top;
		}
		.graph .label-x {
		font-size: 12px;
		}
		.graph .label-x span {
		word-break: break-word
		}
		.graph svg {
		position: absolute;
		right: 0;
		}
		.graph svg path {
		stroke-linejoin: round;
		}
		.graph footer {
		font-size: 12px;
		line-height: 16px;
		margin-top: 6px;
		padding-top: 8px;
		font-family: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
		color: #767676;
		}
		.graph footer > div {
		word-break: break-word;
		}
		.graph .test {
		font-size: 13px;
		font-family: 'Guardian Agate Sans 1 Web', monospace;
		visibility: hidden;
		}
		/* end of TOTHINK */

		/* for iOS safari mobile */
		body { -webkit-text-size-adjust: 100%; }
	</style>
	<script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
	</head>

	<div class="graph js-graph" style="width: 100%;"><header class="header"><div class="headline"><span data-offset-key="3r6jc-0-0" style="font-weight: bold;"><span data-text="true">Footfall is by far the weakest in London</span></span></div><div class="standfirst"><span data-offset-key="egt2a-0-0"><span data-text="true">% change year-on-year</span></span></div><div class="legend d-n" style="margin-left: 0px;"><div class="legend-item"><span class="legend-color" style="background-color: rgb(238, 238, 238);"></span><span class="legend-label"><span data-offset-key="2a0c7-0-0"><span data-text="true">unknown title</span></span></span></div><div class="legend-item"><span class="legend-color" style="background-color: rgb(204, 10, 17);"></span><span class="legend-label"><span data-offset-key="a8ph6-0-0"><span data-text="true">unknown title</span></span></span></div></div></header><div data-id="barStack" data-res-y="true" class="chart js-chart" style="margin-top: 24px; margin-bottom: 0px; padding-bottom: 1px;"><!-- react-empty: 296 --><div class="axis-x" data-x-bottom="false" data-y-indent="0" data-l-indent="0" data-r-indent="0" style="position: absolute; top: -30px; right: 1px; width: calc(100% - 1px); margin-right: 0px;"><div class="axis-x-tick" style="position: absolute; top: 24px; left: calc(0% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 24px; left: calc(20% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 24px; left: calc(40% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 24px; left: calc(60% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 24px; left: calc(80% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 24px; left: calc(100% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-text axis-top-text" style="position: absolute; top: 8px; left: 0px; width: 21px; line-height: 14px; padding-top: 2px; text-align: left; background-color: transparent;"><span data-offset-key="72bvu-0-0"><span data-text="true">-50</span></span></div><div class="axis-x-text axis-top-text" style="position: absolute; top: 8px; left: 16.5552%; width: 21px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="9ljml-0-0"><span data-text="true">-40</span></span></div><div class="axis-x-text axis-top-text" style="position: absolute; top: 8px; left: 36.6221%; width: 21px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="ah6kd-0-0"><span data-text="true">-30</span></span></div><div class="axis-x-text axis-top-text" style="position: absolute; top: 8px; left: 56.3545%; width: 21px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="e33mg-0-0"><span data-text="true">-20</span></span></div><div class="axis-x-text axis-top-text" style="position: absolute; top: 8px; left: 76.4214%; width: 21px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="2itvk-0-0"><span data-text="true">-10</span></span></div><div class="axis-x-text axis-top-text" style="position: absolute; top: 8px; left: auto; width: 9px; line-height: 14px; padding-top: 2px; text-align: right; background-color: transparent; right: -1px;"><span data-offset-key="a8b53-0-0"><span data-text="true">0</span></span></div></div><div class="canvas"><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="3t8ev-0-0"><span data-text="true">Bristol </span></span><span data-offset-key="3t8ev-0-1" style="font-weight: bold;"><span data-text="true">-27.5</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b00 false" title="22.5" style="width: 45%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b01 false" title="27.5" style="width: 55%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="ecsus-0-0"><span data-text="true">Liverpool </span></span><span data-offset-key="ecsus-0-1" style="font-weight: bold;"><span data-text="true">-28</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b10 false" title="22" style="width: 44%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b11 false" title="28" style="width: 56%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="dorp0-0-0"><span data-text="true">Cardiff </span></span><span data-offset-key="dorp0-0-1" style="font-weight: bold;"><span data-text="true">-30.9</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b20 false" title="19.1" style="width: 38.2%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b21 false" title="30.9" style="width: 61.8%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="4052b-0-0"><span data-text="true">Belfast </span></span><span data-offset-key="4052b-0-1" style="font-weight: bold;"><span data-text="true">-31.8</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b30 false" title="18.2" style="width: 36.4%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b31 false" title="31.8" style="width: 63.6%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="66h9i-0-0"><span data-text="true">Nottingham </span></span><span data-offset-key="66h9i-0-1" style="font-weight: bold;"><span data-text="true">-31.8</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b40 false" title="18.2" style="width: 36.4%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b41 false" title="31.8" style="width: 63.6%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="2oo6t-0-0"><span data-text="true">Leeds </span></span><span data-offset-key="2oo6t-0-1" style="font-weight: bold;"><span data-text="true">-35.2</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b50 false" title="14.8" style="width: 29.6%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b51 false" title="35.2" style="width: 70.4%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="9h0r6-0-0"><span data-text="true">Glasgow </span></span><span data-offset-key="9h0r6-0-1" style="font-weight: bold;"><span data-text="true">-35.5</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b60 false" title="14.5" style="width: 29%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b61 false" title="35.5" style="width: 71%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="61lvk-0-0"><span data-text="true">Birmingham </span></span><span data-offset-key="61lvk-0-1" style="font-weight: bold;"><span data-text="true">-39.4</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b70 false" title="10.6" style="width: 21.2%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b71 false" title="39.4" style="width: 78.8%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="fpojq-0-0"><span data-text="true">Manchester </span></span><span data-offset-key="fpojq-0-1" style="font-weight: bold;"><span data-text="true">-40.6</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b80 false" title="9.4" style="width: 18.8%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b81 false" title="40.6" style="width: 81.2%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="72r0g-0-0"><span data-text="true">Portsmouth </span></span><span data-offset-key="72r0g-0-1" style="font-weight: bold;"><span data-text="true">-42.8</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b90 false" title="7.2" style="width: 14.4%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b91 false" title="42.8" style="width: 85.6%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div><div class="row" style="display: block; height: auto;"><div class="label atom-bar-label" style="display: inline-block; width: 112px;"><span data-offset-key="8d5jh-0-0"><span data-text="true">London </span></span><span data-offset-key="8d5jh-0-1" style="font-weight: bold;"><span data-text="true">-45.3</span></span></div><div class="group" style="flex: 1 1 auto; position: relative; width: 100%; display: block;"><div class="grid" style="position: relative; margin-left: 0px; margin-right: 1px;"><div style="position: absolute; left: 0%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div><div style="position: absolute; left: 20%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 40%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 60%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 80%; top: 0px; width: 1px; height: 20px; background-color: rgba(255, 255, 255, 0.5);"></div><div style="position: absolute; left: 100%; top: 0px; width: 1px; height: 20px; background-color: transparent;"></div></div><div class="bars" style="height: 16px; margin-bottom: 8px;"><div class="bar atom-bar-color f-bar b100 false" title="4.7" style="width: 9.4%; height: 16px; background-color: rgb(238, 238, 238); margin-bottom: 1px; display: inline-block;"></div><div class="bar atom-bar-color f-bar b101 false" title="45.3" style="width: 90.6%; height: 16px; background-color: rgb(204, 10, 17); margin-bottom: 1px; display: inline-block;"></div></div></div></div></div><div id="state-holder" data-x-ticks="0,10,20,30,40,50" data-y-ticks="" style="display: none;"></div></div><footer class=""><span data-offset-key="3k54m-0-0"><span data-text="true">Guardian graphic | Source: BRC-ShopperTrak</span></span></footer><span class="test js-test-res"></span></div>

	<body>
	<script>
		var elChart = document.querySelector(".js-chart")
		var elAxisX = document.querySelector(".axis-x")
		var elsText = elAxisX ? elAxisX.querySelectorAll(".axis-x-text") : []
		var indentL = elAxisX ? parseInt(elAxisX.dataset.lIndent, 10) : 0
		var extendR = elAxisX ? parseInt(elAxisX.dataset.rIndent, 10) : 0
		var isBarBased = elChart.getAttribute("data-id").toLowerCase().indexOf("bar") > -1

		// responsive
		function responsive() {
		iframeMessenger.resize()  // 1
		rescaleSvgElements()      // 2
		updateYLabelWidths()      // 3
		updateXAxisTextPosition() // 4
		updateChartHeight()       // 5
		}
		responsive()

		// handle event
		var timeout = null
		window.addEventListener('resize', function(evt) {
		if (timeout) window.clearTimeout(timeout)
		timeout = window.setTimeout(function() {
			responsive()
			timeout = null
		}, 200)
		});

		/* 1. iframe resize */
		// iframeMessenger for embed in guardian's page

		/* 2. svg path or circle rescale */
		function rescaleSvgElements() {
		var width = 300
		var elSvg = document.querySelector("svg")
		if (elSvg) {
			var svgWidth = elSvg.getBoundingClientRect().width
			// line chart
			var strokeWidth = Math.round(2*width*10/svgWidth)/10
			var paths = Array.prototype.slice.call(document.querySelectorAll("path"))
			paths.forEach(function(path) { path.setAttribute("stroke-width", strokeWidth); })
			// plot chart
			var r = Math.round(3*width*10/svgWidth)/10
			var circles = Array.prototype.slice.call(document.querySelectorAll("circle"))
			circles.forEach(function(circle) { circle.setAttribute("r", r); })
		}}

		/* 3. y label width update */
		function updateYLabelWidths() {
		if (elChart.getAttribute("data-res-y") === "false") return

		const elRows = [...elChart.querySelectorAll(".row")]
		const elGroups = [...elChart.querySelectorAll(".group")]
		const elLegend = document.querySelector(".legend")
		const labelWidth = elChart.querySelector(".label").offsetWidth
		const chartWidth = elChart.offsetWidth
		const isInline = labelWidth <= chartWidth/3

		elRows.forEach(el => {
			el.style.height = isInline ? "24px" : "auto"
		})
		elGroups.forEach(el => {
			el.style.width = isInline ? "calc(" + 100 + "% - " + labelWidth + "px)" : "100%"
			el.style.display = isInline ? "inline-block" : "block"
		})

		elAxisX.style.width = "calc(100% - " + ((isInline ? labelWidth : 0) + indentL + extendR + 1) + "px)"
		elLegend.style.marginLeft = isInline ? labelWidth + "px" : 0
		}

		/* 4. x axis text position update */
		function updateXAxisTextPosition() {
		if (!elAxisX) return

		var elsTick = elAxisX.querySelectorAll(".axis-x-tick")
		var elTest = document.querySelector(".js-test-res")

		// a. default width / left
		var axisXWidth = elAxisX.offsetWidth
		var maxWidth = elsTick[1].offsetLeft - elsTick[0].offsetLeft
		var txtWidths = [].slice.call(elsText).map((el, i) => {
			elTest.textContent = el.textContent
			var txtWidth = elTest.offsetWidth + 2
			var resWidth = Math.min(txtWidth, maxWidth)
			el.style.width = resWidth + "px"
			el.style.left = (elsTick[i].offsetLeft - resWidth / 2) * 100 / axisXWidth + "%"
			el.style.textAlign = "center"
			return txtWidth
		})
		elTest.textContent = ""

		// b. adjust width if multi lines
		var isMultiLine = txtWidths.find(w => w > maxWidth)
		if (isMultiLine) {
			[].slice.call(elsText).forEach((el, i) => {
			var txtWidth = el.querySelector("span").offsetWidth + 1
			var resWidth = Math.min(txtWidth, maxWidth)
			el.style.width = resWidth + "px"
			el.style.left = (elsTick[i].offsetLeft - resWidth / 2) * 100 / axisXWidth + "%"
			})
		}

		// c. adjust two ends if out of frame
		var iLast = elsTick.length - 1
		var indent = parseInt(elAxisX.dataset.yIndent, 10) + indentL
		var textStrLeft = (indent + elsTick[0].offsetLeft) - elsText[0].offsetWidth / 2
		var textEndRight = (axisXWidth + extendR - elsTick[iLast].offsetLeft) - elsText[iLast].offsetWidth / 2
		if (textStrLeft < 0) {
			elsText[0].style.left = ((isBarBased ? 0 : 1) - indent) + "px"
			elsText[0].style.textAlign = "left"
		}
		if (textEndRight < 0) {
			elsText[iLast].style.left = "auto"
			elsText[iLast].style.right = (-1) - extendR + "px"
			elsText[iLast].style.textAlign = "right"
		}
		}

		/* chart height update */
		function updateChartHeight() {
		var elsLabel = document.querySelectorAll(".label-x .label")
		var isAxisXBottom = elAxisX ? (elAxisX.dataset.xBottom==="true") : false
		if (isAxisXBottom || elsLabel.length > 0) {
			var elsAll = [].slice.call(elsText).concat([].slice.call(elsLabel))
			var heights = elsAll.map(el => Math.ceil(el.offsetHeight))
			var maxHeight = Math.max.apply(null, heights)
			elChart.style.marginBottom = (maxHeight + 14) + "px"
		}
		}
	</script>
	</body>
</html>
`;

export const lineChartHtml = `
<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<style>
		@font-face {
			font-family: "Guardian Agate Sans 1 Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Regular.svg#GuardianAgateSans1Web-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Agate Sans 1 Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-RegularItalic.svg#GuardianAgateSans1Web-RegularItalic") format("svg");
			font-weight: 400;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Agate Sans 1 Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-Bold.svg#GuardianAgateSans1Web-Bold") format("svg");
			font-weight: 700;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Agate Sans 1 Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianAgateSans1Web/GuardianAgateSans1Web-BoldItalic.svg#GuardianAgateSans1Web-BoldItalic") format("svg");
			font-weight: 700;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Light.svg#GuardianEgyptianWeb-Light") format("svg");
			font-weight: 200;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Regular.svg#GuardianEgyptianWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-RegularItalic.svg#GuardianEgyptianWeb-RegularItalic") format("svg");
			font-weight: 400;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Semibold.svg#GuardianEgyptianWeb-Semibold") format("svg");
			font-weight: 600;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-SemiboldItalic.svg#GuardianEgyptianWeb-SemiboldItalic") format("svg");
			font-weight: 600;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Medium.svg#GuardianEgyptianWeb-Medium") format("svg");
			font-weight: 500;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-Bold.svg#GuardianEgyptianWeb-Bold") format("svg");
			font-weight: 700;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianEgyptianWeb/GuardianEgyptianWeb-BoldItalic.svg#GuardianEgyptianWeb-BoldItalic") format("svg");
			font-weight: 700;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Light.svg#GuardianSansWeb-Light") format("svg");
			font-weight: 200;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Regular.svg#GuardianSansWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianSansWeb/GuardianSansWeb-Semibold.svg#GuardianSansWeb-Semibold") format("svg");
			font-weight: 600;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Regular.svg#GuardianTextEgyptianWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-RegularItalic.svg#GuardianTextEgyptianWeb-RegularItalic") format("svg");
			font-weight: 400;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Medium.svg#GuardianTextEgyptianWeb-Medium") format("svg");
			font-weight: 500;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-MediumItalic.svg#GuardianTextEgyptianWeb-MediumItalic") format("svg");
			font-weight: 500;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Bold.svg#GuardianTextEgyptianWeb-Bold") format("svg");
			font-weight: 700;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BoldItalic.svg#GuardianTextEgyptianWeb-BoldItalic") format("svg");
			font-weight: 700;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-Black.svg#GuardianTextEgyptianWeb-Black") format("svg");
			font-weight: 800;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Egyptian Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextEgyptianWeb/GuardianTextEgyptianWeb-BlackItalic.svg#GuardianTextEgyptianWeb-BlackItalic") format("svg");
			font-weight: 800;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.svg#GuardianTextSansWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-RegularItalic.svg#GuardianTextSansWeb-RegularItalic") format("svg");
			font-weight: 400;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Medium.svg#GuardianTextSansWeb-Medium") format("svg");
			font-weight: 500;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-MediumItalic.svg#GuardianTextSansWeb-MediumItalic") format("svg");
			font-weight: 500;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Bold.svg#GuardianTextSansWeb-Bold") format("svg");
			font-weight: 700;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BoldItalic.svg#GuardianTextSansWeb-BoldItalic") format("svg");
			font-weight: 700;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Black.svg#GuardianTextSansWeb-Black") format("svg");
			font-weight: 800;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Text Sans Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-BlackItalic.svg#GuardianTextSansWeb-BlackItalic") format("svg");
			font-weight: 800;
			font-style: italic;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Compact Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianCompactWeb-Black.svg#GuardianCompactWeb-Black") format("svg");
			font-weight: 800;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Titlepiece Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianTitlepieceWeb-Regular.svg#GuardianTitlepieceWeb-Regular") format("svg");
			font-weight: 400;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "Guardian Weekend Cond Web";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.eot");
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.eot?#iefix") format("embedded-opentype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.woff2") format("woff2"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.woff") format("woff"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.ttf") format("truetype"), url("https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianExtrasWeb/GuardianWeekendCondWeb-Black.svg#GuardianWeekendCondWeb-Black") format("svg");
			font-weight: 800;
			font-style: normal;
			font-stretch: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Light.ttf") format("truetype");
			font-weight: 300;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-LightItalic.ttf") format("truetype");
			font-weight: 300;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Regular.ttf") format("truetype");
			font-weight: 400;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-RegularItalic.ttf") format("truetype");
			font-weight: 400;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Medium.ttf") format("truetype");
			font-weight: 500;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-MediumItalic.ttf") format("truetype");
			font-weight: 500;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Semibold.ttf") format("truetype");
			font-weight: 600;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-SemiboldItalic.ttf") format("truetype");
			font-weight: 600;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Bold.ttf") format("truetype");
			font-weight: 700;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BoldItalic.ttf") format("truetype");
			font-weight: 700;
			font-style: italic;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-Black.ttf") format("truetype");
			font-weight: 900;
			font-style: normal;
		}

		@font-face {
			font-family: "GH Guardian Headline";
			src: url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.woff2") format("woff2"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.woff") format("woff"),
			url("https://interactive.guim.co.uk/fonts/guss-webfonts/GHGuardianHeadline/GHGuardianHeadline-BlackItalic.ttf") format("truetype");
			font-weight: 900;
			font-style: italic;
		}
		.f-bar {
		font-family: 'Guardian Agate Sans 1 Web', monospace;
		color: #f1f1f1; /* n-5 */
		text-align: right;
		line-height: 16px;
		min-width: 2px;
		white-space: nowrap;
		overflow-x: hidden;
		}

		html { -webkit-font-smoothing: antialiased; }
		.d-n { display: none; }

		/* TOTHINK: style or inline */
		.graph {
		color: #333333; /*n-2*/
		font-size: 13px;
		font-family: "Guardian Text Sans Web", Helvetica, Arial, "Lucida Grande", sans-serif;
		-webkit-font-smoothing: antialiased;
		border-top: 1px solid rgb(220, 220, 220);
		border-bottom: 1px solid rgb(220, 220, 220);
		padding: 6px 0 4px 0;
		}
		.chart {
		position: relative;
		}
		.graph .headline {
		color: black;
		font-size: 18px;
		font-family: 'GH Guardian Headline', Georgia, serif;
		line-height: 24px;
		margin-bottom: 24px;
		}
		.graph .standfirst {
		font-family: 'Guardian Text Egyptian Web', Georgia, serif;
		font-size: 14px;
		line-height: 18px;
		margin-top: 12px;
		margin-bottom: 12px;
		font-weight: 400;
		}
		.graph .legend {
		line-height: 18px;
		margin-bottom: 24px;
		}
		.graph .legend-item {
		white-space: nowrap;
		display: inline-block;
		margin-right: 12px;
		position: relative;
		}
		.graph .legend-color {
		position: absolute;
		top: 1px;
		display: inline-block;
		width: 6px;
		height: 12px;
		margin-right: 4px;
		border-radius: 2px;
		}
		.graph .legend-label {
		margin-left: 10px;
		}
		.graph .axis-x,
		.graph .axis-y {
		color: #bdbdbd; /* n-3 */
		font-family: "Guardian Text Sans Web", Helvetica, Arial, "Lucida Grande", sans-serif;
		}
		.graph .axis-top-text {
		white-space: nowrap;
		}
		.graph .label {
		color: #333;
		line-height: 18px;
		vertical-align: top;
		}
		.graph .label-x {
		font-size: 12px;
		}
		.graph .label-x span {
		word-break: break-word
		}
		.graph svg {
		position: absolute;
		right: 0;
		}
		.graph svg path {
		stroke-linejoin: round;
		}
		.graph footer {
		font-size: 12px;
		line-height: 16px;
		margin-top: 6px;
		padding-top: 8px;
		font-family: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
		color: #767676;
		}
		.graph footer > div {
		word-break: break-word;
		}
		.graph .test {
		font-size: 13px;
		font-family: 'Guardian Agate Sans 1 Web', monospace;
		visibility: hidden;
		}
		/* end of TOTHINK */

		/* for iOS safari mobile */
		body { -webkit-text-size-adjust: 100%; }
	</style>
	<script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
	</head>

	<div class="graph js-graph" style="width: 100%;"><header class="header"><div class="headline"><span data-offset-key="2j4jk-0-0" style="font-weight: bold;"><span data-text="true">UK retail footfall is still about a third lower than the same time last year</span></span></div><div class="standfirst"><span data-offset-key="62bjk-0-0"><span data-text="true">% change year-on-year</span></span></div><div class="legend d-n" style="margin-left: 0px;"><span data-offset-key="2d2j-0-0"><span data-text="true">unknown title</span></span></div></header><div data-id="line" data-res-y="false" class="chart js-chart" style="margin-top: 24px; margin-bottom: 44px; padding-bottom: 60%;"><div class="axis-y" style="position: absolute; width: 100%; height: 100%;"><div class="axis-y-grid" style="position: absolute; top: 100%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="fhk0g-0-0"><span data-text="true">-100</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 80.62%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="f6n5v-0-0"><span data-text="true">-80</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 61.24%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="6diud-0-0"><span data-text="true">-60</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 41.86%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="4hjaq-0-0"><span data-text="true">-40</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 22.48%; width: 100%; border-bottom: 1px dotted rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="ei5u8-0-0"><span data-text="true">-20</span></span></span></div><div class="axis-y-grid" style="position: absolute; top: 3.1%; width: 100%; border-bottom: 1px solid rgb(220, 220, 220); margin-top: -19px; line-height: 18px;"><span class="axis-y-text" style="display: inline-block;"><span data-offset-key="8r8m7-0-0"><span data-text="true">0</span></span></span></div></div><div class="axis-x" data-x-bottom="true" data-y-indent="34" data-l-indent="0" data-r-indent="0" style="position: absolute; top: calc(100% - 1px); right: 1px; width: calc(100% - 34px); margin-right: 0px;"><div class="axis-x-tick" style="position: absolute; top: 1px; left: calc(1.54% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 1px; left: calc(20% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 1px; left: calc(38.46% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 1px; left: calc(56.92% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 1px; left: calc(75.38% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-tick" style="position: absolute; top: 1px; left: calc(93.85% + 0px); width: 1px; height: 5px; background-color: rgb(220, 220, 220);"></div><div class="axis-x-text" style="position: absolute; top: 8px; left: -3.00752%; width: 24px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="d1as3-0-0"><span data-text="true">Aug</span></span></div><div class="axis-x-text" style="position: absolute; top: 8px; left: 15.4135%; width: 24px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="f83hf-0-0"><span data-text="true">Nov</span></span></div><div class="axis-x-text" style="position: absolute; top: 8px; left: 32.1429%; width: 33px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="74it9-0-0"><span data-text="true">Jan 2020</span></span></div><div class="axis-x-text" style="position: absolute; top: 8px; left: 52.2556%; width: 24px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="acjfc-0-0"><span data-text="true">Mar</span></span></div><div class="axis-x-text" style="position: absolute; top: 8px; left: 71.4286%; width: 22px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="cggeu-0-0"><span data-text="true">Jun</span></span></div><div class="axis-x-text" style="position: absolute; top: 8px; left: 89.4737%; width: 24px; line-height: 14px; padding-top: 2px; text-align: center; background-color: transparent;"><span data-offset-key="6jp0u-0-0"><span data-text="true">Aug</span></span></div></div><svg viewBox="0 0 300 180" preserveAspectRatio="none" style="top: -2px; width: calc(100% - 35px); padding: 1px; margin-top: 0%; height: 85.17%;"><path class="atom-line-color" fill="none" stroke-width="2px" shape-rendering="auto" stroke-linecap="round" stroke-opacity="0.75" d="M0,7.986348122866913L23.08,12.491467576791822L46.15,5.324232081911275L69.23,7.781569965870297L92.31,5.529010238907852L115.38,0L138.46,10.648464163822531L161.54,98.08873720136518L184.62,180L207.69,173.65187713310578L230.77,134.74402730375425L253.85,92.76450511945393L276.92,77.81569965870307" style="stroke: rgb(204, 10, 17);"></path></svg><div id="state-holder" data-x-ticks="2019.6,2019.8,2020,2020.2,2020.4,2020.6" data-y-ticks="-100,-80,-60,-40,-20,0" style="display: none;"></div></div><footer class=""><span data-offset-key="62n0u-0-0"><span data-text="true">Guardian graphic | Source: BRC-ShopperTrak</span></span></footer><span class="test js-test-res"></span></div>

	<body>
	<script>
		var elChart = document.querySelector(".js-chart")
		var elAxisX = document.querySelector(".axis-x")
		var elsText = elAxisX ? elAxisX.querySelectorAll(".axis-x-text") : []
		var indentL = elAxisX ? parseInt(elAxisX.dataset.lIndent, 10) : 0
		var extendR = elAxisX ? parseInt(elAxisX.dataset.rIndent, 10) : 0
		var isBarBased = elChart.getAttribute("data-id").toLowerCase().indexOf("bar") > -1

		// responsive
		function responsive() {
		iframeMessenger.resize()  // 1
		rescaleSvgElements()      // 2
		updateYLabelWidths()      // 3
		updateXAxisTextPosition() // 4
		updateChartHeight()       // 5
		}
		responsive()

		// handle event
		var timeout = null
		window.addEventListener('resize', function(evt) {
		if (timeout) window.clearTimeout(timeout)
		timeout = window.setTimeout(function() {
			responsive()
			timeout = null
		}, 200)
		});

		/* 1. iframe resize */
		// iframeMessenger for embed in guardian's page

		/* 2. svg path or circle rescale */
		function rescaleSvgElements() {
		var width = 300
		var elSvg = document.querySelector("svg")
		if (elSvg) {
			var svgWidth = elSvg.getBoundingClientRect().width
			// line chart
			var strokeWidth = Math.round(2*width*10/svgWidth)/10
			var paths = Array.prototype.slice.call(document.querySelectorAll("path"))
			paths.forEach(function(path) { path.setAttribute("stroke-width", strokeWidth); })
			// plot chart
			var r = Math.round(3*width*10/svgWidth)/10
			var circles = Array.prototype.slice.call(document.querySelectorAll("circle"))
			circles.forEach(function(circle) { circle.setAttribute("r", r); })
		}}

		/* 3. y label width update */
		function updateYLabelWidths() {
		if (elChart.getAttribute("data-res-y") === "false") return

		const elRows = [...elChart.querySelectorAll(".row")]
		const elGroups = [...elChart.querySelectorAll(".group")]
		const elLegend = document.querySelector(".legend")
		const labelWidth = elChart.querySelector(".label").offsetWidth
		const chartWidth = elChart.offsetWidth
		const isInline = labelWidth <= chartWidth/3

		elRows.forEach(el => {
			el.style.height = isInline ? "24px" : "auto"
		})
		elGroups.forEach(el => {
			el.style.width = isInline ? "calc(" + 100 + "% - " + labelWidth + "px)" : "100%"
			el.style.display = isInline ? "inline-block" : "block"
		})

		elAxisX.style.width = "calc(100% - " + ((isInline ? labelWidth : 0) + indentL + extendR + 1) + "px)"
		elLegend.style.marginLeft = isInline ? labelWidth + "px" : 0
		}

		/* 4. x axis text position update */
		function updateXAxisTextPosition() {
		if (!elAxisX) return

		var elsTick = elAxisX.querySelectorAll(".axis-x-tick")
		var elTest = document.querySelector(".js-test-res")

		// a. default width / left
		var axisXWidth = elAxisX.offsetWidth
		var maxWidth = elsTick[1].offsetLeft - elsTick[0].offsetLeft
		var txtWidths = [].slice.call(elsText).map((el, i) => {
			elTest.textContent = el.textContent
			var txtWidth = elTest.offsetWidth + 2
			var resWidth = Math.min(txtWidth, maxWidth)
			el.style.width = resWidth + "px"
			el.style.left = (elsTick[i].offsetLeft - resWidth / 2) * 100 / axisXWidth + "%"
			el.style.textAlign = "center"
			return txtWidth
		})
		elTest.textContent = ""

		// b. adjust width if multi lines
		var isMultiLine = txtWidths.find(w => w > maxWidth)
		if (isMultiLine) {
			[].slice.call(elsText).forEach((el, i) => {
			var txtWidth = el.querySelector("span").offsetWidth + 1
			var resWidth = Math.min(txtWidth, maxWidth)
			el.style.width = resWidth + "px"
			el.style.left = (elsTick[i].offsetLeft - resWidth / 2) * 100 / axisXWidth + "%"
			})
		}

		// c. adjust two ends if out of frame
		var iLast = elsTick.length - 1
		var indent = parseInt(elAxisX.dataset.yIndent, 10) + indentL
		var textStrLeft = (indent + elsTick[0].offsetLeft) - elsText[0].offsetWidth / 2
		var textEndRight = (axisXWidth + extendR - elsTick[iLast].offsetLeft) - elsText[iLast].offsetWidth / 2
		if (textStrLeft < 0) {
			elsText[0].style.left = ((isBarBased ? 0 : 1) - indent) + "px"
			elsText[0].style.textAlign = "left"
		}
		if (textEndRight < 0) {
			elsText[iLast].style.left = "auto"
			elsText[iLast].style.right = (-1) - extendR + "px"
			elsText[iLast].style.textAlign = "right"
		}
		}

		/* chart height update */
		function updateChartHeight() {
		var elsLabel = document.querySelectorAll(".label-x .label")
		var isAxisXBottom = elAxisX ? (elAxisX.dataset.xBottom==="true") : false
		if (isAxisXBottom || elsLabel.length > 0) {
			var elsAll = [].slice.call(elsText).concat([].slice.call(elsLabel))
			var heights = elsAll.map(el => Math.ceil(el.offsetHeight))
			var maxHeight = Math.max.apply(null, heights)
			elChart.style.marginBottom = (maxHeight + 14) + "px"
		}
		}
	</script>
	</body>
</html>
`;
