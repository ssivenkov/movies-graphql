import { COLORS } from 'common/colors/colors';
import { createGlobalStyle } from 'styled-components';

const { WHITE, BLACK, SILVER_CHALICE, SILVER1, ALTO, GALLERY } = COLORS;

export const GlobalNullStyles = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    border: 0;
}

*, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

:focus, :active {
    outline: none;
}

a:focus, a:active {
    outline: none;
}

nav, footer, header, aside {
    display: block;
}

html, body {
    height: 100%;
    width: 100%;
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}
html{
    scroll-behavior: smooth;
}
input, button, textarea {
    font-family: inherit;
}

input::-ms-clear {
    display: none;
}

button {
    cursor: pointer;
}

button::-moz-focus-inner {
    padding: 0;
    border: 0;
}

a, a:visited {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

ul li {
    list-style: none;
}

img {
    vertical-align: top;
}

h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
}

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

export const GlobalAppStyles = createGlobalStyle`
  * a {
    color: var(--text);
  }
  
// initial colors
html {
    --text: ${BLACK};
    --background: ${WHITE};
    --nav: ${SILVER1};
    --cardBackground: ${SILVER_CHALICE};
    --cardLink: ${ALTO};
    --cardLinkHover: ${GALLERY};
}
  
// hide default background color on click
* {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-tap-highlight-color: transparent;
}
`;
