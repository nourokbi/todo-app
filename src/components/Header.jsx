import { useEffect, useState } from "react";
import moon from "../images/icon-moon.svg";
import sun from "../images/icon-sun.svg";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    const localValue = localStorage.getItem("Theme");
    if (localValue == null) return "dark";

    return localValue;
  });

  useEffect(() => {
    if(theme === "dark") {
      document.body.classList.add("dark")
    }else {
      document.body.classList.remove("dark")
    }


    localStorage.setItem("Theme", theme);
  }, [theme]);

  function toggleTheme() {

    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <div className="container">
      <div className="header">
        <h1>TODO</h1>
        <div className="theme-toggler" onClick={toggleTheme}>
          {theme === "light" ? (
            <img src={moon} alt="Dark theme icon" />
          ) : (
            <img src={sun} alt="Light theme icon" />
          )}
        </div>
      </div>
    </div>
  );
}
