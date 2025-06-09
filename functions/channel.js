export async function onRequest(context) {
  const url = new URL(context.request.url);
  const cid = url.searchParams.get("id") || "yayinzirve";

  let baseurl = "https://fallbackdomain.com/";
  let playerLogo = "logo.png";

  try {
    const res = await fetch("https://shiny-base-0e24.johntaylors029.workers.dev/");
    const data = await res.json();
    baseurl = data.baseurl || baseurl;
  } catch (e) {
    console.error("Yayın domaini alınamadı:", e);
  }

  try {
    const res2 = await fetch("https://apibaglan.site/api/verirepo.php");
    const json = await res2.json();

    if (json.playerlogo?.player_logo) {
      playerLogo = json.playerlogo.player_logo;
      if (!playerLogo.startsWith("http")) {
        playerLogo = "https://cdn.site.com/" + playerLogo; // ← CDN'ine göre düzelt
      }
    }
  } catch (e) {
    console.error("JSON veri çekilemedi:", e);
  }

  const kanalurl = {
    "yayinzirve": "yayinzirve.m3u8", "yayinb2": "yayinb2.m3u8",
    "bs5": "bs5.m3u8", "yayintv85": "yayintv85.m3u8"
  };

  const streamPath = kanalurl[cid.replace(".m3u8", "")] || "yayinzirve.m3u8";
  const streamUrl = baseurl + streamPath;

  const html = `
<!DOCTYPE html>
<html>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 0; background: #000; }
    #player { width: 100%; height: 100vh; }
    div { user-select: none; }
  </style>
  <script src="https://cdn.jsdelivr.net/clappr/latest/clappr.min.js"></script>
  <div id="player"></div>
  <script>
    var isNS = (navigator.appName == "Netscape") ? 1 : 0;
    var EnableRightClick = 0;
    if (isNS) document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);
    function mischandler() { return EnableRightClick == 1; }
    function mousehandler(e) {
      if (EnableRightClick == 1) return true;
      var myevent = isNS ? e : event;
      var eventbutton = isNS ? myevent.which : myevent.button;
      if ((eventbutton == 2) || (eventbutton == 3)) return false;
    }
    function keyhandler(e) {
      var myevent = isNS ? e : window.event;
      if (myevent.keyCode == 96) EnableRightClick = 1;
      return;
    }
    document.oncontextmenu = mischandler;
    document.onkeypress = keyhandler;
    document.onmousedown = mousehandler;
    document.onmouseup = mousehandler;
  </script>
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
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
