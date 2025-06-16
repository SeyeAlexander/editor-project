import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useUserStore } from "~/stores/userStore";

export const Route = createFileRoute("/editor/$id")({
  component: DocumentEditor,
});

function DocumentEditor() {
  const { id } = Route.useParams();
  const [content, setContent] = useState("");
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
      return;
    }

    // In the future, we would fetch the document content based on the id
    console.log(`Loading document with id: ${id}`);
    setContent("This is the content of document " + id);
  }, [id, isAuthenticated, navigate]);

  return (
    <div className='h-full flex flex-col'>
      <div className='mb-4'>
        <input
          type='text'
          defaultValue={`Document ${id}`}
          className='text-2xl font-medium bg-transparent border-none focus:outline-none w-full'
        />
      </div>
      <textarea
        className='w-full h-full p-4 bg-gray-900 rounded-lg border border-gray-800 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors'
        placeholder='Start writing...'
        rows={20}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
}
