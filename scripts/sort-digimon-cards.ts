
const PREFIX_ORDER = ["BT", "EX", "ST", "P", "RB"];

function parseCardNumber(code: any) {
  
  const match = code.match(/^([A-Z]+)(\d*)-(\d+)$/);

  if (!match) {
    return { prefix: code, set: 0, index: 0 };
  }

  const [, prefix, rawSet, rawIndex] = match;

  return {
    prefix,
    set: rawSet ? parseInt(rawSet) : 0,
    index: parseInt(rawIndex),
  };
}

function sortCards(cards: any) {
    return cards.sort((a: any, b: any) => {
      const A = parseCardNumber(a.cardnumber);
      const B = parseCardNumber(b.cardnumber);

      const prefixA = PREFIX_ORDER.indexOf(A.prefix);
      const prefixB = PREFIX_ORDER.indexOf(B.prefix);
      if (prefixA !== prefixB) return prefixA - prefixB;

      if (A.set !== B.set) return A.set - B.set;
  
      return A.index - B.index;
    });
  }
  
(async () => {
  try {
    const inputPath = path.resolve(
      __dirname,
      "../src/assets/data/digimon-cards.json"
    );

    const outputPath = path.resolve(
      __dirname,
      "../src/assets/data/digimon-cards-sorted.json"
    );

    if (!fs.existsSync(inputPath)) {
      console.error("❌ No existe digimon-cards.json — ejecuta primero build:cards");
      return;
    }

    const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

    console.log("⏳ Ordenando cartas…");
    const sorted = sortCards(data);

    fs.writeFileSync(outputPath, JSON.stringify(sorted, null, 2));

    console.log("✅ Cartas ordenadas correctamente:");
    console.log("   →", outputPath);
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
