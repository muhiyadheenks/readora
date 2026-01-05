import React, { useEffect, useState } from 'react';

function Darkmode() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="
        px-4
        py-2
        rounded-full
        border
        border-gray-300
        dark:border-gray-600
        bg-white
        dark:bg-gray-800
        text-black
        dark:text-white
        transition-all
        duration-300
        hover:scale-105
      "
        >
            {theme === "light" ? "Dark" : "☀️ Light"}
        </button>
    );
}

export default Darkmode;
