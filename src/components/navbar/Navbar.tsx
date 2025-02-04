import { Link, navigate } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import { SetActiveSectionType } from "@pages/index";
import { useLocaleLanguageContext } from "@src/contexts/LocaleLanguageContext";
import { LocalLanguage } from "@src/types/localLanguage.type";
import NavbarDesktop from "./desktop/NavbarDesktop";
import NavbarMobile from "./desktop/NavbarMobile";

type NavbarProps = SetActiveSectionType & {
  activeSection: string;
  setIsNavClick: (isNavClick: boolean) => void;
};

const Navbar = ({
  activeSection,
  setActiveSection,
  setIsNavClick,
}: NavbarProps) => {
  return (
    <>
      <div className="hidden sm:flex">
        <NavbarDesktop
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setIsNavClick={setIsNavClick}
        />
      </div>

      <div className="sm:hidden">
        <NavbarMobile
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setIsNavClick={setIsNavClick}
        />
      </div>
    </>
  );
};

export default Navbar;
