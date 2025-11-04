const RECOMMENDATION_TYPES = {
  SINGLE: "SingleProduct",
  MULTIPLE: "MultipleProducts",
};

const validateInput = (formData, products) => {
  if (!products?.length) return false;
  const { selectedPreferences, selectedFeatures } = formData || {};
  return selectedPreferences?.length > 0 || selectedFeatures?.length > 0;
};

const calculateProductScore = (
  product,
  selectedPreferences,
  selectedFeatures
) => {
  const preferencesScore =
    product.preferences?.filter((p) => selectedPreferences?.includes(p))
      .length || 0;
  const featuresScore =
    product.features?.filter((f) => selectedFeatures?.includes(f)).length || 0;
  return preferencesScore + featuresScore;
};

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: "",
  },
  products = []
) => {
  if (!validateInput(formData, products)) return [];

  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  const productsWithScore = products.map((product) => ({
    ...product,
    score: calculateProductScore(
      product,
      selectedPreferences,
      selectedFeatures
    ),
  }));

  const maxScore = Math.max(...productsWithScore.map((p) => p.score), 0);
  if (maxScore === 0) return [];

  const topScorers = productsWithScore.filter((p) => p.score === maxScore);

  if (selectedRecommendationType === RECOMMENDATION_TYPES.SINGLE) {
    return topScorers.length > 0 ? [topScorers[topScorers.length - 1]] : [];
  }

  return selectedRecommendationType === RECOMMENDATION_TYPES.MULTIPLE
    ? topScorers
    : [];
};

const recommendationService = { getRecommendations };

export default recommendationService;
