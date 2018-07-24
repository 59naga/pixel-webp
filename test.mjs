import fixtures from 'fixture-images';
import pixelUtil from 'pixel-util';
import spec from 'eastern';
import assert, { equal } from 'assert';
import { parse } from './';

if (typeof ImageData === 'undefined') {
  global.ImageData = Object;
}

spec('should convert to single imageData', async () => {
  const images = await parse(fixtures.still.webp);
  const expectedData = pixelUtil.createImageData(160, 128);

  equal(images.length, 1);
  assert(images[0] instanceof ImageData);

  equal(images[0].width, 160);
  equal(images[0].height, 128);
});

spec('should convert to multiple imageData with meta information', async () => {
  const images = await parse(fixtures.animated.webp);

  equal(images.length, 34);
  assert(images[0] instanceof ImageData);

  equal(images[0].width, 73);
  equal(images[0].height, 73);

  equal(images[0].meta.offset_x, 0);
  equal(images[0].meta.offset_y, 0);
  equal(images[0].meta.duration, 1000);
  equal(images[0].meta.dispose, 0);
  equal(images[0].meta.blend, 1);
});
