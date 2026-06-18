import React from "react";
import {
    About,
    CoursesSection,

    CtaBanner,

    FaqSection,

    HeroSection,
    HeroSectionMobile,
    InstrumentsSection,
} from "./Components";

export function HomeContent() {
    return (
        <div>
            <HeroSectionMobile />
            <HeroSection />
            <About />
            <CoursesSection />
            <InstrumentsSection />
            <FaqSection/>
            <CtaBanner/>

        </div>
    );
}
