## Content Atoms

Content Atoms (atoms) are a mechanism to specify content in a more structured way than just text and in a way that make then reuseable across articles. Here are are documenting the progress made as part of supporting them in DCR.

This is a work in progress.

### List of atoms

List of atoms (source: [frontend] common/app/model/content/Atom.scala)

-   AudioAtom
-   ChartAtom
-   CommonsDivisionAtom
-   ExplainerAtom
-   InteractiveAtom
-   GuideAtom
-   MediaAtom
-   ProfileAtom
-   QandaAtom
-   Quiz
-   RecipeAtom
-   ReviewAtom
-   TimelineAtom

### Atoms to Page Elements (server side)

The following is a mapping from atoms to the PageElement that is being used to transport them to DCR (server side). Note how the MediaAtom is mapped to two elements.

```
AudioAtom
    -> SoundcloudBlockElement
    -> SpotifyBlockElement
    -> AudioAtomBlockElement

ChartAtom
    -> ChartAtomBlockElement

CommonsDivisionAtom

ExplainerAtom
	-> ExplainerAtomBlockElement

InteractiveAtom
    -> AtomEmbedUrlBlockElement

GuideAtom
    -> GuideAtomBlockElement

MediaAtom
    -> YoutubeBlockElement
    -> HTMLFallbackBlockElement

ProfileAtom
    -> ProfileAtomBlockElement

QandaAtom
    -> QABlockElement

Quiz

RecipeAtom

ReviewAtom

TimelineAtom
    -> TimelineBlockElement
```

### PageElements to AMP and WEB components

The following maps PageElements to the corresponding amp and web Components. This essentially shows how well atoms are supported by DCR.

```
AudioAtomBlockElement
    -> [amp] AudioAtomBlockComponent

InteractiveAtomBlockElement
    -> [amp] InteractiveAtomBlockComponent
    -> [web] InteractiveAtom (atoms-rendering)

ChartAtomBlockElement
    -> [web] ChartAtom (atoms-rendering)

ExplainerAtomBlockElement
	-> [web] ExplainerAtom (atoms-rendering)

GenericAtomBlockElement
    -> [amp] InteractiveAtomBlockComponent
    -> [web] InteractiveAtom (atoms-rendering)

GuideAtomBlockElement
    -> [amp] Expandable

ProfileAtomBlockElement
    -> [amp] Expandable

YoutubeBlockElement
    -> [amp] YoutubeBlockComponent
    -> [web] YoutubeBlockComponent

QABlockElement
    -> [amp] Expandable

SoundcloudBlockElement
    -> [amp] SoundcloudBlockComponent
    -> [web] SoundcloudBlockComponent

SpotifyBlockElement
    -> [web] SpotifyBlockComponent

TimelineBlockElement
    -> [amp] TimelineBlockComponent
```

### atoms-renderings

The [atoms-rendering](https://github.com/guardian/atoms-rendering) project is now used to include atom components in DCR.

### Implementing an atom

In DCR there are 5 files that need to be edited to fully add your atom:

### content.d.ts

This file maps data provided by frontend to data types defined in DCR, so make sure that you define an interface for your atom which contains all of the fields required, and whether. It is a good idea to add an optional [index field](https://github.com/guardian/dotcom-rendering/blob/main/src/lib/content.d.ts#L21) (which will not be populated by frontend, but will be populated and used internally in DCR).

### index.d.ts

The index file defines the CAPIType used in DCR as well as various other types and interfaces that can be used within the application. In this file add an array of your atoms to the [CAPIBrowserType type](https://github.com/guardian/dotcom-rendering/blob/main/index.d.ts#L359). You will also need to add your atom type to the [Island-Type list](https://github.com/guardian/dotcom-rendering/blob/main/index.d.ts#L666), which will be required for the root of the atom element.

### window-guardian.ts

This file generates the DCR Guardian browser config, and will populate the array of atom elements that were defined in index.d.ts. The generic [blockElementWithIndex function](https://github.com/guardian/dotcom-rendering/blob/main/src/model/window-guardian.ts#L72) will produce the array of elements given the full list of [CAPI.blocks, the model type and the name of the atom index field](https://github.com/guardian/dotcom-rendering/blob/main/src/model/window-guardian.ts#L190).

### ArticleRenderer.tsx

This file creates the initial component using the model import from atoms-rendering. At this stage, callback functions do not need to be defined as this will happen elsewhere, but the rest of the atoms data can be populated. Don’t forget to [import your atom from atoms-rendering](https://github.com/guardian/dotcom-rendering/blob/main/src/web/lib/ArticleRenderer.tsx#L29).

### App.tsx

In the App file we hydrate the components, which renders them on the server and provides additional interactive elements to the component. [This is where any functionality required in the atom, such as callback handlers, need to be implemented](https://github.com/guardian/dotcom-rendering/blob/main/src/web/components/App.tsx#L430). The root of the atom in the Hydrate element is the same as the type you added in IslandTypes. [Again, don't forget to import your atom](https://github.com/guardian/dotcom-rendering/blob/main/src/web/components/App.tsx#L20).
