// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import * as React from "react";
import { useForm, ValidationError } from "@formspree/react";
import BtnSubmit from "./BtnSubmit";

type FormDataType = {
  email: string;
  message: string;
};

const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState<FormDataType>({
    email: "",
    message: "",
  });
  const [submitState, handleSubmit] = useForm(
    process.env.FORMSPREE_ID as string,
  );

  React.useEffect(() => {
    if (submitState.succeeded) {
      setFormData({ email: "", message: "" });
    }
  }, [submitState.succeeded]);

  const style =
    "w-full bg-transparent px-4 border border-secondary-dark rounded-3xl `";
  const styleInput =
    "peer text-secondary-light placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary ";

  const getLabelStyle = (field: keyof FormDataType) =>
    `absolute left-3 transition-all duration-500 transform ${
      formData[field] ? "-top-6 scale-90 " : "top-3 scale-100 "
    } peer-focus:-top-6 peer-focus:scale-90 text-secondary peer-focus:text-primary `;

  return (
    <section
      id="Contact"
      className="min-h-dvh flex items-center justify-center"
    >
      <form className="space-y-6 w-1/2 round-3xl" onSubmit={handleSubmit}>
        {/* Honeypot Field */}
        <input type="text" name="_gotcha" className="hidden" />
        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            className={`${style} ${styleInput} h-12 `}
            placeholder="Email"
            value={formData.email}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            required
          />
          <label htmlFor="email" className={getLabelStyle("email")}>
            Email
          </label>
          <ValidationError
            prefix="Email"
            field="email"
            errors={submitState.errors}
          />
        </div>

        {/* Message Field */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${style} ${styleInput} py-2`}
            placeholder="Message"
            value={formData.message}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                message: event.target.value,
              }))
            }
            required
          />
          <label htmlFor="message" className={getLabelStyle("message")}>
            Message
          </label>
          <ValidationError
            prefix="Message"
            field="message"
            errors={submitState.errors}
          />
        </div>
        <BtnSubmit style={style} submitState={submitState} />
      </form>
    </section>
  );
};

export default Contact;
