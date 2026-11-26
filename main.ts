// Writes this bounty entry: one sentence of apology, to /output/entry.txt.
import * as fs from "node:fs";

const APOLOGY =
  "I'm sorry I confidently cited a study that doesn't exist, then invented a second one to back it up.";

const LIMIT = 200;

function fail(reason: string): never {
  throw new Error(reason);
}

const size = [...APOLOGY].length;
if (size < 1 || size > LIMIT) {
  fail(`apology runs ${size} code points; the gate allows 1 to ${LIMIT}`);
}
if (APOLOGY.trim() === "") {
  fail("apology is empty");
}
if (APOLOGY.startsWith(" ") || APOLOGY.endsWith(" ")) {
  fail("apology has a leading or trailing space");
}
if (/[\r\n]/.test(APOLOGY)) {
  fail("apology spans more than one line");
}
if (APOLOGY.includes("—")) {
  fail("apology uses an em dash");
}
if (APOLOGY.includes("  ")) {
  fail("apology has a doubled space");
}
if (!APOLOGY.endsWith(".")) {
  fail("apology does not end with a period");
}

const dir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
const file = `${dir}/entry.txt`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, APOLOGY, "utf8");
const saved = fs.readFileSync(file, "utf8");
if (saved.length === 0) {
  fail("saved entry came back empty");
}
if (saved !== APOLOGY) {
  fail("what came back from disk is not the apology");
}
console.log(`saved a ${size}-character apology to ${file}`);
