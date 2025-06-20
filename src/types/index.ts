export type Document = {
  id: string;
  name: string;
  isShared?: boolean;
  isFavorite?: boolean;
  lastUpdated?: string;
  collaborators?: string[];
};

export type RecentDocument = {
  id: string;
  name: string;
  lastUpdated: string;
  collaborators: string[];
};

export type SettingsFormValues = {
  workspaceName: string;
  theme: "grey" | "focus" | "light";
  documentAutoSave: boolean;
  documentHistory: boolean;
  chatNotifications: boolean;
  chatSounds: boolean;
};

export type AvatarOption = {
  name: string;
  gradient: string;
};

export type User = {
  displayName: string;
  email: string;
  workspaceName: string;
  avatarOption: AvatarOption;
  isAuthenticated: boolean;
};
