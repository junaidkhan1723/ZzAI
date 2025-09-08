import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creation Card */}
        <div className="flex justify-between items-center w-72 px-6 py-4 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 px-6 py-4 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>
        {creations.length > 0 ? (
          creations.map((item) => <CreationItem key={item.id} item={item} />)
        ) : (
          <p className="text-sm text-gray-400">No creations yet. Start creating!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
