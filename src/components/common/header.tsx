import Image from "next/image";
import icon from "@/assets/images/splash.png";

export default function Header() {
  return (
    <header className="row-start-3 flex gap-6 flex-wrap items-center justify-between px-6 bg-neutral-700">
      <div className="flex items-center">
        <Image
          aria-hidden
          src={icon}
          alt="File icon"
          width={50}
          height={50}
        />
        <b style={{
          color: "#fff",
          textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
        }}>
          Kaiden Software
        </b>
      </div>
      <div className="row-start-3 flex gap-6 flex-wrap items-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          About
        </a>
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a> */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to Book →
        </a>
      </div>
    </header >
  );
}
