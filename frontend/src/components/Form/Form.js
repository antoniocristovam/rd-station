import { useState } from "react";
import { Preferences, Features, RecommendationType } from "./Fields";
import { SubmitButton } from "./SubmitButton";
import useProducts from "../../hooks/useProducts";
import useForm from "../../hooks/useForm";
import useRecommendations from "../../hooks/useRecommendations";

function Form({ setRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: "",
  });

  const { getRecommendations } = useRecommendations(products);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!formData.selectedRecommendationType) {
      setErrorMessage(
        "Por favor, selecione um tipo de recomendação (Produto Único ou Múltiplos Produtos)"
      );
      return;
    }

    const dataRecommendations = getRecommendations(formData);
    setRecommendations(dataRecommendations);
  };

  return (
    <div className="sticky top-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-light text-slate-900 mb-2">
            Configure sua busca
          </h2>
          <p className="text-sm text-slate-500">
            Selecione suas preferências abaixo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Preferences
              preferences={preferences}
              onPreferenceChange={(selected) =>
                handleChange("selectedPreferences", selected)
              }
            />
            <Features
              features={features}
              onFeatureChange={(selected) =>
                handleChange("selectedFeatures", selected)
              }
            />
          </div>

          <RecommendationType
            onRecommendationTypeChange={(selected) =>
              handleChange("selectedRecommendationType", selected)
            }
          />

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <SubmitButton text="Buscar Produtos" />
        </form>
      </div>
    </div>
  );
}

export default Form;
