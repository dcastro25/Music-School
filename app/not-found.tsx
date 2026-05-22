import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1>nose bro</h1>
            <Button variant={"default"}>
                {" "}
                <Link href="/"> pa atras mi loco</Link>
            </Button>

           
        </div>
    );
}
