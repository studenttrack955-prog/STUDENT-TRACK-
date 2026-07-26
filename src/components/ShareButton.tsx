import React from 'react';
import { Share2, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './UI';

interface ShareButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  className, 
  variant = 'outline', 
  size = 'md' 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const shareUrl = window.location.origin;
  const shareTitle = 'Student Track - The Ultimate AI Learning Platform';
  const shareText = 'Check out Student Track, an amazing AI-powered learning platform for students!';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const shareViaEmail = () => {
    const url = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <Button 
        variant={variant} 
        size={size} 
        className={className}
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full mb-2 left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50"
            >
              <button
                onClick={shareViaWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-pink-50 hover:text-pink-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-green-500" />
                WhatsApp
              </button>
              <button
                onClick={shareViaEmail}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-pink-50 hover:text-pink-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                Gmail / Email
              </button>
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-pink-50 hover:text-pink-700 transition-colors border-t border-slate-100 mt-1 pt-1"
              >
                <Share2 className="w-4 h-4 text-slate-400" />
                Copy Link
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
