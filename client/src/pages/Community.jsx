import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart, Users } from "lucide-react";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  // Toggle like function
  const toggleLike = (index) => {
    if (!user) return;

    setCreations((prev) =>
      prev.map((creation, i) => {
        if (i === index) {
          const hasLiked = creation.likes.includes(user.id);
          return {
            ...creation,
            likes: hasLiked
              ? creation.likes.filter((id) => id !== user.id) // unlike
              : [...creation.likes, user.id], // like
          };
        }
        return creation;
      })
    );
  };

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-slate-800" />
        <h1 className="text-xl font-semibold text-slate-700">Community</h1>
        <span className="text-sm text-gray-500">
          ({creations.length} creations)
        </span>
      </div>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden"
            >
              {/* Image */}
              <img
                src={creation.content}
                alt="Creation"
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm text-white mb-2">{creation.prompt}</p>
                <div className="flex items-center gap-1 text-white">
                  <p>{creation.likes.length}</p>
                  <Heart
                    onClick={() => toggleLike(index)}
                    className={`w-5 h-5 hover:scale-110 transition-transform cursor-pointer ${
                      creation.likes.includes(user?.id)
                        ? "fill-red-500 text-red-600"
                        : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
