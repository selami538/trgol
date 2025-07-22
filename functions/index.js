export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const hostname = url.hostname;

  // --- www ile başlayan domain varsa www'yi kaldırıp yönlendir ---
  if (hostname.startsWith("www.")) {
    const newHost = hostname.replace(/^www\./, "");
    const redirectUrl = `${url.protocol}//${newHost}${url.pathname}${url.search}`;
    return Response.redirect(redirectUrl, 301);
  }
  // --- www yönlendirme son ---

  // Sayı artışı işlemi düzgün tanımlandı
  const nextDomain = hostname.replace(/(\d+)(?!.*\d)/, (match) => {
    return String(parseInt(match) + 1);
  });

  const apiUrl = "https://trgolpanel.matchkey.sbs/api/verirepo.php";

  let title = "";
  let description = "";
  let logo = "";
  let logowidth = "";
  let logoheight = "";
  let favicon = "";
  let amp = "";
  let canlisonuc = "";
  let twitter = "";
  let telegram = "";
  let facebook = "";
  let instagram = "";
  let youtube = "";
  let headerapi = "";
  let bodyapi = "";
  let footerapi = "";
  let analyticsapi = "";
  let apilinkcikisi = "";
  let pageskincolor = "";
  let footermetin = "";
  let reklam1 = "";
  let reklam2 = "";
  let reklam3 = "";
  let reklam4 = "";
  let reklam5 = "";
  let reklam6 = "";
  let hrefreklam1 = "";
  let hrefreklam2 = "";
  let hrefreklam4 = "";
  let hrefreklam5 = "";
  let hrefreklam6 = "";
  let hrefpageskin = "";

  // Menü verileri
  let menuler = [];
  let menuicon = "";
  let menuurl = "";
  let menuad = "";

  try {
    const response = await fetch(apiUrl);
    const json = await response.json();

    // Ayar verileri
    const ayar = json?.ayar || {};
    const playerlogo = json?.playerlogo || {};

    title = ayar.ayar_title || "";
    description = ayar.ayar_description || "";
    logo = ayar.ayar_logo || "";
    logowidth = ayar.logo_genislik || "";
    logoheight = ayar.logo_height || "";
    favicon = ayar.ayar_favicon || "";
    amp = ayar.amp_guncel || "";

    // Burada canlisonuc artık playerlogo içinden geliyor
    canlisonuc = playerlogo.iletisim_mesaj || "";

    twitter = ayar.ayar_twitter || "";
    telegram = ayar.ayar_telegram || "";
    facebook = ayar.ayar_facebook || "";
    instagram = ayar.ayar_instagram || "";
    youtube = ayar.ayar_youtube || "";
    headerapi = ayar.ayar_api || "";
    bodyapi = ayar.ayar_body || "";
    footerapi = ayar.ayar_footervole || "";
    analyticsapi = ayar.ayar_analystic || "";
    apilinkcikisi = ayar.ayar_linkcikis || "";
    pageskincolor = ayar.ayar_pcolor || "";
    footermetin = ayar.ayar_footermetin || "";
    reklam1 = ayar.ayar_reklam1 || "";
    hrefreklam1 = ayar.ayar_ust || "";
    reklam2 = ayar.ayar_reklam2 || "";
    hrefreklam2 = ayar.ayar_alt || "";
    reklam3 = ayar.ayar_reklam3 || "";
    hrefpageskin = ayar.ayar_pageskin || "";
    reklam4 = ayar.ayar_reklamust2 || "";
    hrefreklam4 = ayar.ayar_ust2 || "";
    reklam5 = ayar.ayar_reklamalt2 || "";
    hrefreklam5 = ayar.ayar_alt2 || "";
    reklam6 = ayar.ayar_reklam4 || "";
    hrefreklam6 = ayar.ayar_footerlink || "";

    // Menü verileri
    if (Array.isArray(json.menu)) {
      menuler = json.menu
        .filter(item => item.menu_durum === "1") // SADECE aktif (1) olanları al
        .sort((a, b) => Number(a.menu_sira) - Number(b.menu_sira)) // sırala
        .map(item => ({
          ad: item.menu_ad || "",
          url: item.menu_url || "",
          icon: item.menu_awesome || ""
        }));

      if (menuler.length > 0) {
        menuad = menuler[0].ad;
        menuurl = menuler[0].url;
        menuicon = menuler[0].icon;
      }
    }

  } catch (e) {
    console.error("API'den veri alınamadı:", e);
  }

  // Burada istediğin şekilde html vs oluşturabilirsin
  // Örnek:
  const html = `
<!DOCTYPE html>
<html lang="tr">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
<meta charset="utf-8">
<meta content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1' name='viewport'/>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com/" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:type" content="website" />
<link rel="shortcut icon" href="${favicon}" type="image/x-icon" />
<link rel="dns-prefetch" href="//edge10.xmediaget.com">
<link rel="preconnect" href="https://edge10.xmediaget.com" crossorigin>
<meta name="twitter:widgets:theme" content="dark">
<style>
.container-grid {
    display: grid;
    grid-template-columns: calc(650px - 0.5em) calc(375px - 0.5em);
    gap: 0.5em;
    align-items: flex-start;
    transition: all 200ms var(--transition);
}
 *::-webkit-scrollbar {
    width: 2px;
}
</style>
<!-- STYLE LİNK -->
<script>

var searchUsers = document.querySelector('#search'),
    users = document.querySelectorAll('.single-match show'),
    usersData = document.querySelectorAll('.single-match show'),
    searchVal;

searchUsers.addEventListener('keydown', function() {
  searchVal = this.value.toLowerCase();

  for (var i = 0; i < users.length; i++) {
    if (!searchVal || usersData[i].textContent.toLowerCase().indexOf(searchVal) > -1) {
      users[i].style['display'] = 'flex';
    }
    else {
      users[i].style['display'] = 'none';
    }
  }
});

</script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" />
<link rel="stylesheet" href="assets/css/jquery.fancybox.min.css" />
<link rel="stylesheet" href="assets/css/videoplayerb94db94d.css?v=130920202" />
<link rel="stylesheet" href="assets/css/playerstyleb94db94d.css?v=130920202" />
<link rel="stylesheet" href="assets/css/glide.coreb94db94d.css?v=130920202" />
<link rel="stylesheet" href="assets/css/glide.themeb94db94d.css?v=130920202" />
<link rel="stylesheet" href="assets/css/Styleb94d7839.css?v=1241242" />
<link rel="stylesheet" href="assets/css/radarb94db94d.css?v=130920202" />
<link rel="stylesheet" href="assets/css/Responsive1b94d7944.css?v=124" />
<link href="https://fonts.googleapis.com/css?family=Rubik:300,400,700&amp;display=swap" rel="stylesheet" />
 <style>

        .sayfa-arka {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background: url(${reklam3}) ${pageskincolor} no-repeat center top fixed;
    background-size: cover;
}

@media screen and (max-width:900px){
.ornekclass{
display: block;
}
}
   @media screen and (max-width: 600px) {
  .nomobile {
    visibility: hidden;
    clear: both;
    float: right;
    margin: 5px auto;
    width: 22%;
    height: auto;
    display: none; 
  }
}

        </style>
        ${headerapi}
        ${analyticsapi}
${
  hrefpageskin
    ? `<a href="${hrefpageskin}" target="_blank" rel="noopener" aria-label="Reklam"><div class="sayfa-arka nomobile">`
    : `<div class="sayfa-arka nomobile">`
}
${
  hrefpageskin ? `</div></a>` : `</div>`
}
</div>
<!-- STYLE LİNK -->
<link rel="amphtml" href="${amp}">
</head>
<body>

${bodyapi}

<!-- HEADER -->
<style>
    .live-list {
    border: 1px solid rgba(255,255,255,.1);
    border-radius: var(--radius);
    overflow: hidden;
}
.social-area {
    color:white;
}
</style>
<div class="header-top">
<div class="header-text"style="">  <p>Güncel adresimiz: <a href="https://${hostname}" target="_blank" rel="noopener" style="color:white;">${hostname}</a> - Sonraki adresimiz: <a href="https://${nextDomain}" target="_blank" rel="noopener" style="color:white;">${nextDomain}</a> olacaktır.</p>
    
    </div>
<div class="social-area">
${
  twitter 
    ? `<a href="${twitter}" target="_blank" rel="noopener" aria-label="Twitter">
         <svg aria-hidden="true" focusable="false" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
           <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 
           0 138.72-105.583 298.558-298.558 298.558-59.452 
           0-114.68-17.219-161.137-47.106 8.447.974 16.568 
           1.299 25.34 1.299 49.055 0 94.213-16.568 
           130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 
           6.498.974 12.995 1.624 19.818 1.624 9.421 0 
           18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985 
           v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843 
           -46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 
           14.294-52.954 51.655 63.675 129.3 105.258 
           216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 
           0-57.828 46.782-104.934 104.934-104.934 30.213 
           0 57.502 12.67 76.67 33.137 23.715-4.548 
           46.456-13.32 66.599-25.34-7.798 24.366-24.366 
           44.833-46.132 57.827 21.117-2.273 41.584-8.122 
           60.426-16.243-14.292 20.791-32.161 39.308-52.628 
           54.253z"></path>
         </svg>
       </a>` : ''
}

${
  instagram 
    ? `<a href="${instagram}" target="_blank" rel="noopener" aria-label="Instagram">
         <svg aria-hidden="true" focusable="false" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
           <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 
           114.9s51.3 114.9 114.9 114.9S339 319.5 
           339 255.9 287.7 141 224.1 141zm0 
           189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 
           74.7-74.7 74.7 33.5 74.7 74.7-33.6 
           74.7-74.7 74.7zm146.4-194.3c0 14.9-12 
           26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 
           26.8-26.8 26.8 12 26.8 26.8zm76.1 
           27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 
           0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 
           93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 
           9.9 67.7 36.2 93.9s58 34.4 93.9 
           36.2c37 2.1 147.9 2.1 184.9 
           0 35.9-1.7 67.7-9.9 93.9-36.2 
           26.2-26.2 34.4-58 36.2-93.9 
           2.1-37 2.1-147.8 0-184.8zM398.8 
           388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 
           11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 
           9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 
           29.5-11.7 99.5-9 132.1-9s102.7-2.6 
           132.1 9c19.6 7.8 34.7 22.9 42.6 
           42.6 11.7 29.5 9 99.5 9 
           132.1s2.7 102.7-9 132.1z"></path>
         </svg>
       </a>` : ''
}

${
  telegram 
    ? `<a href="${telegram}" target="_blank" rel="noopener" aria-label="Telegram">
         <svg aria-hidden="true" focusable="false" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
           <path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 
           22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 
           47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 
           190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 
           284 16.2 252.2c-22.1-6.9-22.5-22.1 
           4.6-32.7L418.2 66.4c18.4-6.9 
           34.5 4.1 28.5 32.2z"></path>
         </svg>
       </a>` : ''
}

${
  facebook
    ? `<a href="${facebook}" target="_blank" rel="noopener" aria-label="Facebook">
         <svg aria-hidden="true" focusable="false" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
           <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91V127.67c0-25.35 
           12.42-50.06 52.24-50.06h40.42V6.26S263.69 0 
           225.36 0C141.09 0 89.53 54.42 89.53 
           153.12v68.22H0V288h89.53v224h107.78V288z"></path>
         </svg>
       </a>` : ''
}

${
  youtube
    ? `<a href="${youtube}" target="_blank" rel="noopener" aria-label="YouTube">
         <svg aria-hidden="true" focusable="false" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
           <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.764-42.232-48.339-48.518C456.994 
           64 288 64 288 64s-168.994 0-213.316 
           11.565c-23.575 6.286-42.058 24.868-48.339 
           48.518C16 168.428 16 256 16 
           256s0 87.572 10.345 131.917c6.281 
           23.65 24.764 42.232 48.339 48.518C119.006 
           448 288 448 288 448s168.994 0 
           213.316-11.565c23.575-6.286 42.058-24.868 
           48.339-48.518C560 343.572 560 256 560 
           256s0-87.572-10.345-131.917zM232 
           336V176l142.857 80L232 336z"></path>
         </svg>
       </a>` : ''
}

</div>
</div>
<header>
<!-- HEADER -->

<!-- ÜST MENÜ -->
<a href="/">
<div class="logo">
<img src="${logo}" id="siteLogo" loading="lazy" alt="logo" width="${logowidth}" height="${logoheight}"/>
</div>


</a>

<ul>
  ${menuler.map(menu => `
    <li class="blink">
      <a href="${menu.url}" target="_self" rel="">
        <i class="${menu.icon}"></i>
        <span>${menu.ad}</span>
      </a>
    </li>
  `).join("")}
</ul>



</header>

<style>
    .single-match:nth-child(odd) {
    background: linear-gradient(135deg,transparent,rgba(255,255,255,0.1));
}
</style>

<!-- REKLAM -->
${reklam1 
  ? `<div style="margin: 10px; text-align: center;">
      ${hrefreklam1 
        ? `<a href="${hrefreklam1}" target="_blank"><img class="ads-img" src="${reklam1}" width="100%"/></a>` 
        : `<img class="ads-img" src="${reklam1}" width="100%"/>`}
    </div>` 
  : ''
}
${
  reklam4 
    ? `<div style="margin: 10px; text-align: center;">
         ${
           hrefreklam4 
             ? `<a href="${hrefreklam4}" target="_blank"><img class="ads-img" src="${reklam4}" width="100%"/></a>` 
             : `<img class="ads-img" src="${reklam4}" width="100%"/>`
         }
       </div>`
    : ''
}
<!-- REKLAM -->

<!-- PLAYER -->
<div class="container-grid player-grid">
  <center>
    <div class="live-player" data-loadbalancer="1" data-loadbalancerdomain="osflare.work">
      <div class="player-attributes">
        <center>
          <iframe id="macth-video" name="macth-video" width="100%" height="450" scrolling="no" frameborder="0" src="matches?id=bein-sports-1" allowfullscreen=""></iframe>
        </center>
      </div>
    </div>
  </center>
  <!-- PLAYER -->

  <!-- Maçlar ve Kanallar Sekmeleri -->
  <div class="player-channel-area" style="width: 100%; height: auto;">
    <div class="live-list radarOn" style="width: 100%;">
      <!-- Sekme Başlıkları -->
      <div class="head-grid" style="display: flex; justify-content: center; align-items: center; width: 100%;">
        <div class="active" data-focustab="live" id="live-tab" style="flex: 1; text-align: center; cursor: pointer;">
          <div class="list-blink"></div>
          <span>Maçlar</span>
        </div>
        <div data-focustab="next" id="next-tab" style="flex: 1; text-align: center; cursor: pointer;">
          <div class="list-blink"></div>
          <span>Kanallar</span>
        </div>
      </div>
<!-- Arama Kutusu -->
<style>

  .search-container {
    position: relative;
  }

.search-container input {
    color: white;
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    padding: 7px 35px 7px 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.3); /* Açık gri renk */
    outline: none; /* Focus olduğunda oluşan dış çizgiyi kaldırır */
}

.search-container input:focus {
    border: 1px solid rgba(255, 255, 255, 0.3); /* Focus durumunda da aynı açık gri çizgi */
}



  .search-container .search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; /* input'a tıklamaya engel olmasın */
    color: #888;
    font-size: 18px;
  }

  .search-container input::placeholder {
    color:#aaaaaa; 
}


</style>




<div class="search-container">
  <input type="text" id="matchSearchInput" placeholder="Maç veya kanal ara...">
  <span class="search-icon">🔍</span>
</div>

      <!-- Maçlar Sekmesi İçeriği -->
      <div id="live-content" class="active" data-tabbed="live" style="width: 100%; display: block;">
        <div class="live-list-grid" style="width: 100%;">
          <div class="list-tabbed"></div>
          <div class="list-area" style="width: 100%;">
            <div class="bet-matches" style="width: 100%;">
              <div id="real-matches" class="real-matches" style="width: 100%;">
                <div class="match-cover" style="width: 100%;">
                  <div class="match-tab-box" style="display: block; width: 100%;">
                    
                    <!-- Kategori Butonları -->
                    <style>
                    .kategori-bar {
  position: sticky;
  top: 0;
  z-index: 999;
  background: #fff; /* varsa */
}
</style>

             <!-- İçerik Alanı: Menü + Maçlar Yan Yana -->
<div style="display: flex; align-items: flex-start; gap: 10px;">


<script>
// DOM tamamen yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('matchSearchInput');
  searchInput.addEventListener('keyup', function () {
    const filter = this.value.toLowerCase();
    const matches = document.querySelectorAll('.single-match');

    matches.forEach(function (match) {
      const text = match.textContent.toLowerCase();
      match.style.display = text.includes(filter) ? 'flex' : 'none';
    });
  });
});
</script>

  <!-- Dikey Menü -->
 <div class="vertical-menu">
<div class="menu-item" data-matchfilter="Futbol,Futbol TR,Football, FutboI" title="Futbol">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="#ffffff">
        <path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16c-0.010-8.832-7.168-15.99-16-16zM16.571 4.613l5.562-2.223c0.631 0.286 1.242 0.615 1.828 0.985l0.015 0.009c0.576 0.365 1.126 0.768 1.646 1.207l0.045 0.039c0.234 0.199 0.461 0.405 0.681 0.617 0.028 0.027 0.057 0.053 0.085 0.081 0.232 0.226 0.456 0.459 0.673 0.699 0.018 0.020 0.035 0.042 0.053 0.062 0.19 0.213 0.373 0.434 0.551 0.659 0.043 0.053 0.085 0.107 0.127 0.16 0.193 0.249 0.379 0.503 0.555 0.765l-1.109 4.714-5.455 1.819-5.255-4.205zM4.163 6.911c0.041-0.053 0.084-0.107 0.126-0.16 0.176-0.223 0.357-0.44 0.545-0.652 0.020-0.022 0.039-0.045 0.059-0.068 0.216-0.24 0.439-0.473 0.67-0.699 0.027-0.026 0.053-0.053 0.081-0.077 0.219-0.211 0.444-0.416 0.676-0.614l0.053-0.045c0.516-0.436 1.061-0.837 1.631-1.2l0.021-0.013c0.582-0.37 1.189-0.698 1.817-0.984l5.588 2.213v5.387l-5.255 4.204-5.455-1.815-1.109-4.714c0.178-0.261 0.362-0.515 0.554-0.763zM3.52 24.184c-0.157-0.239-0.307-0.483-0.45-0.731l-0.035-0.060c-0.142-0.247-0.277-0.498-0.404-0.753l-0.004-0.008c-0.267-0.536-0.502-1.089-0.702-1.653v-0.005c-0.095-0.267-0.181-0.54-0.261-0.815l-0.029-0.101c-0.073-0.258-0.14-0.519-0.199-0.783-0.005-0.026-0.012-0.050-0.017-0.076-0.131-0.596-0.225-1.199-0.282-1.806l3.256-3.907 5.418 1.806 1.572 6.289-2.584 3.438zM19.552 30.503c-0.267 0.066-0.54 0.123-0.814 0.174-0.038 0.008-0.077 0.014-0.116 0.021-0.233 0.042-0.469 0.077-0.705 0.107-0.063 0.008-0.126 0.017-0.188 0.024-0.219 0.026-0.441 0.045-0.663 0.061-0.070 0.005-0.139 0.012-0.209 0.016-0.284 0.017-0.57 0.028-0.858 0.028-0.264 0-0.526-0.007-0.787-0.021-0.031 0-0.062-0.005-0.093-0.008-0.232-0.013-0.463-0.031-0.694-0.053l-0.027-0.005c-0.505-0.055-1.007-0.135-1.504-0.24l-3.155-4.939 2.543-3.391h7.431l2.585 3.413zM30.585 19.2c-0.005 0.026-0.012 0.050-0.017 0.076-0.060 0.264-0.126 0.524-0.199 0.783l-0.029 0.101c-0.080 0.275-0.166 0.547-0.261 0.815v0.005c-0.201 0.565-0.435 1.117-0.702 1.653l-0.004 0.008c-0.128 0.255-0.262 0.506-0.404 0.753l-0.035 0.060c-0.142 0.249-0.292 0.492-0.449 0.73l-5.262 0.83-2.602-3.435 1.572-6.287 5.418-1.806 3.256 3.907c-0.056 0.608-0.151 1.211-0.282 1.808z"></path>
  </svg>
</div>
   <div class="menu-item" data-matchfilter="Basketbol" title="Basketbol">
   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="#ffffff">
      <path d="M10.098 11.425l-6.065-6.065c-2.473 2.774-3.886 6.272-4.033 9.995 3.762-0.060 7.298-1.439 10.098-3.93z"></path>
        <path d="M11.425 10.098c2.49-2.8 3.869-6.336 3.93-10.098-3.723 0.147-7.22 1.56-9.995 4.033z"></path>
        <path d="M16.009 6.177c-0.766 1.938-1.86 3.7-3.255 5.25l3.246 3.246 10.64-10.64c-2.629-2.343-5.906-3.735-9.41-4-0.035 2.114-0.444 4.178-1.221 6.144z"></path>
        <path d="M31.967 14.77c-0.264-3.504-1.657-6.781-4-9.41l-10.64 10.64 3.246 3.246c1.55-1.395 3.312-2.489 5.25-3.255 1.966-0.777 4.032-1.186 6.144-1.221z"></path>
        <path d="M21.902 20.575l6.065 6.065c2.473-2.774 3.886-6.272 4.033-9.995-3.761 0.061-7.298 1.44-10.098 3.93z"></path>
        <path d="M20.575 21.902c-2.49 2.8-3.869 6.336-3.93 10.098 3.723-0.147 7.22-1.56 9.995-4.033z"></path>
        <path d="M14.673 16l-3.246-3.246c-1.55 1.396-3.312 2.489-5.25 3.255-1.966 0.777-4.030 1.187-6.144 1.221 0.264 3.503 1.657 6.781 4 9.409z"></path>
        <path d="M15.991 25.823c0.766-1.938 1.86-3.7 3.255-5.25l-3.246-3.246-10.64 10.64c2.629 2.343 5.906 3.735 9.41 4 0.035-2.114 0.444-4.178 1.221-6.144z"></path>
        </svg>
    </div>
 <div class="menu-item" data-matchfilter="Tenis" title="Tenis">
 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="#ffffff">
     <path d="M14.499 0.063c-7.657 0.743-13.697 6.784-14.432 14.377l-0.005 0.065c3.931 0.456 8.11 2.464 11.541 5.896s5.441 7.614 5.896 11.542c7.659-0.736 13.701-6.778 14.432-14.373l0.005-0.065c-3.921-0.455-8.108-2.464-11.539-5.896s-5.442-7.616-5.899-11.546z"></path>
        <path d="M31.999 15.518c-0.253-8.466-7.051-15.264-15.492-15.518l-0.024-0.001c0.442 3.438 2.266 7.131 5.329 10.192s6.75 4.883 10.188 5.326z"></path>
        <path d="M-0.001 16.488c0.257 8.463 7.051 15.257 15.49 15.512l0.024 0.001c-0.443-3.433-2.264-7.125-5.327-10.188s-6.75-4.879-10.188-5.325z"></path>
        </svg>
    </div>
    <div class="menu-item" data-matchfilter="Buz Hokeyi" title="Buz Hokeyi">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="vertical-align: middle; margin-right: 4px;" fill="currentColor" viewBox="0 0 24 24">
    <path d="M2 20h20v2H2v-2zm16.5-3.8c-.6 0-1.1-.2-1.5-.5L13 11.8l1.4-1.4 4 4 .1.1c.2.2.5.3.9.3s.6-.1.9-.3c.2-.2.3-.5.3-.9s-.1-.6-.3-.9L15.8 9.3l1.4-1.4 4.2 4.2c.6.6.9 1.4.9 2.2s-.3 1.6-.9 2.2c-.5.5-1.3.9-2.1.9zM3.7 16c-.4 0-.7-.1-1-.4-.3-.3-.4-.6-.4-1s.1-.7.4-1L14.6 1.3c.2-.2.5-.3.7-.3.3 0 .5.1.7.3l1 1c.4.4.4 1 0 1.4L5.1 16c-.3.3-.6.4-1 .4z"/>
  </svg>
    </div>
   
    <div class="menu-item" data-matchfilter="Voleybol" title="Voleybol">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="#ffffff">
        <path d="M10.712 8.951c4.982-4.304 11.99-5.349 17.986-2.726-2.931-3.785-7.518-6.223-12.676-6.223-2.493 0-4.852 0.569-6.956 1.585l0.001 0.56c0.002 2.401 0.585 4.728 1.646 6.804z"></path>
        <path d="M11.823 10.79c1.118 1.583 2.546 2.955 4.223 4.015 2.251-1.191 4.736-1.865 7.267-1.97l0.891-0.246 0.065 0.234c2.692 0.040 5.349 0.719 7.729 1.97-0.154-2.021-0.683-3.937-1.517-5.679l-0.2 0.345-0.914-0.53c-5.653-3.278-12.744-2.489-17.543 1.862z"></path>
        <path d="M22.655 15.006c-1.93 0.177-3.832 0.727-5.588 1.65-0.094 2.544-0.753 5.034-1.927 7.278l-0.232 0.894-0.236-0.061c-1.381 2.313-3.298 4.274-5.573 5.709 1.742 0.836 3.657 1.366 5.678 1.521l-0.197-0.343 0.916-0.527c5.665-3.257 8.527-9.791 7.159-16.123z"></path>
        <path d="M31.518 16.939c-2.080-1.199-4.387-1.856-6.715-1.975 1.236 6.466-1.363 13.058-6.633 16.939 7.446-0.998 13.273-7.109 13.831-14.686l-0.482-0.278z"></path>
        <path d="M3.204 8.016c-0.012 6.535 4.216 12.281 10.384 14.262 0.812-1.76 1.287-3.682 1.365-5.664-2.157-1.354-3.983-3.169-5.34-5.309l-0.659-0.648 0.17-0.173c-1.312-2.352-2.052-4.991-2.158-7.678-1.627 1.117-3.038 2.527-4.156 4.153l0.395 0.001-0.002 1.057z"></path>
        <path d="M12.552 24.159c-6.22-2.163-10.631-7.713-11.355-14.22-0.771 1.876-1.197 3.931-1.197 6.085 0 5.502 2.774 10.357 7 13.241l0.482-0.279c2.079-1.202 3.802-2.871 5.070-4.828z"></path>
        </svg>
    </div>
    <div class="menu-item" data-matchfilter="Masa Tenisi" title="Masa Tenisi">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="#ffffff">
         <path d="M32.52 28.294c0 2.047-1.659 3.706-3.706 3.706s-3.706-1.659-3.706-3.706c0-2.047 1.659-3.706 3.706-3.706s3.706 1.659 3.706 3.706z"></path>
        <path d="M26.524 3.901c-5.201-5.201-13.663-5.201-18.864 0-1.233 1.233-2.226 2.707-2.901 4.345l-0.032 0.089 17.365 17.365c1.726-0.709 3.2-1.701 4.433-2.934l-0 0c5.201-5.2 5.201-13.663 0-18.864z"></path>
        <path d="M3.795 12.28c-0.026 0.314-0.041 0.68-0.041 1.049 0 2.698 0.8 5.21 2.176 7.31l-0.031-0.051-5.701 5.701c-0.122 0.122-0.198 0.29-0.198 0.476s0.076 0.355 0.198 0.476l2.985 2.985c0.122 0.122 0.29 0.198 0.476 0.198s0.355-0.075 0.476-0.198v0l5.701-5.701c2.047 1.343 4.556 2.143 7.251 2.143 0.904 0 1.787-0.090 2.64-0.261l-0.085 0.014-15.64-15.64c-0.087 0.417-0.16 0.929-0.203 1.449l-0.003 0.048z"></path>
    </svg></div>
    <div class="menu-item" data-matchfilter="e-Sporlar" title="e-Sporlar">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="#ffffff">
        <path d="M28.025 6.283c-0.828-1.335-5.020-1.995-5.831-1.699-0.544 0.215-1.003 0.44-1.44 0.698l0.047-0.026c-1.303 0.815-2.887 1.299-4.583 1.299-0.054 0-0.108-0-0.162-0.001l0.008 0c-0.045 0.001-0.099 0.001-0.152 0.001-1.696 0-3.28-0.483-4.62-1.32l0.037 0.021c-0.39-0.232-0.849-0.457-1.325-0.648l-0.068-0.024c-0.815-0.296-5.005 0.363-5.833 1.699-3.381 5.449-5.31 17.909-3.128 20.202 0.396 0.444 0.971 0.723 1.61 0.723 0.075 0 0.15-0.004 0.223-0.011l-0.009 0.001c1.189-0.116 2.464-1.152 3.595-2.927l0.312-0.517c2.008-3.339 2.172-3.612 9.359-3.612s7.351 0.273 9.359 3.612l0.314 0.522c1.127 1.768 2.403 2.806 3.592 2.922 0.063 0.007 0.137 0.010 0.211 0.010 0.64 0 1.215-0.278 1.611-0.72l0.002-0.002c2.183-2.292 0.252-14.752-3.128-20.202zM22.843 7.059h1.509c0.139 0.002 0.25 0.114 0.25 0.253 0 0 0 0.001 0 0.001v-0 1.504c0 0 0 0 0 0 0 0.089-0.046 0.167-0.115 0.212l-0.001 0.001-0.755 0.485c-0.038 0.025-0.085 0.040-0.135 0.040s-0.097-0.015-0.136-0.040l0.001 0.001-0.763-0.485c-0.072-0.045-0.12-0.122-0.123-0.211v-1.504c0.008-0.142 0.124-0.254 0.267-0.255h0zM18.231 9.971c0.093-0.088 0.218-0.142 0.356-0.142s0.263 0.054 0.356 0.142l-0-0c0.092 0.091 0.148 0.217 0.148 0.356 0 0.277-0.225 0.502-0.502 0.502-0.001 0-0.001 0-0.002 0h0c-0.277-0.002-0.501-0.227-0.501-0.504 0-0.138 0.056-0.263 0.146-0.354l-0 0zM13.207 9.971c0.092-0.088 0.217-0.142 0.354-0.142s0.262 0.054 0.355 0.142l-0-0c0.091 0.091 0.148 0.216 0.148 0.355v0c0 0.001 0 0.002 0 0.003 0 0.276-0.224 0.5-0.5 0.5-0.139 0-0.265-0.057-0.356-0.149l-0-0c-0.090-0.091-0.145-0.215-0.145-0.353 0-0.001 0-0.001 0-0.002v0c0-0 0-0.001 0-0.001 0-0.138 0.055-0.263 0.144-0.354l-0 0zM7.809 12.339c-0.002 0-0.005 0-0.008 0-1.111 0-2.012-0.901-2.012-2.012s0.901-2.012 2.012-2.012c1.111 0 2.012 0.901 2.012 2.012 0 0 0 0 0 0v-0c0 0 0 0 0 0 0 1.108-0.897 2.007-2.005 2.010h-0zM15.063 15.859c0 0.003 0 0.008 0 0.012 0 0.133-0.107 0.242-0.24 0.244h-1.515v1.524c0 0.005 0.001 0.011 0.001 0.017 0 0.121-0.098 0.219-0.219 0.219-0.003 0-0.006-0-0.009-0h-1.515c-0.004 0-0.009 0-0.014 0-0.133 0-0.242-0.105-0.248-0.236l-0-0.001v-1.526h-1.491c-0.142-0.001-0.258-0.114-0.262-0.256v-1.512c0.006-0.137 0.118-0.245 0.256-0.245 0.002 0 0.005 0 0.007 0h1.491v-1.512c0.005-0.138 0.119-0.249 0.258-0.249 0.001 0 0.002 0 0.004 0h1.515c0.126 0.001 0.228 0.103 0.228 0.229 0 0.007-0 0.013-0.001 0.020l0-0.001v1.512h1.514c0.001-0 0.002-0 0.004-0 0.13 0 0.236 0.106 0.236 0.236 0 0.003-0 0.006-0 0.009v-0 1.513zM16.064 11.592c-0.001 0-0.003 0-0.005 0-0.699 0-1.266-0.567-1.266-1.266s0.567-1.266 1.266-1.266c0.699 0 1.266 0.567 1.266 1.266v0c0 0 0 0 0 0.001 0 0.697-0.564 1.263-1.261 1.265h-0zM19.805 17.152c-0.002 0-0.005 0-0.008 0-1.111 0-2.012-0.901-2.012-2.012s0.901-2.012 2.012-2.012c1.111 0 2.012 0.901 2.012 2.012v0c0 0 0 0.001 0 0.002 0 1.108-0.896 2.007-2.003 2.010h-0zM22.097 11.336h-1.498c-0.001 0-0.003 0-0.004 0-0.143 0-0.26-0.109-0.273-0.249l-0-0.001v-1.518c0.013-0.139 0.128-0.246 0.269-0.246 0.003 0 0.005 0 0.008 0h1.497c0.001 0 0.002-0 0.003-0 0.087 0 0.163 0.045 0.208 0.112l0.001 0.001 0.483 0.756c0.025 0.038 0.040 0.085 0.040 0.136s-0.015 0.097-0.041 0.136l0.001-0.001-0.483 0.757c-0.045 0.070-0.123 0.115-0.211 0.115-0 0-0 0-0 0h0zM24.352 13.598h-1.509c-0.144-0.004-0.26-0.118-0.267-0.261l-0-0.001v-1.504c0.003-0.089 0.051-0.167 0.122-0.211l0.001-0.001 0.759-0.485c0.038-0.025 0.085-0.039 0.136-0.039s0.097 0.015 0.137 0.040l-0.001-0.001 0.745 0.485c0.064 0.044 0.105 0.117 0.105 0.2 0 0.004-0 0.008-0 0.012l0-0.001v1.504c0.001 0.006 0.001 0.013 0.001 0.020 0 0.129-0.101 0.234-0.228 0.241l-0.001 0zM26.834 11.084c0 0.003 0 0.007 0 0.011 0 0.132-0.107 0.239-0.239 0.24h-1.498c-0 0-0.001 0-0.001 0-0.088 0-0.165-0.045-0.21-0.114l-0.001-0.001-0.483-0.757c-0.025-0.038-0.039-0.085-0.039-0.136s0.015-0.097 0.040-0.137l-0.001 0.001 0.483-0.755c0.045-0.068 0.121-0.113 0.208-0.113 0.001 0 0.002 0 0.004 0h1.497c0.001 0 0.002-0 0.003-0 0.13 0 0.236 0.106 0.236 0.236 0 0.004-0 0.007-0 0.011l0-0.001v1.516z"></path>
    </svg></div>
  </div>
  <!-- Maçlar İçeriği -->

<script>
document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let matches = document.querySelectorAll('.single-match');

    matches.forEach(function(match) {
        let text = match.textContent.toLowerCase();
        if (text.includes(filter)) {
            match.style.display = 'flex';
        } else {
            match.style.display = 'none';
        }
    });
});
</script>

  <div id="matches-content" style="flex-grow: 1;"></div>
</div>

<!-- CSS -->
<style>
.vertical-menu {
    background: rgba(35, 41, 47, .2);
    display: flex
;
    flex-direction: column;
    align-items: center;
    padding: 10px 5px;
    border-radius: 10px;
    gap: 10px;
    position: sticky;
    top: 0;
}

  .menu-item {
    width: 20px;
    height: 30px;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s;
  }

  .menu-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .menu-item.active {
    opacity: 1;
    filter: brightness(1.5);
  }
</style>

<!-- JS -->
<script>
  fetch('https://matchkey.sbs/load/matches.php')
    .then(response => response.text())
    .then(data => {
      document.getElementById('matches-content').innerHTML = data;

      // Çoklu filtre destekleyen versiyon
      function filterMatches(categoryStr) {
        const filters = categoryStr.split(',').map(f => f.trim().toLowerCase());
        const matches = document.querySelectorAll("#matches-content .single-match");

        matches.forEach(match => {
          const type = match.getAttribute("data-matchtype").toLowerCase();
          const isMatch = filters.includes(type);
          match.style.display = isMatch ? "flex" : "none";
        });
      }

      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', function () {
          menuItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');

          const category = this.getAttribute('data-matchfilter');
          filterMatches(category);  // Artık virgüllü değer destekliyor
        });
      });

      // Başlangıçta birden fazla filtre uygula
      filterMatches("Futbol,Futbol TR,Football,FutboI");
    })
    .catch(error => console.error('Veri yüklenirken hata:', error));
</script>






                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanallar Sekmesi İçeriği -->
      <div id="next-content" data-tabbed="next" style="width: 100%; display: none;">
        <div class="live-list-grid" style="width: 100%;">
          <div class="list-tabbed"></div>
          <div class="list-area" style="width: 100%;">
            <div class="bet-matches" style="width: 100%;">
              <div id="channel-matches" class="real-matches" style="width: 100%;">
                <div class="match-cover" style="width: 100%;">
                  <div class="match-tab-box" style="display: block; width: 100%;">
                    <div id="channels-content" style="width: 100%;">
                      <script>
                        fetch('https://matchkey.sbs/load/channels.php')
                          .then(response => response.text())
                          .then(data => {
                            document.getElementById('channels-content').innerHTML = data;
                          })
                          .catch(error => console.error('Dosya yüklenirken hata oluştu:', error));
                      </script>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- Sekmeler Arasında Geçiş İçin JavaScript -->
<script>
  document.getElementById('live-tab').addEventListener('click', function() {
    document.getElementById('live-content').style.display = 'block';
    document.getElementById('next-content').style.display = 'none';
  });

  document.getElementById('next-tab').addEventListener('click', function() {
    document.getElementById('live-content').style.display = 'none';
    document.getElementById('next-content').style.display = 'block';
  });
</script>

${
  reklam2
    ? `<div class="reklam-3" style="max-width:100%;height:100%;margin:0 auto;">
         ${
           hrefreklam2
             ? `<a href="${hrefreklam2}" target="_blank"><center><img src="${reklam2}" alt="reklamlar" /></center></a>`
             : `<center><img src="${reklam2}" alt="reklamlar" /></center>`
         }
       </div>`
    : ''
}

${
  reklam5
    ? `<div class="reklam-5" style="max-width:100%;height:100%;margin:0 auto;">
         ${
           hrefreklam5
             ? `<a href="${hrefreklam5}" target="_blank"><center><img src="${reklam5}" alt="reklamlar" /></center></a>`
             : `<center><img src="${reklam5}" alt="reklamlar" /></center>`
         }
       </div></div>`
    : ''
}
<!-- footer reklam bitis-->

<footer>
  <div class="footer-links">
    ${menuler.map(menu => ` <a href="${menu.url}" target="_blank" rel="noopener">${menu.ad}</a>`).join("")}
   
  </div>${
  canlisonuc == 0
    ? `<div style="position: relative; width: 100%; height: 150px;">
         <iframe src="https://www.sporx.com/_iframe/mac-merkezi/scoreboard.php" width="100%" height="100%" frameborder="0"></iframe>
         <div style="position: absolute; top: 0; left: 0; 
                     width: 100%; height: 100%; 
                     background: transparent; 
                     z-index: 9999;"></div>
       </div>`
    : ''
}


  </div>
  <center><img class="" src="${logo}" width="${logowidth}" alt="Canlı maç yayınları" /></center>
  <div class="copyright-text">
    <p>${footermetin}</p>
  </div>
  ${footerapi}
  ${apilinkcikisi}
</footer>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"></script>
<script src="assets/js/global8d5a8d5a.js?v=13092020"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/plyr/3.6.2/plyr.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/plyr/3.6.2/plyr.polyfilled.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/hls.js/0.14.0/hls.min.js"></script>
<script src="assets/js/playeroptions238603860.js?v=1"></script>
<script src="assets/js/glide11891189.js?v=13092020?v=1"></script>
<script src="assets/js/main11891189.js?v=13092020?v=1"></script>

<!-- Sabit Footer -->
${
  reklam6
    ? `<div style="position:fixed; bottom:0px; left:0; width:100%; text-align:center; z-index:999999;">
         <div style="position:relative; display:inline-block; max-width:100%;">
           <span onclick="this.parentNode.parentNode.style.display='none';" 
                 style="position:absolute; top:5px; right:5px; background:#49de80; color:black; width:25px; height:25px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; cursor:pointer; z-index:2; font-weight:bold; transition:all 0.3s;"
                 onmouseover="this.style.transform='scale(1.1)'; this.style.background='#2f9354';" 
                 onmouseout="this.style.transform='scale(1)'; this.style.background='#49de80';">×</span>
           ${
             hrefreklam6
               ? `<a href="${hrefreklam6}" target="_blank" style="display:block;">
                    <img src="${reklam6}" style="max-width:100%; height:auto; display:block; border-radius:6px;" />
                  </a>`
               : `<img src="${reklam6}" style="max-width:100%; height:auto; display:block; border-radius:6px;" />`
           }
         </div>
       </div>`
    : ''
}
<!-- Sabit Footer Sonu -->
</div>
</body>
</html>

 `;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
