import type React from "react";
import Link from "next/link";
import styled, { css, ThemeProvider } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentThemeState, showFavoriteState, showLoginState } from "./states/state";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { useState } from "react";
import Star from '/public/star.svg';
import { checkCookies } from "cookies-next";

type info = {
    webtoonId: number;
    title: string;
    thumbnail: string,
    link: string;
    author: string[];
    bookmark: boolean;
}

type thumbnailProp = {
    url: string;
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

const Thumbnail = styled.div<thumbnailProp>`
    background-repeat: no-repeat;
    background-size: contain;
    width: 9rem;
    height: 13rem;
    border-radius: 0.4rem;

    ${props => props.url && css<thumbnailProp>`
        background-image: url(${props.url});

    `}
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

const WebtoonLink:React.FC<info> = (props) => {
    const webtoonId = props.webtoonId;
    const setShowLogin = useSetRecoilState(showLoginState);
    const showFavorite = useRecoilValue(showFavoriteState);
    const [star, setStar] = useState(props.bookmark);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;
    const starStyle = {
        width: '1rem',
        height: '1rem',
        fill: star ? `var(--primary)` : 'lightgrey',
    }

    console.log(props);

    const selectFavorite = async (e) => {
        e.stopPropagation();

        if (!checkCookies('token')) {
            alert('먼저 로그인을 진행해 주세요.');
            setShowLogin(true);
            return;
        }
        
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
                <Link href={props.link}>
                    <LinkContainer>
                        <Thumbnail url={props.thumbnail}/>
                        <InfoContainer>
                            <DetailContainer>
                                <WebtoonTitle>
                                    {props.title}
                                </WebtoonTitle>
                                <WebtoonInfo>
                                    {props.author}
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
            <Link href={props.link}>
                <LinkContainer>
                    <Thumbnail url={props.thumbnail}/>
                    <InfoContainer>
                        <DetailContainer>
                            <WebtoonTitle>
                                {props.title}
                            </WebtoonTitle>
                            <WebtoonInfo>
                                {props.author}
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