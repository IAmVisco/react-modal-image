import React, { useState } from 'react';

import { SpinnerIcon } from './icons';

export const Image = ({ id, alt, className, src, style, handleDoubleClick, contextMenu }) => {
  const [loading, setLoading] = useState(false);

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleOnContextMenu = event => {
    !contextMenu && event.preventDefault();
  };

  return (
    <div>
      {loading && <SpinnerIcon />}
      <img
        id={id}
        alt={alt}
        className={className}
        src={src}
        style={style}
        onLoad={handleOnLoad}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleOnContextMenu}
      />
    </div>
  );
};
