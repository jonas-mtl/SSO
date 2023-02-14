import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({locals}) {
    if (!locals.user.id){
        throw redirect(302, '/');
    }

    return {locals};
}