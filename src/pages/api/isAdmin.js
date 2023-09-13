import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession(req);

  session.user.is_admin
    ? res.redirect(300, '/adiministrador')
    : res.redirect(300, '/usuario');

  return;
}
