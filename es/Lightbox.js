function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useRef, useState } from 'react';
import { Header } from './Header';
import { Image } from './Image';
import { lightboxStyles, StyleInjector } from './styles';
export var Lightbox = function Lightbox(_ref) {
  var medium = _ref.medium,
      large = _ref.large,
      alt = _ref.alt,
      onClose = _ref.onClose,
      hideDownload = _ref.hideDownload,
      hideZoom = _ref.hideZoom,
      showRotate = _ref.showRotate,
      _ref$imageBackgroundC = _ref.imageBackgroundColor,
      imageBackgroundColor = _ref$imageBackgroundC === void 0 ? 'black' : _ref$imageBackgroundC;
  var contentEl = useRef();

  var _useState = useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      move = _useState2[0],
      setMove = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      moveStart = _useState4[0],
      setMoveStart = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      zoomed = _useState6[0],
      setZoomed = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      rotationDeg = _useState8[0],
      setRotationDeg = _useState8[1];

  var handleKeyDown = function handleKeyDown(event) {
    // ESC or ENTER closes the modal
    if (event.keyCode === 27 || event.keyCode === 13) {
      onClose();
    }
  };

  useEffect(function () {
    document.addEventListener('keydown', handleKeyDown, false);
    return function () {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  });

  var getCoordinatesIfOverImg = function getCoordinatesIfOverImg(event) {
    var point = event.changedTouches ? event.changedTouches[0] : event;

    if (point.target.id !== 'react-modal-image-img') {
      // The img was not a target of the coordinates
      return;
    }

    var dim = contentEl.current && contentEl.current.getBoundingClientRect();
    var x = point.clientX - dim.left;
    var y = point.clientY - dim.top;
    return {
      x: x,
      y: y
    };
  };

  var handleMouseDownOrTouchStart = function handleMouseDownOrTouchStart(event) {
    event.preventDefault();

    if (event.touches && event.touches.length > 1) {
      // More than one finger, ignored
      return;
    }

    var coords = getCoordinatesIfOverImg(event);

    if (!coords) {
      // Click outside the img => close modal
      onClose();
    }

    if (!zoomed) {
      // Do not allow drag'n'drop if zoom has not been applied
      return;
    }

    setMoveStart({
      x: coords.x - move.x,
      y: coords.y - move.y
    });
  };

  var handleMouseMoveOrTouchMove = function handleMouseMoveOrTouchMove(event) {
    event.preventDefault();

    if (!zoomed || !moveStart) {
      // Do not allow drag'n'drop if zoom has not been applied
      // or if there has not been a click
      return;
    }

    if (event.touches && event.touches.length > 1) {
      // More than one finger, ignored
      return;
    }

    var coords = getCoordinatesIfOverImg(event);

    if (!coords) {
      return;
    }

    setMove({
      x: coords.x - moveStart.x,
      y: coords.y - moveStart.y
    });
  };

  var handleMouseUpOrTouchEnd = function handleMouseUpOrTouchEnd() {
    setMoveStart(undefined);
  };

  var toggleZoom = function toggleZoom(event) {
    event.preventDefault();
    setZoomed(!zoomed); // Reset position if zoomed out

    setMove(zoomed ? {
      x: 0,
      y: 0
    } : move);
  };

  var toggleRotate = function toggleRotate(event) {
    event.preventDefault();

    if (rotationDeg === 360) {
      setRotationDeg(90);
      return;
    }

    setRotationDeg(rotationDeg + 90);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StyleInjector, {
    name: "__react_modal_image__lightbox",
    css: lightboxStyles({
      imageBackgroundColor: imageBackgroundColor
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "__react_modal_image__modal_container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "__react_modal_image__modal_content",
    onMouseDown: handleMouseDownOrTouchStart,
    onMouseUp: handleMouseUpOrTouchEnd,
    onMouseMove: handleMouseMoveOrTouchMove,
    onTouchStart: handleMouseDownOrTouchStart,
    onTouchEnd: handleMouseUpOrTouchEnd,
    onTouchMove: handleMouseMoveOrTouchMove,
    ref: contentEl
  }, zoomed && /*#__PURE__*/React.createElement(Image, {
    id: "react-modal-image-img",
    className: "__react_modal_image__large_img",
    src: large || medium,
    style: {
      transform: "translate3d(-50%, -50%, 0) translate3d(".concat(move.x, "px, ").concat(move.y, "px, 0) rotate(").concat(rotationDeg, "deg)"),
      WebkitTransform: "translate3d(-50%, -50%, 0) translate3d(".concat(move.x, "px, ").concat(move.y, "px, 0) rotate(").concat(rotationDeg, "deg)"),
      MsTransform: "translate3d(-50%, -50%, 0) translate3d(".concat(move.x, "px, ").concat(move.y, "px, 0) rotate(").concat(rotationDeg, "deg)")
    },
    handleDoubleClick: toggleZoom
  }), !zoomed && /*#__PURE__*/React.createElement(Image, {
    id: "react-modal-image-img",
    className: "__react_modal_image__medium_img",
    src: medium || large,
    handleDoubleClick: toggleZoom,
    contextMenu: !medium,
    alt: alt,
    style: {
      transform: "translate3d(-50%, -50%, 0) rotate(".concat(rotationDeg, "deg)"),
      WebkitTransform: "translate3d(-50%, -50%, 0) rotate(".concat(rotationDeg, "deg)"),
      MsTransform: "translate3d(-50%, -50%, 0) rotate(".concat(rotationDeg, "deg)")
    }
  })), /*#__PURE__*/React.createElement(Header, {
    image: large || medium,
    alt: alt,
    zoomed: zoomed,
    toggleZoom: toggleZoom,
    toggleRotate: toggleRotate,
    onClose: onClose,
    enableDownload: !hideDownload,
    enableZoom: !hideZoom,
    enableRotate: !!showRotate
  })));
};