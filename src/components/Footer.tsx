import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              IN+ <span className="text-green-400">Incluir e Integrar</span>
            </h3>
            <p className="text-blue-100 mb-4">
              Promovendo a inclusão profissional de pessoas com deficiência
              através de capacitação, oportunidades de emprego e consultoria
              empresarial.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-blue-100 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-blue-100 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-blue-100 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-blue-100 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/cursos"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  to="/vagas"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Vagas
                </Link>
              </li>
              <li>
                <Link
                  to="/empresas"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Empresas
                </Link>
              </li>
              <li>
                <Link
                  to="/consultoria"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Consultoria
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-100" />
                <span className="text-blue-100">contato@inplus.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-100" />
                <span className="text-blue-100">(31) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-100" />
                <span className="text-blue-100">Belo Horizonte-MG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha separadora */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm">
              © 2024 IN+ Incluir e Integrar. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};
