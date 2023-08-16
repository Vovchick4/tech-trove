'use client';

import * as React from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import slides from '../context/slides';

export default function Gallery() {
  const [index, setIndex] = React.useState(-1);

  return (
    <>
      <PhotoAlbum
        layout="rows"
        photos={slides}
        targetRowHeight={350}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        plugins={[Slideshow, Zoom, Thumbnails]}
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
}
