import Image from "next/image";

import icon from "@/assets/images/icon.png";
import { Button } from "@/components/ui/button";

export default function About() {
  return (<>
    <Image
      className="dark:invert"
      src={icon}
      alt="Next.js logo"
      width={180}
      height={38}
      priority
    />
    <p className="text-center sm:text-left text-sm text-neutral-600 dark:text-neutral-400">
      <span className="font-semibold">Kaiden Software</span> Founded in 2023, Kaiden is a forward-thinking company specializing in providing cutting-edge software services.
    </p>
    <p className="text-center sm:text-left text-sm text-neutral-600 dark:text-neutral-400">
      We focus on two primary areas: web design and game development. Our expert team is dedicated to delivering innovative solutions that meet the evolving needs of businesses and entertainment industries alike. Whether it’s crafting user-friendly websites or building immersive gaming experiences, Kaiden is committed to excellence in every project.
    </p>

    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Button>
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Booking now
      </Button>
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read our docs
      </a>
    </div></>
  );
}