export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("<h2 style='color:white;text-align:center;margin-top:20px'>ID eksik</h2>", {
      headers: { "Content-Type": "text/html; charset=UTF-8" },
      status: 400
    });
  }

  // Veriler
  let playerLogo = "", playerLogoyer = "", playerSite = "", reklamVideo = "";
  let reklamSure = 0, reklamDurum = 0, playerPoster = "";
  let streamUrl = "";

  // 1. Reklam ve logo bilgileri (panel.matchkey)
  try {
    const res2 = await fetch("https://panel.matchkey.sbs/api/verirepo.php");
    const json2 = await res2.json();
    const data = json2.playerlogo || {};

    playerLogo = data.player_logo || "";
    playerLogoyer = data.player_logoyeriki || "";
    playerSite = data.player_site || "";
    reklamVideo = data.player_reklamvideo || "";
    reklamSure = parseInt(data.player_reklamsure) || 0;
    reklamDurum = parseInt(data.player_reklamdurum) || 0;
    playerPoster = data.player_arkaplan || "";
  } catch (e) {
    console.error("Veri çekilemedi:", e);
  }

  // 2. Yayın linki - ID'ye göre
  if (id === "bein-sports-1" || id === "bein-sports-2") {
    try {
      const apiResponse = await fetch("https://www.voleapi.buzz/load/yayinlink.php");
      const apiJson = await apiResponse.json();
      const baseUrl = apiJson.deismackanal || "https://volestream.volestream.lat/hls/";
      streamUrl = baseUrl.endsWith("/") ? baseUrl + id + ".m3u8" : baseUrl + "/" + id + ".m3u8";
    } catch (e) {
      streamUrl = "https://volestream.volestream.lat/hls/" + id + ".m3u8";
    }
  } else {
    // Eski API ile farklı kanal
    try {
      const data = {
        AppId: "5000",
        AppVer: "1",
        VpcVer: "1.0.12",
        Language: "en",
        Token: "",
        VideoId: id
      };

      const res = await fetch("https://streamsport365.com/cinema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      streamUrl = result.URL || "";
    } catch (e) {
      streamUrl = "";
    }
  }

  if (!streamUrl) {
    return new Response("<h2 style='color:white;text-align:center;margin-top:20px'>Yayın bulunamadı</h2>", {
      headers: { "Content-Type": "text/html; charset=UTF-8" }
    });
  }

  // HTML oluştur
  const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Yayın</title>
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
      if (playerLogo) options.watermark = playerLogo;
      if (playerSite) options.watermarkLink = playerSite;
      if (playerLogoyer) options.position = playerLogoyer;
      if (playerPoster) options.poster = playerPoster;

      new Clappr.Player(options);
    }

    function skipAd() {
      if (adPlayer) adPlayer.destroy();
      clearInterval(countdown);
      document.getElementById("ad-timer").style.display = "none";
      document.getElementById("skip-btn").style.display = "none";
      startMainPlayer();
    }

    function startAdThenMain() {
      if (reklamDurum === 1 && reklamVideo && reklamSure > 0) {
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
          if (remaining <= 0) {
            clearInterval(countdown);
            adPlayer.destroy();
            timerDiv.style.display = "none";
            skipBtn.style.display = "none";
            startMainPlayer();
          } else {
            timerDiv.innerText = "Reklamın bitmesine kalan süre: " + remaining + " saniye";
            if (remaining <= reklamSure - 5) {
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
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
