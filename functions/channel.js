export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");

  let playerLogo = "";

  // Logo'yu çek
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

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { margin: 0; padding: 0; background: #000; }
      #player { width: 100%; height: 100vh; }
    </style>
   <script src="https://cdn.jsdelivr.net/clappr/latest/clappr.min.js" defer></script>
  </head>
    <script>
      const id = "${id}";

      if (id) {
        const data = {
          AppId: "5000",
          AppVer: "1",
          VpcVer: "1.0.12",
          Language: "en",
          Token: "",
          VideoId: id
        };

        fetch("https://streamsport365.com/cinema", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
          if (result.URL) {
            new Clappr.Player({
              source: result.URL,
              parentId: "#player",
              autoPlay: true,
              watermark: "${playerLogo}",
              watermarkLink: "https://dng.bet",
              width: "100%",
              height: "100%",
              mimeType: "application/x-mpegURL"
            });
          } else {
            document.body.innerHTML = "<h2 style='color:white;text-align:center;margin-top:20px'>Yayın bulunamadı</h2>";
          }
        })
        .catch(err => {
          console.error("Hata:", err);
          document.body.innerHTML = "<h2 style='color:white;text-align:center;margin-top:20px'>Yayın hatası</h2>";
        });
      } else {
        document.body.innerHTML = "<h2 style='color:white;text-align:center;margin-top:20px'>ID eksik</h2>";
      }
    </script>
  <body>
    <div id="player"></div>
  </body>
</html>
`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
