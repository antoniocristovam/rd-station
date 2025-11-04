import mockProducts from "../mocks/mockProducts";
import recommendationService from "./recommendation.service";

describe("recommendationService - Complete Tests", () => {
  describe("Basic Functionality", () => {
    test("Returns correct recommendation for SingleProduct based on selected preferences", () => {
      const formData = {
        selectedPreferences: ["Integração com chatbots"],
        selectedFeatures: ["Chat ao vivo e mensagens automatizadas"],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe("RD Conversas");
      expect(recommendations[0]).toHaveProperty("score");
      expect(recommendations[0].score).toBeGreaterThan(0);
    });

    test("Returns correct recommendations for MultipleProducts based on selected preferences", () => {
      const formData = {
        selectedPreferences: [
          "Integração fácil com ferramentas de e-mail",
          "Personalização de funis de vendas",
          "Automação de marketing",
        ],
        selectedFeatures: [
          "Rastreamento de interações com clientes",
          "Rastreamento de comportamento do usuário",
        ],
        selectedRecommendationType: "MultipleProducts",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe("RD Station CRM");
      expect(recommendations[0].score).toBe(3);
    });

    test("MultipleProducts returns multiple products when there is a tie in maximum score", () => {
      const formData = {
        selectedPreferences: [
          "Integração fácil com ferramentas de e-mail",
          "Automação de marketing",
        ],
        selectedFeatures: [],
        selectedRecommendationType: "MultipleProducts",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(2);
      expect(recommendations.map((product) => product.name)).toContain(
        "RD Station CRM"
      );
      expect(recommendations.map((product) => product.name)).toContain(
        "RD Station Marketing"
      );

      expect(recommendations[0].score).toBe(recommendations[1].score);
      expect(recommendations[0].score).toBe(1);
    });

    test("Returns only one product for SingleProduct with more than one matching product", () => {
      const formData = {
        selectedPreferences: [
          "Integração fácil com ferramentas de e-mail",
          "Automação de marketing",
        ],
        selectedFeatures: [
          "Rastreamento de interações com clientes",
          "Rastreamento de comportamento do usuário",
        ],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe("RD Station Marketing");
    });
  });

  describe("Tie-Breaking Rule", () => {
    test("Returns the last match in case of a tie for SingleProduct", () => {
      const formData = {
        selectedPreferences: [
          "Automação de marketing",
          "Integração com chatbots",
        ],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe("RD Conversas");
    });

    test("MultipleProducts returns all tied products with the highest score", () => {
      const formData = {
        selectedPreferences: [
          "Automação de marketing",
          "Integração com chatbots",
        ],
        selectedFeatures: [],
        selectedRecommendationType: "MultipleProducts",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations.length).toBeGreaterThanOrEqual(1);
      recommendations.forEach((product) => {
        expect(product.score).toBe(1);
      });
    });

    test("SingleProduct with three tied products returns the last one", () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [
          "Rastreamento de interações com clientes",
          "Rastreamento de comportamento do usuário",
        ],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0]).toHaveProperty("name");
    });
  });

  describe("Validation and Edge Cases", () => {
    test("Returns empty array when there are no selected preferences or features", () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toEqual([]);
    });

    test("Returns empty array when preferences is null", () => {
      const formData = {
        selectedPreferences: null,
        selectedFeatures: null,
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toEqual([]);
    });

    test("Returns empty array when preferences is undefined", () => {
      const formData = {
        selectedPreferences: undefined,
        selectedFeatures: undefined,
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toEqual([]);
    });

    test("Returns empty array when there are no available products", () => {
      const formData = {
        selectedPreferences: ["Qualquer preferência"],
        selectedFeatures: ["Qualquer funcionalidade"],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        []
      );

      expect(recommendations).toEqual([]);
    });

    test("Returns empty array when no product meets the criteria", () => {
      const formData = {
        selectedPreferences: ["Preferência inexistente"],
        selectedFeatures: ["Funcionalidade inexistente"],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toEqual([]);
    });
  });

  describe("Score Calculation", () => {
    test("Score is calculated correctly: preferences + features", () => {
      const formData = {
        selectedPreferences: [
          "Integração com chatbots",
          "Histórico unificado de interações",
        ],
        selectedFeatures: [
          "Chat ao vivo e mensagens automatizadas",
          "Gestão de conversas em diferentes canais",
        ],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe("RD Conversas");
      expect(recommendations[0].score).toBe(4);
    });

    test("Score considers only preferences when features are not selected", () => {
      const formData = {
        selectedPreferences: ["Integração com chatbots"],
        selectedFeatures: [],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].score).toBeGreaterThan(0);
    });

    test("Score considers only features when preferences are not selected", () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: ["Chat ao vivo e mensagens automatizadas"],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].score).toBeGreaterThan(0);
    });

    test("Product with highest score is returned even with partial match", () => {
      const formData = {
        selectedPreferences: [
          "Integração fácil com ferramentas de e-mail",
          "Personalização de funis de vendas",
          "Relatórios avançados de desempenho de vendas",
        ],
        selectedFeatures: [
          "Gestão de leads e oportunidades",
          "Automação de fluxos de trabalho de vendas",
          "Rastreamento de interações com clientes",
        ],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe("RD Station CRM");
      expect(recommendations[0].score).toBe(6);
    });
  });

  describe("Recommendation Types", () => {
    test("SingleProduct always returns exactly 1 product", () => {
      const formData = {
        selectedPreferences: ["Automação de marketing"],
        selectedFeatures: [],
        selectedRecommendationType: "SingleProduct",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
    });

    test("MultipleProducts can return multiple products", () => {
      const formData = {
        selectedPreferences: [
          "Integração fácil com ferramentas de e-mail",
          "Automação de marketing",
        ],
        selectedFeatures: [],
        selectedRecommendationType: "MultipleProducts",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations.length).toBeGreaterThanOrEqual(1);
      const scores = recommendations.map((p) => p.score);
      const maxScore = Math.max(...scores);
      scores.forEach((score) => {
        expect(score).toBe(maxScore);
      });
    });

    test("MultipleProducts returns only products with maximum score", () => {
      const formData = {
        selectedPreferences: [
          "Automação de marketing",
          "Testes A/B para otimização de campanhas",
        ],
        selectedFeatures: ["Criação e gestão de campanhas de e-mail"],
        selectedRecommendationType: "MultipleProducts",
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      const maxScore = Math.max(...recommendations.map((p) => p.score));
      recommendations.forEach((product) => {
        expect(product.score).toBe(maxScore);
      });
    });
  });
});
