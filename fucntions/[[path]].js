export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  const response = await env.ASSETS.fetch(request);
  
  if (response.status === 404 && !url.pathname.includes('.')) {
    return env.ASSETS.fetch(new URL('/index.html', request.url));
  }
  
  return response;
}