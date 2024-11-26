import * as React from "react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "stitch.png" }) {
        childImageSharp {
          gatsbyImageData(width: 200, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `);

  // Use getImage to safely extract the image data
  const imageData: IGatsbyImageData | undefined = getImage(
    data?.file?.childImageSharp?.gatsbyImageData,
  );

  return (
    <section
      id="Home"
      className="min-h-dvh flex flex-col items-center justify-center md:flex-row"
    >
      <img src={"/images/stitch.png"} alt="Logo" />
      <div className="relative">
        <h1 className="text-secondary text-4xl md:text-6xl">Developpeur</h1>
        <span className="absolute text-secondary -right-10 -bottom-7 text-xl md:text-2xl md:-right-15 md:-bottom-10">
          Full Stack
        </span>
      </div>
    </section>
  );
};

export default Home;
