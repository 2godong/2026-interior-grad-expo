// TODO: 프로젝트 리스트 화면
import ProjectItem from "../../components/List/ListContainer";
import * as S from "./ListPage.styles";

const projects = [
  {
    teamId: "1",
    title: "프로젝트명",
    members: ["홍길동"],
    thumbnail: "/images/1.jpg",
  },
];

export default function ListPage() {
  return (
    // <Header> </Header>
    <S.ListPage>
      {projects.map((p) => (
        <ProjectItem key={p.teamId} {...p} />
      ))}
    </S.ListPage>
  );
}
