"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Roadmap from "../components/Roadmap";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Certificates from "../components/Certificates";
import Personal from "../components/Personal";
import Contact from "../components/Contact";
import { en, ru, ua } from "../data";

const langs = { en, ru, ua };

type Lang = "en" | "ru" | "ua";

export default function Home() {
    const [lang, setLang] = useState<Lang>("en");
    const data = langs[lang];

    return (
        <div className="bg-background text-foreground">
            <Navbar setLang={setLang} lang={lang} />
            <Hero data={data.hero} />
            <Navigation
                roadmapTitle={data.roadmapTitle}
                skillsTitle={data.skills.title}
                experienceTitle={data.experienceTitle}
                certificatesTitle={data.certificatesTitle}
                personalTitle={data.personalTitle}
                contactTitle={data.contactTitle}
            />
            <Roadmap title={data.roadmapTitle} data={data.roadmap} />
            <Skills data={data.skills} />
            <Experience title={data.experienceTitle} data={data.experience} />
            <Certificates
                title={data.certificatesTitle}
                data={data.certificates}
            />
            <Personal
                title={data.personalTitle}
                interestsTitle={data.interestsTitle}
                locationTitle={data.locationTitle}
                data={data.personal}
            />
            <Contact title={data.contactTitle} contact={data.contact} />
        </div>
    );
}
