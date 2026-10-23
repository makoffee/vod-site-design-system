// Pack arbitrary bytes into a grayscale PNG with uncompressed (stored) deflate blocks, so a Figma plugin can
// recover them from image.getBytesAsync() without an inflate implementation.
import fs from 'fs';

const CRC = new Uint32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const u32 = (n) => Buffer.from([(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]);
const chunk = (type, data) => Buffer.concat([u32(data.length), Buffer.from(type), data, u32(crc32(Buffer.concat([Buffer.from(type), data])))]);

export function encode(payload, width = 2048) {
  // 4-byte length prefix, then the payload, padded to whole rows
  const body = Buffer.concat([u32(payload.length), payload]);
  const height = Math.ceil(body.length / width);
  const raw = Buffer.alloc(height * (width + 1));
  for (let y = 0; y < height; y++) body.copy(raw, y * (width + 1) + 1, y * width, Math.min(body.length, (y + 1) * width));
  const blocks = [Buffer.from([0x78, 0x01])];
  for (let i = 0; i < raw.length; i += 65535) {
    const part = raw.subarray(i, Math.min(raw.length, i + 65535));
    const last = i + 65535 >= raw.length ? 1 : 0;
    blocks.push(Buffer.from([last, part.length & 255, part.length >> 8, ~part.length & 255, (~part.length >> 8) & 255]), part);
  }
  let a = 1, b = 0; for (const x of raw) { a = (a + x) % 65521; b = (b + a) % 65521; }
  blocks.push(u32(((b << 16) | a) >>> 0));
  const ihdr = Buffer.concat([u32(width), u32(height), Buffer.from([8, 0, 0, 0, 0])]);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', Buffer.concat(blocks)), chunk('IEND', Buffer.alloc(0))]);
}

if (process.argv[2]) fs.writeFileSync(process.argv[3], encode(fs.readFileSync(process.argv[2])));
