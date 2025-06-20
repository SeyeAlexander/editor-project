import { useState } from "react";
import { Share2, Mail, Copy } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

interface SharePopoverProps {
  documentId: string;
  onShareDocument: (docId: string, email?: string) => void;
  onCopyShareLink: () => void;
}

export function SharePopover({ documentId, onShareDocument, onCopyShareLink }: SharePopoverProps) {
  const [shareEmail, setShareEmail] = useState("");
  const [publicAccess, setPublicAccess] = useState(true);

  const handleEmailShare = () => {
    if (shareEmail) {
      onShareDocument(documentId, shareEmail);
      setShareEmail("");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100'
        >
          <Share2 className='h-5 w-5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-100 rounded-3xl -mr-11 bg-black shadow-lg text-white' //  bg-[#313131]
        align='end'
      >
        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold text-lg text-white mb-2'>Share this document</h3>
            <p className='text-sm text-gray-400 mb-3'>Invite people to collaborate</p>
          </div>

          <div className='space-y-3'>
            <div>
              <label className='text-sm font-medium text-gray-300 mb-1 block'>
                Invite by email
              </label>
              <div className='flex items-center space-x-2 mt-2'>
                <Input
                  type='email'
                  placeholder='Enter email address'
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className='flex-1 bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500'
                />
                <Button
                  onClick={handleEmailShare}
                  variant='modal-primary'
                  size='lg'
                  disabled={!shareEmail}
                >
                  <Mail className='h-4 w-4 mr-1' />
                  Send
                </Button>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-gray-600' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-[#191919] px-2 text-gray-500'>Or</span>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between mb-2'>
                <label className='text-sm font-medium text-gray-300'>Share with link</label>
                <div className='flex items-center space-x-2'>
                  <span className='text-xs text-gray-400'>Public access</span>
                  <button
                    onClick={() => setPublicAccess(!publicAccess)}
                    className={`w-10 h-5 rounded-full transition-colors ${
                      publicAccess ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        publicAccess ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <Input
                  readOnly
                  value={
                    publicAccess
                      ? `${window.location.origin}/shared/${documentId}`
                      : "Link disabled"
                  }
                  className='flex-1 bg-[#2a2a2a] border-gray-600 text-gray-300'
                  disabled={!publicAccess}
                />
                <Button
                  onClick={onCopyShareLink}
                  variant='modal-secondary'
                  size='lg'
                  disabled={!publicAccess}
                >
                  <Copy className='h-4 w-4 mr-1' />
                  Copy
                </Button>
              </div>
              <p className='text-xs text-gray-500 mt-1'>
                {publicAccess
                  ? "Anyone with this link can view the document"
                  : "Link sharing is disabled"}
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
