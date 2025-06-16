import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AuthLayout } from "~/components/AuthLayout";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserStore } from "~/stores/userStore";
import type { AvatarOption } from "~/stores/userStore";

// Define form schema with Zod
const onboardingFormSchema = z.object({
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(15, "Display name cannot exceed 15 characters"),
  workspaceName: z.string().min(1, "Workspace name is required"),
});

type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

export const Route = createFileRoute("/onboarding")({
  component: OnboardingComponent,
});

function OnboardingComponent() {
  const [selectedAvatar, setSelectedAvatar] = useState("black");
  const navigate = useNavigate();
  const { setDisplayName, setAvatarOption, setWorkspaceName, setOnboarded, isAuthenticated } =
    useUserStore();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  const avatarOptions = [
    { name: "black", gradient: "from-gray-700 to-gray-900" },
    { name: "blue", gradient: "from-blue-400 to-blue-600" },
    { name: "purple", gradient: "from-purple-400 to-purple-700" },
    { name: "green", gradient: "from-green-400 to-green-600" },
    { name: "yellow", gradient: "from-yellow-300 to-amber-500" },
    { name: "red", gradient: "from-red-400 to-red-600" },
    { name: "pink", gradient: "from-pink-400 to-pink-600" },
    { name: "orange", gradient: "from-orange-300 to-orange-500" },
  ];

  // Initialize react-hook-form
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      displayName: "",
      workspaceName: "",
    },
  });

  const displayName = form.watch("displayName");

  const onSubmit = async (data: OnboardingFormValues) => {
    // Store user preferences in Zustand
    setDisplayName(data.displayName);
    setWorkspaceName(data.workspaceName);

    const avatarOption = avatarOptions.find((avatar) => avatar.name === selectedAvatar);
    if (avatarOption) {
      setAvatarOption(avatarOption);
    }

    setOnboarded(true);
    console.log("Form data:", data, "Selected avatar:", selectedAvatar);
    navigate({ to: "/editor" });
  };

  return (
    <AuthLayout
      rightPanelTitle='SHARE'
      rightPanelQuote={
        <>
          Welcome, with{" "}
          <span className='text-white font-stretch-ultra-expanded font-bold'>Editor</span>, bring
          your mates into the document and chat with them, make edits on the go.
        </>
      }
      rightPanelBottomText='CHAT'
    >
      {/* Logo and Preview */}
      <div className='flex items-center justify-between w-full'>
        <div className='text-2xl text-white font-stretch-ultra-expanded font-bold'>Editor</div>

        <div className='flex items-center gap-2'>
          <div className='text-white ml-2 text-2xl'>{displayName && "/"}</div>
          <div>
            {selectedAvatar && displayName && (
              <div
                className={`w-6 h-6 mt-1 rounded-full bg-gradient-to-br ${
                  avatarOptions.find((a) => a.name === selectedAvatar)?.gradient
                }`}
              ></div>
            )}
          </div>
          <div>{displayName && <span className='text-white text-xl'>{displayName}</span>}</div>
        </div>
      </div>

      <div className='w-full flex justify-center'>
        <div className='space-y-4 w-sm'>
          <div>
            <p className='text-white text-3xl font-bold mb-2'>Quick Setup</p>
            <p className='text-gray-300 text-sm'>Let's personalize your experience</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
              <FormField
                control={form.control}
                name='displayName'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-white text-sm'>
                      Display Name <span className='text-[#4F46E5]'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Your display name (max 15 characters)'
                        className='bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500 h-12 rounded-xl'
                        maxLength={15}
                      />
                    </FormControl>
                    <p className='text-gray-500 text-xs'>{field.value.length}/15 characters</p>
                    <FormMessage className='text-xs text-red-500' />
                  </FormItem>
                )}
              />

              <div className='space-y-4'>
                <p className='text-white text-sm'>
                  Choose Avatar <span className='text-[#4F46E5] text-xs'> Optional</span>
                </p>
                <div className='flex space-x-4'>
                  {avatarOptions.map((avatar) => (
                    <div
                      key={avatar.name}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                        avatar.gradient
                      } cursor-pointer transition-all ${
                        selectedAvatar === avatar.name
                          ? "ring-2 ring-white/90 ring-offset-2 ring-offset-[#171717] scale-110"
                          : ""
                      }`}
                      onClick={() => setSelectedAvatar(avatar.name)}
                    ></div>
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name='workspaceName'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-white text-sm'>
                      Workspace Name <span className='text-[#4F46E5]'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Name your first workspace'
                        className='bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500 h-12 rounded-xl'
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-red-500' />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full bg-[#4F46E5]/70 hover:bg-[#4338CA] text-white h-12 rounded-xl'
                disabled={!form.formState.isValid}
              >
                Get Started
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
}
