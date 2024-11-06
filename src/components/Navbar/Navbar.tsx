import { Link } from "gatsby";
import * as React from "react";

const Navbar = () => {
  const [active, setActive] = React.useState("");

  const buttons = ["Home", "Projects", "Contact"];

  return (
    <nav>
      <ul className="fixed right-16 flex gap-10 justify-end pt-5">
        {buttons.map((button) => (
          <Link key={button} to={`#${button}`}>
            <li>
              <button
                type="button"
                onClick={() => setActive(button)}
                className={`${active === button ? "text-primary underline underline-offset-4" : "text-secondary"} transition-all duration-500`}
              >
                {button}
              </button>
            </li>
          </Link>
        ))}

        <li>
          <button
            type="button"
            onClick={() => setActive("My CV")}
            className={`${active === "My CV" ? "text-primary underline underline-offset-4" : "text-secondary"} transition-all duration-500`}
          >
            My CV
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
