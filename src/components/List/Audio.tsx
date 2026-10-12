import { Link } from "react-router";
import * as S from "./Audio.styles";
import playIcon from "../../assets/playIcon.svg";
import stopIcon from "../../assets/stopIcon.svg";
import { paths } from "@/paths";

interface AudioProps {
  teamId: string;
  zone: string;
  isPlaying: boolean;
  teamName: string;
  title: string;
  currentTime: string;
  duration: string;
}

export default function Audio({
  teamId,
  zone,
  isPlaying,
  teamName,
  title,
  currentTime,
  duration,
}: AudioProps) {
  const status = isPlaying ? "재생 중" : "일시 정지";

  return (
    <S.AudioContainer>
      <S.IconBox>
        <S.PlayIcon src={isPlaying ? playIcon : stopIcon} alt="" />
      </S.IconBox>

      <S.ContentWr>
        <S.ContentTitle>
          <span>{teamName}</span>
          <S.Dot>·</S.Dot>
          <span>{status}</span>
        </S.ContentTitle>
        <S.Title>{title}</S.Title>
        <S.TimeWr>
          {currentTime} / {duration}
        </S.TimeWr>
      </S.ContentWr>

      <S.Detail as={Link} to={paths.docent(teamId, zone)}>
        도슨트 상세
        <S.Arrow>→</S.Arrow>
      </S.Detail>
    </S.AudioContainer>
  );
}
