import React, { useEffect } from "react";
import Loading from "@components/status/Loading";
import Success from "@components/status/Success";
import { useTranslation } from "react-i18next";

type SubmitState = {
  submitting: boolean;
  succeeded: boolean;
};

type BtnSubmitProps = {
  style: string;
  submitState: SubmitState;
  resetForm: () => void;
};

const BtnSubmit = ({ style, submitState, resetForm }: BtnSubmitProps) => {
  const [success, setSuccess] = React.useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (submitState.succeeded) {
      setSuccess(true);
      const timer = setTimeout(() => {
        setSuccess(false);
        resetForm();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitState.succeeded, resetForm]);

  const buttonContent = submitState.submitting ? (
    <Loading />
  ) : success ? (
    <Success />
  ) : (
    t("contact.submit")
  );

  return (
    <button
      type="submit"
      className={`
        ${style}
        h-12 text-primary flex items-center justify-center 
        transition-all duration-700 ease-in-out
        ${!submitState.submitting && !success ? "hover:neon-primary" : ""}
      `}
      disabled={submitState.submitting || success}
    >
      <span
        className={`transition-all duration-500 ${
          success ? "opacity-100" : "opacity-0 absolute"
        }`}
      >
        <Success />
      </span>

      <span
        className={`transition-all duration-500 ${
          success ? "opacity-0 absolute" : "opacity-100"
        }`}
      >
        {buttonContent}
      </span>
    </button>
  );
};

export default BtnSubmit;
