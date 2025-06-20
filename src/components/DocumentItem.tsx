import { FileText, MoreHorizontal, Share2, Star, Trash2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Document } from "~/types";

interface DocumentItemProps {
  doc: Document;
  section: string;
  selectedDocument: string;
  onSelectDocument: (docId: string) => void;
  onShareDocument: (docId: string) => void;
  onToggleFavorite: (docId: string) => void;
  onDeleteDocument: (docId: string) => void;
}

export function DocumentItem({
  doc,
  section,
  selectedDocument,
  onSelectDocument,
  onShareDocument,
  onToggleFavorite,
  onDeleteDocument,
}: DocumentItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors mb-1 group",
        selectedDocument === doc.id ? "bg-[#191919] text-white" : "text-gray-300 hover:bg-[#191919]"
      )}
    >
      {/* Document info section - clickable to select */}
      <div
        onClick={() => onSelectDocument(doc.id)}
        className='flex items-center flex-1 min-w-0 mr-2'
      >
        <FileText className='h-4 w-4 mr-2 flex-shrink-0' />
        <span className='truncate'>{doc.name}</span>
      </div>

      {/* Options popover - always on the right */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-[#313131] rounded transition-all'
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className='h-4 w-4 text-gray-400' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-48 bg-[#191919] border-none mt-1.5 -mr-1.5 rounded-xl p-1' align='end'>
          <div className='space-y-1'>
            <Button variant='popover-item' size='popover' onClick={() => onShareDocument(doc.id)}>
              <Share2 className='h-4 w-4' />
              Share
            </Button>
            <Button variant='popover-item' size='popover' onClick={() => onToggleFavorite(doc.id)}>
              <Star
                className={cn("h-4 w-4", doc.isFavorite && "fill-current text-yellow-500")}
              />
              {doc.isFavorite ? "Remove favorite" : "Add favorite"}
            </Button>
            <Button
              variant='popover-item'
              size='popover'
              onClick={() => onDeleteDocument(doc.id)}
            >
              <Trash2 className='h-4 w-4' />
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
