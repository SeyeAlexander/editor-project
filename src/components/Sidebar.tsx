import { Search, Star, Settings, Plus, FileText, Users } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { DocumentItem } from "~/components/DocumentItem";
import { Document } from "~/types";

interface SidebarProps {
  chatOpen: boolean;
  workspaceName: string;
  displayName: string;
  email: string;
  gradientClass: string;
  documents: Document[];
  selectedDocument: string;
  onSearchModalOpen: () => void;
  onSettingsModalOpen: () => void;
  onChatToggle: (open: boolean) => void;
  onSelectDocument: (docId: string) => void;
  onShareDocument: (docId: string) => void;
  onToggleFavorite: (docId: string) => void;
  onDeleteDocument: (docId: string) => void;
  onCreateNewDocument: () => void;
}

export function Sidebar({
  chatOpen,
  workspaceName,
  displayName,
  email,
  gradientClass,
  documents,
  selectedDocument,
  onSearchModalOpen,
  onSettingsModalOpen,
  onChatToggle,
  onSelectDocument,
  onShareDocument,
  onToggleFavorite,
  onDeleteDocument,
  onCreateNewDocument,
}: SidebarProps) {
  const favorites = documents.filter((doc) => doc.isFavorite);
  const shared = documents.filter((doc) => doc.isShared);

  return (
    <div
      className={cn(
        "bg-black text-white flex flex-col transition-all duration-300 ease-in-out",
        chatOpen ? "w-12" : "w-64"
      )}
    >
      {chatOpen ? (
        /* Collapsed Strip */
        <div className='w-full h-full flex flex-col items-center py-4 space-y-4'>
          {/* Avatar */}
          <div
            className={`w-8 h-8 rounded-md bg-gradient-to-br ${gradientClass} flex items-center justify-center border border-gray-600 cursor-pointer hover:scale-110 transition-transform`}
            onClick={() => onChatToggle(false)}
          >
            <div className='w-6 h-6 rounded bg-white/20'></div>
          </div>

          {/* Search */}
          <Button variant='sidebar-icon' onClick={onSearchModalOpen}>
            <Search className='h-5 w-5' />
          </Button>

          {/* Favorites */}
          <Button variant='sidebar-icon' onClick={() => onChatToggle(false)}>
            <Star className='h-5 w-5' />
          </Button>

          {/* Shared */}
          <Button variant='sidebar-icon' onClick={() => onChatToggle(false)}>
            <Users className='h-5 w-5' />
          </Button>

          {/* Documents */}
          <Button variant='sidebar-icon' onClick={() => onChatToggle(false)}>
            <FileText className='h-5 w-5' />
          </Button>

          {/* Add New Document */}
          <Button variant='sidebar-icon' onClick={onCreateNewDocument}>
            <Plus className='h-5 w-5' />
          </Button>

          {/* Settings - at bottom */}
          <div className='flex-1'></div>
          <Button variant='sidebar-icon' onClick={onSettingsModalOpen}>
            <Settings className='h-5 w-5' />
          </Button>
        </div>
      ) : (
        /* Full Sidebar */
        <>
          {/* Workspace Header */}
          <div className='px-5 pt-6.5 pb-4'>
            <div className='flex items-center'>
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-medium`}
              />
              <div className='ml-3'>
                <div className=' text-white text-2xl font-stretch-ultra-expanded font-bold'>
                  Editor
                </div>
                <div className='text-xs text-gray-400'>{workspaceName || "My Workspace"}</div>
              </div>
            </div>
          </div>

          {/* Search Trigger */}
          <div className='px-4 mb-6'>
            <div
              className='flex items-center bg-[#191919] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#313131] transition-colors'
              onClick={onSearchModalOpen}
            >
              <Search className='h-4 w-4 text-gray-400' />
              <span className='ml-2 text-sm text-gray-400'>Search...</span>
              <div className='flex text-gray-400 gap-1 ml-auto items-center'>
                <kbd className='bg-black px-2 py-[1px] rounded-md'>⌘</kbd>
                <p className='bg-black px-2 py-[1px] rounded-md'>K</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className='flex-1 overflow-y-auto py-2'>
            {/* Favorites */}
            <div className='px-3 mb-6'>
              <div className='flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2'>
                <Star className='h-3 w-3 mr-2' />
                Favorites
              </div>
              {favorites.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  doc={doc}
                  section='favorites'
                  selectedDocument={selectedDocument}
                  onSelectDocument={onSelectDocument}
                  onShareDocument={onShareDocument}
                  onToggleFavorite={onToggleFavorite}
                  onDeleteDocument={onDeleteDocument}
                />
              ))}
            </div>

            {/* Shared */}
            <div className='px-3 mb-6'>
              <div className='flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2'>
                <Users className='h-3 w-3 mr-2' />
                Shared
              </div>
              {shared.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  doc={doc}
                  section='shared'
                  selectedDocument={selectedDocument}
                  onSelectDocument={onSelectDocument}
                  onShareDocument={onShareDocument}
                  onToggleFavorite={onToggleFavorite}
                  onDeleteDocument={onDeleteDocument}
                />
              ))}
            </div>

            {/* All Documents */}
            <div className='px-3 mb-6'>
              <div className='flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2'>
                <span>Documents</span>
              </div>
              {documents.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  doc={doc}
                  section='documents'
                  selectedDocument={selectedDocument}
                  onSelectDocument={onSelectDocument}
                  onShareDocument={onShareDocument}
                  onToggleFavorite={onToggleFavorite}
                  onDeleteDocument={onDeleteDocument}
                />
              ))}
              <Button
                variant='sidebar-item'
                size='sidebar'
                onClick={onCreateNewDocument}
                className='mt-2 h-10 active:scale-95 transition-all duration-300 ease-in-out'
              >
                <Plus className='h-4 w-4 mr-2' />
                Add New Document
              </Button>
            </div>
          </div>

          {/* Settings */}
          <div className='px-4 pt-2 pb-4 border-t border-[#191919]'>
            <Button
              variant='sidebar-item'
              size='sidebar'
              onClick={onSettingsModalOpen}
              className='active:scale-95 flex pl-2 gap-4 transition-all duration-300 ease-in-out'
            >
              <Settings className='h-4 w-4 flex-shrink-0' />

              <div className='flex flex-col w-full items-start'>
                <div className='text-sm font-medium text-white truncate '>
                  {displayName || "User"}
                </div>

                <div className='text-xs text-gray-400 truncate '>{email || "user@example.com"}</div>
              </div>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
