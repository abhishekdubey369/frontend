"use client";
import React from "react";
import {
  LLMConfig,
  generateLLMOptions,
  validateLLMConfig,
} from "@/utils/llmUtils";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NeighborhoodWeather: React.FC = () => {
  const { llmTypeOptions, openAIModels, groqModels } = generateLLMOptions();
  const router = useRouter();
  const [cookieValue, setCookieValue] = useState('');

  useEffect(() => {
    // Parse cookies to find the specific one you need
    const cookies = document.cookie.split('; ').reduce((acc:any, currentCookie:any) => {
      const [name, value] = currentCookie.split('=');
      acc[name] = value;
      return acc;
    }, {});

    setCookieValue(cookies['token'] || '');
  }, []);

  const [config, setConfig] = React.useState<LLMConfig>({
    llm_type: "openai",
    api_key: "",
    model: openAIModels[0],
  });

  const handleConfigChange = (field: keyof LLMConfig, value: string) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if(validateLLMConfig(config)){
        localStorage.setItem("genaiConfig", JSON.stringify(config));
        await axios.post("/api/genAI/llm_config", config);
        if(cookieValue){
        router.push("/dashboard")}
        else{
          router.push("/login")
        }
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const getModelOptions = () => {
    return config.llm_type === "openai" ? openAIModels : groqModels;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Neighborhood Weather Configuration
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="llmType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              LLM Type:
            </label>
            <select
              id="llmType"
              value={config.llm_type}
              onChange={(e) => handleConfigChange("llm_type", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {llmTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="apiKey"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              API Key:
            </label>
            <input
              type="text"
              id="apiKey"
              value={config.api_key}
              onChange={(e) => handleConfigChange("api_key", e.target.value)}
              placeholder="Enter your API Key"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="modelType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Model Type:
            </label>
            <select
              id="modelType"
              value={config.model}
              onChange={(e) => handleConfigChange("model", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {getModelOptions().map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NeighborhoodWeather;
