import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useUserStore } from "~/stores/userStore";
import { cn } from "~/lib/utils";
import { SearchModal } from "~/components/SearchModal";
import { SettingsModal } from "~/components/SettingsModal";
import { Sidebar } from "~/components/Sidebar";
import { ChatPanel } from "~/components/ChatPanel";
import { EditorContent } from "~/components/EditorContent";
import { Document, RecentDocument, SettingsFormValues } from "~/types";
import { avatarOptions, initialDocuments, initialRecentDocuments } from "~/data/mockData";

export const Route = createFileRoute("/editor")({
  component: EditorComponent,
});

function EditorComponent() {
  const {
    displayName,
    email,
    avatarOption,
    workspaceName,
    isAuthenticated,
    setDisplayName,
    setAvatarOption,
    setWorkspaceName,
  } = useUserStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState("project-proposal");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOption?.name || "black");
  const [documentCounter, setDocumentCounter] = useState(1);
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [recentDocuments] = useState<RecentDocument[]>(initialRecentDocuments);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchModalOpen) {
          setSearchModalOpen(false);
        } else if (settingsModalOpen) {
          setSettingsModalOpen(false);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "t") {
        e.preventDefault();
        createNewDocument();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        setSettingsModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchModalOpen, settingsModalOpen]);

  const createNewDocument = () => {
    const newDoc: Document = {
      id: `new-page-${Date.now()}`,
      name: `New Page (${documentCounter})`,
      lastUpdated: "Just now",
      collaborators: [displayName || "You"],
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocument(newDoc.id);
    setDocumentCounter((prev) => prev + 1);
    setSearchModalOpen(false);
  };

  const toggleFavorite = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, isFavorite: !doc.isFavorite } : doc))
    );
  };

  const shareDocument = (docId: string, email?: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, isShared: true } : doc))
    );
  };

  const deleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    if (selectedDocument === docId && documents.length > 1) {
      const remainingDocs = documents.filter((doc) => doc.id !== docId);
      setSelectedDocument(remainingDocs[0]?.id || "");
    }
  };

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/shared/${selectedDocument}`;
    navigator.clipboard.writeText(shareLink);
  };

  const onSettingsSubmit = (data: SettingsFormValues, selectedAvatarName: string) => {
    setWorkspaceName(data.workspaceName);
    const newAvatarOption = avatarOptions.find((avatar) => avatar.name === selectedAvatarName);
    if (newAvatarOption) {
      setAvatarOption(newAvatarOption);
    }
    setSelectedAvatar(selectedAvatarName);
    setSettingsModalOpen(false);
  };

  const currentDocument = documents.find((doc) => doc.id === selectedDocument);
  const gradientClass = avatarOption?.gradient || "from-gray-700 to-gray-900";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const renderCollaboratorAvatars = (collaborators: string[]) => {
    const maxVisible = 2;
    const visibleCollaborators = collaborators.slice(0, maxVisible);
    const remainingCount = collaborators.length - maxVisible;

    return (
      <div className='flex -space-x-2'>
        {visibleCollaborators.map((collaborator, index) => (
          <div
            key={index}
            className='w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium border-1 border-[#191919]'
          >
            {getInitials(collaborator)}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className='w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-medium border-1 border-[#191919]'>
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("h-screen flex overflow-hidden", chatOpen ? "bg-white" : "bg-black")}>
      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onCreateDocument={createNewDocument}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onSelectDocument={(docId) => setSelectedDocument(docId)}
        recentDocuments={recentDocuments}
        renderCollaboratorAvatars={renderCollaboratorAvatars}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        onSubmit={onSettingsSubmit}
        workspaceName={workspaceName || ""}
        avatarOptions={avatarOptions}
        currentAvatarName={selectedAvatar}
        userEmail={email || ""}
        displayName={displayName || ""}
      />

      {/* Left Sidebar */}
      <Sidebar
        chatOpen={chatOpen}
        workspaceName={workspaceName || ""}
        displayName={displayName || ""}
        email={email || ""}
        gradientClass={gradientClass}
        documents={documents}
        selectedDocument={selectedDocument}
        onSearchModalOpen={() => setSearchModalOpen(true)}
        onSettingsModalOpen={() => setSettingsModalOpen(true)}
        onChatToggle={setChatOpen}
        onSelectDocument={setSelectedDocument}
        onShareDocument={shareDocument}
        onToggleFavorite={toggleFavorite}
        onDeleteDocument={deleteDocument}
        onCreateNewDocument={createNewDocument}
      />

      {/* Editor Area */}
      <div className='flex-1 flex'>
        {/* Main Editor Panel */}
        <EditorContent
          chatOpen={chatOpen}
          currentDocument={currentDocument}
          onToggleFavorite={toggleFavorite}
          onShareDocument={shareDocument}
          onCopyShareLink={copyShareLink}
          onChatToggle={setChatOpen}
          renderCollaboratorAvatars={renderCollaboratorAvatars}
        />

        {/* Chat Panel */}
        <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  );
}
