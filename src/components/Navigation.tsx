import { useState, useEffect } from "react";
import {
    ChevronUp,
    Home,
    Map,
    Code,
    Briefcase,
    Award,
    User,
    Mail,
} from "lucide-react";

interface NavigationProps {
    roadmapTitle: string;
    skillsTitle: string;
    experienceTitle: string;
    certificatesTitle: string;
    personalTitle: string;
    contactTitle: string;
}

const Navigation = ({
    roadmapTitle,
    skillsTitle,
    experienceTitle,
    certificatesTitle,
    personalTitle,
    contactTitle,
}: NavigationProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroElement = document.getElementById("hero");
            const heroHeight = heroElement
                ? heroElement.offsetHeight
                : window.innerHeight;
            const scrollY = window.scrollY;

            setIsVisible(scrollY < heroHeight - 100);
            setShowScrollTop(scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = 66;
            window.scrollTo({
                top: element.offsetTop - navbarHeight,
                behavior: "smooth",
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const sections = [
        { id: "hero", label: "Home", icon: Home },
        { id: "roadmap", label: roadmapTitle, icon: Map },
        { id: "skills", label: skillsTitle, icon: Code },
        { id: "experience", label: experienceTitle, icon: Briefcase },
        { id: "certificates", label: certificatesTitle, icon: Award },
        { id: "personal", label: personalTitle, icon: User },
        { id: "contact", label: contactTitle, icon: Mail },
    ];

    return (
        <>
            {isVisible && (
                <nav className="hidden md:block bg-background/90 backdrop-blur-sm border-t border-primary/20 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center space-x-6 overflow-x-auto">
                            {sections.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-primary/70 hover:text-primary hover:bg-primary/10 transition-colors whitespace-nowrap"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            )}

            {!isVisible && (
                <div className="hidden md:block fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-2">
                    {sections.slice(1).map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className="w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary rounded-full flex items-center justify-center transition-colors shadow-lg"
                            title={label}
                        >
                            <Icon className="h-5 w-5" />
                        </button>
                    ))}
                </div>
            )}

            <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex flex-row space-x-2 bg-background/80 backdrop-blur-sm rounded-lg p-2">
                {sections.slice(1).map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className="w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary rounded-full flex items-center justify-center transition-colors shadow-lg"
                        title={label}
                    >
                        <Icon className="h-5 w-5" />
                    </button>
                ))}
            </div>

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 w-12 h-12 bg-background/80 md:bg-primary text-primary md:text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 md:hover:bg-primary/90 transition-colors z-50"
                >
                    <ChevronUp className="h-6 w-6" />
                </button>
            )}
        </>
    );
};

export default Navigation;
