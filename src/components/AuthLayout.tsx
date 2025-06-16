import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  rightPanelTitle?: string;
  rightPanelQuote?: ReactNode;
  rightPanelBottomText?: string;
}

export function AuthLayout({
  children,
  rightPanelTitle = "CREATE",
  rightPanelQuote = (
    <>
      <span className='text-white font-stretch-ultra-expanded font-bold'>"Editor</span> empowers you
      to create, collaborate, and craft beautiful documents with ease and precision."
    </>
  ),
  rightPanelBottomText = "COLLABORATE",
}: AuthLayoutProps) {
  return (
    <div className='min-h-screen flex'>
      {/* Left Panel */}
      <div className='flex-1 flex items-start flex-col justify-between py-8 pl-20 pr-10 relative'>
        {children}

        {/* Copyright - Bottom Left */}
        <div className='w-full flex items-start'>
          <p className='text-gray-400 text-xs font-medium'>© Copyright Editor 2024</p>
        </div>
      </div>

      {/* Right Panel - Gradient with Quote */}
      <div className='flex-1 rounded-3xl mr-5 my-6 bg-gradient-to-br from-[#E8E5FF] via-[#718CFF] to-[#718CFF] flex items-center justify-center p-12 relative overflow-hidden'>
        {/* Large background text */}
        <div className='absolute -top-10 -right-6 flex items-center justify-center opacity-10'>
          <div className='text-[160px] font-extrabold text-white leading-none'>
            {rightPanelTitle}
          </div>
        </div>

        {/* Quote content */}
        <div className='relative z-10 text-center max-w-xs'>
          <blockquote className='text-white text-lg leading-relaxed font-light'>
            {rightPanelQuote}
          </blockquote>
        </div>

        {/* Bottom text */}
        <div className='absolute -bottom-10 -left-16'>
          <div className='text-[160px] font-extrabold text-white/20 leading-none text-center'>
            {rightPanelBottomText}
          </div>
        </div>
      </div>
    </div>
  );
}
