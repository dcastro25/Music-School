// import { ListCourses } from "./teacher/ListCourse";
// import { prisma } from "@/lib/prisma";
// import TeacherPage from "./teacher/page";
// import { Header } from "@/app/(auth)/Components/header/Header";
import { Footer } from "./Components/Footer";
import { HomeContent } from "./home";

export default function Home() {
    return (
        <div>
            {/* <Header /> */}
            {/* <h1>Home - Componentes faltantes comentados</h1> */}
            <HomeContent/>
            <Footer />
        </div>
    );
}
