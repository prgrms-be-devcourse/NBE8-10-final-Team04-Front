import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
  const Header = styled.header`
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    background-color: #ffffff;
  `;

  const Inner = styled.div`
    max-width: 1200px;
    height: 72px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Logo = styled(Link)`
    font-size: 16px;
    font-weight: 600;
    color: #111;
    text-decoration: none;
  `;

  const Menu = styled.nav`
    display: flex;
    gap: 32px;
  `;

  const StyledLink = styled(Link)`
    font-size: 14px;
    font-weight: 500;
    color: #222;
    text-decoration: none;

    &:hover {
      color: #000;
    }
  `;

  const Auth = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const LoginButton = styled.button`
    border: none;
    background: transparent;
    font-size: 14px;
    color: #222;
    cursor: pointer;
  `;

  const SignupButton = styled.button`
    padding: 8px 14px;
    border: 1px solid #222;
    border-radius: 999px;
    background: #fff;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  `;
  return (
    <Header>
      <Inner>
        <Logo to="/">서비스 이름</Logo>

        <Menu>
          <StyledLink to="/">툴비교</StyledLink>
          <StyledLink to="/search">검색</StyledLink>
          <StyledLink to="/prompt">프롬프트</StyledLink>
          <StyledLink to="/chatbot">AI 챗봇</StyledLink>
          <StyledLink to="/mypage">마이페이지</StyledLink>
        </Menu>

        <Auth>
          <LoginButton>로그인</LoginButton>
          <SignupButton>회원가입</SignupButton>
        </Auth>
      </Inner>
    </Header>
  );
}
