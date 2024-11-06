import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
// import sections
import Home from "../components/home/Home";
import Navbar from "../components/Navbar/Navbar";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";
import Layout from "../components/Layout";
// import types
import { ProjectType } from "../types/project.type";
import { ContentfulType } from "../types/contentful.type";

const IndexPage: React.FC<PageProps<ContentfulType>> = ({ data }) => {
  const projects: ProjectType[] = data.items.edges.map((edge) => edge.node);

  return (
    <main className="bg-background min-h-screen flex justify-center">
      <Layout>
        <Navbar />
        <Home label="Home" />
        <Projects projects={projects} />
        <Contact />
      </Layout>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

export const query = graphql`
  query MyQuery {
    items: allContentfulProject {
      edges {
        node {
          name
          url
        }
      }
    }
  }
`;
