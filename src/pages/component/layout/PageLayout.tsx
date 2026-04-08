import styled from "styled-components";

export const PageLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`;

export const PageInner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 1024px) {
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;
