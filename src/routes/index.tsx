import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className='p-2 ml-16 w-full h-full'>
      <h3>Welcome Home!!!</h3>
      <Button>ShadCN</Button>
    </div>
  );
}
