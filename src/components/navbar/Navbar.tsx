import { Link } from "gatsby";
import React from "react";
import { SetActiveSectionType } from "@pages/index";

type NavbarProps = SetActiveSectionType & {
  activeSection: string;
  setIsNavClick: (isNavClick: boolean) => void;
};

const Navbar = ({
  activeSection,
  setActiveSection,
  setIsNavClick,
}: NavbarProps) => {
  const buttons = ["Home", "Projects", "Contact"];

  const handleNavClick = (section: string) => {
    setIsNavClick(true);
    setActiveSection(section);
    setTimeout(() => setIsNavClick(false), 1000);
  };

  return (
    <nav className="fixed z-10 w-full max-w-screen-lg justify-end p-5 hidden sm:flex">
      <ul className="flex gap-10 justify-end ">
        {buttons.map((section) => (
          <Link key={section} to={`#${section}`}>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick(section)}
                className={`${activeSection === section ? "text-primary underline underline-offset-4" : "text-secondary"} transition-all duration-500`}
              >
                {section}
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
