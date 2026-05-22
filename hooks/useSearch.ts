import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [inputValue, setInputValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    useEffect(() => {
        const param = searchParams.get("search") ?? "";
        setInputValue((prev) => (prev === param ? prev : param));
        setDebouncedValue(param);
    }, [searchParams]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 700);

        return () => clearTimeout(timeout);
    }, [inputValue]);

    useEffect(() => {
        const current = searchParams.get("search") ?? "";

        if (debouncedValue === current) return;

        if (!debouncedValue) {
            router.replace(pathname);
        } else {
            router.replace(`${pathname}?search=${debouncedValue}`);
        }
    }, [debouncedValue, pathname, searchParams]);

    return {
        value: inputValue,
        setValue: setInputValue,
    };
}