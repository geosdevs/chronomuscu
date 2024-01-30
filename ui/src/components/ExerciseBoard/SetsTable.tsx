import { Fragment } from "react";
import { secondsToPrettyString } from "../../functions/time";

type SetsTableProps = {
    setsData: {
        id: number,
        activitySeconds: number,
        restSeconds: number
    }[],
    children?: React.ReactNode
}

export default function SetsTable({setsData}: SetsTableProps) {
    let i = 1;

    return (
        <div>
            <h3>Current set history</h3>
            <div>
                {setsData.map((row) => {
                    return (
                        <Fragment key={row.id}>
                            <div>#{i++}</div>
                            <div>
                                <span style={{color: 'red'}}>{secondsToPrettyString(row.activitySeconds)}</span>
                                <span style={{color: 'blue'}}>{secondsToPrettyString(row.restSeconds)}</span>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}