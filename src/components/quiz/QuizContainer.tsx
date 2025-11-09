"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import quizData from "@/../../data/quiz/questions.json";

interface Answer {
  questionId: string;
  optionId: string;
  points: number;
}

interface QuizContainerProps {
  locale: string;
}

export function QuizContainer({ locale }: QuizContainerProps) {
  let t: any;
  try {
    t = useTranslations();
  } catch (error) {
    // Fallback if context not available
    t = (key: string) => key;
  }

  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Flatten all questions from all categories
  const allQuestions = quizData.categories.flatMap((category) =>
    category.questions.map((q) => ({
      ...q,
      categoryName: category.name,
    }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleSelectAnswer = (optionId: string) => {
    const selectedOption = currentQuestion.options.find((opt) => opt.id === optionId);
    if (!selectedOption) return;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      optionId,
      points: selectedOption.points,
    };

    // Update or add answer
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.questionId === currentQuestion.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setHasStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const calculateResults = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    const maxScore = allQuestions.reduce(
      (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
      0
    );

    // Calculate tier
    const tier = quizData.scoringTiers.find(
      (t) => totalScore >= t.minScore && totalScore <= t.maxScore
    ) || quizData.scoringTiers[0];

    // Calculate category scores
    const categoryScores = quizData.categories.map((category) => {
      const categoryQuestions = allQuestions.filter(
        (q) => q.category === category.id
      );
      const categoryAnswers = answers.filter((a) =>
        categoryQuestions.some((q) => q.id === a.questionId)
      );
      const score = categoryAnswers.reduce((sum, a) => sum + a.points, 0);
      const maxCategoryScore = categoryQuestions.reduce(
        (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
        0
      );

      return {
        categoryId: category.id,
        categoryName: category.name,
        score,
        maxScore: maxCategoryScore,
        percentage: maxCategoryScore > 0 ? (score / maxCategoryScore) * 100 : 0,
      };
    });

    return {
      totalScore,
      maxScore,
      tier,
      categoryScores,
    };
  };

  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const canProceed = !!currentAnswer;

  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-6">
          {t("quiz.title")}
        </h1>
        <p className="text-xl text-gray-600 mb-8">{t("quiz.subtitle")}</p>
        <button
          onClick={handleStart}
          className="px-8 py-4 bg-mint-green0 hover:bg-jungle-green-dark text-white text-lg font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          {t("quiz.startButton")}
        </button>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    return (
      <QuizResults
        totalScore={results.totalScore}
        maxScore={results.maxScore}
        tier={results.tier}
        categoryScores={results.categoryScores}
        onRetake={handleRetake}
        locale={locale}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-mint-green0 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 md:p-8 mb-6">
        <QuizQuestion
          questionId={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={currentAnswer?.optionId || null}
          onSelect={handleSelectAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("quiz.previousButton")}
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="px-6 py-3 bg-mint-green0 hover:bg-jungle-green-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex === totalQuestions - 1
            ? t("quiz.submitButton")
            : t("quiz.nextButton")}
        </button>
      </div>
    </div>
  );
}
