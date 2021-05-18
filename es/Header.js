import React from 'react';
import { CloseIcon, DownloadIcon, RotateIcon, ZoomInIcon, ZoomOutIcon } from './icons';
export var Header = function Header(_ref) {
  var image = _ref.image,
      alt = _ref.alt,
      zoomed = _ref.zoomed,
      toggleZoom = _ref.toggleZoom,
      toggleRotate = _ref.toggleRotate,
      onClose = _ref.onClose,
      enableDownload = _ref.enableDownload,
      enableZoom = _ref.enableZoom,
      enableRotate = _ref.enableRotate;
  return /*#__PURE__*/React.createElement("div", {
    className: "__react_modal_image__header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "__react_modal_image__icon_menu"
  }, enableDownload && /*#__PURE__*/React.createElement("a", {
    href: image,
    download: true
  }, /*#__PURE__*/React.createElement(DownloadIcon, null)), enableZoom && /*#__PURE__*/React.createElement("a", {
    onClick: toggleZoom
  }, zoomed ? /*#__PURE__*/React.createElement(ZoomOutIcon, null) : /*#__PURE__*/React.createElement(ZoomInIcon, null)), enableRotate && /*#__PURE__*/React.createElement("a", {
    onClick: toggleRotate
  }, /*#__PURE__*/React.createElement(RotateIcon, null)), /*#__PURE__*/React.createElement("a", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseIcon, null))), alt && /*#__PURE__*/React.createElement("span", {
    className: "__react_modal_image__caption"
  }, alt));
};