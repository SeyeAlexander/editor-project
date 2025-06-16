## Project Vision & Goals Recap

- **Core Product:** A fully functional, real-time collaborative rich-text editor similar to Notion.
- **Key Characteristics:** Block-based architecture, rich content (text, images, videos, tables), real-time collaboration (shared editing, cursors, chat, comments), document sharing with permissions.
- **Tech Stack Highlights:** Lexical, TanStack Start, Tailwind CSS, Shadcn/ui, Supabase (Auth, Realtime DB, Storage), Drizzle ORM.
- **Primary Goal:** Create a standout portfolio piece attractive for MAANG and senior frontend roles, showcasing modern tech proficiency and ability to build complex applications.

## Guiding UI/UX Principles & Structure

The UI should be clean, intuitive, minimalist yet powerful, drawing inspiration from Notion, Craft, and other modern productivity tools.

**Core Principles:**

- **Clarity & Focus:** Prioritize content. Keep UI chrome minimal, especially during editing.
- **Speed & Responsiveness:** The UI must feel fast and fluid.
- **Consistency:** Maintain consistent design patterns for interactions, buttons, and information display.
- **Accessibility:** Design with accessibility in mind (keyboard navigation, ARIA attributes, contrast).
- **Collaborative Visual Cues:** Clearly indicate who is editing, where their cursor is, and recent changes.

**UI Structure for V0/Lovable Input:**

You'll typically feed descriptions of layouts and components into tools like V0. Here’s a breakdown:

### Core UI Structure

```

┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Document Title | Share Button | User Avatar  │
├─────────────────────────────────────────────────────────────┤
│ Sidebar (Collapsible) │ Main Editor Area │ Right Panel     │
│ - Document Tree       │ - Block Editor   │ - Comments      │
│ - Shared Docs         │ - Slash Commands │ - AI Assistant  │
│ - Chat Panel          │ - Live Cursors   │ - Version Hist  │
│ - Settings            │                  │ - Focus Mode    │
└─────────────────────────────────────────────────────────────┘

```

### UI Component Specifications for V0/Lovable

Theme
Dark theme

### Header Component

- **Clean minimalist design** with glassmorphism effect
- **Document title** as editable inline text (large, bold)
- **Collaboration indicators**: Live user avatars with colored rings
- **Share button** with gradient background and subtle animations
- **User menu** dropdown with profile picture

1. **Auth Page (New):**

   - **Purpose:** ain sign in sign up page, briefly explain the product's value proposition on right side of the image.

2. **Onboarding Flow (New - after Sign Up, before Main App):**

   - **Purpose:** Guide new users through initial setup and introduce key features to ensure a smooth first experience.
   - **Steps (Example - typically 2-4 steps):**
     - **Welcome Screen:** Friendly welcome message.
     - **Profile Setup (Minimal):** Maybe ask for a display name or avatar preference (can be skipped or done later).
     - **Workspace Setup (Optional):** "Name your first workspace" or similar.
     - **Quick Feature Tour (Interactive/Modal-based):** Highlight 1-2 core functionalities, e.g., "Type '/' for commands" or "Click here to share." Use tooltips or spotlights.
     - **"Let's Go" / "Enter App" CTA:** Takes them to the main application.
   - **Design:** Minimalist, progress indicators, clear instructions, skippable options.

3. **Overall Layout (Main App Shell):**

   - **Sidebar (Left, Collapsible):**
     - **Workspace/User Section:** User avatar, name, settings access.
     - **Navigation Tree:**
       - "Private" pages (user's own documents).
       - "Shared with me" section.
       - "Favorites" or "Quick Access."
       - Ability to create new pages/documents.
       - Search bar for documents.
     - **Optional:** Templates, Trash.
   - **Main Content Area (Right):**
     - **Top Bar (Contextual):**
       - Document Title (editable).
       - Sharing button/avatar pile of collaborators.
       - "Last edited" info / sync status.
       - Comments toggle/icon.
       - Page options (e.g., export, duplicate, delete, version history).
       - Focus Mode toggle.
     - **Editor Canvas:** The primary area where Lexical renders the document.
   - **Chat Pane (Optional Right Sidebar or Integrated Modal):**
     - Activates when a shared document is open.
     - Lists users with whom the document is shared.
     - Chat history for the current document context.
     - enter chat room for this document
     - chat room looks like a whatsapp group, if documents shared with multiple users, they can chat also, chat dialog opens to the right with smooth anomation
     - Input field for sending messages.

   **AI Ideas Chat Pane (can be a separate overlay/modal or a toggleable section of a sidebar, or bottom right corner):**

   - **Triggered by:** "AI Ideas" button.
   - **Content:** Chat interface with a prompt input area, conversation history with the AI.
   - **Functionality:** Send user prompts related to their current document (or general ideas) to an AI service, display responses. Options to copy AI suggestions easily.

4. **Key UI Components (Shadcn/ui based):**

   - **Buttons:** Primary, secondary, destructive, icon buttons. Consistent styling.
   - **Modals/Dialogs:** For sharing, settings, creating new pages, confirming actions.
   - **Dropdown Menus:** For page options, block options, user settings.
   - **Input Fields:** Search, document title, chat input.
   - **Avatars & Avatar Groups:** For users, collaborators.
   - **Tooltips:** For icon buttons and less obvious features.
   - **Notifications/Toasts:** For actions like "Document Saved," "Link Copied," "User Invited."
   - **Context Menus:** Right-click on blocks or elements for quick actions.
   - **Slash Command Menu:** A pop-up menu triggered by "/" in the editor.
   - **Formatting Toolbar (Floating/Contextual):** Appears when text is selected, offering bold, italic, links, color, etc.

   Design System Requirements

   - **Color palette**: Primary dark hues, Secondary gray, gpurple hues
   - **Typography**: Inter font family, clear hierarchy
   - **Spacing**: 4px grid system
   - **Animations**: Smooth transitions (300ms ease-in-out)
   - **Shadows**: Subtle elevation with multiple layers

**Example V0/Lovable Prompt Snippet (for a component):**

`"Create a modal dialog for sharing a document. It should have a title 'Share [Document Name]'.
Include an input field labeled 'Add people or groups' with a search-as-you-type functionality for users.
Below the input, display a list of users already having access, showing their avatar, name, and current permission level (e.g., 'Can Edit', 'Can View') in a dropdown.
Allow changing permission levels.
Include a 'Copy link' button.
Provide options for link sharing (e.g., 'Anyone with the link can view').
Have a 'Done' button and a 'Cancel' or close icon."`

---

## Technology Stack Summary

- **Frontend Framework:** TanStack Start (React)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Rich Text Editor:** Lexical
- **Client-Side State/Caching:** TanStack Query
- **Backend:** Supabase (PostgreSQL Database, Auth, Realtime, Storage)
- **ORM:** Drizzle ORM

---

## Supabase Setup Strategy

**(To be done after initial UI scaffolding and basic local editor setup)**

1. **Project Creation:** You've already set up an account and organization. Create a new project for this editor.
2. **Authentication:**
   - Enable Email/Password auth.
   - Consider adding OAuth providers (Google, GitHub) for easier sign-up.
   - Familiarize yourself with Supabase Auth user objects and JWTs.
3. **Database Table Design (Initial Thoughts - Drizzle Schemas will formalize this):**
   - `users`: (Handled by Supabase Auth `auth.users` table, but you might create a public `profiles` table linked via user ID for public user data like avatar, display name if needed beyond what `auth.users.raw_user_meta_data` offers).
     - `id (uuid, primary key, references auth.users.id)`
     - `display_name (text)`
     - `avatar_url (text, nullable)`
     - `email (text, unique, references auth.users.email)`
     - `created_at (timestampz)`
     - `updated_at (timestampz)`
   - `documents`:
     - `id (uuid, primary key, default gen_random_uuid())`
     - `owner_id (uuid, references auth.users.id)`
     - `title (text, default 'Untitled')`
     - `content (jsonb, nullable)` - Stores Lexical editor state (serialized JSON)
     - `created_at (timestampz)`
     - `updated_at (timestampz)`
     - `last_edited_by (uuid, references auth.users.id, nullable)`
     - `is_public (boolean, default false)` (For link sharing)
   - `document_collaborators` (Junction table for sharing):
     - `document_id (uuid, references documents.id, primary key)`
     - `user_id (uuid, references auth.users.id, primary key)`
     - `permission_level (enum: 'view', 'comment', 'edit', default 'view')`
     - `invited_at (timestampz)`
   - `comments`:
     - `id (uuid, primary key, default gen_random_uuid())`
     - `document_id (uuid, references documents.id)`
     - `user_id (uuid, references auth.users.id)`
     - `block_id (text, nullable)` - ID of the Lexical block the comment is anchored to
     - `content (text)`
     - `parent_comment_id (uuid, references comments.id, nullable)` - For threaded comments
     - `created_at (timestampz)`
     - `updated_at (timestampz)`
     - `resolved_at (timestampz, nullable)`
   - `chat_rooms` (Implicitly, a document can be a chat room, or you can have a more explicit table if chats can exist outside documents):
     - For document-specific chat, you might not need a separate `chat_rooms` table. Messages can be linked directly to `documents`. If you want chats _between users independent of documents_, then a `chat_rooms` and `chat_room_participants` table would be needed. For this project, let's assume chat is scoped to a document.
   - `chat_messages`:
     - `id (uuid, primary key, default gen_random_uuid())`
     - `document_id (uuid, references documents.id)` (Scope chat to document)
     - `sender_id (uuid, references auth.users.id)`
     - `content (text)`
     - `created_at (timestampz)`
     - `mentioned_user_ids (uuid[], nullable)` (Array of user IDs mentioned)
   - `assets` (For uploaded images/videos):
     - `id (uuid, primary key, default gen_random_uuid())`
     - `document_id (uuid, references documents.id, nullable)` - If asset is embedded
     - `user_id (uuid, references auth.users.id)` (Uploader)
     - `storage_path (text)` - Path in Supabase Storage
     - `file_name (text)`
     - `mime_type (text)`
     - `size_bytes (integer)`
     - `created_at (timestampz)`
4. **Row Level Security (RLS):**
   - Enable RLS on all tables.
   - `documents`: Users can select/insert/update/delete their own documents. Collaborators can select/update based on `document_collaborators.permission_level`.
   - `document_collaborators`: Users can select their own entries. Document owners can manage collaborators for their documents.
   - `comments`: Users can insert comments. Users can update/delete their own comments. Anyone with document access can select comments for that document.
   - `chat_messages`: Users involved in a document's share can insert/select messages for that document.
   - `assets`: Users can insert assets. Users can select assets they uploaded or that are part of documents they have access to.
5. **Storage:**
   - Create a bucket (e.g., `document_assets`) for image/video uploads.
   - Define storage policies (e.g., authenticated users can upload, specific rules for access based on document permissions).
6. **Realtime:**
   - Enable Realtime for the tables involved in collaboration: `documents` (for content updates), `comments`, `chat_messages`.
   - Plan your Realtime channels (e.g., a channel per document for edits, comments, and chat).
7. **AI Chat considerations**
   - **API Key Management:** API keys for Anthropic/OpenAI will need to be stored securely, ideally as secrets in your Supabase project (Edge Function environment variables) and _never_ exposed client-side.
   - **Optional Logging (Consider Privacy):** You _could_ log AI interactions (prompts/responses) for analytics or user history, which would require a new table. However, be mindful of privacy and data storage costs. For a portfolio project, direct calls from an Edge Function without logging might be simpler.

---

## Detailed Phased Implementation Plan

### Phase 0: UI Scaffolding & Basic Editor Shell (V0/Lovable Focus)

- **Goal:** Create the public-facing pages, user onboarding and get a visually appealing and structurally sound application shell.
- **Tasks:**
  1. **Project Setup:** Initialize TanStack Start, Tailwind CSS, Shadcn/ui.
  2. **Landing Page Implementation (V0/Lovable)**
  - Design and build the responsive landing page sections.
  - **Authentication UI (Part of Onboarding/Login):**
    - Set up Supabase client.
    - Implement sign-up, sign-in forms using Supabase Auth UI (customized) or custom forms.
    - Create basic routing for `/login`, `/signup`.
  - **Onboarding Flow Implementation (V0/Lovable):** Design and build the multi-step onboarding UI after signup.
  1. **Define Core Layouts (using V0/Lovable input from UI section above):**
     - Implement the main app shell (Sidebar, Main Content Area, Top Bar).
     - Create placeholder pages/views for navigation items.
  2. **Implement Key UI Components (Shadcn/ui):** Create reusable versions of buttons, modals, dropdowns, inputs, avatars based on V0 output.
  3. **Basic Lexical Shell:**
     - Install Lexical and its React package.
     - Render a very basic, non-functional Lexical editor instance within the main content area.
     - No persistence, no advanced features yet. Just ensure it loads.
- **Outcome:** A public landing page, a user onboarding flow leading to a structured main app shell with a placeholder editor.

### Phase 1: Core Local Editor Functionality (Lexical Focus)

- **Goal:** A functional single-user editor with core block operations and formatting.
- **Tasks:**
  1. **Lexical Configuration:**
     - Set up Lexical `EditorState`, `EditorConfig` (nodes, theme).
     - Register core nodes (paragraph, heading, list, link, quote, code block).
  2. **Block-Based Operations:**
     - Implement creation of new blocks (e.g., Enter key behavior).
     - Basic text editing within blocks.
     - Deleting blocks (Backspace at start of block, dedicated delete action).
  3. **Slash Commands:**
     - Implement a basic slash command menu (e.g., `/h1`, `/list`, `/image`).
     - Trigger block type transformations.
  4. **Basic Formatting Toolbar:**
     - Implement a floating toolbar on text selection (bold, italic, underline, strikethrough, link creation).
     - Use Lexical's command system to apply formatting.
  5. **Undo/Redo:**
     - Integrate Lexical's history plugin for undo/redo functionality.
     - Connect to UI buttons/keyboard shortcuts.
  6. **Drag & Drop Reordering of Blocks:**
     - Research and implement block reordering within Lexical. This might involve custom node logic or plugins.
  7. **Nested Blocks (Basic):**
     - Ensure list items can be nested.
     - Explore concepts for other nested structures if time permits (e.g., toggles).
  8. **Serialization/Deserialization Strategy (Critical for Syncing):**
  - Implement logic to serialize the entire Lexical editor state to a JSON string.
  - Implement logic to deserialize this JSON string back into a Lexical editor state.
  - **Crucial:** Use Lexical's `editor.getEditorState().toJSON()` for serialization.
  - (Initial local persistence via `localStorage` to test this thoroughly).
  1. **Change Detection Mechanism:**
     - Integrate Lexical's `OnChangePlugin`. This plugin fires a callback whenever the `EditorState` changes.
     - For now, simply log the serialized editor state on change to understand its output and frequency.
- **Lexical Focus:** Deep dive into Lexical's node system, command API, plugins, and state management.
- **Outcome:** A robust local editor where a user can create, edit, format, and structure content.

### Phase 2: User Authentication & Basic Supabase Integration (Documents CRUD)

- **Goal:** Users can sign up, log in, and save/load their documents to/from Supabase.
- **Tasks:**

  1. **Supabase Auth Integration & Onboarding completion:**
     - Set up Supabase client.
     - Implement sign-up, sign-in, sign-out flows using Supabase Auth UI components (customized with Shadcn/ui) or by building custom forms calling Supabase Auth methods.
     - Protect routes/features based on authentication state.
     - Manage user session using TanStack Start's context/Supabase client.
  2. **Drizzle ORM Setup:**
     - Install Drizzle ORM and Drizzle Kit.
     - Define Drizzle schemas for `users` (profiles), `documents` based on the Supabase table design.
     - Generate migrations using Drizzle Kit and apply them to your Supabase DB.
  3. **TanStack Query Integration:**
     - Set up TanStack Query for managing server state.
  4. **Document CRUD Operations:**

     - **Create:** New document button saves a basic document structure (e.g., title, owner_id) to Supabase via a Drizzle-powered API endpoint or Supabase function.
     - **Read (List):** Fetch and display a list of the logged-in user's documents in the sidebar.
     - **Read (Single):** Load a selected document's content (Lexical JSON from `documents.content`) from Supabase and deserialize it into the Lexical editor.
     - **Update:** Periodically (e.g., on blur, or using a debounce mechanism) or on explicit save, serialize Lexical state and update the `documents.content` in Supabase.

     (Initial Save Strategy) In the `OnChangePlugin` callback from Phase 1:

     - Implement **debouncing logic**. Don't save on _every single keystroke_. A debounce time of 2-3 seconds is a common starting point.
     - After the debounce period, if changes have occurred, serialize the _entire Lexical editor state_ to JSON.
     - Use TanStack Query to call a Supabase Edge Function (or directly update via Supabase client if RLS is very solid) to save this full JSON to the `documents.content` field in your Supabase table for the current document.
     - Update the `documents.updated_at` and `documents.last_edited_by` fields.
     - Consider an explicit "Save" indicator or a "Saving..." status that changes to "Saved" or "All changes saved."
     - **Delete:** Allow users to delete their documents.

- **Drizzle Newcomer Tip:** Start simple. Focus on mapping your schemas to tables correctly. Use Drizzle Studio (if available/compatible) or a standard SQL client to inspect your Supabase tables and verify Drizzle's operations. Read Drizzle docs on querying.
- **Outcome:** Authenticated users can manage their own documents, persisted in Supabase.

### Phase 3: Real-time Collaboration - Block Syncing, Cursors & Advanced Save Strategy

- **Goal:** rue real-time multi-user editing with conflict resolution and efficient data transfer. Multiple users, users that share a document, can edit the same document simultaneously, seeing each other's changes and cursors in real-time.
- **High-Level Preparation & Strategy Selection (MAANG-worthy thinking):**
  - **CRDTs with Yjs (Recommended for Robustness & Scalability - MAANG-worthy):**
    - **Concept:** Yjs is a CRDT implementation. It handles the data structure for collaboration and resolves conflicts automatically. Lexical acts as the view layer.
    - **Integration:**
      - Use `@lexical/yjs` and `yjs`.
      - Store the Yjs document (or its updates) in Supabase. This can be done by storing the Yjs document as a `bytea` (binary) blob or by storing Yjs updates as individual rows and periodically compacting them. The latter is often better for incremental syncing.
      - Use a "Yjs provider" to connect Yjs to your communication backend. You can build a Supabase Realtime Yjs provider (or find examples). This provider will:
        - Listen for local Yjs document changes and send these binary updates (very small) via Supabase Realtime Broadcast to a document-specific channel.
        - Receive Yjs updates from other clients via the Realtime channel and apply them to the local Yjs document.
      - The `@lexical/yjs` plugin then syncs the Lexical editor state with the Yjs document state.
    - **Pros:** Highly scalable, excellent conflict resolution, efficient data transfer (only small binary updates are sent). This is how many production-grade collaborative apps work. Involves managing Yjs document lifecycle and its binary updates.
- **Tasks - a path towards CRDTs/Yjs for best results:**

  1. **Introduce Yjs:**
     - Integrate `yjs` and `@lexical/yjs` into your project.
     - For each document, create/load a Yjs document (`Y.Doc`).
     - Bind the Lexical editor to this Yjs document using the `CollaborationPlugin` from `@lexical/yjs`. Lexical changes will update Yjs, and Yjs changes will update Lexical.
  2. **Yjs Persistence & Supabase Realtime Provider:**
     - **Storage:** Decide how to store Yjs data. A common approach is to store Yjs updates. Create a table like `document_yjs_updates (id, document_id, update_data bytea, created_at)`.
     - **Initial Load:** When a document is opened, fetch all its `update_data` from Supabase, apply them in order to a new `Y.Doc` to reconstruct its state.
     - **Local Changes:** When the local Yjs document changes (because Lexical changed), the Yjs provider captures the binary `update`.
       - Send this `update` via Supabase Realtime Broadcast to a document-specific channel (e.g., `doc-updates:<document_id>`).
       - Persist this `update` to your `document_yjs_updates` table in Supabase (this can be done via an Edge Function triggered by the broadcast or a direct insert).
     - **Remote Changes:** When a Yjs `update` is received from the Supabase Realtime channel:
       - Apply this binary `update` to the local `Y.Doc`. `@lexical/yjs` will then update the Lexical editor.
  3. **Supersede Debounced Full Save:** The Yjs approach effectively replaces the debounced full-save for _content changes_. The `documents.content` (JSONB) field might now become a less frequently updated snapshot or a read-only representation for non-Yjs-aware consumers, or you might phase it out for content if Yjs becomes the sole source of truth for collaborative content. Document metadata (title, owner) is still saved normally.
  4. **Real-time User Cursors (Awareness):**
     - Yjs providers often have built-in support or examples for broadcasting cursor awareness information (selection, user ID, color).
     - Use Supabase Realtime Broadcast for this, sending cursor data on a document-specific channel.
     - Render remote cursors/selections as custom decorators in Lexical.
  5. **Presence (Avatar Pile):** Use Supabase Realtime's Presence feature.

- **Refined Thinking on Block Edits, Reorder, Add, Delete:**
  - With Lexical and Yjs, you generally don't think about "block-level saves" explicitly. You modify the Lexical editor (e.g., delete a block, type in a paragraph, reorder).
  - `@lexical/yjs` translates these rich editor operations into Yjs shared data type modifications.
  - Yjs generates compact binary updates representing these fine-grained changes. These updates are what get synced.
  - Other clients apply these updates, and their Lexical editors reflect the discrete block changes, reorders, etc., as if they happened locally.
- **Outcome:** Robust, scalable real-time collaboration. Conflicts are handled gracefully by Yjs. Network traffic is minimized.

###

### Phase 4: Document Sharing & Permissions

- **Goal:** Users can share documents with others, controlling their permission levels.
- **Tasks:**
  1. **Drizzle Schemas:** Define `document_collaborators` schema.
  2. **Sharing UI:**
     - Implement the sharing modal (as described in UI section).
     - Allow searching for users to invite (requires a way to query users, perhaps by email, from your `profiles` table).
     - Allow setting permission levels (`view`, `comment`, `edit`).
  3. **Backend Logic for Sharing:**
     - API endpoints (or Supabase functions) to add/remove collaborators and update permissions in `document_collaborators`.
     - Ensure only document owners can manage sharing settings.
  4. **Enforcing Permissions:**
     - **Client-side:** Disable UI elements based on permissions (e.g., non-editors can't type).
     - **Server-side (Crucial):** Use Supabase Row Level Security (RLS) on the `documents` table and other relevant tables to enforce that users can only perform actions allowed by their permission level. For example, an `UPDATE` policy on `documents` would check if `auth.uid()` is the `owner_id` OR if they have 'edit' permission in `document_collaborators`.
  5. **"Shared with me" View:** Implement the section in the sidebar to list documents shared with the current user.
- **Outcome:** Secure document sharing with granular permissions.

### Phase 5: Comments Implementation

- **Goal:** Users can add, view, and reply to comments on documents or specific blocks.
- **Tasks:**
  1. **Drizzle Schemas:** Define `comments` schema.
  2. **Commenting UI:**
     - Ability to select a block or text range to comment on.
     - A comment pane/sidebar to display comments.
     - Input fields for adding new comments and replies (threaded).
     - Displaying user avatars and names with comments.
     - "@mention" functionality to tag users (requires user search).
     - Option to resolve/unresolve comments.
  3. **Backend Logic for Comments:**
     - CRUD operations for comments via API endpoints/Supabase functions, linked to `document_id` and optionally `block_id`.
     - RLS to ensure users can only manage their own comments or resolve comments on documents they can edit.
  4. **Real-time Comment Updates:**
     - Use Supabase Realtime to broadcast new/updated comments to all users viewing the document.
  5. **Lexical Integration:**
     - Visually indicate in the editor where comments are anchored (e.g., highlighted text, icons in the margin).
     - Clicking these indicators should open/focus the relevant comment in the comment pane.
- **Outcome:** A functional commenting system integrated with the editor.

### Phase 6: Real-time Chat Implementation

- **Goal:** Users who share a document can chat with each other in real-time within the context of that document.
- **Tasks:**
  1. **Drizzle Schemas:** Define `chat_messages` schema (linking to `document_id`).
  2. **Chat UI:**
     - A chat pane/area (as described in UI section).
     - Display list of users involved in the document share.
     - Display chat message history.
     - Input field for sending messages.
     - Timestamps and sender information for messages.
  3. **Backend Logic for Chat:**
     - API endpoint/Supabase function to save new chat messages.
     - RLS: Only users who are part of the document's share (owner or collaborator) can send/receive messages for that document's chat.
  4. **Real-time Chat Messages:**
     - Use Supabase Realtime:
       - Subscribe to a document-specific channel (e.g., `chat:document_id`).
       - When a user sends a message, publish it to this channel.
       - All subscribed clients receive and display the new message.
  5. **Notifications (Optional):** Unread message indicators.
- **Outcome:** Real-time chat functionality scoped to shared documents.

### Phase 7: AI Ideas Chat Feature ✨

- **Goal:** Provide AI-powered assistance for content generation within the app.
- **Tasks:**
  1. **AI Ideas Chat UI:**
     - Implement the AI chat pane/modal triggered by the "AI Ideas" button.
     - Include an input field for prompts and an area to display the conversation.
     - Add a "copy" button for AI responses.
  2. **Supabase Edge Function for AI API Calls:**
     - Create a new Edge Function (e.g., `ai-chat-handler`).
     - This function will receive the user's prompt.
     - Securely store your Anthropic/OpenAI API key as an environment variable for this function.
     - The function makes an API call to the chosen AI provider (e.g., OpenAI's `chat/completions` endpoint).
     - Return the AI's response to the client.
  3. **Client-Side Integration:**
     - When a user submits a prompt in the AI Ideas chat UI, call the Supabase Edge Function.
     - Display the response in the chat history.
     - Manage loading/error states.
  4. **Contextual Prompts (Advanced/Optional):** Consider if/how to send parts of the current document content as context to the AI (be mindful of token limits and privacy). This would involve Lexical state serialization and sending relevant parts to the Edge Function.
- **Outcome:** An integrated AI chat feature to help users generate ideas for their documents.

### Phase 8: Advanced Editor Features

- **Goal:** Enhance the editor with richer content types and utility features.
- **Tasks (Choose based on priority/time):**
  1. **Image Upload & Rendering:**
     - Lexical custom node for images.
     - UI for uploading images (drag/drop, file picker, or from slash command).
     - Upload to Supabase Storage.
     - Store storage path/URL in the image node's attributes.
     - Render images within Lexical.
     - (Advanced: Image resizing, alignment options).
  2. **Video Embedding (e.g., YouTube/Vimeo):**
     - Lexical custom node for video embeds.
     - UI to paste video URL.
     - Parse URL and render embedded player.
  3. **Tables:**
     - Lexical custom node(s) for tables, rows, cells. This is a significant undertaking.
     - UI for inserting tables, adding/deleting rows/columns, basic cell formatting.
  4. **Focus Mode:**
     - UI toggle to hide distracting elements (sidebar, top bar) and center the editor content.
  5. **Version History (Simplified):**
     - Periodically save snapshots of the `documents.content` JSON to a new table (e.g., `document_versions`).
     - `document_versions (id, document_id, content_snapshot jsonb, created_at, user_id (who made change))`
     - Basic UI to view a list of versions and potentially revert to an older version (replaces current content). _Full diffing and merging is much more complex._
- **Outcome:** A richer, more versatile editor.

### Phase 9: Polish, Optimization & Deployment Prep

- **Goal:** Refine the application, improve performance, and prepare for deployment.
- **Tasks:**
  1. **UI/UX Refinement:** Address any visual inconsistencies, improve workflows.
  2. **Performance Optimization:**
     - Memoization in React components.
     - Optimize Lexical performance for large documents.
     - Lazy loading parts of the application.
     - Database query optimization (check Supabase query performance).
  3. **Error Handling:** Robust error handling throughout the frontend and backend interactions.
  4. **Testing:**
     - Unit tests for critical functions/components.
     - End-to-end tests for key user flows (e.g., login, create document, collaborate).
  5. **Accessibility Audit & Fixes (A11y).**
  6. **Build & Deployment:** Configure build process, deploy to a platform like Vercel or Netlify.
- **Outcome:** A polished, performant, and deployable application.

---

## MAANG-Worthy Additional Features (Senior Frontend Focus)

- **Advanced CRDT Implementation (e.g., Yjs full integration):** Demonstrates deep understanding of complex real-time state synchronization and conflict resolution. This is highly valued.
- **Offline Support (using IndexedDB & Service Workers):** Allowing users to edit documents offline and sync when back online. This is complex but showcases advanced PWA capabilities.
- **Sophisticated Search (Client-side and/or Server-side):** Fast, relevant search across all user documents, potentially with content indexing.
- **Keyboard Shortcut Mastery:** Extensive and intuitive keyboard shortcuts for almost all actions, improving power-user efficiency.
- **Plugin Architecture for Lexical:** Design the editor so that new block types or features can be added as plugins, showcasing extensible architecture skills.
- **Accessibility (WCAG AA or AAA compliance):** Going beyond basic accessibility to achieve a high level of compliance is a strong differentiator.
- **Performance Profiling and Optimization Story:** Being able to articulate how you identified and solved performance bottlenecks (e.g., for very large documents or many collaborators).
- **Test-Driven Development (TDD) Showcase:** If you rigorously apply TDD, highlight this methodology.

---

## Lexical Specific Considerations

- **Nodes:** You'll create custom Lexical nodes for images, videos, tables, and any other specialized block types. Understand node serialization and decorator nodes.
- **Commands:** Leverage Lexical's command system for dispatching actions (formatting, inserting nodes, etc.) and updating editor state.
- **Plugins:** Use existing plugins (e.g., HistoryPlugin, LinkPlugin) and create custom plugins for unique behaviors (e.g., your slash command menu, real-time cursor rendering).
- **State Management:** Understand how Lexical's editor state is immutable and how updates trigger reconciliation.
- **Collaboration:** Lexical doesn't handle OT/CRDT out of the box. You'll need to integrate it with a library like Yjs or implement your own sync logic that applies diffs/patches to the Lexical state. Yjs has bindings for Lexical (`yjs-lexical`).

---

## Drizzle ORM Considerations (for SQL Newcomer with Supabase)

- **Schema First:** Define your database structure clearly in Drizzle schema files (`schema.ts`). This becomes your source of truth.
- **Drizzle Kit for Migrations:**
  - Use `drizzle-kit generate:pg` to create SQL migration files based on changes to your schema.
  - Review these SQL files before applying them to understand what Drizzle is doing.
  - Use `drizzle-kit push:pg` (for rapid prototyping, less safe for prod) or manage migrations more explicitly for applying them to Supabase. Supabase has its own migration system; you can use Drizzle Kit to generate the SQL and then apply it via Supabase's dashboard or CLI.
- **Querying:**
  - Start with simple select, insert, update, delete queries using Drizzle's query builder.
  - Learn how to do joins (e.g., fetching a document and its owner's profile).
  - Pay attention to type safety – Drizzle leverages TypeScript heavily.
- **Supabase Functions for Backend Logic:** While Drizzle can be used client-side with Supabase for simple queries if RLS is set up perfectly, complex business logic, especially mutations that need to be secure or involve multiple steps, should ideally reside in Supabase Edge Functions. You can use Drizzle within these server-side functions.
- **RLS is King:** Remember that Drizzle is a query builder. Security for direct database access from the client (if you choose that path for some reads) relies entirely on Supabase's Row Level Security. Drizzle doesn't add security itself.
