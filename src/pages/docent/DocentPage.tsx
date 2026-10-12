import { useParams } from "react-router";

// TODO: 도슨트 오디오 상세 화면
export default function DocentPage() {
  const { teamId } = useParams();

  return <h1>도슨트 {teamId}</h1>;
}
