import {createGlobalStyle} from "styled-components";

export const gDarkBlue: string = "#0D2636";
export const gLightBlue: string = "#0071DB";

export const gDarkGray: string = "#222222"
export const gLightGray: string = "#EEEEEE";

export const gBorderRadius: string = "4px";

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        margin: 0;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${gDarkBlue};
        font-size: 14px;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    html, body, #root {
        min-height: 100%;
    }

    body, input, button {
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }

    button {
        cursor: pointer;
    }

`;
