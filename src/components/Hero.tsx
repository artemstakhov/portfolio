import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeroProps {
    data: {
        name: string;
        greeting: string;
        image: string;
    };
}

const Hero = ({ data }: HeroProps) => {
    return (
        <section
            id="hero"
            className="pt-20 md:pt-24 py-8 md:py-16 flex items-center bg-gradient-to-br from-background via-background to-primary/10 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,206,209,0.1),transparent_70%)]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-shrink-0"
                    >
                        <div className="relative w-32 h-48 md:w-40 md:h-60 lg:w-64 lg:h-[28rem] rounded-2xl overflow-hidden border-4 border-primary shadow-2xl">
                            <Image
                                src={data.image}
                                alt={data.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 256px"
                            />
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 text-center lg:text-left max-w-2xl relative"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
                        >
                            {data.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed mb-4"
                        >
                            {data.greeting}
                        </motion.p>

                        {/* Chevron Arrow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
                        >
                            <ChevronDown className="h-8 w-8 text-primary animate-bounce" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
