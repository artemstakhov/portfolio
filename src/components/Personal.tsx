import { Heart, MapPin } from "lucide-react";

interface PersonalProps {
    title: string;
    interestsTitle: string;
    locationTitle: string;
    data: {
        interests: string[];
        location: string;
    };
}

const Personal = ({
    title,
    interestsTitle,
    locationTitle,
    data,
}: PersonalProps) => {
    return (
        <section
            id="personal"
            className="py-12 md:py-16 bg-background text-foreground"
        >
            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-16 text-primary">
                    {title}
                </h2>
                <div className="space-y-8">
                    <div className="bg-background/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-xl border border-primary/30">
                        <div className="flex items-center justify-center mb-4">
                            <Heart className="h-6 w-6 text-primary mr-3" />
                            <h3 className="text-2xl font-bold text-primary">
                                {interestsTitle}
                            </h3>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {data.interests.map((interest, index) => (
                                <span
                                    key={index}
                                    className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-background/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-xl border border-primary/30">
                        <div className="flex items-center justify-center mb-4">
                            <MapPin className="h-6 w-6 text-primary mr-3" />
                            <h3 className="text-2xl font-bold text-primary">
                                {locationTitle}
                            </h3>
                        </div>
                        <p className="text-xl text-primary/80">
                            {data.location}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Personal;
