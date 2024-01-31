import { secondsToPrettyString } from "../../../functions/time";
import React from "react";

type RestBtnProps = {
    restSeconds: number,
    children?: React.ReactNode
}

export default function RestBtn({restSeconds}: RestBtnProps) {
    return (
        <div>
            <button>{secondsToPrettyString(restSeconds)}</button>
        </div>
    )
}