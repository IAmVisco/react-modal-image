import * as React from 'react';

export interface ModalImageBaseProps {
  className?: string;
  alt: string;
  small: string;
  smallSrcSet?: string;
  hideDownload?: boolean;
  hideZoom?: boolean;
  showRotate?: boolean;
  imageBackgroundColor?: string;
}

export interface ModalImageLargeProps extends ModalImageBaseProps {
  large: string;
}

export interface ModalImageMediumProps extends ModalImageBaseProps {
  medium: string;
}

export type ModalImageProps = ModalImageLargeProps | ModalImageMediumProps;

export const ModalImage: React.ComponentType<ModalImageProps>;
export const Lightbox: React.ComponentType<ModalImageProps & { onClose: () => any }>;
