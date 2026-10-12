// import type { ReactNode } from "react";
import * as S from "./ListContainer.styles";

// interface ListContainerProps {
//   title?: string;
//   children: ReactNode;
// }

export default function ListContainer() {
  return (
    <S.ListContainer>
      <S.NumberContainer>
        <S.NumBox>
          <S.Num>01</S.Num>
        </S.NumBox>
        <S.TitleBox>
          <S.Title>작품명</S.Title>
          <S.TeamName>팀원 명</S.TeamName>
        </S.TitleBox>
      </S.NumberContainer>

      <S.ZoneContainer>
        <S.Zone>model zone</S.Zone>
        <S.Time>3:42</S.Time>
      </S.ZoneContainer>
    </S.ListContainer>
  );
}
