import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";
import UserCard from "./components/UserCard";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) {
    // redirect("/api/auth/signin?callbackUrl=/server");
    return (
      <section className="flex flex-col gap-6">
        <p>{"You aren't logged in"}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype={"Server"} />
    </section>
  );
}
