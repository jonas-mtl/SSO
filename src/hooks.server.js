
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

const DISCORD_API_URL = import.meta.env.VITE_DISCORD_API_URL;
const HOST = import.meta.env.VITE_HOST;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  //console.log(req.event.cookies)
  //const cookies = cookie.parse(req.event.cookies || '');

  const disco_refresh_token_var = event.cookies.get("disco_refresh_token")
  const disco_access_token_var = event.cookies.get("disco_access_token")

  
  // if only refresh token is found, then access token has expired. perform a refresh on it.
  if (disco_refresh_token_var && !disco_access_token_var) {
    const discord_request = await fetch(`${HOST}/api/refresh?code=${disco_refresh_token_var}`);
    const discord_response = await discord_request;
    console.log(`${HOST}/api/refresh?code=${disco_refresh_token_var}`)

    if (discord_response.disco_access_token) {
      const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
        headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
      });
      // returns a discord user if JWT was valid
      const response = await request.json();
      if (response.id) {
        return new Response( {
          user: {
            // only include properties needed client-side —
            // exclude anything else attached to the user
            // like access tokens etc
            ...response
          }
        })
      }
    }
  }
  

  if (disco_access_token_var) {
    const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
      headers: { 'Authorization': `Bearer ${disco_access_token_var}`}
    });

    // returns a discord user if JWT was valid
    const response = await request.json();
    // returns a discord user if JWT was valid

    if (response.id) {
      event.locals.user = {...response}
      return await resolve(event)
    }
  }

  // not authenticated, return empty user object
  const response = await resolve(event);
  return response;
}