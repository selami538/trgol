export async function onRequest(context) {
  // API'lardan JSON çekiyoruz
  const domainRes = await fetch("https://www.voleapi.buzz/domainlink/jsondomain.php");
  const domainData = await domainRes.json();
  const güncelDomain = domainData['taraftarium'] || "";

  const ayarRes = await fetch("https://apibaglan.site/api/verirepo.php");
  const ayarData = await ayarRes.json();

  const pageskin = ayarData?.ayar?.ayar_reklam3 || "";
  const pageskinUrl = (güncelDomain && pageskin) ? `${güncelDomain.replace(/\/+$/, '')}/${pageskin.replace(/^\/+/, '')}` : "";

  const girisLinki = ayarData?.ayar?.ayar_girislink || "#";

  // HTML çıktısını oluşturuyoruz
  const html = `
  <!DOCTYPE html>
  <html lang="tr">
  <head>
    <meta charset="utf-8" />
    <title>Güncel Giriş Adresi</title>
    <link rel="canonical" href="${escapeHtml(girisLinki)}" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
    <style>
      body {
        background: url('${escapeHtml(pageskinUrl)}') no-repeat center top;
        background-size: cover;
        background-color:#000;
        margin:0;
        padding:2em;
        font-family: Arial, sans-serif;
        color:#fff;
        text-align:center;
      }
      .overlay {
        background: rgba(0, 0, 0, 0.6);
        padding: 2em;
        border-radius: 10px;
        display: inline-block;
        max-width: 90%;
      }
      .btn {
        display: inline-block;
        background: #ff6f00;
        color: #fff;
        padding: 1em 2em;
        border-radius: 5px;
        font-size: 1.2em;
        font-weight: bold;
        margin-top: 2em;
        text-decoration: none;
      }
      .btn:hover {
        background: #e65100;
      }
      h1 {
        font-size: 2em;
        margin-bottom: 0.5em;
      }
      p {
        font-size: 1em;
        color: #ccc;
      }
    </style>
  </head>
  <body>
    <div class="overlay">
      <h1>📲 Güncel Giriş Sayfamıza Hoş Geldiniz</h1>
      <p>Web sitemize erişim için aşağıdaki butona tıklayın. Giriş adresi her zaman günceldir.</p>
      <a href="${escapeHtml(güncelDomain)}" class="btn" target="_blank" rel="noopener noreferrer">👉 Şimdi Giriş Yap</a>
    </div>
  </body>
  </html>
  `;

  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}

// Basit HTML kaçış fonksiyonu
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}
