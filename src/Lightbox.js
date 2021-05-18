import React, { useEffect, useRef, useState } from 'react';

import { Header } from './Header';
import { Image } from './Image';

import { lightboxStyles, StyleInjector } from './styles';

export const Lightbox = ({
  medium,
  large,
  alt,
  onClose,
  hideDownload,
  hideZoom,
  showRotate,
  imageBackgroundColor = 'black',
}) => {
  const contentEl = useRef();
  const [move, setMove] = useState({ x: 0, y: 0 });
  const [moveStart, setMoveStart] = useState();
  const [zoomed, setZoomed] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);

  const handleKeyDown = event => {
    // ESC or ENTER closes the modal
    if (event.keyCode === 27 || event.keyCode === 13) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  });

  const getCoordinatesIfOverImg = event => {
    const point = event.changedTouches ? event.changedTouches[0] : event;

    if (point.target.id !== 'react-modal-image-img') {
      // The img was not a target of the coordinates
      return;
    }

    const dim = contentEl.current && contentEl.current.getBoundingClientRect();
    const x = point.clientX - dim.left;
    const y = point.clientY - dim.top;

    return { x, y };
  };

  const handleMouseDownOrTouchStart = event => {
    event.preventDefault();

    if (event.touches && event.touches.length > 1) {
      // More than one finger, ignored
      return;
    }

    const coords = getCoordinatesIfOverImg(event);

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
      y: coords.y - move.y,
    });

  };

  const handleMouseMoveOrTouchMove = event => {
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

    const coords = getCoordinatesIfOverImg(event);

    if (!coords) {
      return;
    }

    setMove({
      x: coords.x - moveStart.x,
      y: coords.y - moveStart.y,
    });

  };

  const handleMouseUpOrTouchEnd = () => {
    setMoveStart(undefined);
  };

  const toggleZoom = event => {
    event.preventDefault();
    setZoomed(!zoomed);
    // Reset position if zoomed out
    setMove(zoomed ? { x: 0, y: 0 } : move);
  };

  const toggleRotate = event => {
    event.preventDefault();

    if (rotationDeg === 360) {
      setRotationDeg(90);
      return;
    }

    setRotationDeg(rotationDeg + 90);
  };

  return (
    <div>
      <StyleInjector
        name="__react_modal_image__lightbox"
        css={lightboxStyles({ imageBackgroundColor })}
      />

      <div className="__react_modal_image__modal_container">
        <div
          className="__react_modal_image__modal_content"
          onMouseDown={handleMouseDownOrTouchStart}
          onMouseUp={handleMouseUpOrTouchEnd}
          onMouseMove={handleMouseMoveOrTouchMove}
          onTouchStart={handleMouseDownOrTouchStart}
          onTouchEnd={handleMouseUpOrTouchEnd}
          onTouchMove={handleMouseMoveOrTouchMove}
          ref={contentEl}
        >
          {zoomed && (
            <Image
              id="react-modal-image-img"
              className="__react_modal_image__large_img"
              src={large || medium}
              style={{
                transform: `translate3d(-50%, -50%, 0) translate3d(${
                  move.x
                }px, ${move.y}px, 0) rotate(${rotationDeg}deg)`,
                WebkitTransform: `translate3d(-50%, -50%, 0) translate3d(${
                  move.x
                }px, ${move.y}px, 0) rotate(${rotationDeg}deg)`,
                MsTransform: `translate3d(-50%, -50%, 0) translate3d(${
                  move.x
                }px, ${move.y}px, 0) rotate(${rotationDeg}deg)`,
              }}
              handleDoubleClick={toggleZoom}
            />
          )}
          {!zoomed && (
            <Image
              id="react-modal-image-img"
              className="__react_modal_image__medium_img"
              src={medium || large}
              handleDoubleClick={toggleZoom}
              contextMenu={!medium}
              alt={alt}
              style={{
                transform: `translate3d(-50%, -50%, 0) rotate(${rotationDeg}deg)`,
                WebkitTransform: `translate3d(-50%, -50%, 0) rotate(${rotationDeg}deg)`,
                MsTransform: `translate3d(-50%, -50%, 0) rotate(${rotationDeg}deg)`,
              }}
            />
          )}
        </div>

        <Header
          image={large || medium}
          alt={alt}
          zoomed={zoomed}
          toggleZoom={toggleZoom}
          toggleRotate={toggleRotate}
          onClose={onClose}
          enableDownload={!hideDownload}
          enableZoom={!hideZoom}
          enableRotate={!!showRotate}
        />
      </div>
    </div>
  );
};
