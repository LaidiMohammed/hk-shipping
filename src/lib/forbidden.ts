export const forbiddenDefaults = [
  { name: "Armes & munitions", reason: "Interdit par la loi DZ" },
  { name: "Liquides inflammables / explosifs", reason: "Dangereux en avion" },
  { name: "Batteries lithium non emballées", reason: "Risque incendie aérien" },
  { name: "Voiture / aile voiture non démontable", reason: "Trop volumineux, doit être démontable par pièce" },
  { name: "Produits chimiques dangereux", reason: "Interdit IATA" },
  { name: "Contrefaçon", reason: "Douane saisit" },
];

export function checkForbidden(productName: string): { forbidden: boolean; rule?: typeof forbiddenDefaults[number] } {
  const lower = productName.toLowerCase();
  // soft check: allow submit but flag
  for (const r of forbiddenDefaults) {
    if (lower.includes("aile") && lower.includes("voiture")) return { forbidden: true, rule: r };
    if (lower.includes("arme")) return { forbidden: true, rule: r };
    if (lower.includes("batterie") && lower.includes("lithium")) return { forbidden: true, rule: r };
  }
  return { forbidden: false };
}
