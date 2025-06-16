import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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

// Define form schema with Zod
const authFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export const Route = createFileRoute("/")({
  component: AuthComponent,
});

function AuthComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setAuthenticated = useUserStore((state) => state.setAuthenticated);

  // Initialize react-hook-form
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    // TODO: Implement Supabase auth
    console.log("Form data:", data);

    setTimeout(() => {
      setIsLoading(false);
      setAuthenticated(true);

      if (isSignUp) {
        navigate({ to: "/onboarding" });
      } else {
        navigate({ to: "/editor" });
      }
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google auth
    setAuthenticated(true);
    if (isSignUp) {
      navigate({ to: "/onboarding" });
    } else {
      navigate({ to: "/editor" });
    }
  };

  return (
    <AuthLayout>
      {/* Logo */}
      <div className='text-2xl text-white font-stretch-ultra-expanded font-bold'>Editor</div>

      <div className='w-full flex justify-center'>
        <div className='space-y-4 w-sm'>
          <div>
            <p className='text-white text-3xl font-bold mb-2'>
              {isSignUp ? "Create new account" : "Sign in"}
            </p>
            <p className='text-gray-300 text-sm'>
              {isSignUp ? "Start today for free" : "Welcome back"}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-white text-sm'>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='example@mail.com'
                        className='bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500 h-12 rounded-xl'
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-red-500' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-white text-sm'>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder='••••••••••••'
                          className='bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500 h-12 rounded-xl pr-10'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                        >
                          {showPassword ? (
                            <Eye className='h-5 w-5' />
                          ) : (
                            <EyeOff className='h-5 w-5' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-xs text-red-500' />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full bg-[#4F46E5]/70 hover:bg-[#4338CA] text-white h-12 rounded-xl'
                disabled={isLoading}
              >
                {isLoading
                  ? isSignUp
                    ? "Creating account..."
                    : "Signing in..."
                  : isSignUp
                    ? "Create Account"
                    : "Sign In"}
              </Button>
            </form>
          </Form>

          {isSignUp && (
            <div className='my-8 flex items-center'>
              <div className='h-[0.5px] flex-1 bg-gray-400'></div>
              <p className='mx-4 text-[13px] font-light text-gray-400'>Or sign up with email</p>
              <div className='h-[0.5px] flex-1 bg-gray-400'></div>
            </div>
          )}

          {isSignUp && (
            <Button
              type='button'
              className='w-full bg-[#4F46E5]/60 hover:bg-[#4338CA] text-white h-12 rounded-full'
              disabled={isLoading}
              onClick={handleGoogleSignIn}
            >
              <svg
                width='256'
                height='262'
                viewBox='0 0 256 262'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid'
              >
                <path
                  d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
                  fill='#4285F4'
                />
                <path
                  d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
                  fill='#34A853'
                />
                <path
                  d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
                  fill='#FBBC05'
                />
                <path
                  d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
                  fill='#EB4335'
                />
              </svg>
              Continue with Google
            </Button>
          )}

          {isSignUp && (
            <div className='text-center'>
              <p className='text-gray-500 text-xs'>
                By signing up, you agree to the{" "}
                <a href='#' className='text-[#4F46E5] '>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href='#' className='text-[#4F46E5] '>
                  Privacy Policy
                </a>
                , including{" "}
                <a href='#' className='text-[#4F46E5] '>
                  Cookie Use
                </a>
                .
              </p>
            </div>
          )}

          <div className='text-center pt-5'>
            <p className='text-gray-300 text-sm font-light'>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <span
                className='text-[#4F46E5] cursor-default'
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
