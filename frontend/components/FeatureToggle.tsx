"use client"

import { useContext } from "react";
import { FeatureFlagContext } from "../context/FeatureFlagProvider";

interface FeatureToggleProps {
  featureName: string;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ featureName }) => {
  const { flags, updateFlag, isLoading } = useContext(FeatureFlagContext);
  const isEnabled = flags[featureName] || false;

  const handleToggle = async () => {
    await updateFlag(featureName, !isEnabled);
  };

  return (
    <div className="p-4 border rounded-lg flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold">{featureName}</h3>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded ${isEnabled ? "bg-green-500" : "bg-gray-500"} text-white`}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : isEnabled ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
};

export default FeatureToggle;
