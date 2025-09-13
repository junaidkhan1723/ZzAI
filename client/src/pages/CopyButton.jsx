
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CopyButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" /> Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" /> Copy
        </>
      )}
    </button>
  );
};

export default CopyButton;
