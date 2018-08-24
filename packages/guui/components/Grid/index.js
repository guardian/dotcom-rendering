"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
// @flow
var react_1 = require("react");
var react_emotion_1 = require("react-emotion");
var breakpoints_1 = require("@guardian/pasteup/breakpoints");
var mixins_1 = require("@guardian/pasteup/mixins");
var gutter = 20;
var columns = {
    tablet: {
        max: 12,
        width: 40
    },
    desktop: {
        max: 12,
        width: 60
    },
    leftCol: {
        max: 14,
        width: 60
    },
    wide: {
        max: 16,
        width: 60
    }
};
var breakpointMqs = {
    tablet: breakpoints_1.tablet,
    desktop: breakpoints_1.desktop,
    leftCol: breakpoints_1.leftCol,
    wide: breakpoints_1.wide
};
var calculateWidth = function (breakpoint, colspan) {
    var colspanOrMax = colspan;
    if (!colspanOrMax) {
        colspanOrMax = columns[breakpoint].max;
    }
    return (colspanOrMax * columns[breakpoint].width + (colspanOrMax - 1) * gutter);
};
var gridStyles = function (breakpoint, _a) {
    var colspan = _a[0], options = _a[1];
    return "\n    " + breakpointMqs[breakpoint] + " {\n        float: left;\n        width: " + (calculateWidth(breakpoint, colspan) + gutter) + "px;\n        padding-left: " + gutter + ";\n        margin-left: " + (options && options.inset
        ? calculateWidth(breakpoint, options.inset) + gutter + "px"
        : 0) + "\n    }\n";
};
var row = react_emotion_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", ";\n    margin-left: ", "px;\n"], ["\n    ", ";\n    margin-left: ", "px;\n"])), react_emotion_1.css(mixins_1.clearFix), -gutter);
// : ({
//     [T in keyof Breakpoint]: BreakpointProps,
// }) => any
var cols = function (_a) {
    var tablet = _a.tablet, desktop = _a.desktop, leftCol = _a.leftCol, wide = _a.wide;
    return react_emotion_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    ", ";\n    ", ";\n    ", ";\n    ", ";\n"], ["\n    ", ";\n    ", ";\n    ", ";\n    ", ";\n"])), gridStyles('tablet', tablet), gridStyles('desktop', desktop), gridStyles('leftCol', leftCol), gridStyles('wide', wide));
};
var normaliseProps = function (props) {
    if (Array.isArray(props)) {
        if (props.length === 1) {
            return [props[0], {}];
        }
        return props;
    }
    else if (typeof props === 'number') {
        return [props, {}];
    }
    return props;
};
exports.Row = function (_a) {
    var htmlTag = _a.htmlTag, children = _a.children;
    return (<>
        {react_1["default"].createElement(htmlTag, {
        className: row
    }, children)}
    </>);
};
exports.Cols = function (_a) {
    var _b = _a.htmlTag, htmlTag = _b === void 0 ? 'div' : _b, _c = _a.tablet, tablet = _c === void 0 ? columns.tablet.max : _c, _d = _a.desktop, desktop = _d === void 0 ? columns.desktop.max : _d, _e = _a.leftCol, leftCol = _e === void 0 ? columns.leftCol.max : _e, _f = _a.wide, wide = _f === void 0 ? columns.wide.max : _f, children = _a.children;
    return (<>
        {react_1["default"].createElement(htmlTag, {
        className: cols({
            tablet: normaliseProps(tablet),
            desktop: normaliseProps(desktop),
            leftCol: normaliseProps(leftCol),
            wide: normaliseProps(wide)
        })
    }, children)}
    </>);
};
var templateObject_1, templateObject_2;
// Cols.defaultProps = {
//     htmlTag: 'div',
//     tablet: [columns.tablet.max, {}],
//     desktop: [columns.desktop.max, {}],
//     leftCol: [columns.leftCol.max, {}],
//     wide: [columns.wide.max, {}],
// };
