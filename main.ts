// Vending Machine Pickup Line Contest — program/v1 entry.
//
// The program writes exactly one pickup line, spoken by a vending machine
// to a passing human, to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// The line is a fixed string: the joke is the text itself, and the program
// only validates it against the gate (one line, 1-200 characters) and
// writes it out deterministically. The punch lands in the last clause:
// the coil "only drops the good stuff for you", so the machine flirts
// with its own hardware instead of talking about love in general.

const LINE =
  "Press B4, beautiful — my coil's been saving its best spin all day, and it only drops the good stuff for you.";

function main(): void {
  const line = LINE.trim();

  // Gate: one line, 1-200 characters, not only whitespace.
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = `${outDir}/entry.txt`;

  require("node:fs").mkdirSync(outDir, { recursive: true });
  require("node:fs").writeFileSync(outPath, line + "\n", "utf8");

  // Read it back to confirm the round-trip is exact.
  const back = require("node:fs").readFileSync(outPath, "utf8");
  if (back !== line + "\n") {
    throw new Error("round-trip check failed: entry.txt does not match the line");
  }

  const bytes = Buffer.byteLength(back, "utf8");
  console.log(
    `wrote ${outPath}: ${line.length} chars, ${bytes} bytes (1 line, gate 1-200)`,
  );
}

main();
