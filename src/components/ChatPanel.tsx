import { Button } from "~/components/ui/button";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  if (!isOpen) return null;

  return (
    <div className='w-80 bg-black text-white rounded-3xl mr-4 my-4 shadow-lg flex flex-col transition-all duration-300 ease-in-out'>
      {/* Chat Header */}
      <div className='px-4 py-2.5 border-b border-[#313131]'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Chat</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-white transition-colors'>
            <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className='flex-1 overflow-y-auto w-full py-4 px-3 space-y-3'>
        <div className='flex flex-col items-start max-w-[80%] gap-1'>
          <div className='bg-[#313131] rounded-lg p-2.5'>
            <p className='text-sm'>Let's collaborate on this document!</p>
          </div>
          <div className='text-[10px] text-gray-400'>2 minutes ago</div>
        </div>

        <div className='w-full flex justify-end'>
          <div className='flex-col flex items-end max-w-[80%] gap-1'>
            <div className='bg-[#4338CA] rounded-lg p-2.5'>
              <p className='text-sm'>Great! I'll add my thoughts.</p>
            </div>
            <div className='text-[10px] text-gray-400 text-right'>1 minute ago</div>
          </div>
        </div>

        <div className='flex flex-col items-start max-w-[80%] gap-1'>
          <div className='bg-[#313131] rounded-lg p-2.5'>
            <p className='text-sm'>Let's collaborate on this</p>
          </div>
          <div className='text-[10px] text-gray-400'>2 minutes ago</div>
        </div>

        <div className='max-w-[80%] flex flex-col items-start gap-1'>
          <div className='bg-[#313131] rounded-lg p-2.5'>
            <p className='text-sm'>This document!</p>
          </div>
          <div className='text-[10px] text-gray-400'>2 minutes ago</div>
        </div>

        <div className='w-full flex justify-end'>
          <div className='flex-col flex items-end max-w-[80%] gap-1'>
            <div className='bg-[#4338CA] rounded-lg p-2.5'>
              <p className='text-sm'>Great! I'll add my thoughts.</p>
            </div>
            <div className='text-[10px] text-gray-400 text-right'>1 minute ago</div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className='px-3 pb-3 pt-2 border-t border-[#313131]'>
        <div className='flex space-x-2'>
          <input
            type='text'
            placeholder='Type a message...'
            className='flex-1 bg-[#313131] border border-[#313131] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors'
          />
          <Button variant='chat-send' size='chat'>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
