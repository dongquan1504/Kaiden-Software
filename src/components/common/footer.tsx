import { FileUser, Codepen, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const linkClassName = "flex items-center gap-2 hover:underline hover:underline-offset-4 bg-white rounded-lg p-1";

  return (
    <footer className="">
      <div className="w-full flex flex-col gap-6 flex-wrap items-center justify-center bg-neutral-700 p-6">
        <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className={linkClassName}
            href="https://dongquan-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileUser />
          </a>
          <a
            className={linkClassName}
            href="https://codepen.io/dongquan1504"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Codepen />
          </a>
          <a
            className={linkClassName}
            href="https://www.linkedin.com/in/quan1504/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
          <a
            className={linkClassName}
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </div>
        <hr className="border-white" />
        <p className="text-white">
          developed by <a
            href="https://dongquan-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer">Duong Dong Quan</a>
        </p>
      </div>
    </footer>
  );
}
