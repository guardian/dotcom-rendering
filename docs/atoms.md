## Content Atoms

Content Atoms (atoms) are a mechanism to specify content in a more structured way than just text and in a way that make then reuseable across articles. Here are are documenting the progress made as part of supporting them in DCR.

This is a work in progress.

### List of atoms

List of atoms (source: [frontend] common/app/model/content/Atom.scala)

- AudioAtom
- ChartAtom
- CommonsDivisionAtom
- ExplainerAtom
- InteractiveAtom
- GuideAtom
- MediaAtom
- ProfileAtom
- QandaAtom
- Quiz
- RecipeAtom
- ReviewAtom
- TimelineAtom

### Atoms to Page Elements (server side)

The following is a mapping from atoms to the PageElement that is being used to transport them to DCR (server side). Note how the MediaAtom is mapped to two elements.

```
AudioAtom
    -> AudioAtomBlockElement

ChartAtom
    -> AtomEmbedUrlBlockElement

CommonsDivisionAtom

ExplainerAtom

InteractiveAtom
    -> AtomEmbedUrlBlockElement

GuideAtom
    -> ProfileBlockElement

MediaAtom
    -> YoutubeBlockElement
    -> HTMLFallbackBlockElement

ProfileAtom
    -> ProfileBlockElement

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

AtomEmbedUrlBlockElement
    -> [amp] AtomEmbedUrlBlockComponent

ProfileBlockElement
    -> [amp] Expandable

YoutubeBlockElement
    -> [amp] YoutubeBlockComponent
    -> [web] YoutubeBlockComponent

QABlockElement
    -> [amp] Expandable

TimelineBlockElement
    -> [amp] TimelineBlockComponent
```


### Todo

This section contains all the work that need to be done as part of this atom migration.

- Build a DCR component that utilises the AudioAtom data passed to DCR by the backend carried by `AudioAtomBlockElement`

	```
	case class AudioAtomBlockElement(
	    id: String, 
	    kicker: String, 
	    coverUrl: String, 
	    trackUrl: String, 
	    duration: Int, 
	    contentId: String
	) extends PageElement
	```
	
	And example of a page with an AudioAtom is [here](https://www.theguardian.com/football/blog/2020/may/06/bundesliga-football-puts-its-reputation-on-the-line-with-return-in-late-may), and the data is already is the [data sent to DCR](https://www.theguardian.com/football/blog/2020/may/06/bundesliga-football-puts-its-reputation-on-the-line-with-return-in-late-may.json?dcr).
