// @flow

// provide a consistent wrapper around the libs guui depends on.

import { Component, render as hydrateApp } from 'preact';
import preactRenderToString from 'preact-render-to-string';
import { hydrate as hydrateCSS } from 'emotion';
import styled from 'preact-emotion';
import { extractCritical } from 'emotion-server';

type renderToStringResult = { html: string, css: string, ids: [] };

const renderToString = (ComponentToRender: React.Node): renderToStringResult =>
    extractCritical(preactRenderToString(ComponentToRender));

export { hydrateApp, renderToString, hydrateCSS, styled, Component };
