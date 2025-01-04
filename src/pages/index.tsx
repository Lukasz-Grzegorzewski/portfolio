import React, { useCallback } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import Home from "@components/home/Home";
import Navbar from "@components/navbar/Navbar";
import { Projects } from "@src/components/projects/Projects";
import Contact from "@components/contact/Contact";
import Layout from "@layouts/Layout";
import { ProjectDetailsProvider } from "@src/contexts/ProjectDetailsContext";
import { LocaleLanguageProvider } from "@src/contexts/LocaleLanguageContext";

export type SetActiveSectionType = {
  setActiveSection: (activeSection: string) => void;
  isNavClick?: boolean;
};

const IndexPage: React.FC<PageProps> = () => {
  const [activeSection, setActiveSection] = React.useState("");
  const [isNavClick, setIsNavClick] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash === "") {
        window.location.hash = "#Home";
        setActiveSection("Home");
      }
    }
  }, []);

  return (
    <main className="relative bg-background min-h-screen flex justify-center">
      <Layout>
        <LocaleLanguageProvider>
          <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setIsNavClick={setIsNavClick}
          />
          <Home setActiveSection={setActiveSection} />
          <ProjectDetailsProvider>
            <Projects
              setActiveSection={setActiveSection}
              isNavClick={isNavClick}
            />
          </ProjectDetailsProvider>
          <Contact setActiveSection={setActiveSection} />
        </LocaleLanguageProvider>
      </Layout>
      <h2 className="fixed left-2 top-2 text-secondary-dark text-3xl text-nowrap sm:left-auto sm:top-auto sm:bottom-4 sm:right-4">
        Lukasz Grzegorzewski
      </h2>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Lukasz</title>;

export const query = graphql`
  query {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
