import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full max-w-screen-lg grid grid-cols-1">{children}</div>
  );
};

export default Layout;
