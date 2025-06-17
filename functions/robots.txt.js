export async function onRequest(context) {
  const content = `
User-agent: *
Allow: /
Sitemap: https://seninsiteadın.com/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
