import { useEffect } from "react";

export default function useOutsideAlerter(ref, setShowOptions) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowOptions(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [ref]);
}