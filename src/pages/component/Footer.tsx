import styled from "styled-components";

export default function Footer() {
  const Container = styled.footer`
    border-top: 1px solid #e5e5e5;
    background: #fafafa;
    margin-top: 80px;
  `;

  const Inner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `;

  const Logo = styled.div`
    font-weight: 600;
    font-size: 14px;
  `;

  const Copy = styled.div`
    font-size: 12px;
    color: #888;
  `;

  const Right = styled.div`
    display: flex;
    gap: 16px;
  `;

  const Link = styled.span`
    font-size: 13px;
    color: #555;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  `;
  const TeamInfo = styled.div`
    font-size: 12px;
    color: #888;
    margin-top: 6px;
    line-height: 1.5;
  `;
  return (
    <Container>
      <Inner>
        <Left>
          <Logo>AI Hub</Logo>
          <Copy>© 2026 AI Hub. All rights reserved.</Copy>

          <TeamInfo>
            Team04 IOT 데브코스 Final Project <br />
            팀장 : 허동빈 <br />
            팀원 : 박슬기, 한민희, 김현수
          </TeamInfo>
        </Left>

        <Right>
          <Link>이용약관</Link>
          <Link>개인정보처리방침</Link>
          <Link>고객센터</Link>
        </Right>
      </Inner>
    </Container>
  );
}
