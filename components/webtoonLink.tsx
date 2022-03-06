import type React from "react";
import Link from "next/link";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { currentThemeState } from "./states/state";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

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

const InfoContainer = styled.div`
    display: flex;
    width: 100%;
`

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 7.5rem;
`;

const IconContainer = styled.div`
    display: flex;
    margin-top: 0.3rem;
`;

const WebtoonTitle = styled.p`
    margin: 0.3rem 0 0.1rem 1rem;
    max-height: 1rem;
    color: ${({ theme }) => theme.textColor};
`;

const WebtoonInfo = styled.p`
    margin: 0 0 0 1rem;
    max-height: 1rem;
    color: grey;
`;

const WebtoonLink:React.FC = () => {
    const [star, setStar] = useState(false);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    const selectFavorite = () => {
        setStar(!star);
    }

    return (
        <ThemeProvider theme={theme}>
            <Link href={`/`}>
                <LinkContainer>
                    <Thumbnail/>
                    <InfoContainer>
                        <DetailContainer>
                            <WebtoonTitle>
                                title
                            </WebtoonTitle>
                            <WebtoonInfo>
                                author
                            </WebtoonInfo>  
                        </DetailContainer>
                        <IconContainer onClick={selectFavorite}>
                            <FontAwesomeIcon icon={faStar} style={star ? { color : `var(--yellow)` } : { color: `lightgrey` }}/>
                        </IconContainer>
                    </InfoContainer>
                </LinkContainer>
            </Link>
        </ThemeProvider>
    )
}

export default WebtoonLink;