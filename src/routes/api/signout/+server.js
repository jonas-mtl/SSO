import { redirect } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({cookies}) {
    cookies.set('disco_access_token', "deleted", {
      path: '/',
      maxAge: -1
    });

    cookies.set('disco_refresh_token', "deleted", {
      path: '/',
      maxAge: -1
    });

    throw redirect(302, '/');
  }
  