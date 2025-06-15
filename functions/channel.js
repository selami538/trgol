export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");

  let playerLogo = "";
  let playerLogoyer = "";
  let playerSite = "";
  let reklamVideo = "";
  let reklamSure = 0;
  let reklamDurum = 0;

  try {
    const res2 = await fetch("https://apibaglan.site/api/verirepo.php");
    const json = await res2.json();

    if (json.playerlogo) {
      if (json.playerlogo.player_logo) {
        playerLogo = json.playerlogo.player_logo.startsWith("http")
          ? json.playerlogo.player_logo
          : json.playerlogo.player_logo;
      }

      if (json.playerlogo.player_logoyeriki) {
        playerLogoyer = json.playerlogo.player_logoyeriki.startsWith("http")
          ? json.playerlogo.player_logoyeriki
          : json.playerlogo.player_logoyeriki;
      }

      if (json.playerlogo.player_site) {
        playerSite = json.playerlogo.player_site;
      }

      if (json.playerlogo.player_reklamvideo) {
        reklamVideo = json.playerlogo.player_reklamvideo;
      }

      if (json.playerlogo.player_reklamsure) {
        reklamSure = parseInt(json.playerlogo.player_reklamsure) || 0;
      }

      if (json.playerlogo.player_reklamdurum) {
        reklamDurum = parseInt(json.playerlogo.player_reklamdurum) || 0;
      }
    }
  } catch (e) {
    console.error("Veriler alınamadı:", e);
  }

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { margin: 0; padding: 0; background: #000; }
      #player { width: 100%; height: 100vh; position: relative; }
      #ad-timer {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: #fff;
        padding: 8px 12px;
        border-radius: 8px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        z-index: 9999;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/clappr/latest/clappr.min.js"></script>
  </head>
  <body>
    <div id="player">
      <div id="ad-timer" style="display: none;">Reklam geçilebilir: ${reklamSure} saniye</div>
    </div>

    <script>
      const id = "${id}";
      const reklamVideo = "${reklamVideo}";
      const reklamSure = ${reklamSure};
      const reklamDurum = ${reklamDurum};

      function startMainPlayer(mainUrl) {
        const options = {
          source: mainUrl,
          parentId: "#player",
          autoPlay: true,
          width: "100%",
          height: "100%",
          mimeType: "application/x-mpegURL"
        };

        ${playerLogo ? `options.watermark = "${playerLogo}";` : ""}
        ${playerSite ? `options.watermarkLink = "${playerSite}";` : ""}
        ${playerLogoyer ? `options.position = "${playerLogoyer}";` : ""}

        new Clappr.Player(options);
      }

      function startAdThenMain(mainUrl) {
        if (reklamDurum === 1 && reklamVideo && reklamSure > 0) {
          const adPlayer = new Clappr.Player({
            source: reklamVideo,
            parentId: "#player",
            autoPlay: true,
            width: "100%",
            height: "100%"
          });

          const timerDiv = document.getElementById("ad-timer");
          let remaining = reklamSure;
          timerDiv.style.display = "block";
          timerDiv.innerText = "Reklam geçilebilir: " + remaining + " saniye";

          const countdown = setInterval(() => {
            remaining--;
            if (remaining <= 0) {
              clearInterval(countdown);
              adPlayer.destroy();
              timerDiv.style.display = "none";
              startMainPlayer(mainUrl);
            } else {
              timerDiv.innerText = "Reklam geçilebilir: " + remaining + " saniye";
            }
          }, 1000);
        } else {
          startMainPlayer(mainUrl);
        }
      }

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
            startAdThenMain(result.URL);
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
  </body>
</html>
`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
