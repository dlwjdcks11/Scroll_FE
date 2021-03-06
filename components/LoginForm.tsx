import { useState } from "react"
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { currentThemeState, showLoginState } from "./states/state";
import { lighten } from "polished";
import { setCookies } from 'cookies-next';

const vibrate = keyframes`
    0%, 20%, 40%, 60%, 80%, 100% {
        transform: translate(0, 0);
    }
    10%, 50%, 90% {
        transform: translate(0.1rem, 0);
    }
    30%, 70% {
        transform: translate(-0.1rem, 0);
    }
`

const DimmedDiv = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1001;
    justify-content: center;
    align-items: center;
`

const FormContainer = styled.div`
    display: flex;
    width: 25rem;
    background-color: ${({ theme }) => lighten(0.2, theme.bgColor)};
    border: none;
    border-radius: 0.4rem;
    flex-direction: column;
    align-items: center;
`

const CloseButton = styled.div`
    margin: 0.3rem auto 0 0.5rem;
    width: fit-content;
    color: ${({ theme }) => theme.textColor};

    :after {
        content: '\\00d7';
        font-size: 32px;
    }

    :hover {
        cursor: pointer;
    }
`

const Title = styled.p`
    font-family: 'NanumSquareRoundExtraBold';
    font-size: 24px;
    color: var(--primary);
`

const Form = styled.form`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`

const Input = styled.input`
    width: 100%;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => lighten(0.2, theme.bgColor)};
    height: 2rem;
    margin-top: 0.5rem;
    border: none;
    border-bottom: 0.1rem solid var(--border_grey);
    transition: all 0.2s linear;

    :focus {
        outline: none;
        border-bottom: 0.1rem solid var(--primary);
    }

    :focus::placeholder {
        color: var(--primary);
    }

    ::placeholder {
        color: lightgrey;
    }
`;

const ShowState = styled.p`
    font-size: 12px;
    margin: 0.5rem auto 0 0;
    transition: color 0.5s ease;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-direction: alternate;
    animation-timing-function: ease;

    &.denied {
        color: var(--denied);
        animation-name: ${vibrate};
    }
`;

const Submit = styled.input`
    font-family: 'NanumSquareRoundBold';
    width: 5rem;
    height: 2rem;
    border: none;
    border-radius: 0.4rem;
    background-color: var(--primary);
    color: #F1F3F5;
    margin: 1rem 0 0 auto;

    :hover {
        cursor: pointer;
    }
`;

const LoginForm = ():JSX.Element => {
    const [isError, setIsError] = useState(false);
    const resetShowLogin = useResetRecoilState(showLoginState);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;
    
    const closeLogin = () => {
        resetShowLogin();
    }

    const resetValue = () => {
        setIsError(false);
    }

    const submitValues = async (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const pw = e.target.pw.value;

        try {
            const response = await fetch(process.env.URL + '/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: id,
                    pw: pw,
                })
            });
            const result = await response.json();
            console.log(result);
            if (result.success) {
                setCookies('token', result.token);
                resetShowLogin();
            }
            else {
                setIsError(true);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <DimmedDiv>
                <FormContainer onSubmit={submitValues}>
                    <CloseButton onClick={closeLogin}/>
                    <Title>
                        Scroll ?????????
                    </Title>
                    <Form>
                        <Input placeholder='?????????' id='id' autoComplete='off' onChange={resetValue}/>
                        <Input placeholder='????????????' id='pw' autoComplete='off' onChange={resetValue}/>                         
                        {isError ? <ShowState className='denied'>
                            ????????? ????????? ???????????????.
                        </ShowState> : null}
                        <Submit type='submit' value='?????????'/>
                    </Form>
                </FormContainer>
            </DimmedDiv>
        </ThemeProvider>
    )
}

export default LoginForm;