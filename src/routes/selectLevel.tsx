import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/selectLevel")({
  component: SelectLevel,
});

function SelectLevel() {
  return <div></div>;
}
