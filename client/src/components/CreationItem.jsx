import React, { useState } from "react";
import Markdown from "react-markdown";
import { Trash2, Loader2 } from "lucide-react";

const CreationItem = ({ item, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);

    try {
      await onDelete(item.id);

    } catch (error) {
      setIsDeleting(false); 
    }
  };

  return (
    <div
      onClick={() => !isDeleting && setExpanded(!expanded)}
      className={`relative p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer transition ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="font-medium">{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.create_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-blue-100 border border-blue-300 text-indigo-600 px-4 py-1 rounded-full">
            {item.type}
          </button>

          {/* Delete button*/}
          {isDeleting ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs">Deleting...</span>
            </div>
          ) : (
            <button
              onClick={handleDeleteClick}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {expanded && !isDeleting && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
