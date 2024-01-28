import { auth } from '$lib/server/auth';
import { redirect } from 'sveltekit-flash-message/server';

export const load = async () => {
  throw redirect(302, '/');
};

export const actions = {
  default: async (event) => {
    // redirect to `/` if logged in
    if (!event.locals.session) throw redirect(302, '/');

    await auth.invalidateSession(event.locals.session.id);
    const sessionCookie = auth.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    throw redirect(
      '/',
      {
        type: 'success',
        message: 'Logged out successfully'
      },
      event
    );
  }
};
