import React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import Home from "@components/home/Home";
import Navbar from "@components/navbar/Navbar";
import Projects from "@components/projects/Projects";
import Contact from "@components/contact/Contact";
import Layout from "@layouts/Layout";
import { ProjectDetailsProvider } from "@src/contexts/ProjectDetailsContext";

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
    <main className="relative bg-background min-h-screen flex justify-center ">
      <Layout>
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
      </Layout>
      <h2 className="fixed left-2 top-2 text-secondary-dark text-3xl text-nowrap md:left-auto md:top-auto md:bottom-4 md:right-4">
        Lukasz Grzegorzewski
      </h2>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Lukasz</title>;
