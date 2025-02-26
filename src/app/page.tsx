import Link from "next/link";

import {buttonVariants} from "@/components/ui/button";
import Footer from "@/components/Footer";

export default async function HomePage() {
  return (
    <main>
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
      <Footer />
    </main>
  );
}
