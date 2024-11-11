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
    <section id="Home" className="min-h-dvh flex items-center justify-center">
      {imageData && (
        <GatsbyImage
          image={imageData}
          alt="logo"
          backgroundColor="transparent"
        />
      )}
      <div className="relative">
        <h1 className="text-secondary text-6xl">Developpeur</h1>
        <span className="absolute text-secondary -right-20 -bottom-10 text-3xl">
          Full Stack
        </span>
      </div>
    </section>
  );
};

export default Home;
