import RestBtn from "../RestBoard/RestBtn";


export default function RestBoard() {
    return (
        <div>
            <RestBtn restSeconds={20}></RestBtn>
            <RestBtn restSeconds={25}></RestBtn>
            <RestBtn restSeconds={60}></RestBtn>
            <RestBtn restSeconds={90}></RestBtn>
            <RestBtn restSeconds={180}></RestBtn>
        </div>
    )
}
