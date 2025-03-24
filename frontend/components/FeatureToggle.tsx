"use client";

import { useEffect, useState } from "react";
import { fetchFeatureFlag, toggleFeatureFlag } from "../services/featureFlags";

interface FeatureToggleProps {
  featureName: string;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ featureName }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeatureFlag = async () => {
      const flag = await fetchFeatureFlag(featureName);
      setIsEnabled(flag.isEnabled);
    };

    getFeatureFlag();
  }, [featureName]);

  const handleToggle = async () => {
    setLoading(true);
    const updatedFlag = await toggleFeatureFlag(featureName, !isEnabled);
    setIsEnabled(updatedFlag.isEnabled);
    setLoading(false);
  }

  return (
    <div className="p-4 border rounded-lg flex items-center justify-between">
      <h3 className="text-lg font-bold">{featureName}</h3>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded ${isEnabled ? "bg-green-500" : "bg-gray-500"
          } text-white`}
        disabled={loading}
      >
        {loading ? "Updating..." : isEnabled ? "Disable" : "Enable"}
      </button>
    </div>
  );
};

export default FeatureToggle;
