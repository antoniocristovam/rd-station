import { useState } from "react";
import Checkbox from "../../shared/Checkbox";

function Preferences({
  preferences,
  onPreferenceChange,
  selectedPreferences = [],
}) {
  const [currentPreferences, setCurrentPreferences] =
    useState(selectedPreferences);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 mb-4 uppercase tracking-wide">
        Preferências
      </h3>
      <div className="space-y-3">
        {preferences.map((preference, index) => (
          <Checkbox
            key={index}
            value={preference}
            checked={currentPreferences.includes(preference)}
            onChange={() => handlePreferenceChange(preference)}
          >
            {preference}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Preferences;
