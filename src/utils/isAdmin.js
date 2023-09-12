import { useGlobalContext } from '../hooks/useGlobal';

export default function isAdmin() {
  const { user } = useGlobalContext();

  const user_types = user?.is_admin;

  let is_admin = false;
  if (user_types.length > 0) {
    const verifyIfIsAdmin = user_types.find((types) => types.is_admin == 1);

    if (!!verifyIfIsAdmin) {
      is_admin = true;
    }
  }
  return is_admin;
}
