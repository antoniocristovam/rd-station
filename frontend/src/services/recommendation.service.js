// Constantes para tipos de recomendação
const RECOMMENDATION_TYPES = {
  SINGLE: "SingleProduct",
  MULTIPLE: "MultipleProducts",
};

const validateInput = (formData, products) => {
  if (!products || products.length === 0) {
    return false;
  }

  const { selectedPreferences, selectedFeatures } = formData || {};

  const hasPreferences =
    Array.isArray(selectedPreferences) && selectedPreferences.length > 0;
  const hasFeatures =
    Array.isArray(selectedFeatures) && selectedFeatures.length > 0;

  return hasPreferences || hasFeatures;
};

const calculateProductScore = (
  product,
  selectedPreferences,
  selectedFeatures
) => {
  let score = 0;

  if (
    Array.isArray(product.preferences) &&
    Array.isArray(selectedPreferences) &&
    selectedPreferences.length > 0
  ) {
    const matchingPreferences = product.preferences.filter((preference) =>
      selectedPreferences.includes(preference)
    );
    score += matchingPreferences.length;
  }

  if (
    Array.isArray(product.features) &&
    Array.isArray(selectedFeatures) &&
    selectedFeatures.length > 0
  ) {
    const matchingFeatures = product.features.filter((feature) =>
      selectedFeatures.includes(feature)
    );
    score += matchingFeatures.length;
  }

  return score;
};

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: "",
  },
  products = []
) => {
  if (!validateInput(formData, products)) {
    return [];
  }

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

  const maxScore = productsWithScore.reduce(
    (max, product) => Math.max(max, product.score),
    0
  );

  if (maxScore === 0) {
    return [];
  }

  const topScorers = productsWithScore.filter(
    (product) => product.score === maxScore
  );

  if (selectedRecommendationType === RECOMMENDATION_TYPES.SINGLE) {
    if (topScorers.length === 0) {
      return [];
    }
    return [topScorers[topScorers.length - 1]];
  }

  if (selectedRecommendationType === RECOMMENDATION_TYPES.MULTIPLE) {
    return topScorers;
  }

  return [];
};

const recommendationService = { getRecommendations };

export default recommendationService;
