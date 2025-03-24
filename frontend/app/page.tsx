import FeatureToggle from "../components/FeatureToggle";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Feature Flags Dashboard</h1>
      <FeatureToggle featureName="dark_mode" />
      <FeatureToggle featureName="beta_ui" />
      <FeatureToggle featureName="new_search_algorithm" />
    </div>
  );
}
