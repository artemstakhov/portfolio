import React, { useState, useEffect } from "react";
import { Globe, Linkedin, Github } from "lucide-react";

interface NavbarProps {
    setLang: (lang: "en" | "ru" | "ua") => void;
    lang: "en" | "ru" | "ua";
}

const Navbar = ({ setLang, lang }: NavbarProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-primary/20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Globe className="h-6 w-6 text-primary" />
                        <span className="text-lg sm:text-xl font-bold text-primary hidden sm:block">
                            Artem Stakhov
                        </span>
                        <span className="text-lg font-bold text-primary sm:hidden">
                            Artem
                        </span>
                        <a
                            href="https://github.com/artemstakhov"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                        >
                            <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/artem-stakhov-810587252/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                        >
                            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                        </a>
                    </div>
                    <div className="flex space-x-2">
                        {isMobile ? (
                            <select
                                value={lang}
                                onChange={(e) => setLang(e.target.value as "en" | "ru" | "ua")}
                                className="px-3 pr-8 py-2 rounded-md text-sm font-medium bg-background text-primary border border-primary/20 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors appearance-none bg-no-repeat bg-right-2"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundSize: '1.5em 1.5em',
                                }}
                            >
                                <option value="en">EN</option>
                                <option value="ru">RU</option>
                                <option value="ua">UA</option>
                            </select>
                        ) : (
                            <>
                                <button
                                    onClick={() => setLang("en")}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        lang === "en"
                                            ? "bg-cyan-400 text-black shadow-lg"
                                            : "text-foreground hover:bg-primary/10"
                                    }`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => setLang("ru")}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        lang === "ru"
                                            ? "bg-cyan-400 text-black shadow-lg"
                                            : "text-foreground hover:bg-primary/10"
                                    }`}
                                >
                                    RU
                                </button>
                                <button
                                    onClick={() => setLang("ua")}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        lang === "ua"
                                            ? "bg-cyan-400 text-black shadow-lg"
                                            : "text-foreground hover:bg-primary/10"
                                    }`}
                                >
                                    UA
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
