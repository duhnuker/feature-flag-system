"use client";

import { useEffect, useState } from "react";
import { fetchFeatureFlag } from "../services/featureFlags";

interface FeatureToggleProps {
  featureName: string;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ featureName }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const getFeatureFlag = async () => {
      const flag = await fetchFeatureFlag(featureName);
      setIsEnabled(flag.isEnabled);
    };

    getFeatureFlag();
  }, [featureName]);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold">{featureName}</h3>
      <p>Status: {isEnabled ? "Enabled ✅" : "Disabled ❌"}</p>
    </div>
  );
};

export default FeatureToggle;
