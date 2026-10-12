import { useParams } from "react-router";

export default function DocentPage() {
  const { teamId } = useParams();

  return <h1>도슨트 {teamId}</h1>;
}
