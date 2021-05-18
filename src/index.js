import React, { useState } from 'react';

import { Lightbox } from './Lightbox';

export { Lightbox } from './Lightbox';

export const ModalImage = ({
  className,
  small,
  smallSrcSet,
  medium,
  large,
  alt,
  hideDownload,
  hideZoom,
  showRotate,
  imageBackgroundColor,
}) => {
  const [modalOpen, changeModalOpen] = useState(false);

  const toggleModal = () => {
    changeModalOpen(!modalOpen);
  };

  return (
    <div>
      <img
        className={className}
        style={{
          cursor: 'pointer',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        onClick={toggleModal}
        src={small}
        srcSet={smallSrcSet}
        alt={alt}
      />
      {modalOpen && (
        <Lightbox
          medium={medium}
          large={large}
          alt={alt}
          onClose={toggleModal}
          hideDownload={hideDownload}
          hideZoom={hideZoom}
          showRotate={showRotate}
          imageBackgroundColor={imageBackgroundColor}
        />
      )}
    </div>
  );
};
