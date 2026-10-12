import styled from "styled-components";

export const Page = styled.div`
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const Poster = styled.img`
  display: block;
  width: calc(100% - 20px);
  aspect-ratio: 3 / 4;
  margin: 20px auto 0;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bg.placeholder};
`;

export const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 16px 0 36px;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.heading}
  margin: 0;
  font-weight: 500;
  word-break: keep-all;
`;

export const EnTitle = styled.p`
  ${({ theme }) => theme.fonts.title}
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fg.accent};
`;

/* 정보 표 */
export const Table = styled.dl`
  margin: 0;
  border-top: 1.2px solid ${({ theme }) => theme.colors.stroke.divider};
  border-bottom: 1.2px solid ${({ theme }) => theme.colors.stroke.divider};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  padding: 16px 8px;

  & + & {
    border-top: 1px solid
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.stroke.divider} 30%,
        transparent
      );
  }
`;

export const Label = styled.dt`
  ${({ theme }) => theme.fonts.body}
`;

export const Value = styled.dd`
  ${({ theme }) => theme.fonts.body}
  margin: 0;
  word-break: keep-all;
`;

export const Hours = styled.span`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
`;

/* 가이드 */
export const Guide = styled.section`
  padding: 20px 8px 28px;
`;

export const GuideLabel = styled.p`
  ${({ theme }) => theme.fonts.caption}
  margin: 0 0 14px;
  font-weight: 400;
`;

export const GuideList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const GuideItem = styled.li`
  ${({ theme }) => theme.fonts.body}
  position: relative;
  padding-left: 14px;
  white-space: pre-line;
  word-break: keep-all;

  &::before {
    content: "·";
    position: absolute;
    left: 2px;
  }
`;

export const Footer = styled.footer`
  ${({ theme }) => theme.fonts.caption}
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.stroke.divider};
  font-size: 9px;
  line-height: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.fg.accent};
  margin-bottom: 15px;
`;
