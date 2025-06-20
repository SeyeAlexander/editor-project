import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SettingsFormValues, AvatarOption } from "~/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Settings form schema
const settingsFormSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required"),
  theme: z.enum(["grey", "focus", "light"]),
  documentAutoSave: z.boolean(),
  documentHistory: z.boolean(),
  chatNotifications: z.boolean(),
  chatSounds: z.boolean(),
});

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SettingsFormValues, selectedAvatar: string) => void;
  workspaceName: string;
  avatarOptions: AvatarOption[];
  currentAvatarName: string;
  userEmail: string;
  displayName: string;
}

export function SettingsModal({
  isOpen,
  onClose,
  onSubmit,
  workspaceName,
  avatarOptions,
  currentAvatarName,
  userEmail,
  displayName,
}: SettingsModalProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatarName);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Settings form
  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      workspaceName: workspaceName || "My Workspace",
      theme: "grey",
      documentAutoSave: true,
      documentHistory: true,
      chatNotifications: true,
      chatSounds: false,
    },
  });

  const handleSubmit = (data: SettingsFormValues) => {
    onSubmit(data, selectedAvatar);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-black border-gray-700 w-[600px] max-h-[80vh] rounded-3xl overflow-hidden flex flex-col'>
        <DialogHeader className='px-6 pt-6 pb-0 flex-shrink-0'>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-white text-2xl font-bold'>Settings</DialogTitle>
            <button onClick={onClose} className='text-gray-400 hover:text-white transition-colors'>
              <X className='h-6 w-6' />
            </button>
          </div>
          <DialogDescription className='sr-only'>
            Manage your workspace settings and preferences
          </DialogDescription>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto px-6 scrollbar-hide'>
          <Form {...settingsForm}>
            <form
              id='settings-form'
              onSubmit={settingsForm.handleSubmit(handleSubmit)}
              className='space-y-6 py-4'
            >
              {/* Workspace Settings */}
              <div className='space-y-4'>
                {/* <h3 className='text-white text-lg font-semibold'>Workspace</h3> */}

                <FormField
                  control={settingsForm.control}
                  name='workspaceName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white text-sm'>Workspace Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Enter workspace name'
                          className='bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500 h-12 rounded-xl'
                        />
                      </FormControl>
                      <FormMessage className='text-xs text-red-500' />
                    </FormItem>
                  )}
                />

                <div className='space-y-2'>
                  <p className='text-white text-sm'>Avatar Color</p>
                  <div className='flex space-x-3'>
                    {avatarOptions.map((avatar) => (
                      <div
                        key={avatar.name}
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.gradient} cursor-pointer transition-all ${
                          selectedAvatar === avatar.name
                            ? "ring-2 ring-white/90 ring-offset-2 ring-offset-black scale-110"
                            : ""
                        }`}
                        onClick={() => setSelectedAvatar(avatar.name)}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className='space-y-4'>
                <h3 className='text-white text-lg font-semibold'>Account</h3>

                <div className='space-y-3'>
                  <div>
                    <p className='text-white text-sm mb-2'>Email</p>
                    <Input
                      value={userEmail}
                      readOnly
                      className='bg-[#1a1a1a] border-gray-700 text-gray-400 h-12 rounded-xl cursor-not-allowed'
                    />
                  </div>

                  <div>
                    <p className='text-white text-sm mb-2'>Display Name</p>
                    <Input
                      value={displayName}
                      readOnly
                      className='bg-[#1a1a1a] border-gray-700 text-gray-400 h-12 rounded-xl cursor-not-allowed'
                    />
                  </div>

                  <div>
                    <p className='text-white text-sm mb-2'>Change Password</p>
                    <div className='space-y-2'>
                      <Input
                        type='password'
                        placeholder='New password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500 h-12 rounded-xl'
                      />
                      <Input
                        type='password'
                        placeholder='Confirm new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500 h-12 rounded-xl'
                      />
                      <Button
                        type='button'
                        variant='modal-secondary'
                        size='sm'
                        disabled={!newPassword || newPassword !== confirmPassword}
                        className='mt-2'
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className='pt-4 border-t border-gray-700'>
                    <div className='space-y-3'>
                      <Button
                        type='button'
                        variant='destructive'
                        size='sm'
                        onClick={() => setShowDeleteConfirmation(!showDeleteConfirmation)}
                        className='flex items-center gap-2'
                      >
                        <Trash2 className='h-4 w-4' />
                        Delete Account
                      </Button>

                      {showDeleteConfirmation && (
                        <div className='space-y-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl'>
                          <div className='text-red-400 text-sm'>
                            <p className='font-medium'>⚠️ This action cannot be undone.</p>
                            <p className='mt-1'>
                              This will permanently delete your account and all associated data
                              including documents, workspaces, and chat history.
                            </p>
                          </div>
                          <div className='flex space-x-2'>
                            <Button
                              type='button'
                              variant='modal-secondary'
                              size='sm'
                              onClick={() => setShowDeleteConfirmation(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type='button'
                              variant='destructive'
                              size='sm'
                              onClick={() => {
                                // TODO: Implement account deletion
                                console.log("Account deletion confirmed");
                                setShowDeleteConfirmation(false);
                              }}
                            >
                              Yes, Delete My Account
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div className='space-y-4'>
                <h3 className='text-white text-lg font-semibold'>Theme</h3>

                <FormField
                  control={settingsForm.control}
                  name='theme'
                  render={({ field }) => (
                    <FormItem>
                      <div className='grid grid-cols-3 gap-2'>
                        {["grey", "focus", "light"].map((theme) => (
                          <button
                            key={theme}
                            type='button'
                            onClick={() => field.onChange(theme)}
                            className={`p-3 rounded-xl border text-center transition-colors ${
                              field.value === theme
                                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                                : "border-gray-600 text-gray-400 hover:border-gray-500"
                            }`}
                          >
                            <div className='capitalize'>{theme}</div>
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Document Settings */}
              <div className='space-y-4'>
                <h3 className='text-white text-lg font-semibold'>Documents</h3>

                <div className='space-y-3'>
                  <FormField
                    control={settingsForm.control}
                    name='documentAutoSave'
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-between'>
                        <FormLabel className='text-white text-sm'>Auto-save documents</FormLabel>
                        <button
                          type='button'
                          onClick={() => field.onChange(!field.value)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            field.value ? "bg-blue-500" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              field.value ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={settingsForm.control}
                    name='documentHistory'
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-between'>
                        <FormLabel className='text-white text-sm'>Keep document history</FormLabel>
                        <button
                          type='button'
                          onClick={() => field.onChange(!field.value)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            field.value ? "bg-blue-500" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              field.value ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Chat Settings */}
              <div className='space-y-4'>
                <h3 className='text-white text-lg font-semibold'>Chat</h3>

                <div className='space-y-3'>
                  <FormField
                    control={settingsForm.control}
                    name='chatNotifications'
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-between'>
                        <FormLabel className='text-white text-sm'>Chat notifications</FormLabel>
                        <button
                          type='button'
                          onClick={() => field.onChange(!field.value)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            field.value ? "bg-blue-500" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              field.value ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={settingsForm.control}
                    name='chatSounds'
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-between'>
                        <FormLabel className='text-white text-sm'>Chat sounds</FormLabel>
                        <button
                          type='button'
                          onClick={() => field.onChange(!field.value)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            field.value ? "bg-blue-500" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              field.value ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div className='flex space-x-3 px-6 pb-6 pt-4 border-t border-gray-700 flex-shrink-0'>
          <Button type='button' variant='modal-secondary' size='modal' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' variant='modal-primary' size='modal' form='settings-form'>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
