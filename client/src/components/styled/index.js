import styled, { css } from 'styled-components';
import { media } from '../../styles/global';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: white;
  font-size: 18px;
  text-decoration: ${props => props.underline ? 'underline' : 'none'};

  &:hover {
    text-decoration: none;
    color: red
  }
`;

export const CentredElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled(CentredElement)`
  color: red;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  background-color: black;
  max-width: 200px;
  opacity: ${props => props.enabled ? 1 : 0.5};
   &:hover {
    cursor: pointer
  }
`;

export const FormWrapper = styled.div`
  box-shadow: 1px 2px 12px 1px rgba(255,199,156,1);
  padding: 20px;
  box-sizing: border-box;
`;

export const Header = styled.div`
`;

export const Field = styled.input`
`;
