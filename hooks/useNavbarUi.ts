import { useEffect, useState } from "react";

export function useNavbarUI() {
    const [isAtTop, setIsAtTop] = useState(true);
    const [openSearch, setOpenSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsAtTop(window.scrollY === 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return {
        isAtTop,
        openSearch,
        setOpenSearch,
    };
}