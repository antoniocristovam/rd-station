import React, { useState } from "react";
import Form from "./components/Form/Form";
import RecommendationList from "./components/RecommendationList/RecommendationList";

function App() {
  const [recommendations, setRecommendations] = useState([]);

  /**
   * Dadas atualizações no formulário, necessário atualizar a lista de recomendações
   */

  // App.js: Neste componente, você encontrará o comentário "Dadas atualizações no formulário, necessário atualizar a lista de recomendações". Implemente a lógica necessária para atualizar a lista de recomendações com base nas entradas do usuário.
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <img
              src="https://d3jj9yc7rgpax4.cloudfront.net/brand-system/logos/rd-station-default.svg"
              alt="RD Station"
              className="h-8 md:h-10"
            />
            <div className="h-8 md:h-10 w-px bg-slate-300"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-light text-slate-900 tracking-tight">
                Recomendador de Produtos
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 md:p-10">
            <p className="text-slate-700 leading-relaxed text-base md:text-lg font-light">
              Encontre soluções personalizadas para seu negócio. Nossa
              plataforma oferece desde{" "}
              <span className="font-medium text-slate-900">CRM</span> até{" "}
              <span className="font-medium text-slate-900">
                Inteligência Artificial
              </span>
              , ajudando você a alcançar seus objetivos de forma eficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Form setRecommendations={setRecommendations} />
            </div>

            <div className="lg:col-span-1">
              <RecommendationList recommendations={recommendations} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
