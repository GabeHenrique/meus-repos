import styled from "styled-components";
import {gBorderRadius, gDarkBlue, gDarkGray, gLightBlue, gLightGray} from "../../styles/global";
import {Link} from "react-router-dom";

interface PageStateProps {
  active: number
}

export const Loading = styled.div`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 44rem;
    background: white;
    border-radius: ${gBorderRadius};
    box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.2);
    padding: 1.875rem;
    margin: 5rem auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 9rem;
        border-radius: 20%;
        margin: 1.25rem 0;
    }

    h1 {
        font-size: 1.875rem;
        color: ${gDarkBlue};
    }

    p {
        margin-top: 5px;
        font-size: 0.875rem;
        color: black;
        text-align: center;
        line-height: 1.4;
        max-width: 25rem;
    }
`;

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`;

export const Issues = styled.ul`
    margin-top: 1.875rem;
    padding-top: 1.875rem;
    border-top: 1px solid ${gLightGray};
    list-style: none;

    li {
        display: flex;
        padding: 0.875rem 0.625rem;

        & + li {
            margin-top: 0.75rem;
        }

        img {
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 50%;
            border: 2px solid ${gDarkBlue};
        }

        div {
            flex: 1;
            margin-left: 0.75rem;

            p {
                margin-top: 0.625rem;
                font-size: 0.75rem;
                color: black;
            }
        }

        strong {
            font-size: 0.9375rem;

            a {
                text-decoration: none;
                color: ${gDarkGray};
                transition: 0.3s;


                &:hover {
                    color: ${gLightBlue};
                }
            }

            span {
                background: ${gDarkGray};
                color: white;
                border-radius: ${gBorderRadius};
                font-size: 0.75rem;
                font-weight: 600;
                padding: 5px 7px;
                margin-left: 0.625rem;
            }
        }
    }
`;

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        outline: 0;
        border: 0;
        background: ${gDarkGray};
        color: white;
        margin: 5px;
        box-sizing: border-box;
        padding: 5px;
        border-radius: ${gBorderRadius};
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin: 0 5px;
        }

        &:first-child {
            padding-right: 0.625rem;
        }

        &:last-child {
            padding-left: 0.625rem;
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;

export const PageState = styled.div<PageStateProps>`
    margin: 0.9375rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        outline: 0;
        border: 0;
        padding: 0.5rem;
        border-radius: ${gBorderRadius};
        margin: 0 3px;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin: 0 5px;
        }

        &:nth-child(${props => props.active + 1}) {
            background: ${gLightBlue};
            color: white;

            svg {
                color: white !important;
            }
        }
    }
`;