import styled from 'styled-components';

export const Overview = styled.div`
  color: var(--text);
`;

export const Caption = styled.div`
  margin-right: 50px;
  white-space: nowrap;
  font-weight: 700;
  color: var(--text);
`;

export const Text = styled.div`
  color: var(--text);
  text-align: end;
`;

export const Link = styled.a`
  ${Text};
  text-decoration: underline;
`;
