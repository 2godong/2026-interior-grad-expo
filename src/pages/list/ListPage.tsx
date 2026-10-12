// TODO: 프로젝트 리스트 화면
import { projects } from "../../constants/projects";
import * as S from "./ListPage.styles";
import { TabHeader } from "@/components/layout/Header";
import ListContainer from "../../components/List/ListContainer";
import AudioBar from "../../components/List/Audio";
import { AUDIO_BAR_SPACE } from "../../components/List/Audio.styles";

// TODO: 실제 재생 상태와 연결. 재생 중이 없으면 null
const nowPlaying: {
  teamId: string;
  zone: string;
  isPlaying: boolean;
  teamName: string;
  title: string;
  currentTime: string;
  duration: string;
} | null = {
  teamId: "5",
  zone: "model",
  isPlaying: true,
  teamName: "05팀",
  title: "제목",
  currentTime: "2:55",
  duration: "4:00",
};

export default function ListPage() {
  return (
    <S.ListPage $bottomSpace={nowPlaying ? AUDIO_BAR_SPACE : 0}>
      <TabHeader title="프로젝트 리스트" />
      <S.List>
        {projects.map((p) => (
          <ListContainer key={`${p.teamId}-${p.zone}`} {...p} />
        ))}
      </S.List>
      {nowPlaying && <AudioBar {...nowPlaying} />}
    </S.ListPage>
  );
}
