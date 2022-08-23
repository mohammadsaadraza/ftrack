import React, { useState, useEffect } from "react";

export function BrowserRendering({ children } : React.PropsWithChildren){
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    } , [])

    if (!mounted) {
        return null;
    }

    return (<>{children}</>);

}