import type React from "react";
import Link from "next/link";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { currentThemeState } from "./states/state";
import { darkTheme, lightTheme } from "../styles/theme/theme";

const LinkContainer = styled.a`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :hover {
        cursor: pointer;
    }
`;

const Thumbnail = styled.div`
    background-color: ${({ theme }) => theme.textColor};
    width: 9rem;
    height: 13rem;
    border-radius: 0.4rem;
`

const WebtoonTitle = styled.p`
    margin: 0.3rem 0 0.1rem 1rem;;
    width: 100%;
    max-height: 1rem;
    color: ${({ theme }) => theme.textColor}
`;

const WebtoonInfo = styled.p`
    margin: 0 0 0 1rem;
    width: 100%;
    max-height: 1rem;
    color: grey;
`;

const WebtoonLink:React.FC = () => {
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <Link href={`/`}>
                <LinkContainer>
                    <Thumbnail/>
                    <WebtoonTitle>
                        title
                    </WebtoonTitle>
                    <WebtoonInfo>
                        author
                    </WebtoonInfo>
                </LinkContainer>
            </Link>
        </ThemeProvider>

    )
}

export default WebtoonLink;