"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _react = _interopRequireDefault(require("react"));

var _icons = require("./icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header(_ref) {
  var image = _ref.image,
      alt = _ref.alt,
      zoomed = _ref.zoomed,
      toggleZoom = _ref.toggleZoom,
      toggleRotate = _ref.toggleRotate,
      onClose = _ref.onClose,
      enableDownload = _ref.enableDownload,
      enableZoom = _ref.enableZoom,
      enableRotate = _ref.enableRotate;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "__react_modal_image__header"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "__react_modal_image__icon_menu"
  }, enableDownload && /*#__PURE__*/_react["default"].createElement("a", {
    href: image,
    download: true
  }, /*#__PURE__*/_react["default"].createElement(_icons.DownloadIcon, null)), enableZoom && /*#__PURE__*/_react["default"].createElement("a", {
    onClick: toggleZoom
  }, zoomed ? /*#__PURE__*/_react["default"].createElement(_icons.ZoomOutIcon, null) : /*#__PURE__*/_react["default"].createElement(_icons.ZoomInIcon, null)), enableRotate && /*#__PURE__*/_react["default"].createElement("a", {
    onClick: toggleRotate
  }, /*#__PURE__*/_react["default"].createElement(_icons.RotateIcon, null)), /*#__PURE__*/_react["default"].createElement("a", {
    onClick: onClose
  }, /*#__PURE__*/_react["default"].createElement(_icons.CloseIcon, null))), alt && /*#__PURE__*/_react["default"].createElement("span", {
    className: "__react_modal_image__caption"
  }, alt));
};

exports.Header = Header;