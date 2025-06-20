import { Star, MessageSquare } from "lucide-react";
import { cn } from "~/lib/utils";
import { SharePopover } from "~/components/SharePopover";
import { Document } from "~/types";

interface EditorContentProps {
  chatOpen: boolean;
  currentDocument: Document | undefined;
  onToggleFavorite: (docId: string) => void;
  onShareDocument: (docId: string, email?: string) => void;
  onCopyShareLink: () => void;
  onChatToggle: (open: boolean) => void;
}

export function EditorContent({
  chatOpen,
  currentDocument,
  onToggleFavorite,
  onShareDocument,
  onCopyShareLink,
  onChatToggle,
}: EditorContentProps) {
  return (
    <div
      className={cn(
        "bg-white flex flex-col transition-all duration-300 ease-in-out",
        chatOpen ? "flex-1 rounded-none mr-4 my-1.5" : "flex-1 rounded-3xl mr-4 my-4 shadow-lg"
      )}
    >
      {/* Top Bar */}
      <div
        className={cn("flex items-center justify-between px-6 pt-2", chatOpen ? "pt-4.5" : "pb-4")}
      >
        <div className='flex items-center'>
          <h1 className='text-xl font-semibold text-gray-900'>
            {currentDocument?.name || "Untitled Document"}
          </h1>
        </div>

        <div className='flex items-center space-x-3'>
          {/* Favorite Toggle */}
          <button
            onClick={() => currentDocument && onToggleFavorite(currentDocument.id)}
            className='p-1.5 rounded-lg transition-colors hover:bg-gray-100'
          >
            <Star
              className={cn(
                "h-5 w-5 transition-colors",
                currentDocument?.isFavorite
                  ? "fill-current text-yellow-500"
                  : "text-gray-400 hover:text-gray-600"
              )}
            />
          </button>

          {/* Share Button */}
          <SharePopover
            documentId={currentDocument?.id || ""}
            onShareDocument={onShareDocument}
            onCopyShareLink={onCopyShareLink}
          />

          {/* Chat Toggle */}
          <button
            onClick={() => onChatToggle(!chatOpen)}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              chatOpen
                ? "bg-blue-100 text-blue-600"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            )}
          >
            <MessageSquare className='h-5 w-5' />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className='flex-1 px-6 pb-6 overflow-auto'>
        <div className='max-w-4xl'>
          <div className='text-gray-500 mb-4'>Start writing your document here...</div>
          <div className='text-gray-400 text-sm'>
            Lexical editor will be integrated here. For now, this is a placeholder for the main
            editing area.
          </div>
        </div>
      </div>
    </div>
  );
}
