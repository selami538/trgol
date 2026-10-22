async function fetchTimeout(url, options = {}, timeout = 3000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timer);
  }
}

async function loadStream(id) {

  if (!id) {
    document.body.innerHTML =
      "<h2 style='color:white;text-align:center;margin-top:20px'>ID eksik</h2>";
    return;
  }

  let streamUrl = "";

  // ==========================================
  // 1. ANA KAYNAK
  // Cinema yüzünden bunu ASLA bekletmiyoruz.
  // ==========================================
  try {

    const analyticsRes = await fetchTimeout(
      "https://teletv15.top/load/yayinlink.php?id=" + encodeURIComponent(id),
      {},
      4000
    );

    if (analyticsRes.ok) {
      const analyticsData = await analyticsRes.json();

      if (
        analyticsData.deismackanal &&
        analyticsData.deismackanal.includes("m3u8")
      ) {
        streamUrl = analyticsData.deismackanal;
      }
    }

  } catch (err) {
    console.warn("Ana kaynak cevap vermedi:", err);
  }


  // ==========================================
  // ANA KAYNAKTAN YAYIN GELDİYSE
  // CINEMA'YI HİÇ BEKLEME
  // ==========================================
  if (streamUrl) {
    startMainPlayer(streamUrl);
    return;
  }


  // ==========================================
  // 2. YEDEK KAYNAK: CINEMA
  // Sadece ana kaynakta yayın yoksa çalışır.
  // Maksimum 3 saniye bekler.
  // ==========================================
  try {

    const cinemaRes = await fetchTimeout(
      "https://streamsport365.com/cinema",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify({
          AppId: "5000",
          AppVer: "1",
          VpcVer: "1.0.12",
          Language: "en",
          Token: "",
          VideoId: id
        })
      },
      3000
    );

    if (cinemaRes.ok) {
      const cinemaData = await cinemaRes.json();

      if (cinemaData.URL) {
        streamUrl = cinemaData.URL;
      }
    }

  } catch (err) {
    console.warn("Cinema cevap vermedi / timeout:", err);
  }


  // ==========================================
  // SONUÇ
  // ==========================================
  if (streamUrl) {
    startMainPlayer(streamUrl);
  } else {
    document.body.innerHTML =
      "<h2 style='color:white;text-align:center;margin-top:20px'>Yayın bulunamadı</h2>";
  }
}
