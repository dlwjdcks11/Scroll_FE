import type React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

type ImageProps = {
    path: string;
    title: string;
}

const ImageContainer = styled.a`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const MovieTitle = styled.p`
    text-align: center;
    margin: 0;
    width: 100%;
    max-height: 1rem;
    text-align: center;
`;

const WebtoonLink:React.FC<ImageProps> = ({ path, title }) => {
    return (
        <Link href={`/`}>
            <ImageContainer>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${path}`}
                    width="100%"
                    height="100%"
                    priority
                />
                <MovieTitle>
                    {title}
                </MovieTitle>
            </ImageContainer>
        </Link>
    )
}

export default WebtoonLink;