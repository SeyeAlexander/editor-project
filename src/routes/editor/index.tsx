import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PlusCircle, FileText } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useUserStore } from "~/stores/userStore";
import { useEffect } from "react";

export const Route = createFileRoute("/editor/")({
  component: EditorIndexComponent,
});

function EditorIndexComponent() {
  const { displayName, workspaceName, avatarOption, isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const gradientClass = avatarOption?.gradient || "from-gray-700 to-gray-900";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='max-w-md text-center'>
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradientClass} mx-auto mb-6 flex items-center justify-center`}
        >
          <FileText className='h-8 w-8 text-white' />
        </div>

        <h1 className='text-2xl font-bold mb-2 text-white'>
          Welcome to {workspaceName || "Your Workspace"}
        </h1>
        <p className='text-gray-400 mb-8'>
          Select a document from the sidebar to start editing, or create a new document.
        </p>

        <Button
          className={`bg-gradient-to-r ${gradientClass} text-white px-4 py-2 rounded-md flex items-center justify-center`}
        >
          <PlusCircle className='h-5 w-5 mr-2' />
          Create New Document
        </Button>
      </div>
    </div>
  );
}
