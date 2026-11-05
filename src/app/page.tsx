import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RootPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("deploycheck_session");

  if (session && session.value && session.value.length >= 32) {
    redirect("/app/dashboard");
  } else {
    redirect("/login");
  }
}
