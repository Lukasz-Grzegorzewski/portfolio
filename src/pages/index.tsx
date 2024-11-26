import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
// import sections
import Navbar from "../components/navbar/Navbar";
import Home from "../components/home/Home";
import Projects from "../components/projects/Projects";
import Contact from "../components/contact/Contact";
import Layout from "../layouts/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="bg-background min-h-screen flex justify-center ">
      <Layout>
        <Navbar />
        <Home />
        <Projects />
        <Contact />
      </Layout>
      <h2 className="fixed left-2 top-2 text-secondary-dark text-3xl text-nowrap md:left-auto md:top-auto md:bottom-4 md:right-4">
        Lukasz Grzegorzewski
      </h2>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Portfolio</title>;
