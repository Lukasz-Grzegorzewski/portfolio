import { Link, navigate } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import { SetActiveSectionType } from "@pages/index";
import { useLocaleLanguageContext } from "@src/contexts/LocaleLanguageContext";
import { LocalLanguage } from "@src/types/localLanguage.type";

type NavbarProps = SetActiveSectionType & {
  activeSection: string;
  setIsNavClick: (isNavClick: boolean) => void;
};

const Navbar = ({
  activeSection,
  setActiveSection,
  setIsNavClick,
}: NavbarProps) => {
  const { t } = useTranslation("common");
  const { localeLanguage, changLanguage } = useLocaleLanguageContext();

  // const buttons = ["Home", "Projects", "Contact"];
  const buttons = [
    { label: t("navbar.home"), href: "Home" },
    { label: t("navbar.projects"), href: "Projects" },
    { label: t("navbar.contact"), href: "Contact" },
  ];

  const handleNavClick = (section: string) => {
    setIsNavClick(true);
    setActiveSection(section);
    setTimeout(() => setIsNavClick(false), 1000);
  };

  return (
    <nav className="fixed z-10 w-full max-w-screen-lg justify-end p-5 hidden sm:flex">
      <ul className="flex gap-10 justify-end ">
        {buttons.map((section) => (
          <Link key={section.href} to={`#${section.href}`}>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick(section.href)}
                className={`${activeSection === section.href ? "text-primary underline underline-offset-4" : "text-secondary"} transition-all duration-500`}
              >
                {section.label}
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

        <li>
          <select
            value={localeLanguage}
            onChange={(e) => changLanguage(e.target.value as LocalLanguage)}
            className="bg-transparent border-none ml-2 text-secondary focus:outline-none flex gap-0"
          >
            <option value="fr">
              <span className="text-3xl">🇫🇷</span> Français
            </option>
            <option value="en">
              <span className="text-3xl">🇬🇧</span> English
            </option>
            <option value="pl">
              <span className="text-3xl">🇵🇱</span> Polski
            </option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
