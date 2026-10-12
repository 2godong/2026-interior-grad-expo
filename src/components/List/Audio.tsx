import { Link } from "react-router";
import * as S from "./Audio.styles";
import playIcon from "../../assets/playIcon.svg";

interface AudioProps {
  teamId: string;
  teamName: string;
  title: string;
  currentTime: string;
  duration: string;
}

export default function Audio({
  teamId,
  teamName,
  title,
  currentTime,
  duration,
}: AudioProps) {
  return (
    <S.AudioContainer>
      <S.IconBox>
        <S.PlayIcon src={playIcon} alt="재생 중" />
      </S.IconBox>

      <S.ContentWr>
        <S.ContentTitle>
          <span>{teamName}</span>
          <S.Dot>·</S.Dot>
          <span>재생 중</span>
        </S.ContentTitle>
        <S.Title>{title}</S.Title>
        <S.TimeWr>
          {currentTime} / {duration}
        </S.TimeWr>
      </S.ContentWr>

      <S.Detail as={Link} to={`/docent/${teamId}`}>
        도슨트 상세
        <S.Arrow>→</S.Arrow>
      </S.Detail>
    </S.AudioContainer>
  );
}
