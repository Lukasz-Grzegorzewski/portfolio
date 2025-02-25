import React, { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import BtnSubmit from "./BtnSubmit";
import { SetActiveSectionType } from "@pages/index";
import useScrollDistance from "@hooks/useScrollDistance";
import { useTranslation } from "react-i18next";

type FormDataType = {
  email: string;
  message: string;
};

const Contact = ({ setActiveSection }: SetActiveSectionType) => {
  const { isInView, elementRef } = useScrollDistance("Contact");
  const { t } = useTranslation("common");

  const [formData, setFormData] = React.useState<FormDataType>({
    email: "",
    message: "",
  });

  const [submitState, handleSubmit, resetForm] = useForm(
    process.env.FORMSPREE_ID as string,
  );

  useEffect(() => {
    if (isInView) setActiveSection("Contact");
  }, [isInView, setActiveSection]);

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
      ref={elementRef}
      className="min-h-dvh flex flex-col gap-10 items-center justify-center"
    >
      <h2 className="text-secondary-dark text-4xl text-center">
        {t("contact.title")} !
      </h2>
      <form
        className="space-y-6 w-3/4 round-3xl md:w-1/2"
        onSubmit={handleSubmit}
      >
        {/* Honeypot Field */}
        <input type="text" name="_gotcha" className="hidden" />
        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            className={`${style} ${styleInput} h-12 `}
            placeholder="Emdcfil"
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
            placeholder={t("contact.message")}
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
            {t("contact.message")}
          </label>
          <ValidationError
            prefix="Message"
            field="message"
            errors={submitState.errors}
          />
        </div>
        <BtnSubmit
          style={style}
          submitState={submitState}
          resetForm={resetForm}
        />
      </form>
    </section>
  );
};

export default Contact;
