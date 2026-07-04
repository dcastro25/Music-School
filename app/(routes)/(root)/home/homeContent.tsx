import type { CourseWithChapters } from "../courses/courseClientType";
// o la ruta correcta donde tengas definido CourseWithChapters
import {
    About,
    CoursesSection,
    CtaBanner,
    FaqSection,
    HeroSection,
    HeroSectionMobile,
    InstrumentsSection,
    MobileCourseCarousel,
} from "./Components";

export function HomeContent({ courses }: { courses: CourseWithChapters[] }) {
    return (
        <div>
            <HeroSectionMobile />
            <HeroSection />
            <About />
            <CoursesSection courses={courses} />
            <MobileCourseCarousel courses={courses} />
            <InstrumentsSection />
            <FaqSection />
            <CtaBanner />
        </div>
    );
}