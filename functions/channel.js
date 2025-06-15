export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");

  let playerLogo = "";
  let playerLogoyer = "";
  let playerSite = "";
  let playerReklamvideo = "";
  let playerReklamsure = 0;
  let playerReklamdurum = 0;

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
          : "" + json.playerlogo.player_logoyeriki;
      }

      if (json.playerlogo.player_site) {
        playerSite = json.playerlogo.player_site;
      }

      if (json.playerlogo.player_reklamvideo) {
        playerReklamvideo = json.playerlogo.player_reklamvideo;
      }
      if (json.playerlogo.player_reklamsure) {
        playerReklamsure = Number(json.playerlogo.player_reklamsure) || 0;
      }
      if (json.playerlogo.player_reklamdurum !== undefined) {
        playerReklamdurum = Number(json.playerlogo.player_reklamdurum);
      }
    }
  } catch (e) {
    console.error("Veriler alınamadı:", e);
  }

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #000;
      }
      #player {
        width: 100%;
        height: 100vh;
      }
      #ad-container {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        color: white;
        font-family: Arial, sans-serif;
        font-size: 14px;
        text-align: right;
        user-select: none;
      }
      #skip-button {
        display: none;
        margin-top: 5px;
        padding: 3px 8px;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid white;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
      }
      #skip-button:hover {
        background: rgba(255, 255, 255, 0.4);
      }
      #ad-video {
        width: 0;
        height: 0;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        display: none;
        cursor: pointer;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/clappr/latest/clappr.min.js"></script>
  </head>
  <body>
    <div id="player"></div>

    <div id="ad-container" style="display:none;">
      <div id="ad-text"></div>
      <button id="skip-button">Reklamı Atla</button>
    </div>

    <video id="ad-video" muted></video>

    <script>
      const playerSite = "${playerSite}";
      const playerLogo = "${playerLogo}";
      const playerLogoyer = "${playerLogoyer}";
      const playerReklamvideo = "${playerReklamvideo}";
      const playerReklamsure = ${playerReklamsure};
      const playerReklamdurum = ${playerReklamdurum};
      const id = "${id}";

      const adContainer = document.getElementById("ad-container");
      const adText = document.getElementById("ad-text");
      const skipButton = document.getElementById("skip-button");
      const adVideo = document.getElementById("ad-video");
      const playerDiv = document.getElementById("player");

      // Reklama tıklanırsa playerSite'ye yönlendirme
      if (playerSite && adVideo) {
        adVideo.style.cursor = "pointer";
        adVideo.addEventListener("click", () => {
          window.open(playerSite, "_blank");
        });
      }

      function startMainPlayer(sourceUrl) {
        new Clappr.Player({
          source: sourceUrl,
          parentId: "#player",
          position: playerLogoyer,
          autoPlay: true,
          watermark: playerLogo || null,
          watermarkLink: playerSite || null,
          width: "100%",
          height: "100%",
          mimeType: "application/x-mpegURL",
        });
      }

      if (!id) {
        document.body.innerHTML =
          "<h2 style='color:white;text-align:center;margin-top:20px'>ID eksik</h2>";
      } else {
        const data = {
          AppId: "5000",
          AppVer: "1",
          VpcVer: "1.0.12",
          Language: "en",
          Token: "",
          VideoId: id,
        };

        fetch("https://streamsport365.com/cinema", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((result) => {
            if (!result.URL) {
              document.body.innerHTML =
                "<h2 style='color:white;text-align:center;margin-top:20px'>Yayın bulunamadı</h2>";
              return;
            }

            if (playerReklamdurum === 1 && playerReklamvideo && playerReklamsure > 0) {
              // Reklam aktif ve bilgileri varsa reklamı oynat
              adVideo.src = playerReklamvideo;
              adVideo.style.display = "block";
              adContainer.style.display = "block";

              let remaining = playerReklamsure;
              adText.textContent = \`Reklamın bitmesine kalan süre: \${remaining} saniye\`;

              // 5 saniye sonra atla butonunu göster
              const showSkipAfter = 5;

              skipButton.style.display = "none";

              const interval = setInterval(() => {
                remaining--;
                if (remaining > 0) {
                  adText.textContent = \`Reklamın bitmesine kalan süre: \${remaining} saniye\`;
                }

                if (remaining === playerReklamsure - showSkipAfter) {
                  skipButton.style.display = "inline-block";
                }

                if (remaining <= 0) {
                  clearInterval(interval);
                  adVideo.style.display = "none";
                  adContainer.style.display = "none";
                  startMainPlayer(result.URL);
                }
              }, 1000);

              skipButton.onclick = () => {
                clearInterval(interval);
                adVideo.pause();
                adVideo.style.display = "none";
                adContainer.style.display = "none";
                startMainPlayer(result.URL);
              };

              adVideo.play();
            } else {
              // Reklam yoksa direk yayını başlat
              startMainPlayer(result.URL);
            }
          })
          .catch((err) => {
            console.error("Hata:", err);
            document.body.innerHTML =
              "<h2 style='color:white;text-align:center;margin-top:20px'>Yayın hatası</h2>";
          });
      }
    </script>
  </body>
</html>
`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" },
  });
}
