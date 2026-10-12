// TODO: 프로젝트 리스트 화면
import { projects } from "../../constants/projects";
import * as S from "./ListPage.styles";
import { TabHeader } from "@/components/layout/Header";
import ListContainer from "../../components/List/ListContainer";
import AudioBar from "../../components/List/Audio";

export default function ListPage() {
  return (
    <>
      <TabHeader title="프로젝트 리스트" />
      <S.List>
        <S.ListPage>
          {projects.map((p) => (
            <ListContainer key={p.teamId} {...p} />
          ))}
        </S.ListPage>
      </S.List>
      <AudioBar
        teamId="5"
        teamName="05팀"
        title="제목"
        currentTime="2:55"
        duration="4:00"
      />
    </>
  );
}
