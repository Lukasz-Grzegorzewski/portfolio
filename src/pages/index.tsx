import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
// import sections
import Navbar from "../components/navbar/Navbar";
import Home from "../components/home/Home";
import Projects from "../components/projects/Projects";
import Contact from "../components/contact/Contact";
import Layout from "../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="bg-background min-h-screen flex justify-center ">
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
