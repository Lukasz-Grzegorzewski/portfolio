import * as React from "react";

type HomeProps = {
  label: string;
};

const Home = ({ label }: HomeProps) => {
  return (
    <section id={label} className="h-screen">
      Home content
    </section>
  );
};

export default Home;
