/**
 * Generates a 256x256 tileable grayscale noise PNG to public/textures/grain.png
 * Uses only Node built-ins (fs, zlib, Buffer). No dependencies.
 * Run once: node scripts/generate-grain.js
 */

const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

const W = 256;
const H = 256;

// CRC32 table (standard PNG polynomial)
const crc32Table = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crc32Table[n] = c >>> 0;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = crc32Table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ -1) >>> 0;
}

function writeChunk(out, type, data) {
  const payload = data || Buffer.alloc(0);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(payload.length, 0);
  const chunk = Buffer.concat([Buffer.from(type), payload]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(chunk), 0);
  out.push(len, chunk, crcBuf);
}

// Simple seeded noise for reproducibility (optional: use Math.random() for different each run)
function seed(x) {
  x = Math.imul(x ^ (x >>> 15), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
}

const chunks = [];
const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
chunks.push(signature);

// IHDR
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 0;  // color type: grayscale
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace
writeChunk(chunks, "IHDR", ihdr);

// Raw scanlines: filter byte 0 (None) + W bytes per row
const raw = Buffer.alloc(H * (1 + W));
for (let y = 0; y < H; y++) {
  const rowStart = y * (1 + W);
  raw[rowStart] = 0; // filter type: None
  for (let x = 0; x < W; x++) {
    const v = seed((y * W + x) * 7919) % 256;
    raw[rowStart + 1 + x] = v;
  }
}

const compressed = zlib.deflateSync(raw, { level: 6 });
writeChunk(chunks, "IDAT", compressed);
writeChunk(chunks, "IEND", null);

const outPath = path.join(__dirname, "..", "public", "textures", "grain.png");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, Buffer.concat(chunks));
console.log("Written:", outPath);
