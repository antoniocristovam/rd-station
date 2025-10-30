function RecommendationList({ recommendations }) {
  if (recommendations.length === 0) {
    return (
      <div className="bg-white/40 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Nenhuma recomendação ainda
          </h3>
          <p className="text-slate-500 text-sm">
            Configure suas preferências e clique em buscar para ver produtos
            recomendados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-light text-slate-900 mb-2">
          Recomendações
        </h2>
        <p className="text-sm text-slate-500">
          {recommendations.length}{" "}
          {recommendations.length === 1
            ? "produto encontrado"
            : "produtos encontrados"}
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-900 group-hover:text-slate-700 transition-colors">
                  {recommendation.name}
                </h3>
                {recommendation.description && (
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {recommendation.description}
                  </p>
                )}
                {recommendation.features &&
                  recommendation.features.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {recommendation.features
                        .slice(0, 3)
                        .map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-3 py-1 bg-slate-50 text-slate-700 text-xs rounded-full border border-slate-200"
                          >
                            {feature}
                          </span>
                        ))}
                    </div>
                  )}
              </div>
              <div className="ml-4">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
