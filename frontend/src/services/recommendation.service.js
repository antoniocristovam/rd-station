const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: "",
  },
  products = []
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } =
    formData;

  const hasPreferences = selectedPreferences && selectedPreferences.length > 0;
  const hasFeatures = selectedFeatures && selectedFeatures.length > 0;

  if (!hasPreferences && !hasFeatures) {
    return [];
  }

  const productsWithScore = products
    .map((product) => {
      let score = 0;

      if (hasPreferences) {
        const matchingPreferences = product.preferences.filter((preference) =>
          selectedPreferences.includes(preference)
        );
        score += matchingPreferences.length;
      }

      if (hasFeatures) {
        const matchingFeatures = product.features.filter((feature) =>
          selectedFeatures.includes(feature)
        );
        score += matchingFeatures.length;
      }

      return {
        ...product,
        score,
      };
    })
    .filter((product) => product.score > 0);

  if (selectedRecommendationType === "SingleProduct") {
    return [productsWithScore[productsWithScore.length - 1]];
  } else {
    return productsWithScore;
  }
};

const recommendationService = { getRecommendations };

export default recommendationService;
