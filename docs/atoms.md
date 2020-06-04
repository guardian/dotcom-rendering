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

## Atom Documentation

### AudioAtom

`AudioAtomBlockElement`

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

AMP: See `AudioAtomBlockComponent` ✅

WEB: Currently not supported. Awaiting new Atom library. 🚧

### ChartAtom

Comes to DCR as `AtomEmbedUrlBlockElement` 

AMP: See `AtomEmbedUrlBlockComponent` ✅

WEB: Currently not supported. Should be rendered using an iframe as it is treated as interactive. 🚧

### CommonsDivision

I question whether we should be supporting it in the first place given how very rare it is.

### ExplainerAtom
```
case class ExplainerAtomBlockElement(
    id: String, 
    title: String, 
    body: String, 
    displayType: String
) extends PageElement
```

AMP: Currently not supported.

WEB: Currently not supported. Awaiting new Atom library. 🚧

### InteractiveAtom

```
case class AtomEmbedUrlBlockElement(
	url: String
) extends PageElement
```

AMP: AtomEmbedUrlBlockComponent ✅

WEB: Currently not supported. Should be rendered using an iframe. 🚧

### GuideAtom

```
case class ProfileBlockElement(
	id: String, 
	label: String, 
	title: String, 
	img: Option[String], 
	html: String, 
	credit: String
) extends PageElement
```

AMP: Expandable (Component) ✅

WEB: Currently not supported. Awaiting new Atom library. 🚧

### MediaAtom

The MediaAtom is sent to DCR either as `YoutubeBlockElement` or `HTMLFallbackBlockElement`.

```
case class YoutubeBlockElement(
	id: String, 
	assetId: String, 
	channelId: Option[String], 
	mediaTitle: String
) extends PageElement
```

AMP: YoutubeBlockComponent ✅

WEB: YoutubeBlockComponent ✅

### ProfileAtom

```
case class ProfileBlockElement(
	id: String, 
	label: String, 
	title: String, 
	img: Option[String], 
	html: String, 
	credit: String
) extends PageElement
```

AMP: Expandable (Component) ✅

WEB: Currently not supported. Awaiting new Atom library. 🚧

### QuandaAtom

```
case class QABlockElement(
	id: String, 
	title: String, 
	img: Option[String], 
	html: String, 
	credit: String
) extends PageElement
```

AMP: Expandable (Component) ✅

WEB: Currently not supported. Awaiting new Atom library. 🚧

### QuizAtom

Undocumented for the moment 🚧 ‼️

### RecipeAtom

I am not sure it's ever been used. ‼️

### ReviewAtom

Not found in AtomWorkshop ‼️ (According to Alex W. there actually isn't one.)
