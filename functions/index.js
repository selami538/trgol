export async function onRequest(context) {
  const apiUrl = "https://apibaglan.site/api/verirepo.php";

  let title = "Dengebet TV";
  let logo = "";
  let reklam1 = "";
  let reklam2 = "";
  let reklam3 = "";

  try {
    const response = await fetch(apiUrl);
    const json = await response.json();

    title = json?.ayar?.ayar_title || title;
    logo = json?.ayar?.ayar_logo || "";
    reklam1 = json?.ayar?.ayar_reklam1 || "";
    reklam2 = json?.ayar?.ayar_reklam2 || "";
    reklam3 = json?.ayar?.ayar_reklam3 || "";

  } catch (e) {
    console.error("API'den veri alınamadı:", e);
  }

  const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="${logo}" type="image/png">
    </head>
    <body>
      <header>
        <img src="${logo}" alt="Site Logo" style="max-height: 50px;">
        <h1>${title}</h1>
      </header>

      <section>
        <img src="${reklam1}" alt="Reklam 1">
        <img src="${reklam2}" alt="Reklam 2">
        <img src="${reklam3}" alt="Reklam 3">
      </section>

      <footer>
        <p>&copy; ${new Date().getFullYear()} Dengebet TV</p>
      </footer>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}
