// TODO: 프로젝트 리스트 화면
import ListContainer from "../../components/List/ListContainer";
import { projects } from "../../constants/projects";
import * as S from "./ListPage.styles";

export default function ListPage() {
  return (
    // <Header> </Header>
    <S.List>
      <S.ListPage>
        {projects.map((p) => (
          <ListContainer key={p.teamId} {...p} />
        ))}
      </S.ListPage>
    </S.List>
  );
}
