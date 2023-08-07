import React from "react";

export default function Spinner() {
    return (
        <React.Fragment>
            <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
            Loading
        </React.Fragment>
    )
}
