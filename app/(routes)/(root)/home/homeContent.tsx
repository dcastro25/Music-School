
import { Course } from "@/app/generated/prisma/client";
import {
    About,
    CoursesSection,

    CtaBanner,

    FaqSection,

    HeroSection,
    HeroSectionMobile,
    InstrumentsSection,
} from "./Components";

export function HomeContent({ courses }: { courses: Course[] }) {
    return (
        <div>
            <HeroSectionMobile />
            <HeroSection />
            <About />
            <CoursesSection courses={courses} />
            <InstrumentsSection />
            <FaqSection/>
            <CtaBanner/>

        </div>
    );
}
