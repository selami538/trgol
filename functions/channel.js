export async function onRequest(context) {
  const url = new URL(context.request.url);
  const cid = url.searchParams.get("id") || "yayinzirve";

  let baseurl = "https://fallbackdomain.com/";
  let playerLogo = "", playerSite = "", playerPosition = "";

  try {
    const domainRes = await fetch("https://apibaglan.site/api/domain.php");
    const domainData = await domainRes.json();
    baseurl = domainData.baseurl || baseurl;
  } catch (e) {
    console.error("Domain alınamadı:", e);
  }

  try {
    const dataRes = await fetch("https://apibaglan.site/api/verirepo.php");
    const json = await dataRes.json();
    const logo = json.playerlogo || {};

    if (logo.player_logo)
      playerLogo = logo.player_logo.startsWith("http") ? logo.player_logo : "https://cdn.site.com/" + logo.player_logo;

    playerSite = logo.player_site || "";
    playerPosition = logo.player_logoyeriki || "";
  } catch (e) {
    console.error("Veri alınamadı:", e);
  }

  const kanalurl = {
    "bein-sports-1": "bein-sports-1.m3u8",
    "yayinb2": "yayinb2.m3u8",
    "bs5": "bs5.m3u8",
    "yayintv85": "yayintv85.m3u8"
  };

  const streamPath = kanalurl[cid.replace(".m3u8", "")] || "yayinzirve.m3u8";
  const streamUrl = baseurl + streamPath;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; background: #000; }
    #player { width: 100%; height: 100vh; position: relative; }
    .player-text {
      position: absolute; top: 10px; right: 10px;
      color: white; font-size: 14px; background: rgba(0,0,0,0.6);
      padding: 5px 10px; border-radius: 6px; z-index: 9999;
      font-family: sans-serif;
    }
  </style>
</head>
<body>
  <div id="player">
    ${playerText ? `<div class="player-text">${playerText}</div>` : ""}
  </div>
  <script src="https://cdn.jsdelivr.net/clappr/latest/clappr.min.js"></script>
  <script>
    new Clappr.Player({
      source: "${streamUrl}",
      parentId: "#player",
      autoPlay: true,
      watermark: "${playerLogo}",
      watermarkLink: "${playerSite}",
      width: "100%",
      height: "100%",
      mimeType: "application/x-mpegURL"
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
