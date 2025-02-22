import {redirect} from "next/navigation";

import {Button} from "@/components/ui/button";
import {auth} from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main>
      <Button>Here will be the dashboard</Button>
    </main>
  );
}
