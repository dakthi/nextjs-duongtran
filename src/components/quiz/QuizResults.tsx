"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

interface ScoringTier {
  id: string;
  name: string;
  minScore: number;
  maxScore: number;
  lossRange: {
    min: number;
    max: number;
  };
  severity: string;
}

interface CategoryScore {
  categoryId: string;
  categoryName: string;
  score: number;
  maxScore: number;
  percentage: number;
}

interface QuizResultsProps {
  totalScore: number;
  maxScore: number;
  tier: ScoringTier;
  categoryScores: CategoryScore[];
  onRetake: () => void;
  locale: string;
}

export function QuizResults({
  totalScore,
  maxScore,
  tier,
  categoryScores,
  onRetake,
  locale,
}: QuizResultsProps) {
  const t = useTranslations();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getGaugeColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-orange-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getCategoryStatus = (percentage: number) => {
    if (percentage >= 80) return "strong";
    if (percentage >= 50) return "needsWork";
    return "critical";
  };

  const scorePercentage = (totalScore / maxScore) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-4">
          {t("quiz.results.title")}
        </h2>
      </div>

      {/* Score Card */}
      <div className={`rounded-xl border-2 p-6 md:p-8 mb-8 ${getSeverityColor(tier.severity)}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Score Gauge */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(scorePercentage * 351.86) / 100} 351.86`}
                  className={getGaugeColor(tier.severity)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-gray-900">{totalScore}</div>
                <div className="text-sm text-gray-600">{t("quiz.results.outOf", { total: maxScore })}</div>
              </div>
            </div>
          </div>

          {/* Tier Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-sans font-bold mb-2">
              {t(`quiz.results.tier.${tier.id}.title`)}
            </h3>
            <p className="text-lg mb-4">{t(`quiz.results.tier.${tier.id}.message`)}</p>
            <p className="text-base">{t(`quiz.results.tier.${tier.id}.description`)}</p>
          </div>
        </div>

        {/* Potential Loss */}
        <div className="mt-6 pt-6 border-t border-current border-opacity-20">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-wide mb-1">
              {t("quiz.results.potentialLoss")}
            </div>
            <div className="text-2xl md:text-3xl font-bold">
              {formatCurrency(tier.lossRange.min)} - {formatCurrency(tier.lossRange.max)}
              {tier.lossRange.max >= 50000 && "+"}
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 md:p-8 mb-8">
        <h3 className="text-xl md:text-2xl font-sans font-bold text-gray-900 mb-6">
          {t("quiz.results.categoryBreakdown.title")}
        </h3>
        <div className="space-y-4">
          {categoryScores.map((category) => {
            const status = getCategoryStatus(category.percentage);
            return (
              <div key={category.categoryId}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">{t(`quiz.categories.${category.categoryId}`)}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {category.score} / {category.maxScore}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        status === "strong"
                          ? "bg-green-100 text-green-700"
                          : status === "needsWork"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t(`quiz.results.categoryBreakdown.status.${status}`)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      status === "strong"
                        ? "bg-green-500"
                        : status === "needsWork"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 md:p-8 mb-8">
        <h3 className="text-xl md:text-2xl font-sans font-bold text-gray-900 mb-4">
          {t("quiz.results.nextSteps.title")}
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg
              className="w-6 h-6 text-jungle-green mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">{t("quiz.results.nextSteps.item1")}</span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-6 h-6 text-jungle-green mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">{t("quiz.results.nextSteps.item2")}</span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-6 h-6 text-jungle-green mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">{t("quiz.results.nextSteps.item3")}</span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-6 h-6 text-jungle-green mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">{t("quiz.results.nextSteps.item4")}</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-feldgrau rounded-xl p-6 md:p-8 text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">
          {t("quiz.results.cta.title")}
        </h3>
        <p className="text-mint-green text-lg mb-6">{t("quiz.results.cta.description")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-8 py-3 bg-mint-green0 hover:bg-jungle-green-dark text-white font-semibold rounded-lg transition-colors"
          >
            {t("quiz.results.cta.button")}
          </Link>
          <button
            onClick={onRetake}
            className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
          >
            {t("quiz.results.retakeButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
