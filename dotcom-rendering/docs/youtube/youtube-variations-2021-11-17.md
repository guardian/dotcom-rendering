# YouTube Players on theguardian.com

As of 17th November 2021

**Platform**|**Type***|**Content / Element Type**|**Module**|**SSR**|**CSR**|**Domain from CAPI?**|**Domain****|**Example**
:-----|:-----|:-----|:-----|:-----|:-----|:-----|:-----|:-----
DCR|First party| |[YoutubeAtom](https://github.com/guardian/atoms-rendering/blob/main/src/YoutubeAtom.tsx)|Partial|Y| |youtube.com|[link](https://www.theguardian.com/world/2021/jun/24/hong-kong-apple-daily-queue-final-edition-newspaper)
| |Third party| |[YoutubeEmbedBlockComponent](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/components/elements/YoutubeEmbedBlockComponent.tsx)|Y| |Y|youtube-nocookie.com|[link](https://www.theguardian.com/music/musicblog/2015/may/27/stone-roses-spike-island-the-reality)
 | | |Witness|[WitnessVideoBlockComponent](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/components/elements/WitnessBlockComponent.tsx#L235)|Y| |Y|youtube.com|[link - no 15 ](https://www.theguardian.com/lifeandstyle/2015/aug/28/20-awesome-board-games-you-may-never-have-heard-of)
 | | |Interactives| | |Y|?|youtube.com|[link](https://www.theguardian.com/world/ng-interactive/2017/mar/10/the-internet-warriors-meet-the-trolls-in-their-own-homes-video)
 | | | MediaAtomBlockElement?| | | |?|
 | | | MainMediaEmbedBlockComponent?| | | |?|
DCR - AMP|First party| |[YoutubeBlockComponent](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/amp/components/elements/YoutubeBlockComponent.tsx)| |Y| |youtube-nocookie.com|[link](https://amp.theguardian.com/world/2021/jun/24/hong-kong-apple-daily-queue-final-edition-newspaper)
| |Third party| |[VideoYoutubeBlockComponent](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/amp/components/elements/VideoYoutubeBlockComponent.tsx)| |Y| |youtube-nocookie.com|[link](https://amp.theguardian.com/music/musicblog/2015/may/27/stone-roses-spike-island-the-reality)
Frontend|First party| |[youtube.scala.html](https://github.com/guardian/frontend/blob/main/common/app/views/fragments/atoms/youtube.scala.html), [youtube-player.ts](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/atoms/youtube-player.ts)|Partial|Y| |youtube.com / youtube-nocookie.com ***|[link](https://www.theguardian.com/world/2021/jun/24/hong-kong-apple-daily-queue-final-edition-newspaper?dcr=false)
 | |Third party| | [VideoEmbedCleaner.scala](https://github.com/guardian/frontend/blob/main/common/app/views/support/cleaner/VideoEmbedCleaner.scala)|Y| |Y|youtube-nocookie.com|[link](https://www.theguardian.com/music/musicblog/2015/may/27/stone-roses-spike-island-the-reality?dcr=false)
 | |Third party?| Commercial Hosted - Atoms | [youtube-player.ts](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/atoms/youtube-player.ts)|Partial|Y| |youtube.com|[link](https://www.theguardian.com/advertiser-content/microsoft-ai-for-earth/microsoft-ai-research)
 | |Third Party | Commercial Hosted - Embeds | [youtube-player.ts](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/atoms/youtube-player.ts)| | | |youtube-nocookie.com|[link](https://www.theguardian.com/advertiser-content/radioactive-amazon-original-movie/radioactive)
Editions (via Frontend) |First party| |[youtube-player.ts](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/atoms/youtube-player.ts)|Partial|Y| |youtube-nocookie.com|[link](https://embed.theguardian.com/embed/atom/media/d59557c3-d588-46bc-b8a6-cd7b626cd1a6#noadsaf)

\* Previously the term 'embed' was used to refer to third party content and 'atom' for first party content. This has been updated to first and third party respectively to avoid confusion with other embeds.

** Third party YouTube videos that originate from Composer embeds _should_ use the domain `youtube-nocookie`. However for freeform content (e.g. interactives, witness) there is the possibility that this is not adhered to.

*** `youtube-player.ts` will default to the domain `youtube-nocookie.com` if consent is not given or an adfree setting is detected.

