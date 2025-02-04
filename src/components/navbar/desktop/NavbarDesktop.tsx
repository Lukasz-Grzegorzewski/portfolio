import { Link, navigate } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import { SetActiveSectionType } from "@pages/index";
import { useLocaleLanguageContext } from "@src/contexts/LocaleLanguageContext";
import { LocalLanguage } from "@src/types/localLanguage.type";

type NavbarDesktopProps = SetActiveSectionType & {
  activeSection: string;
  setIsNavClick: (isNavClick: boolean) => void;
};

const NavbarDesktop = ({
  activeSection,
  setActiveSection,
  setIsNavClick,
}: NavbarDesktopProps) => {
  const { t } = useTranslation("common");
  const { localeLanguage, changLanguage } = useLocaleLanguageContext();

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
    <nav className="fixed z-10 w-full max-w-screen-lg justify-end p-5">
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
            href={`${process.env.DOMAIN}/cv/CV_Lukasz_Grzegorzewski_${localeLanguage}.pdf`}
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
            <option value="fr" className="text-3xl">
              🇫🇷 Français
            </option>
            <option value="en" className="text-3xl">
              🇬🇧 English
            </option>
            <option value="pl" className="text-3xl">
              🇵🇱 Polski
            </option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
