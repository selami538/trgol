export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");

  let streamUrl = "";
  let playerLogo = "";

  // 1. Logo bilgisini al
  try {
    const res2 = await fetch("https://apibaglan.site/api/verirepo.php");
    const json = await res2.json();

    if (json.playerlogo?.player_logo) {
      playerLogo = json.playerlogo.player_logo.startsWith("http")
        ? json.playerlogo.player_logo
        : "https://cdn.site.com/" + json.playerlogo.player_logo;
    }
  } catch (e) {
    console.error("Logo verisi alınamadı:", e);
  }

  // 2. ID varsa stream URL'yi çek
  if (id) {
    try {
      const cinemaRes = await fetch("https://streamsport365.com/cinema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify({
          AppId: "5000",
          AppVer: "1",
          VpcVer: "1.0.12",
          Language: "en",
          Token: "",
          VideoId: id
        })
      });

      const cinemaJson = await cinemaRes.json();
      if (cinemaJson.URL) {
        streamUrl = cinemaJson.URL;
      }
    } catch (e) {
      console.error("Stream URL çekilemedi:", e);
    }
  }

  // 3. Stream yoksa fallback göster
  if (!streamUrl) {
    return new Response("Yayın bulunamadı.", { status: 404 });
  }

  // 4. HTML Player çıktısı
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { margin: 0; padding: 0; background: #000; }
      #player { width: 100%; height: 100vh; }
    </style>
    <script src="https://cdn.jsdelivr.net/clappr/latest/clappr.min.js"></script>
  </head>
  <body>
    <div id="player"></div>
    <script>
      new Clappr.Player({
        source: "${streamUrl}",
        parentId: "#player",
        autoPlay: true,
        watermark: "${playerLogo}",
        watermarkLink: "https://dng.bet",
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
