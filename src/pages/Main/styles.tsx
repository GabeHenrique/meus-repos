import styled, {css, keyframes} from "styled-components";
import {gBorderRadius, gDarkBlue, gLightGray} from "../../styles/global";

export interface SubmitButtonProps {
  loading: boolean;
}

export interface FormProps {
  error: boolean;
}

export const Container = styled.div`
    max-width: 44rem;
    background: white;
    border-radius: ${gBorderRadius};
    padding: 1.875rem;
    margin: 5rem auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    h1 {
        font-size: 1.25rem;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin-right: 0.625rem;
        }
    }
`;

export const Form = styled.form<FormProps>`
    margin-top: 1.875rem;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${props => (props.error ? "red" : "lightgray")};
        padding: 0.625rem 0.9375rem;
        border-radius: ${gBorderRadius};
        font-size: 1rem;
    }
`;

const animatedButton = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs<SubmitButtonProps>(props => ({
  type: "submit",
  disabled: props.loading
}))`
    background: ${gDarkBlue};
    border: 0;
    border-radius: ${gBorderRadius};
    padding: 0 0.9375rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => props.loading &&
            css`
                svg {
                    animation: ${animatedButton} 2s linear infinite;
                }
            `
    }
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 1.25rem;

    li {
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li {
            border-top: 1px solid ${gLightGray};
        }

        a {
            color: ${gDarkBlue};
            text-decoration: none;
        }
`;

export const DeleteButton = styled.button.attrs({
  type: "button"
})`
    background: transparent;
    color: ${gDarkBlue};
    border: 0;
    padding: 0.5rem 0.4375rem;
    outline: 0;
    border-radius: ${gBorderRadius};
`;