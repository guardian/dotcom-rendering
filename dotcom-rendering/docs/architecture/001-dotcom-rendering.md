# Frontend rendering layer as a service

## Context

The Frontend rendering layer has a CSS problem. We are sending too much to CSS to the client (95% of CSS delivered to the browser is unused). The
fragility of the CSS is a source of presentational bugs.

Frontend also has a developer experience problem. The feedback cycle is slow. There is poor separation of concerns which makes it difficult to find
related code and isolate changes. There is also a lack of prescriptiveness, so developers have to make more decisions, leading to inconsistent code
and sub-optimal patterns.

We attempted to rectify these issues by building a CSS componentisation system into Frontend, running inside JVM's Nashorn JavaScript engine. However
the debugging experience was poor, and community and support for Nashorn was practically non-existent.

## Decision

We will build an entirely new rendering layer that runs outside the existing frontend, via the addition of an API to frontend. Pages served from this view will
consist entirely of new components. Other legacy pages are still served from the old rendering layer.

This solution has the disadvantages of introducing duplication (feature X may need supporting in two separate views) and requiring a complete page as a
minimum deliverable. However it has the advantage of producing value even without 100% migration, as any page it serves is clean. Also this solution
"fails fast": it can be assessed and potentially rejected comparatively early on.

Node.js offers an excellent debugging experience, fast feedback and a vast community to draw on.

## Status

Approved
