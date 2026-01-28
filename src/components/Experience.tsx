import { Briefcase, Calendar, Building } from "lucide-react";

interface ExperienceItem {
    company: string;
    period: string;
    role: string;
    description: string;
}

interface ExperienceProps {
    title: string;
    data: ExperienceItem[];
}

const Experience = ({ title, data }: ExperienceProps) => {
    return (
        <section
            id="experience"
            className="py-12 md:py-16 bg-background text-foreground"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-primary">
                    {title}
                </h2>
                <div className="space-y-8">
                    {data.map((exp, index) => (
                        <div
                            key={index}
                            className="bg-background/80 backdrop-blur-sm p-4 md:p-8 rounded-xl shadow-xl border border-primary/30 hover:shadow-2xl transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div className="flex items-center mb-2 md:mb-0">
                                    <Building className="h-6 w-6 text-primary mr-3" />
                                    <h3 className="text-2xl font-bold text-primary">
                                        {exp.company}
                                    </h3>
                                </div>
                                <div className="flex items-center text-primary/70">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    <span className="text-sm font-medium">
                                        {exp.period}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <Briefcase className="h-5 w-5 text-primary mr-3" />
                                <h4 className="text-xl font-semibold text-primary">
                                    {exp.role}
                                </h4>
                            </div>
                            <p className="text-primary/80 leading-relaxed pl-8 border-l-2 border-primary/30">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
