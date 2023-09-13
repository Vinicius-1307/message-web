export default function handler(req, res) {
  const { data: session } = useSession();
  const router = useRouter();

  session.user.is_admin
    ? router.push("/adiministrador")
    : router.push("/usuario");
}
