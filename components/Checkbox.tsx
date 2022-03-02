import type React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { filterIndexState } from "./states/state";

type checkProps = {
    id: number;
}

const StyledDiv = styled.div`
    margin: 1rem 0 0 1rem;
    width: 7rem;
`

const Checkbox:React.FC<checkProps> = ({ children, id }) => {
    const filterIndex = useRecoilValue(filterIndexState);

    const saveState = () => {
        if (filterIndex === 0) {

        }
        else if (filterIndex === 1) {

        }
        else if (filterIndex === 2) {
            
        }
    }

    return (
        <StyledDiv>
            <input type="checkbox" id={String(id)} onChange={saveState}/>
            <span>{children}</span>
        </StyledDiv>
    )
}

export default Checkbox;