function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import { Lightbox } from './Lightbox';
export { Lightbox } from './Lightbox';
export var ModalImage = function ModalImage(_ref) {
  var className = _ref.className,
      small = _ref.small,
      smallSrcSet = _ref.smallSrcSet,
      medium = _ref.medium,
      large = _ref.large,
      alt = _ref.alt,
      hideDownload = _ref.hideDownload,
      hideZoom = _ref.hideZoom,
      showRotate = _ref.showRotate,
      imageBackgroundColor = _ref.imageBackgroundColor;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      modalOpen = _useState2[0],
      changeModalOpen = _useState2[1];

  var toggleModal = function toggleModal() {
    changeModalOpen(!modalOpen);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    className: className,
    style: {
      cursor: 'pointer',
      maxWidth: '100%',
      maxHeight: '100%'
    },
    onClick: toggleModal,
    src: small,
    srcSet: smallSrcSet,
    alt: alt
  }), modalOpen && /*#__PURE__*/React.createElement(Lightbox, {
    medium: medium,
    large: large,
    alt: alt,
    onClose: toggleModal,
    hideDownload: hideDownload,
    hideZoom: hideZoom,
    showRotate: showRotate,
    imageBackgroundColor: imageBackgroundColor
  }));
};