import { useState } from "react";

function RecommendationType({ onRecommendationTypeChange }) {
  const [selectedType, setSelectedType] = useState("");

  const handleChange = (type) => {
    setSelectedType(type);
    onRecommendationTypeChange(type);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 mb-4 uppercase tracking-wide">
        Tipo de Recomendação
      </h3>
      <div className="space-y-3">
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            checked={selectedType === "SingleProduct"}
            onChange={() => handleChange("SingleProduct")}
            className="w-4 h-4 text-slate-900 border-slate-300 focus:ring-slate-900 focus:ring-2 cursor-pointer"
          />
          <span className="ml-3 text-slate-700 group-hover:text-slate-900 transition-colors">
            Produto Único
          </span>
        </label>
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            checked={selectedType === "MultipleProducts"}
            onChange={() => handleChange("MultipleProducts")}
            className="w-4 h-4 text-slate-900 border-slate-300 focus:ring-slate-900 focus:ring-2 cursor-pointer"
          />
          <span className="ml-3 text-slate-700 group-hover:text-slate-900 transition-colors">
            Múltiplos Produtos
          </span>
        </label>
      </div>
    </div>
  );
}

export default RecommendationType;
