import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  return session.user.is_admin
    ? res.redirect(302, '/administrador')
    : res.redirect(302, '/usuario');
}
