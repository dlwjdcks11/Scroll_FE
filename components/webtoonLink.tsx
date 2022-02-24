import type React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

type ImageProps = {
    path: string;
    title: string;
}

const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const MovieTitle = styled.p`
    text-align: center;
    margin: 0.1rem 0 0.5rem 0;
    max-width: 18.75rem;
    max-height: 1.313rem;
`;

const WebtoonLink:React.FC<ImageProps> = ({ path, title }) => {
    return (
        <Link href={`/`}>
            <ImageContainer>
                <a>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${path}`}
                        width={300}
                        height={300}
                        layout="fixed"
                    />
                    <MovieTitle>
                        {title}
                    </MovieTitle>
                </a>
            </ImageContainer>
        </Link>
    )
}

export default WebtoonLink;