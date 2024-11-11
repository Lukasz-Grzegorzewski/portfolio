import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
// import sections
import Home from "../components/home/Home";
import Navbar from "../components/Navbar/Navbar";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";
import Layout from "../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="bg-background min-h-screen flex justify-center">
      <Layout>
        <Navbar />
        <Home />
        <Projects />
        <Contact />
      </Layout>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Portfolio</title>;
