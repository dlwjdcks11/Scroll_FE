import { Children, FunctionComponent, ReactNode } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import themeState from "./states/state";

type ParamProps = {
    children: ReactNode;
    value: string;
}

const StyledButton = styled.button`
    background-color: red;
`;

const ThemeButton: FunctionComponent<ParamProps> = ({ children, value }) => {
    const [theme, setTheme] = useRecoilState(themeState);
    const onclick = (e) => {
        const target = e.target as HTMLButtonElement;
        setTheme(target.value);
        console.log(theme);
    }

    return (
        <StyledButton onClick={onclick} value={value}>{children}</StyledButton>
    );
}

export default ThemeButton;