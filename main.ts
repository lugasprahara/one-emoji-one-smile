// One Emoji, One Smile — entrypoint.
//
// Writes exactly one emoji to entry.txt in the output directory:
// the sun with face (🌞, U+1F31E). It is warmth with a gentle smile on
// it, reads the same to a stranger of any age or background, and is a
// deliberate pick rather than the default smiley — with no intimacy,
// sarcasm or flirtation that would land oddly from someone unknown.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "\u{1F31E}"; // 🌞 sun with face

// Guard the gate: the entry must stay a single emoji of 1–8 characters,
// never blank. Fail loudly here rather than hand the scorer an invalid file.
const graphemes = [...new Intl.Segmenter().segment(EMOJI)];
if (graphemes.length !== 1 || EMOJI.length < 1 || EMOJI.length > 8) {
  throw new Error(`entry must be exactly one emoji, got ${JSON.stringify(EMOJI)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Exactly the emoji and nothing else: no words, no newline.
writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
