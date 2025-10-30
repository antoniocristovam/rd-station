import { useState } from "react";
import Checkbox from "../../shared/Checkbox";

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 mb-4 uppercase tracking-wide">
        Funcionalidades
      </h3>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <Checkbox
            key={index}
            value={feature}
            checked={currentFeatures.includes(feature)}
            onChange={() => handleFeatureChange(feature)}
          >
            {feature}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Features;
