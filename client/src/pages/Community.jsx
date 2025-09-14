import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Heart, Users } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  // Toggle like function
  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return !loading ? (
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
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Overlay */}
              <div
                className="absolute bottom-0 top-0 right-0 left-0 flex gap-2 items-end justify-end 
                            group-hover:justify-between group-hover:bg-gradient-to-b 
                            from-transparent to-black/70 text-white rounded-lg"
              >
                <p className="text-sm hidden group-hover:block mb-2">
                  {creation.prompt}
                </p>
                <div className="flex items-center gap-1 text-white">
                  <p>{creation.likes.length}</p>
                  <Heart
                    onClick={() => imageLikeToggle(creation.id)}
                    className={`min-w-5 h-5 hover:scale-110 transition-transform cursor-pointer ${
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
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;
