import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center active:scale-95 transition-all duration-300 ease-in-out justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        "sidebar-item":
          "justify-start text-gray-300 hover:bg-[#191919] hover:text-gray-200 rounded-md transition-colors",
        "sidebar-icon": "p-2 hover:bg-[#191919] rounded-md transition-colors text-gray-400",
        "modal-primary": "bg-[#4F46E5]/70 hover:bg-[#4338CA] text-white rounded-xl active:scale-95",
        "modal-secondary":
          " bg-[#191919] border-gray-600 text-white/80 hover:bg-[#313131] rounded-xl active:scale-95",
        "search-action":
          "bg-[#191919] hover:bg-[#313131] text-white rounded-2xl flex-col gap-1.5 active:scale-95",
        "chat-send": "bg-[#4F46E5]/60 hover:bg-[#4338CA] text-white rounded-xl active:scale-95",
        "popover-item": "justify-start text-gray-300 hover:bg-[#313131] rounded-lg transition-colors",
        "popover-destructive":
          "justify-start text-red-400 hover:bg-[#313131] rounded transition-colors",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        sidebar: "w-full px-2 py-1.5 h-auto",
        modal: "h-12 flex-1",
        "modal-full": "h-12 w-full",
        search: "h-24 w-full p-3",
        chat: "px-4 py-2 h-auto",
        popover: "w-full px-3 py-2 h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
