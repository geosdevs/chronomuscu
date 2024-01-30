import Goal from "./Goal";
import SetsTable from "./SetsTable";
import Timer from "./Timer";
import { setsTableData } from "../tests/setsData";


export default function ExerciseBoard() {
    return (
        <div>
            <div>
                <Timer></Timer>
                <Goal></Goal>
            </div>
            <div>
                <SetsTable setsData={setsTableData}></SetsTable>
            </div>
        </div>
    )
}