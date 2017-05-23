import styled from 'styled-components';

/*
 * AppContainer
 */
export const AppContainer = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas: 'content';
    height: 100vh;
    
    & * > {
      display: flex;
      background-color: gray;
      justify-content: center;
      align-items: center;
    }
`;

export const AppContent = styled.div`
  grid-area: content;
  color: #403d34;
  background-color: ccc;
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
`;
