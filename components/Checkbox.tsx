import type React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { filterDataSelector } from "./states/state";

type checkProps = {
    id: string;
}

const StyledDiv = styled.div`
    margin: 1rem 0 0 1rem;
    width: 8rem;
`

const Checkbox:React.FC<checkProps> = ({ children, id }) => {
    const setFilterData = useSetRecoilState(filterDataSelector);

    const saveState = (e) => {
        setFilterData(e.target.id);
    }

    return (
        <StyledDiv>
            <input type="checkbox" id={id} onChange={saveState}/>
            <span>{children}</span>
        </StyledDiv>
    )
}

export default Checkbox;