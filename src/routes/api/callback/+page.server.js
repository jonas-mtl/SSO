import { redirect } from '@sveltejs/kit';

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function load({url, cookies}) {
  // fetch returnCode set in the URL parameters.
  const returnCode = url.searchParams.get('code');

  // initializing data object to be pushed to Discord's token endpoint.
  // the endpoint returns access & refresh tokens for the user.
  const dataObject = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: DISCORD_REDIRECT_URI,
    code: returnCode,
    scope: 'identify email guilds'
  };
  // performing a Fetch request to Discord's token endpoint
  const request = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams(dataObject),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const response = await request.json();

  // redirect to front page in case of error
  if (response.error) {
    throw redirect(302, '/');
  }

  // redirect user to front page with cookies set
  const access_token_expires_in = new Date(Date.now() + response.expires_in); // 10 minutes
  const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
   
  cookies.set('disco_access_token', response.access_token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    expires: access_token_expires_in
  });

  cookies.set('disco_refresh_token', response.refresh_token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    expires: refresh_token_expires_in
  });
  console.log(cookies.get('disco_refresh_token', ))

  throw redirect(302, '/profile');
}
