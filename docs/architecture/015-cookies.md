# Client Side Cookies

## Context

To read user's cookies, or not to read user cookies: that is the question. _Shakespeare_.

Client side user cookies are an important part of web development architecture, but they contribute, from the server point of view, to unpredictability in the rendering as seen and experienced by the user. In most cases the cookies are sent to the server as part of standard HTTP requests and the server can take care of generating the right output for the user, instead of postponing coookie driven user customization to the client side.

An example of this is the `GU_EDITION` cookie which is sent to the server and is not driving the Page Data JSON object sent to the rendering layer. Components which need to know the value of this cookie can read from the Page Data.

## Decision

Avoid reading user's cookies as much as possible, if any.


## Status

Approved
