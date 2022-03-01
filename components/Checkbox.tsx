import type React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    margin: 1rem 0 0 1rem;
    width: 7rem;
`

const Checkbox:React.FC = ({ children }) => {
    return (
        <StyledDiv>
            <input type="checkbox"/>
            <span>{children}</span>
        </StyledDiv>
    )
}

export default Checkbox;