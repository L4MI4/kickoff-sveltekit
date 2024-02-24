// Types
import type { Action, Actions } from './$types';

// Utils
import { auth } from '$lib/server/auth';
import { redirect } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { setFormFail, setFormError } from '$lib/utils/helpers/forms';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import * as m from '$lib/utils/messages';

// Schemas
import { loginSchema } from '$lib/validations/auth';

// Database
import db from '$lib/server/database';
import { Users } from '$models/user';

export async function load({ locals }) {
  // redirect to `/` if logged in
  if (locals.user) redirect(302, '/');

  const form = await superValidate(zod(loginSchema));

  return {
    metadata: {
      title: 'Login'
    },
    form
  };
}

const login: Action = async (event) => {
  const form = await superValidate(event.request, zod(loginSchema));

  if (!form.valid) {
    return setFormFail(form, { removeSensitiveData: ['password'] });
  } else {
    const { password, email } = form.data;

    try {
      const user = await db.query.Users.findFirst({
        where: eq(Users.email, email)
      });

      if (!user) {
        return setFormError(
          form,
          m.login.error,
          {
            status: 401,
            field: 'email',
            removeSensitiveData: ['password']
          },
          event
        );
      }

      const validPassword = await new Argon2id().verify(user.hashedPassword!, password);

      if (!validPassword) {
        return setFormError(
          form,
          m.login.error,
          {
            status: 401,
            field: 'email',
            removeSensitiveData: ['password']
          },
          event
        );
      }

      const session = await auth.createSession(user.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
    } catch (e: any) {
      return setFormError(
        form,
        m.general.error,
        {
          status: 500,
          removeSensitiveData: ['password']
        },
        event
      );
    }
  }

  redirect(
    '/',
    {
      type: 'success',
      message: m.login.success
    },
    event
  );
};

export const actions: Actions = { login };
