import * as React from "react";
import { type PageProps } from "gatsby";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full max-w-screen-lg grid grid-cols-1 scroll-smooth">
      {children}
    </div>
  );
};

export default Layout;
