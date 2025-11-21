
(async () => {
  try {
    console.log("⏳ Fetching Digimon cards (ascending order)...");

    const url =
      "https://digimoncard.io/api-public/getAllCards.php?sort=name&series=Digimon%20Card%20Game&sortdirection=asc";

    const response = await axios.get(url);

    const cards = response.data.map((card: any) => ({
      name: card.name,
      cardnumber: card.cardnumber,
      image_url: `https://images.digimoncard.io/images/cards/${card.cardnumber}.jpg`,
    }));

    const outputPath = path.resolve(
      __dirname,
      "../src/assets/data/digimon-cards.json"
    );

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));

    console.log("✅ Digimon cards saved successfully to:", outputPath);
  } catch (error) {
    console.error("❌ Error fetching cards:", error);
  }
})();
