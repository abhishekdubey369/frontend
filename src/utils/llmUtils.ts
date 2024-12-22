export interface LLMConfig {
    llm_type: "openai" | "groq";
    api_key: string;
    model: string;
  }
  
  export const openAIModels = [
    "gpt-4o",
    "chatgpt-4o-latest",
    "gpt-4o-mini",
    "o1-2024-12-17",
    "gpt-4-turbo",
    "gpt-3.5-turbo-0125",
    "gpt-3.5-turbo",
  ];
  
  export const groqModels = [
    "gemma2-9b-it",
    "llama-3.1-8b-instant",
    "llama-3.3-70b-versatile",
    "llama-guard-3-8b",
    "llama3-70b-8192",
    "mixtral-8x7b-32768",
    "whisper-large-v3",
    "whisper-large-v3-turbo",
  ];
  
  export function getModelsByLLMType(llmType: "openai" | "groq"): string[] {
    switch (llmType) {
      case "openai":
        return openAIModels;
      case "groq":
        return groqModels;
      default:
        throw new Error("Unsupported LLM type");
    }
  }
  
  export function validateLLMConfig(config: LLMConfig): boolean {
    if (!config.api_key) {
      throw new Error("API key is required.");
    }
  
    const models = getModelsByLLMType(config.llm_type);
    if (!models.includes(config.model)) {
      throw new Error(
        `Invalid model type for ${config.llm_type}. Available models are: ${models.join(", ")}`
      );
    }
  
    return true;
  }
  
  export function generateLLMOptions(): {
    llmTypeOptions: string[];
    openAIModels: string[];
    groqModels: string[];
  } {
    return {
      llmTypeOptions: ["openai", "groq"],
      openAIModels,
      groqModels,
    };
  }
  