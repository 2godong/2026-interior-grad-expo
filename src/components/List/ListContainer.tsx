// import type { ReactNode } from "react";
import { Link } from "react-router";
import * as S from "./ListContainer.styles";

export interface ListContainerProps {
  teamId: string;
  title: string;
  members: string[];
  zone: "model" | "media";
  duration: string;
  /** 오디오바에 올라와 있는(재생 중인) 작품 */
  active?: boolean;
}

export default function ListContainer({
  teamId,
  title,
  members,
  zone,
  duration,
  active = false,
}: ListContainerProps) {
  return (
    <S.ListContainer
      as={Link}
      to={`/docent/${teamId}/${zone}`}
      $active={active}
    >
      <S.NumberContainer>
        <S.NumBox $zone={zone} $active={active}>
          <S.Num $zone={zone} $active={active}>{teamId.padStart(2, "0")}</S.Num>
        </S.NumBox>
        <S.TitleBox>
          <S.Title>{title}</S.Title>
          <S.TeamName>{members.join(", ")}</S.TeamName>
        </S.TitleBox>
      </S.NumberContainer>

      <S.ZoneContainer>
        <S.Zone>{zone} zone</S.Zone>
        <S.Time>{duration}</S.Time>
      </S.ZoneContainer>
    </S.ListContainer>
  );
}
