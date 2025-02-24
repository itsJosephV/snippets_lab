import Link from "next/link";

import {buttonVariants} from "@/components/ui/button";

export default async function HomePage() {
  return (
    <main className="relative h-[calc(100vh-65px)]">
      <section className="flex flex-col items-center pt-16 text-center">
        <h1 className="text-4xl">This is the title for home page</h1>
        <p>some content</p>
        <div className="mt-4">
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "group",
            })}
            href="/dashboard"
          >
            Got to dashboard
          </Link>
        </div>
      </section>
      <footer className="fixed bottom-0 flex w-full justify-center border-t p-4">
        <div>this is a footer homepage</div>
      </footer>
    </main>
  );
}
