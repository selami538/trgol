export async function onRequest(context) {
  const apiUrl = "https://apibaglan.site/api/verirepo.php";

  let title = "";
  let description = "";
  let logo = "";
  let logowidth = "";
  let logoheight = "";
  let favicon = "";
  let amp = "";
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
    title = ayar.ayar_title || "";
    description = ayar.ayar_description || "";
    logo = ayar.ayar_logo || "";
    logowidth = ayar.logo_genislik || "";
    logoheight = ayar.logo_height || "";
    favicon = ayar.ayar_favicon || "";
    amp = ayar.amp_guncel || "";
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

  // Örnek HTML cevabı (isteğe göre özelleştir)
  const html =  `
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
<link rel="stylesheet" href="assets/css/Styleb94d7839.css?v=124124" />
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
<div class="header-text"style=""><a href="/" target="_blank" rel="noopener"style="color:white;font-size: 15px;">Bir sonra ki alan adımız bir sayı artarak devam edecektir.</a></div>
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
    background: linear-gradient(135deg, transparent, rgba(255,255,255,0.1));
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
          <iframe id="macth-video" name="macth-video" width="100%" height="450" scrolling="no" frameborder="0" src="" allowfullscreen=""></iframe>
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

  <!-- Dikey Menü -->
 <div class="vertical-menu">
   <div class="menu-item" data-matchfilter="Futbol" title="Futbol">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#ffffff">
        <path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16c-0.010-8.832-7.168-15.99-16-16zM16.571 4.613l5.562-2.223c0.631 0.286 1.242 0.615 1.828 0.985l0.015 0.009c0.576 0.365 1.126 0.768 1.646 1.207l0.045 0.039c0.234 0.199 0.461 0.405 0.681 0.617 0.028 0.027 0.057 0.053 0.085 0.081 0.232 0.226 0.456 0.459 0.673 0.699 0.018 0.020 0.035 0.042 0.053 0.062 0.19 0.213 0.373 0.434 0.551 0.659 0.043 0.053 0.085 0.107 0.127 0.16 0.193 0.249 0.379 0.503 0.555 0.765l-1.109 4.714-5.455 1.819-5.255-4.205zM4.163 6.911c0.041-0.053 0.084-0.107 0.126-0.16 0.176-0.223 0.357-0.44 0.545-0.652 0.020-0.022 0.039-0.045 0.059-0.068 0.216-0.24 0.439-0.473 0.67-0.699 0.027-0.026 0.053-0.053 0.081-0.077 0.219-0.211 0.444-0.416 0.676-0.614l0.053-0.045c0.516-0.436 1.061-0.837 1.631-1.2l0.021-0.013c0.582-0.37 1.189-0.698 1.817-0.984l5.588 2.213v5.387l-5.255 4.204-5.455-1.815-1.109-4.714c0.178-0.261 0.362-0.515 0.554-0.763zM3.52 24.184c-0.157-0.239-0.307-0.483-0.45-0.731l-0.035-0.060c-0.142-0.247-0.277-0.498-0.404-0.753l-0.004-0.008c-0.267-0.536-0.502-1.089-0.702-1.653v-0.005c-0.095-0.267-0.181-0.54-0.261-0.815l-0.029-0.101c-0.073-0.258-0.14-0.519-0.199-0.783-0.005-0.026-0.012-0.050-0.017-0.076-0.131-0.596-0.225-1.199-0.282-1.806l3.256-3.907 5.418 1.806 1.572 6.289-2.584 3.438zM19.552 30.503c-0.267 0.066-0.54 0.123-0.814 0.174-0.038 0.008-0.077 0.014-0.116 0.021-0.233 0.042-0.469 0.077-0.705 0.107-0.063 0.008-0.126 0.017-0.188 0.024-0.219 0.026-0.441 0.045-0.663 0.061-0.070 0.005-0.139 0.012-0.209 0.016-0.284 0.017-0.57 0.028-0.858 0.028-0.264 0-0.526-0.007-0.787-0.021-0.031 0-0.062-0.005-0.093-0.008-0.232-0.013-0.463-0.031-0.694-0.053l-0.027-0.005c-0.505-0.055-1.007-0.135-1.504-0.24l-3.155-4.939 2.543-3.391h7.431l2.585 3.413zM30.585 19.2c-0.005 0.026-0.012 0.050-0.017 0.076-0.060 0.264-0.126 0.524-0.199 0.783l-0.029 0.101c-0.080 0.275-0.166 0.547-0.261 0.815v0.005c-0.201 0.565-0.435 1.117-0.702 1.653l-0.004 0.008c-0.128 0.255-0.262 0.506-0.404 0.753l-0.035 0.060c-0.142 0.249-0.292 0.492-0.449 0.73l-5.262 0.83-2.602-3.435 1.572-6.287 5.418-1.806 3.256 3.907c-0.056 0.608-0.151 1.211-0.282 1.808z"></path>
  </svg>
</div>

    <div class="menu-item" data-matchfilter="Buz Hokeyi" title="Buz Hokeyi">
      <img src="https://cdn-icons-png.flaticon.com/512/3200/3200786.png" alt="Buz Hokeyi" />
    </div>
    <div class="menu-item" data-matchfilter="Basketbol" title="Basketbol">
      <img src="https://cdn-icons-png.flaticon.com/512/1975/1975773.png" alt="Basketbol" />
    </div>
    <div class="menu-item" data-matchfilter="Tenis" title="Tenis">
      <img src="https://cdn-icons-png.flaticon.com/512/1975/1975765.png" alt="Tenis" />
    </div>
    <div class="menu-item" data-matchfilter="Voleybol" title="Voleybol">
      <img src="https://cdn-icons-png.flaticon.com/512/1975/1975755.png" alt="Voleybol" />
    </div>
    <div class="menu-item" data-matchfilter="Masa Tenisi" title="Masa Tenisi">
      <img src="https://cdn-icons-png.flaticon.com/512/880/880594.png" alt="Masa Tenisi" />
    </div>
    <div class="menu-item" data-matchfilter="FIFA" title="FIFA">
      <img src="https://cdn-icons-png.flaticon.com/512/4328/4328399.png" alt="FIFA" />
    </div>
    <div class="menu-item" data-matchfilter="e-Sporlar" title="e-Sporlar">
      <img src="https://cdn-icons-png.flaticon.com/512/2872/2872330.png" alt="e-Sporlar" />
    </div>
  </div>

  <!-- Maçlar İçeriği -->
  <div id="matches-content" style="flex-grow: 1;"></div>
</div>

<!-- CSS -->
<style>
  .vertical-menu {
    background: rgba(35, 41, 47, .2);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 5px;
    border-radius: 10px;
    gap: 10px;
  }

  .menu-item {
    width: 40px;
    height: 40px;
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
  fetch('https://hls-hill-804d.freelinkgene.workers.dev/https://apibaglan.site/api/matches.php')
    .then(response => response.text())
    .then(data => {
      document.getElementById('matches-content').innerHTML = data;

      function filterMatches(category) {
        const matches = document.querySelectorAll("#matches-content .single-match");
        matches.forEach(match => {
          const type = match.getAttribute("data-matchtype");
          match.style.display = (type === category) ? "flex" : "none";
        });
      }

      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', function () {
          menuItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
          const category = this.getAttribute('data-matchfilter');
          filterMatches(category);
        });
      });

      filterMatches("Futbol");
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
                        fetch('https://hls-hill-804d.freelinkgene.workers.dev/https://apibaglan.site/api/channels.php')
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
    <a href="https://dng.bet/" target="_blank" rel="noopener">Bahis</a>
    <a href="https://dng.bet/" target="_blank" rel="noopener">Canlı Bahis</a>
    <a href="https://dng.bet/" target="_blank" rel="noopener">Casino</a>
    <a href="https://dng.bet/" target="_blank" rel="noopener">Canlı Casino</a>
    <a href="https://dng.bet/" target="_blank" rel="noopener">Slot Oyunu</a>
    <a href="https://dng.bet/" target="_blank" rel="noopener">Bonuslar</a>
  </div>
  <div data-rc='[{"icon":"home","text":"Anasayfa","link":"/","target":"_self"},{"icon":"fas fa-newspaper","text":"Spor Bahisleri","link":"/","target":"_self"},{"icon":"fas fa-futbol","text":"Canlı Bahis","link":"","target":"_self"},{"icon":"fas fa-play","text":"Casino","link":"","target":"_self"},{"icon":"fas fa-tv","text":"Canlı Casino","link":"","target":"_self"},{"icon":"fas fa-basketball-ball","text":"Promosyonlar","link":"","target":"_self"},{"icon":"fas fa-fas fa-award","text":" Tombala","link":"","target":"_self"}]'>
    <script src="assets/js/rc.js"></script>
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
