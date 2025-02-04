import { Link, navigate } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import { SetActiveSectionType } from "@pages/index";
import { useLocaleLanguageContext } from "@src/contexts/LocaleLanguageContext";
import { LocalLanguage } from "@src/types/localLanguage.type";

type NavbarMobileProps = SetActiveSectionType & {
  activeSection: string;
  setIsNavClick: (isNavClick: boolean) => void;
};

const NavbarMobile = ({
  activeSection,
  setActiveSection,
  setIsNavClick,
}: NavbarMobileProps) => {
  const { t } = useTranslation("common");
  const { localeLanguage, changLanguage } = useLocaleLanguageContext();

  const buttons = [
    {
      label: t("navbar.home"),
      href: "Home",
      iconUrlDark: "/images/icons/home_dark.png",
      iconUrlBlue: "/images/icons/home_blue.png",
    },
    {
      label: t("navbar.projects"),
      href: "Projects",
      iconUrlDark: "/images/icons/projects_dark.png",
      iconUrlBlue: "/images/icons/projects_blue.png",
    },
    {
      label: t("navbar.contact"),
      href: "Contact",
      iconUrlDark: "/images/icons/contact_dark.png",
      iconUrlBlue: "/images/icons/contact_blue.png",
    },
  ];

  const handleNavClick = (section: string) => {
    setIsNavClick(true);
    setActiveSection(section);
    setTimeout(() => setIsNavClick(false), 1000);
  };

  return (
    <nav className="fixed bottom-3 right-3 left-3 z-10 bg-transparent rounded-full outline-1 outline outline-secondary-dark backdrop-blur-md">
      <ul className="flex justify-around items-center p-3">
        {buttons.map((section) => (
          <Link key={section.href} to={`#${section.href}`}>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick(section.href)}
                className="w-8"
              >
                <img
                  src={
                    activeSection === section.href
                      ? section.iconUrlBlue
                      : section.iconUrlDark
                  }
                  alt={section.label}
                />
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
            className="bg-transparent border-none text-secondary-dark focus:outline-none "
          >
            <option value="fr" className="text-3xl">
              🇫🇷
            </option>
            <option value="en" className="text-3xl">
              🇬🇧
            </option>
            <option value="pl" className="text-3xl">
              🇵🇱
            </option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarMobile;
