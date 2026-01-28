import { Globe } from "lucide-react";

interface NavbarProps {
    setLang: (lang: "en" | "ru" | "ua") => void;
    lang: "en" | "ru" | "ua";
}

const Navbar = ({ setLang, lang }: NavbarProps) => {
    return (
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-primary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Globe className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold text-primary">
                            Artem Stakhov
                        </span>
                    </div>
                    <div className="flex space-x-2">
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
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
