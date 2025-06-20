import { useState } from "react";
import { Search, Plus, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { RecentDocument } from "~/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDocument: () => void;
  onOpenSettings: () => void;
  onSelectDocument: (docId: string) => void;
  recentDocuments: RecentDocument[];
  renderCollaboratorAvatars: (collaborators: string[]) => React.ReactNode;
}

export function SearchModal({
  isOpen,
  onClose,
  onCreateDocument,
  onOpenSettings,
  onSelectDocument,
  recentDocuments,
  renderCollaboratorAvatars,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecentDocuments = recentDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDocument = (docId: string) => {
    onSelectDocument(docId);
    onClose();
    setSearchQuery("");
  };

  const handleCreateDocument = () => {
    onCreateDocument();
    onClose();
  };

  const handleOpenSettings = () => {
    onClose();
    onOpenSettings();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-black border-gray-700 p-2 w-[480px] max-h-[560px] gap-1.5 overflow-hidden flex flex-col rounded-3xl'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Search Documents</DialogTitle>
          <DialogDescription>Search for documents or create new ones</DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className='bg-[#191919] rounded-2xl p-3'>
          <div className='flex items-center'>
            <Search className='h-4 w-4 text-gray-400 mr-3' />
            <input
              type='text'
              placeholder='Search documents or chats...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-400 focus:ring-2 focus:ring-white/20 rounded'
              autoFocus
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='grid grid-cols-2 gap-1.5 mb-1'>
          <Button variant='search-action' size='search' onClick={handleCreateDocument}>
            <div className='flex text-gray-400 gap-1 items-center'>
              <kbd className='bg-black px-2 py-[1px] rounded-md'>⌘</kbd>
              <p className='bg-black px-2 py-[1px] rounded-md'>T</p>
            </div>
            <div className='flex items-center'>
              <Plus className='h-4 w-4 text-gray-400 mr-3' />
              <span className='text-white/90 text-sm'>New Document</span>
            </div>
          </Button>

          <Button variant='search-action' size='search' onClick={handleOpenSettings}>
            <div className='flex text-gray-400 gap-1 items-center'>
              <kbd className='bg-black px-2 py-[1px] rounded-md'>⌘</kbd>
              <p className='bg-black px-2 py-[1px] rounded-md'>D</p>
            </div>
            <div className='flex items-center'>
              <Settings className='h-4 w-4 text-gray-400 mr-3' />
              <span className='text-white/90 text-sm'>Settings</span>
            </div>
          </Button>
        </div>

        {/* Recent Documents */}
        <div className='flex-1 overflow-y-auto'>
          <div className='text-xs font-medium text-gray-400 uppercase tracking-wider ml-1 mb-3'>
            Recent
          </div>
          <div className='space-y-2'>
            {filteredRecentDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleSelectDocument(doc.id)}
                className='flex items-center active:scale-105 transition-all duration-300 ease-in-out justify-between p-2 hover:bg-[#313131] rounded-lg cursor-pointer'
              >
                <div className='flex items-center flex-1'>
                  <div className='flex-1'>
                    <div className='text-white text-sm font-medium'>{doc.name}</div>
                    <div className='text-gray-400 text-xs'>{doc.lastUpdated}</div>
                  </div>
                </div>
                <div className='ml-4'>{renderCollaboratorAvatars(doc.collaborators)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className='bg-[#191919] rounded-2xl px-3 py-2 mt-1'>
          <div className='flex items-center justify-between text-gray-400'>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center'>
                <kbd className='bg-black px-2 py-[1px] rounded-md'>↑↓</kbd>
                <span className='ml-2'>Navigate</span>
              </div>
              <div className='flex items-center'>
                <kbd className='bg-black px-3 py-[1px] rounded-md'>↵</kbd>
                <span className='ml-2'>Select</span>
              </div>
            </div>
            <div className='flex items-center'>
              <kbd className='bg-black px-1.5 py-1 rounded-md text-[13px]'>esc</kbd>
              <span className='ml-2'>Close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
