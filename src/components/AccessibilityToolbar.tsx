import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  Eye,
  Type,
  Volume2,
  Contrast,
  Settings,
  Hand,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { useEffect } from "react";
export const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [isReading, setIsReading] = useState(false);
  const [librasActive, setLibrasActive] = useState(false);
  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
  };
  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 20, 200);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };
  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 20, 80);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };
  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = "100%";
  };
  const toggleTextReader = () => {
    setIsReading((prev) => !prev);
    if (!isReading) {
      alert("Leitor de texto ativado! Clique em qualquer texto para ouvi-lo.");
    } else {
      alert("Leitor de texto desativado.");
      speechSynthesis.cancel();
    }
  };
  useEffect(() => {
    const handleClick = (e) => {
      if (isReading && e.target.innerText) {
        const texto = e.target.innerText;
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = "pt-BR";
        speechSynthesis.speak(fala);
      }
    };

    if (isReading) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [isReading]);

  const toggleLibras = () => {
    setLibrasActive(!librasActive);
    if (!librasActive) {
      console.log("Ativando vídeo-intérprete de Libras...");
      alert("Vídeo-intérprete de Libras ativado!");
    } else {
      console.log("Desativando vídeo-intérprete de Libras...");
      alert("Vídeo-intérprete de Libras desativado.");
    }
  };
  return (
    <>
      {/* Floating Accessibility Button - Fixed positioning */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir ferramentas de acessibilidade"
          className="rounded-full p-3 shadow-lg w-12 h-12 flex items-center justify-center py-[12px] my-[60px] bg-green-500 hover:bg-green-400 text-xs font-normal text-blue-950"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* Libras Video Interpreter */}
      {librasActive && (
        <div className="fixed bottom-4 right-4 z-40 w-48 h-36 bg-black rounded-lg shadow-xl border-2 border-blue-600">
          <div className="relative w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
            <Hand className="h-12 w-12 text-white" />
            <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              Intérprete Libras
            </div>
            <Button
              onClick={toggleLibras}
              size="icon"
              variant="secondary"
              className="absolute top-1 right-1 h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed top-20 right-4 z-40">
          <Card className="w-96 p-6 shadow-xl bg-white border my-0 mx-0 py-0 px-[10px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Ferramentas de Acessibilidade
              </h3>
            </div>

            <div className="space-y-4">
              {/* Contraste */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <Contrast className="mr-2 h-4 w-4" />
                  Contraste
                </h4>
                <Button
                  variant={highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={toggleContrast}
                  className="w-full"
                >
                  {highContrast ? "Desativar" : "Ativar"} Alto Contraste
                </Button>
              </div>

              {/* Tamanho da Fonte */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <Type className="mr-2 h-4 w-4" />
                  Tamanho da Fonte
                </h4>
                <div className="flex items-center justify-between mb-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 80}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium px-4">{fontSize}%</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseFontSize}
                    disabled={fontSize >= 200}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFontSize}
                  className="w-full text-xs"
                >
                  Resetar para 100%
                </Button>
              </div>

              {/* Leitor de Texto */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <Volume2 className="mr-2 h-4 w-4" />
                  Leitor de Texto
                </h4>
                <Button
                  variant={isReading ? "default" : "outline"}
                  size="sm"
                  onClick={toggleTextReader}
                  className="w-full"
                >
                  {isReading ? "Desativar" : "Ativar"} Leitor de Texto
                </Button>
              </div>

              {/* Vídeo-intérprete Libras */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <Hand className="mr-2 h-4 w-4" />
                  Vídeo-intérprete Libras
                </h4>
                <Button
                  variant={librasActive ? "default" : "outline"}
                  size="sm"
                  onClick={toggleLibras}
                  className="w-full"
                >
                  {librasActive ? "Desativar" : "Ativar"} Intérprete
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Navegação por teclado:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>
                    • <kbd className="bg-gray-100 px-1 rounded">Tab</kbd>:
                    Navegar entre elementos
                  </li>
                  <li>
                    • <kbd className="bg-gray-100 px-1 rounded">Enter</kbd>:
                    Ativar botões e links
                  </li>
                  <li>
                    • <kbd className="bg-gray-100 px-1 rounded">Esc</kbd>:
                    Fechar menus e modais
                  </li>
                  <li>
                    • <kbd className="bg-gray-100 px-1 rounded">Setas</kbd>:
                    Navegar em menus
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* CSS personalizado para acessibilidade */}
      <style>{`
        .high-contrast {
          filter: contrast(200%) brightness(1.2) !important;
        }
        
        .high-contrast * {
          background-color: var(--contrast-bg, inherit) !important;
          color: var(--contrast-text, inherit) !important;
        }
        
        .high-contrast h1, .high-contrast h2, .high-contrast h3, 
        .high-contrast h4, .high-contrast h5, .high-contrast h6,
        .high-contrast p, .high-contrast span, .high-contrast div {
          color: #000000 !important;
        }
        
        .high-contrast .bg-white {
          background-color: #ffffff !important;
        }
        
        .high-contrast .bg-blue-900 {
          background-color: #000080 !important;
        }
        
        *:focus {
          outline: 3px solid #0066cc !important;
          outline-offset: 2px !important;
        }
        
        .high-contrast button {
          border: 2px solid #000000 !important;
        }
      `}</style>
    </>
  );
};
