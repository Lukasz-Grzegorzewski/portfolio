import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type ProjectDetailsContextProps = {
  openModal: (projectId: string) => void;
  closeModal: () => void;
  projectNameModal: string;
};

const ProjectDetailsContext = createContext<
  ProjectDetailsContextProps | undefined
>(undefined);

export const ProjectDetailsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [projectNameModal, setProjectNameModal] = useState("");

  const openModal = useCallback((projectNameModal: string) => {
    setProjectNameModal(projectNameModal);
  }, []);

  const closeModal = useCallback(() => {
    setProjectNameModal("");
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (projectNameModal) {
        document.documentElement.classList.add("no-scroll");
      } else {
        document.documentElement.classList.remove("no-scroll");
      }
    }
  }, [projectNameModal]);

  return (
    <ProjectDetailsContext.Provider
      value={{ openModal, closeModal, projectNameModal }}
    >
      {children}
    </ProjectDetailsContext.Provider>
  );
};

export const useProjectDetailsContext = () => {
  const context = useContext(ProjectDetailsContext);
  if (!context) {
    throw new Error(
      "useProjectDetailsContext must be used within a ProjectDetailsProvider",
    );
  }
  return context;
};
