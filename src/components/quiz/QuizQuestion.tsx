"use client";

import { useTranslations } from "next-intl";

interface QuizQuestionOption {
  id: string;
  text: string;
  points: number;
}

interface QuizQuestionProps {
  questionId: string;
  question: string;
  options: QuizQuestionOption[];
  selectedAnswer: string | null;
  onSelect: (optionId: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizQuestion({
  questionId,
  question,
  options,
  selectedAnswer,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  const t = useTranslations();

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="text-sm font-medium text-amber-600 mb-2">
          {t("quiz.progress", { current: questionNumber, total: totalQuestions })}
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">
          {t(question)}
        </h3>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? "border-amber-500 bg-amber-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50"
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 mr-4 flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-amber-500 bg-amber-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-base md:text-lg ${
                    isSelected ? "text-gray-900 font-medium" : "text-gray-700"
                  }`}
                >
                  {t(option.text)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
