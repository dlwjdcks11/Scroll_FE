import type React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { filterDataSelector } from "./states/state";

type checkProps = {
    id: number;
}

const StyledDiv = styled.div`
    margin: 1rem 0 0 1rem;
    width: 7rem;
`

const Checkbox:React.FC<checkProps> = ({ children, id }) => {
    const setFilterData = useSetRecoilState(filterDataSelector);

    const saveState = (e) => {
        const id = e.target.id;
        setFilterData(id);
    }

    return (
        <StyledDiv>
            <input type="checkbox" id={String(id)} onChange={saveState}/>
            <span>{children}</span>
        </StyledDiv>
    )
}

export default Checkbox;