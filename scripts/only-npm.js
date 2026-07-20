// Tourne en preinstall, avant que node_modules existe : CommonJS pur, zéro dépendance.
// Empêche pnpm/yarn/bun de réécrire node_modules en parallèle du package-lock.json npm.

const userAgent = process.env.npm_config_user_agent || "";

if (!userAgent) {
  process.exit(0);
}

const manager = userAgent.split("/")[0];

if (manager !== "npm") {
  console.error(`
\x1b[31m╔════════════════════════════════════════════════════════════╗
║  STOP — ce projet s'utilise avec npm, pas ${manager.padEnd(16)}║
╚════════════════════════════════════════════════════════════╝\x1b[0m

Utilise :   \x1b[32mnpm install\x1b[0m   puis   \x1b[32mnpm run dev\x1b[0m

Le lockfile officiel est package-lock.json. Lancer ${manager} crée un
lockfile concurrent et remplace node_modules par sa propre structure,
ce qui casse la résolution des modules dans VSCode.
`);
  process.exit(1);
}
