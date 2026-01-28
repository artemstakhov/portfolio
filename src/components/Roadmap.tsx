import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface RoadmapItem {
    year: string;
    title: string;
    description: string;
}

interface RoadmapProps {
    title: string;
    data: RoadmapItem[];
}

const Roadmap = ({ title, data }: RoadmapProps) => {
    const items = data.slice().reverse();

    return (
        <section
            id="roadmap"
            className="pt-20 pb-16 md:py-20 bg-background text-foreground relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-bold text-center mb-12 md:mb-20 text-primary relative z-10"
            >
                {title}
            </motion.h2>

            <div className="max-w-6xl mx-auto relative px-4 md:px-6 lg:px-8">
                {/* === ГЛАВНАЯ ЛИНИЯ === */}
                <div className="absolute top-0 bottom-0 w-1 bg-accent/50 rounded-full left-4 md:left-1/2 transform -translate-x-1/2 z-0" />

                {/* === СТРЕЛКА ВВЕРХ === */}
                <svg
                    className="absolute top-0 left-4 md:left-1/2 transform -translate-x-1/2 -translate-y-[99%] z-0 pointer-events-none"
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M8 0L16 10H0L8 0Z" className="fill-accent/50" />
                </svg>

                <div className="flex flex-col gap-6 md:gap-12 mt-4 md:mt-0">
                    {items.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const isLast = index === items.length - 1;

                        return (
                            <div
                                key={index}
                                className={`relative flex w-full
                  ${isEven ? "md:ml-auto md:w-1/2" : "md:mr-auto md:w-1/2"}
                `}
                            >
                                {/* === СТАТИЧНАЯ ИКОНКА === */}
                                <div
                                    className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center
                    ${"left-0 -translate-x-1/2"}
                    ${isEven ? "md:left-0 md:-translate-x-1/2" : ""}
                    ${!isEven ? "md:right-0 md:translate-x-1/2 md:left-auto" : ""}
                  `}
                                >
                                    <div className="w-3 h-3 md:w-4 md:h-4 bg-background border-[3px] border-primary rounded-full shadow-sm relative z-20" />

                                    {/* Маска для обрезки линии снизу */}
                                    {isLast && (
                                        <div className="absolute top-1/2 w-4 bg-background h-[9999px] z-10" />
                                    )}
                                </div>

                                {/* === АНИМИРОВАННАЯ КАРТОЧКА === */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isEven ? 50 : -50,
                                    }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5 }}
                                    // ВОТ ЗДЕСЬ ИЗМЕНЕНИЕ: pl-6 вместо pl-12
                                    className={`relative w-full
                    ${"pl-6"} 
                    ${isEven ? "md:pl-16" : ""}
                    ${!isEven ? "md:pl-0 md:pr-16" : ""}
                  `}
                                >
                                    <div className="bg-background/80 backdrop-blur-md p-4 md:p-6 rounded-xl border border-primary/20 shadow-md flex flex-col items-start text-left">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="h-3.5 w-3.5 text-primary" />
                                            <span className="text-xs md:text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                                {item.year}
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
