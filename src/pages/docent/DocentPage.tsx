import { useParams } from "react-router";
import { BackHeader } from "@/components/layout/Header";

export default function DocentPage() {
  const { teamId } = useParams();

  return (
    <>
      <BackHeader title="도슨트 오디오 상세보기" />
      <p>팀 {teamId}</p>
    </>
  );
}
