import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
redirect
export default async function ContestPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  return <div>Welcome to Contest Page</div>;
}