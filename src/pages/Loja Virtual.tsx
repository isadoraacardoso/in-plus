"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { Footer } from "@/components/Footer";

export default function LojaPage() {
  const [carrinho, setCarrinho] = useState<number>(0);

  function adicionarAoCarrinho() {
    setCarrinho(carrinho + 1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityToolbar />
      <Header />

      <div className="container mx-auto px-4 py-8"></div>
      <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Nossa Loja</h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
          <img
            src="/5ddd2aba-43d5-4c8f-9c73-1df19676c913.jpg"
            alt="Óculos Estiloso"
            width={400}
            height={250}
            className="rounded-lg object-cover"
          />
          <h2 className="text-xl font-semibold mt-4">Óculos </h2>
          <p className="text-gray-600 mb-2"></p>
          <p className="text-lg font-bold mb-4">R$ 199,00</p>
          <Button onClick={adicionarAoCarrinho}>Adicionar ao carrinho</Button>
          {carrinho > 0 && (
            <p className="mt-3 text-green-600">Itens no carrinho: {carrinho}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
