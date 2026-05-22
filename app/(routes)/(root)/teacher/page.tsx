import { prisma } from "@/lib/prisma";
import { ListCourses } from "./ListCourse";
import { DataTable } from "./DataTable";
import { Header } from "@/app/(auth)/Components/header/Header";
import { HeaderTeacher } from "./components/Header/Header";
// import { HeaderTeacher } from "./components/Header";



export default async function TeacherPage() {

    // const user = await currentUser();
    const courses = await prisma.course.findMany({

        // if (!user ){
        //     return <p>Not sing in</p>
        // }

        // where: {
            // userId:user.id,
        // },
    }); 

    return (
        <div
        >
            <HeaderTeacher />
            {/* <ListCourses course={courses} /> */}
            <DataTable DataTable={courses}/>

        </div>
    );
}