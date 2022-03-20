import type React from "react";
import Link from "next/link";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { currentThemeState, showFavoriteState } from "./states/state";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { useState } from "react";
import Star from '/public/star.svg';

type info = {
    id: number;
    title: string;
    author: string;
}

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
    margin: 0.3rem 0 0.1rem 0.5rem;
    max-height: 1rem;
    color: ${({ theme }) => theme.textColor};
`;

const WebtoonInfo = styled.p`
    margin: 0 0 0 0.5rem;
    max-height: 1rem;
    color: grey;
`;

const WebtoonLink:React.FC = () => {
    const webtoonId = -1; // props로 넘겨받은 id 저장
    const showFavorite = useRecoilValue(showFavoriteState);
    const [star, setStar] = useState(false);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;
    const starStyle = {
        width: '1rem',
        height: '1rem',
        fill: star ? `var(--primary)` : 'lightgrey',
    }

    const selectFavorite = async (e) => {
        e.stopPropagation();
        const method = star ? 'DELETE' : 'POST';
        setStar(!star);

        try {
            const response = await fetch(process.env.URL + '/myLibrary', {
                method: method,
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    webtoonId: webtoonId,
                }),
            })
            const result = await response.json();

            if (result.success) {

            }
            else {

            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        showFavorite ? (
            star ? 
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
                                <Star style={starStyle}/>
                            </IconContainer>
                        </InfoContainer>
                    </LinkContainer>
                </Link>
            </ThemeProvider> : null
        ) :
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
                            <Star style={starStyle}/>
                        </IconContainer>
                    </InfoContainer>
                </LinkContainer>
            </Link>
        </ThemeProvider>
    )
}

export default WebtoonLink;