import { Link } from "gatsby";
import React from "react";
import { SetActiveSectionType } from "@pages/index";

const Navbar = ({
  activeSection,
  setActiveSection,
}: SetActiveSectionType & { activeSection: string }) => {
  const buttons = ["Home", "Projects", "Contact"];

  return (
    <nav className="fixed w-full max-w-screen-lg justify-end p-5 hidden md:flex">
      <ul className="flex gap-10 justify-end ">
        {buttons.map((button) => (
          <Link key={button} to={`#${button}`}>
            <li>
              <button
                type="button"
                onClick={() => setActiveSection(button)}
                className={`${activeSection === button ? "text-primary underline underline-offset-4" : "text-secondary"} transition-all duration-500`}
              >
                {button}
              </button>
            </li>
          </Link>
        ))}

        <li>
          <a
            href={`${process.env.DOMAIN}/cv/CV_Lukasz_Grzegorzewski.pdf`}
            target="_blank"
            rel="noreferrer"
            className="text-secondary"
          >
            CV
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
