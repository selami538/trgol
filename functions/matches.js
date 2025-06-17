export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("<h2 style='color:white;text-align:center;margin-top:20px'>ID eksik</h2>", {
      headers: { "Content-Type": "text/html; charset=UTF-8" },
      status: 400
    });
  }

  // 1. API'den player logo, reklam vs. verilerini çek
  let playerLogo = "";
  let playerLogoyer = "";
  let playerSite = "";
  let reklamVideo = "";
  let reklamSure = 0;
  let reklamDurum = 0;
  let playerPoster = "";

  try {
    const res2 = await fetch("https://panel.matchkey.sbs/api/verirepo.php");
    const json2 = await res2.json();

    if (json2.playerlogo) {
      if (json2.playerlogo.player_logo) playerLogo = json2.playerlogo.player_logo;
      if (json2.playerlogo.player_logoyeriki) playerLogoyer = json2.playerlogo.player_logoyeriki;
      if (json2.playerlogo.player_site) playerSite = json2.playerlogo.player_site;
      if (json2.playerlogo.player_reklamvideo) reklamVideo = json2.playerlogo.player_reklamvideo;
      if (json2.playerlogo.player_reklamsure) reklamSure = parseInt(json2.playerlogo.player_reklamsure);
      if (json2.playerlogo.player_reklamdurum) reklamDurum = parseInt(json2.playerlogo.player_reklamdurum);
      if (json2.playerlogo.player_arkaplan) playerPoster = json2.playerlogo.player_arkaplan;
    }
  } catch (e) {
    console.error("Veriler alınamadı:", e);
  }

  // 2. API'den yayın base URL al (yayinlink.php)
  let baseUrl = "";
  try {
    const apiResponse = await fetch("https://www.voleapi.buzz/load/yayinlink.php");
    const apiJson = await apiResponse.json();
    baseUrl = apiJson.deismackanal || "https://volestream.volestream.lat/hls/";
  } catch (e) {
    baseUrl = "https://volestream.volestream.lat/hls/";
  }

  // Stream URL oluştur
  const streamUrl = baseUrl.endsWith("/") ? baseUrl + id + ".m3u8" : baseUrl + "/" + id + ".m3u8";

  // HTML oluştur
  const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Canlı Yayın</title>
<style>
  body, html { margin:0; padding:0; background:#000; height:100vh; }
  #player { width:100%; height:100vh; position: relative; }
  #ad-timer, #skip-btn {
    position: absolute;
    right: 10px;
    background: rgba(0,0,0,0.75);
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 9999;
  }
  #ad-timer { bottom: 40px; display: none; }
  #skip-btn { bottom: 10px; display: none; cursor: pointer; background: #d33; }
</style>
<script src="https://cdn.jsdelivr.net/clappr/latest/clappr.min.js"></script>
</head>
<body>
  <div id="player">
    <div id="ad-timer"></div>
    <div id="skip-btn" onclick="skipAd()">Reklamı Atla</div>
  </div>
  <script>
    const reklamVideo = "${reklamVideo}";
    const reklamSure = ${reklamSure};
    const reklamDurum = ${reklamDurum};
    const playerLogo = "${playerLogo}";
    const playerSite = "${playerSite}";
    const playerLogoyer = "${playerLogoyer}";
    const playerPoster = "${playerPoster}";
    const mainStreamUrl = "${streamUrl}";

    let adPlayer = null;
    let countdown = null;

    function startMainPlayer() {
      const options = {
        source: mainStreamUrl,
        parentId: "#player",
        autoPlay: true,
        width: "100%",
        height: "100%",
        mimeType: "application/x-mpegURL"
      };
      if(playerLogo) options.watermark = playerLogo;
      if(playerSite) options.watermarkLink = playerSite;
      if(playerLogoyer) options.position = playerLogoyer;
      if(playerPoster) options.poster = playerPoster;

      new Clappr.Player(options);
    }

    function skipAd() {
      if(adPlayer) adPlayer.destroy();
      clearInterval(countdown);
      document.getElementById("ad-timer").style.display = "none";
      document.getElementById("skip-btn").style.display = "none";
      startMainPlayer();
    }

    function startAdThenMain() {
      if(reklamDurum === 1 && reklamVideo && reklamSure > 0) {
        adPlayer = new Clappr.Player({
          source: reklamVideo,
          parentId: "#player",
          autoPlay: true,
          width: "100%",
          height: "100%"
        });

        const timerDiv = document.getElementById("ad-timer");
        const skipBtn = document.getElementById("skip-btn");
        let remaining = reklamSure;

        timerDiv.style.display = "block";
        timerDiv.innerText = "Reklamın bitmesine kalan süre: " + remaining + " saniye";

        countdown = setInterval(() => {
          remaining--;
          if(remaining <= 0) {
            clearInterval(countdown);
            adPlayer.destroy();
            timerDiv.style.display = "none";
            skipBtn.style.display = "none";
            startMainPlayer();
          } else {
            timerDiv.innerText = "Reklamın bitmesine kalan süre: " + remaining + " saniye";
            if(remaining <= reklamSure - 5) {
              skipBtn.style.display = "block";
            }
          }
        }, 1000);
      } else {
        startMainPlayer();
      }
    }

    startAdThenMain();
  </script>
</body>
</html>
`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
