import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useUserStore } from "~/stores/userStore";
import {
  Search,
  Bell,
  Star,
  ChevronDown,
  FolderIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  ArchiveIcon,
  FileTextIcon,
  Share2,
  MoreHorizontal,
  MessageSquare,
  Users,
  Plus,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/editor")({
  component: EditorComponent,
});

type FileItem = {
  id: string;
  name: string;
  type: "document" | "folder" | "image" | "video" | "music";
  selected?: boolean;
};

function EditorComponent() {
  const { displayName, avatarOption, workspaceName, isAuthenticated } = useUserStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filesExpanded, setFilesExpanded] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "Project Proposal", type: "document" },
    { id: "2", name: "Quarterly Report", type: "document" },
    { id: "3", name: "Ideas", type: "document" },
    { id: "4", name: "Vacation Planning", type: "document" },
    { id: "5", name: "Work Notes", type: "document" },
    { id: "6", name: "Financial Report", type: "document" },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  const getIconForType = (type: string) => {
    switch (type) {
      case "folder":
        return <FolderIcon className='h-5 w-5 text-gray-400' />;
      case "image":
        return <ImageIcon className='h-5 w-5 text-gray-400' />;
      case "video":
        return <VideoIcon className='h-5 w-5 text-gray-400' />;
      case "music":
        return <MusicIcon className='h-5 w-5 text-gray-400' />;
      case "document":
        return <FileTextIcon className='h-5 w-5 text-gray-400' />;
      default:
        return <FileTextIcon className='h-5 w-5 text-gray-400' />;
    }
  };

  const selectFile = (id: string) => {
    setFiles(
      files.map((file) => ({
        ...file,
        selected: file.id === id,
      }))
    );
    navigate({ to: `/editor/${id}` });
  };

  // Determine gradient class based on selected avatar
  const gradientClass = avatarOption?.gradient || "from-gray-700 to-gray-900";

  return (
    <div className='h-screen flex bg-black text-white overflow-hidden'>
      {/* Left Sidebar */}
      <div
        className={cn(
          "flex flex-col border-r border-gray-800 transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* User/Workspace Section */}
        <div className='flex items-center p-4 border-b border-gray-800'>
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
          >
            {displayName?.charAt(0) || "E"}
          </div>
          {!sidebarCollapsed && (
            <div className='ml-3 truncate'>
              <div className='font-medium'>{displayName || "User"}</div>
              <div className='text-xs text-gray-400'>{workspaceName || "My Workspace"}</div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className='p-3'>
          <div className='flex items-center bg-gray-900 rounded-md px-3 py-1.5'>
            <Search className='h-4 w-4 text-gray-400' />
            {!sidebarCollapsed && (
              <input
                type='text'
                placeholder='Search your files'
                className='bg-transparent border-none ml-2 text-sm focus:outline-none text-gray-300 w-full'
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className='flex-1 overflow-y-auto'>
          <div className='p-1.5'>
            <div
              className={cn(
                "flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors",
                !sidebarCollapsed && "justify-between"
              )}
            >
              <div className='flex items-center'>
                <Bell className='h-5 w-5' />
                {!sidebarCollapsed && <span className='ml-3'>Notifications</span>}
              </div>
            </div>

            <div
              className={cn(
                "flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md mt-1 transition-colors",
                !sidebarCollapsed && "justify-between"
              )}
            >
              <div className='flex items-center'>
                <Star className='h-5 w-5' />
                {!sidebarCollapsed && <span className='ml-3'>Starred</span>}
              </div>
            </div>
          </div>

          {/* Folders Section */}
          <div className='mt-6'>
            {!sidebarCollapsed && (
              <div className='px-4 py-1 text-xs uppercase text-gray-500 font-medium tracking-wider'>
                Folders
              </div>
            )}

            <div className='mt-1 p-1.5'>
              <div
                className='flex items-center justify-between px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md cursor-pointer transition-colors'
                onClick={() => setFilesExpanded(!filesExpanded)}
              >
                <div className='flex items-center'>
                  <FolderIcon className='h-5 w-5' />
                  {!sidebarCollapsed && <span className='ml-3'>Documents</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${filesExpanded ? "" : "-rotate-90"}`}
                  />
                )}
              </div>

              {filesExpanded && !sidebarCollapsed && (
                <div className='ml-4 mt-1'>
                  <div className='flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-md cursor-pointer'>
                    <ImageIcon className='h-4 w-4' />
                    <span className='ml-3 text-sm'>Images</span>
                    <span className='ml-auto text-xs text-gray-500'>865</span>
                  </div>

                  <div className='flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-md cursor-pointer'>
                    <VideoIcon className='h-4 w-4' />
                    <span className='ml-3 text-sm'>Videos</span>
                    <span className='ml-auto text-xs text-gray-500'>568</span>
                  </div>

                  <div className='flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-md cursor-pointer'>
                    <MusicIcon className='h-4 w-4' />
                    <span className='ml-3 text-sm'>Music</span>
                    <span className='ml-auto text-xs text-gray-500'>42</span>
                  </div>

                  <div className='flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-md cursor-pointer'>
                    <ArchiveIcon className='h-4 w-4' />
                    <span className='ml-3 text-sm'>Archives</span>
                    <span className='ml-auto text-xs text-gray-500'>24</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags Section */}
          {!sidebarCollapsed && (
            <div className='mt-6'>
              <div className='px-4 py-1 text-xs uppercase text-gray-500 font-medium tracking-wider flex justify-between items-center'>
                <span>Tags</span>
                <Plus className='h-4 w-4 cursor-pointer' />
              </div>

              <div className='mt-1 p-1.5'>
                <div className='flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md cursor-pointer'>
                  <div className='h-2 w-2 rounded-full bg-red-500'></div>
                  <span className='ml-3 text-sm'>Important</span>
                  <span className='ml-auto text-xs text-gray-500'>24</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top Bar */}
        <div className='flex items-center justify-between h-14 px-4 border-b border-gray-800'>
          <div className='flex items-center'>
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
            >
              {workspaceName?.charAt(0) || "E"}
            </div>
            <div className='ml-2 font-medium'>{workspaceName || "Documents"}</div>
            <div className='mx-2 text-gray-600'>/</div>
            <div className='text-gray-400'>My files</div>
            <div className='mx-2 text-gray-600'>/</div>
            <div className='text-gray-400'>Documents</div>
          </div>

          <div className='flex items-center'>
            <Share2 className='h-5 w-5 text-gray-400 mr-4 cursor-pointer' />
            <Users className='h-5 w-5 text-gray-400 mr-4 cursor-pointer' />
            <div className='ml-2 cursor-pointer' onClick={() => setChatOpen(!chatOpen)}>
              <MessageSquare
                className={cn(
                  "h-5 w-5 transition-colors",
                  chatOpen ? "text-blue-400" : "text-gray-400"
                )}
              />
            </div>
          </div>
        </div>

        {/* Main Area with Files List and Editor */}
        <div className='flex flex-1 overflow-hidden'>
          <div className='w-72 border-r border-gray-800 overflow-y-auto'>
            <div className='p-4 border-b border-gray-800'>
              <div className='text-lg font-medium'>Documents</div>
            </div>

            <div className='py-2'>
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => selectFile(file.id)}
                  className={cn(
                    "flex items-center px-4 py-3 cursor-pointer",
                    file.selected ? "bg-gray-800" : "hover:bg-gray-900"
                  )}
                >
                  {getIconForType(file.type)}
                  <div className='ml-3'>{file.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor Canvas */}
          <div className='flex-1 flex flex-col overflow-hidden'>
            <div className='flex-1 overflow-auto p-6'>
              <Outlet />
            </div>
          </div>

          {/* Chat Panel */}
          {chatOpen && (
            <div className='w-80 border-l border-gray-800 flex flex-col'>
              <div className='p-4 border-b border-gray-800 flex justify-between items-center'>
                <div className='text-lg font-medium'>Chat</div>
                <button onClick={() => setChatOpen(false)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>

              <div className='flex-1 overflow-y-auto p-4'>
                <div className='flex mb-4'>
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradientClass} flex-shrink-0 flex items-center justify-center`}
                  >
                    {displayName?.charAt(0) || "U"}
                  </div>
                  <div className='ml-2 bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]'>
                    <div className='text-sm font-medium'>{displayName || "User"}</div>
                    <div className='text-sm text-gray-300'>Let's collaborate on this document!</div>
                  </div>
                </div>

                <div className='flex justify-end mb-4'>
                  <div className='mr-2 bg-blue-600 p-3 rounded-lg rounded-tr-none max-w-[80%]'>
                    <div className='text-sm'>Sounds great! I'll add some notes.</div>
                  </div>
                  <div className='w-8 h-8 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center'>
                    C
                  </div>
                </div>
              </div>

              <div className='p-4 border-t border-gray-800'>
                <div className='flex'>
                  <input
                    type='text'
                    placeholder='Type a message...'
                    className='flex-1 bg-gray-800 rounded-l-md px-4 py-2 text-sm focus:outline-none'
                  />
                  <Button
                    className={`rounded-l-none bg-gradient-to-r ${gradientClass} text-white px-4 py-2`}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
