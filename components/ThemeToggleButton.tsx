import { darken, lighten } from "polished";
import type React from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from '../styles/theme/theme'
import { currentThemeState } from "./states/state";

const spin = keyframes`
    from {
        transform: scale(0) rotate(0deg);
    }
    to {
        transform: scale(1) rotate(360deg);
    }
`

const ThemeButton = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    margin: 0 0.2rem 0 0.8rem;;

    :hover {
        background-color: ${({ theme }) => theme.isDark ? lighten(0.2, theme.bgColor) : darken(0.04, theme.bgColor)};
        cursor: pointer;
    }

    > div {
        width: 2.5rem;
        height: 2.5rem;
        background-repeat: no-repeat;
        background-size: 1.5rem 1.5rem;
        background-position: center;
        animation-name: ${spin};
        animation-duration: 0.3s;
        animation-iteration-count: 1;
        animation-direction: alternate;
        animation-timing-function: ease;
    }
`

const Sun = styled.div`
    background-image: url('/sun.png');
`

const Moon = styled.div`
    background-image: url('/moon.png');
`

const ThemeToggleButton:React.FC = () => {
    const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setCurrentTheme(!currentTheme);
    }

    return (
        <ThemeProvider theme={theme}>
            <ThemeButton onClick={toggleTheme}>
                {currentTheme ? <Moon/> : <Sun/>}
            </ThemeButton>
        </ThemeProvider>
    )
}

export default ThemeToggleButton;