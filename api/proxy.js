export const config = { runtime: 'edge' };

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing url', { status: 400 });
  }

  if (!targetUrl.includes('github.com')) {
    return new Response('Only GitHub', { status: 403 });
  }

  const response = await fetch(targetUrl, {
    headers: { 'User-Agent': 'OTA-Proxy/1.0' },
    redirect: 'follow'
  });

  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(response.body, {
    status: response.status,
    headers
  });
}
