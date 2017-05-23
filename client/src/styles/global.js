import { injectGlobal, css } from 'styled-components';

/*
 * Global Styles
 */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Slabo+27px');

  body {
    font-family: 'Slabo 27px', serif;
    margin: 0;
  }
`;

/*
 * Media Queries
 */
export const media = {
  tablet: (...args) => css`
    @media (min-width: 420px) {
      ${ css(...args) }
    }
  `
};