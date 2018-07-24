import pixelUtil from 'pixel-util';
import { WebPDecoder, WebPRiffParser } from '@59naga/libwebp/libwebp.mjs';

export const parse = async file => {
  const binary = await pixelUtil.createBuffer(file);
  const { frames } = WebPRiffParser(binary, 0);

  const decoder = new WebPDecoder();
  return frames.map(meta => {
    const tmp = { w: [], h: [] };
    const data = decoder.WebPDecodeRGBA(
      binary,
      meta.src_off,
      meta.src_size,
      tmp.w,
      tmp.h
    );

    const image = pixelUtil.createImageData(tmp.w[0], tmp.h[0]);
    pixelUtil.set(image, { data });
    image.meta = meta;
    return image;
  });
};
