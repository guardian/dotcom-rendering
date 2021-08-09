# Contracts of Dotcom Rendering

## Context

Dotcom is not a self-isolated platform. We have a number of use cases which require integration with other systems (e.g. composer viewer), or running code we don't directly control (e.g. interactives, and to a lesser extent advertising). Even code we do control directly may live outside this codebase, and a loose contract could be the preferred way to integrate with DCR.

This directory is designed to document these contracts that we need to maintain, but are easily missed or forgotten about. That is, it is not meant to document strong contracts that are already well defined in the code (e.g. shared types with a direct library dependency). It is intended to document loose contracts such as a stable identifier on an element that is used by another system, or a message format when communicating with an iframe.

## Format

### What is the contract?

### Where is it relied upon?

### Why is it required?
