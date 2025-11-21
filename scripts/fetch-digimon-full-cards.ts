const axios = require("axios");
const fs = require("fs");
const path = require("path");

const wait = (ms: any) => new Promise((res) => setTimeout(res, ms));

async function fetchCardDetails(cardnumber: any) {
  try {
    const url = `https://digimoncard.io/api-public/search.php?card=${encodeURIComponent(cardnumber)}`;
    const response = await axios.get(url);

    if (Array.isArray(response.data) && response.data.length > 0) {
      const card = response.data[0];

      return {
        ...card,
        image_url: `https://images.digimoncard.io/images/cards/${cardnumber}.jpg`
      };
    }

    return {
      cardnumber,
      error: "Not found"
    };
  } catch (err: any) {
    console.error(`❌ Error fetching ${cardnumber}:`, err.message);
    return {
      cardnumber,
      error: true
    };
  }
}

(async () => {
  const inputPath = path.resolve(
    __dirname,
    "../src/assets/data/digimon-cards-sorted.json"
  );

  const outputPath = path.resolve(
    __dirname,
    "../src/assets/data/digimon-cards-full.json"
  );

  if (!fs.existsSync(inputPath)) {
    console.error("❌ Primero genera digimon-cards-sorted.json");
    return;
  }

  const cards = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const results = [];

  let count = 0;

  console.log(`⏳ Descargando detalles de ${cards.length} cartas...`);
  console.log("⚠ Usando endpoint EXACTO: search.php?card=xxxx");

  for (const card of cards) {
    count++;
    console.log(`📥 (${count}/${cards.length}) – ${card.cardnumber}`);

    const details = await fetchCardDetails(card.cardnumber);
    results.push(details);

    // Evitar rate limit: 12 llamadas por cada 10s
    await wait(850);
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log("✅ Archivo generado:", outputPath);
})();
