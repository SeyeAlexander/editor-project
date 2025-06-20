import { Document, RecentDocument, AvatarOption } from "~/types";

export const avatarOptions: AvatarOption[] = [
  { name: "black", gradient: "from-gray-700 to-gray-900" },
  { name: "blue", gradient: "from-blue-400 to-blue-600" },
  { name: "purple", gradient: "from-purple-400 to-purple-700" },
  { name: "green", gradient: "from-green-400 to-green-600" },
  { name: "yellow", gradient: "from-yellow-300 to-amber-500" },
  { name: "red", gradient: "from-red-400 to-red-600" },
  { name: "pink", gradient: "from-pink-400 to-pink-600" },
  { name: "orange", gradient: "from-orange-300 to-orange-500" },
];

export const initialDocuments: Document[] = [
  {
    id: "project-proposal",
    name: "Project Proposal",
    isFavorite: true,
    lastUpdated: "2 hours ago",
    collaborators: ["John Doe"],
  },
  {
    id: "quarterly-report",
    name: "Quarterly Report",
    isShared: true,
    lastUpdated: "1 day ago",
    collaborators: ["Jane Smith", "Bob Wilson"],
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    lastUpdated: "3 days ago",
    collaborators: ["Alice Johnson", "Charlie Brown", "David Lee"],
  },
  {
    id: "brainstorming",
    name: "Brainstorming Ideas",
    isFavorite: true,
    lastUpdated: "1 week ago",
    collaborators: ["Emma Davis"],
  },
  {
    id: "budget-plan",
    name: "Budget Planning",
    lastUpdated: "2 weeks ago",
    collaborators: ["Frank Miller", "Grace Wilson"],
  },
];

export const initialRecentDocuments: RecentDocument[] = [
  {
    id: "project-proposal",
    name: "Project Proposal",
    lastUpdated: "2 hours ago",
    collaborators: ["John Doe"],
  },
  {
    id: "project-proposal-2",
    name: "Project Proposal 2",
    lastUpdated: "2 hours ago",
    collaborators: ["John Doe"],
  },
  {
    id: "project-proposal-3",
    name: "Project Proposal 3",
    lastUpdated: "2 hours ago",
    collaborators: ["John Doe"],
  },
  {
    id: "project-proposal-4",
    name: "Project Proposal 4",
    lastUpdated: "2 hours ago",
    collaborators: ["John Doe"],
  },
  {
    id: "project-proposal-5",
    name: "Project Proposal 5",
    lastUpdated: "2 hours ago",
    collaborators: ["John Doe"],
  },
  {
    id: "quarterly-report",
    name: "Quarterly Report",
    lastUpdated: "1 day ago",
    collaborators: ["Jane Smith", "Bob Wilson"],
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    lastUpdated: "3 days ago",
    collaborators: ["Alice Johnson", "Charlie Brown", "David Lee"],
  },
  {
    id: "brainstorming",
    name: "Brainstorming Ideas",
    lastUpdated: "1 week ago",
    collaborators: ["Emma Davis"],
  },
  {
    id: "budget-plan",
    name: "Budget Planning",
    lastUpdated: "2 weeks ago",
    collaborators: ["Frank Miller", "Grace Wilson"],
  },
];
