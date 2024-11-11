import * as React from "react";
import Loading from "../status/Loading";
import Success from "../status/Success";

type SubmitState = {
  submitting: boolean;
  succeeded: boolean;
};

type BtnSubmitProps = {
  style: string;
  submitState: SubmitState;
};

const BtnSubmit = ({ style, submitState }: BtnSubmitProps) => {
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (submitState.succeeded) {
      setSuccess(true);
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitState.succeeded]);

  const buttonContent = submitState.submitting ? (
    <Loading />
  ) : success ? (
    <Success />
  ) : (
    "Envoyer"
  );

  return (
    <button
      type="submit"
      className={`${style} h-12 text-primary flex items-center justify-center hover:neon-primary transition-all duration-700 ease-in-out`}
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
        Envoyer
      </span>
    </button>
  );
};

export default BtnSubmit;
