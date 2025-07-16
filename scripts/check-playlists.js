#!/usr/bin/env node
const PLAYLISTS = [
  "PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV",
  "PLHz_AreHm4dm6wYOIW20Nyg12TAjmMGT-",
  "PLHz_AreHm4dmYmOu9gaqEirP0jnRKXyQo",
  "PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1",
  "PLHz_AreHm4dn1bAtIJWFrugl5z2Ej_52d",
];

function isValidPlaylistId(playlistId) {
  return /^PL[a-zA-Z0-9_-]{16,}$/.test(playlistId);
}

console.log("🎬 Verificando playlists configuradas...\n");

PLAYLISTS.forEach((playlist, index) => {
  const isValid = isValidPlaylistId(playlist);
  const status = isValid ? "✅ Válida" : "❌ Inválida";
  console.log(`${index + 1}. ${playlist} - ${status}`);
});

const validCount = PLAYLISTS.filter(isValidPlaylistId).length;
console.log(`\n📊 Resumo: ${validCount}/${PLAYLISTS.length} playlists válidas`);

if (validCount === PLAYLISTS.length) {
  console.log("🎉 Todas as playlists estão configuradas corretamente!");
} else {
  console.log("⚠️  Algumas playlists podem ter problemas.");
}
