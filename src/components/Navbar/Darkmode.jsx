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
        
        rounded-full
        border-gray-300
        dark:border-gray-600
       text-2xl    
        text-black
        dark:text-white
        transition-all
        duration-300
        hover:scale-105
      "
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}

export default Darkmode;
