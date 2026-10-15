import { projects } from "../../constants/projects";
import * as S from "./ListPage.styles";
import { TabHeader } from "@/components/layout/Header";
import { useAudio } from "@/components/audio/audioContext";
import ListContainer from "../../components/List/ListContainer";
import NowPlayingBar from "../../components/List/NowPlayingBar";
import { AUDIO_BAR_SPACE } from "../../components/List/Audio.styles";

export default function ListPage() {
  const { track } = useAudio();

  return (
    <S.ListPage $bottomSpace={track ? AUDIO_BAR_SPACE : 20}>
      <TabHeader title="프로젝트 리스트" />
      <S.List>
        {projects.map((p) => (
          <ListContainer key={`${p.teamId}-${p.zone}`} {...p} />
        ))}
      </S.List>
      <NowPlayingBar />
    </S.ListPage>
  );
}
