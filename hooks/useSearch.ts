import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [inputValue, setInputValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    // Limpia al cambiar de página
    useEffect(() => {
        setInputValue("");
        setDebouncedValue("");
    }, [pathname]);

    // Sincroniza con la URL solo si hay param
    useEffect(() => {
        const param = searchParams.get("search") ?? "";
        if (param) {
            setInputValue(param);
            setDebouncedValue(param);
        }
    }, [searchParams]);

    // Debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 700);
        return () => clearTimeout(timeout);
    }, [inputValue]);

    // Actualiza la URL
    useEffect(() => {
        const current = searchParams.get("search") ?? "";
        if (debouncedValue === current) return;
        if (!debouncedValue) {
            router.replace(pathname);
        } else {
            router.replace(`${pathname}?search=${debouncedValue}`);
        }
    }, [debouncedValue, pathname, searchParams]);

    const clearSearch = () => {
        setInputValue("");
        setDebouncedValue("");
        router.replace(pathname);
    };

    return {
        value: inputValue,
        setValue: setInputValue,
        clearSearch,
    };
}