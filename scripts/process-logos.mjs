import sharp from "sharp";

const BRAND = "public/brand";

// 1) Navbar lockup: trim the white margin, keep on its (light) background.
await sharp(`${BRAND}/dogo-horizontal-src.jpeg`)
  .trim({ threshold: 18 })
  .png()
  .toFile(`${BRAND}/dogo-horizontal.png`);

// 2) Footer wordmark: white text on black -> key black to transparent.
{
  const { data, info } = await sharp(`${BRAND}/dogo-wordmark-src.jpeg`)
    .trim({ threshold: 18 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
    out[i + 3] = Math.round(Math.min(255, lum * 1.15)); // black bg -> transparent
  }

  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(`${BRAND}/dogo-wordmark-white.png`);
}

// 3) Mascot square (trim white) for favicon / standalone use.
await sharp(`${BRAND}/dogo-mascot-src.jpeg`)
  .trim({ threshold: 18 })
  .png()
  .toFile(`${BRAND}/dogo-mascot.png`);

const meta = async (f) => {
  const m = await sharp(`${BRAND}/${f}`).metadata();
  return `${f}: ${m.width}x${m.height}`;
};
console.log(await meta("dogo-horizontal.png"));
console.log(await meta("dogo-wordmark-white.png"));
console.log(await meta("dogo-mascot.png"));
