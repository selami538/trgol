export async function onRequest(context) {
  const url = new URL(context.request.url);
  const cid = url.searchParams.get("id") || "yayinzirve";

  let baseurl = "https://fallbackdomain.com/"; // yedek domain
  try {
    const res = await fetch("https://shiny-base-0e24.johntaylors029.workers.dev/");
    const data = await res.json();
    baseurl = data.baseurl || baseurl;
  } catch (e) {
    console.error("Domain API hatası:", e);
  }

  const kanalurl = {
    "yayinzirve": "yayinzirve.m3u8", "yayinb2": "yayinb2.m3u8", "bs5": "bs5.m3u8",
    "yayintv85": "yayintv85.m3u8"
    // Diğer yayınlar buraya eklenebilir
  };

  const streamPath = kanalurl[cid.replace(".m3u8", "")] || "yayinzirve.m3u8";
  const streamUrl = baseurl + streamPath;

  const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Canlı Yayın</title>
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
      watermark: "logo.png",
      watermarkLink: "https://dng.bet",
      width: "100%",
      height: "100%",
      mimeType: "application/x-mpegURL"
    });
  </script>
</body>
</html>
`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
