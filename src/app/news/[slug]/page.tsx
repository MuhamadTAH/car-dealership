"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import newsRaw from "@/data/news.json";
import { NewsArticle } from "@/lib/types";
import { ArrowLeft, Calendar, Share2, MessageCircle, ArrowRight } from "lucide-react";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { lang } = useApp();
  const articles = newsRaw as NewsArticle[];

  const article =
    articles.find((a) => a.slug.toLowerCase() === resolvedParams.slug.toLowerCase()) ||
    articles[0];

  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);
  const [copied, setCopied] = useState(false);

  const getTitle = (a: NewsArticle) => {
    if (lang === "ar") return a.titleAr || a.title;
    if (lang === "ku") return a.titleKu || a.title;
    return a.title;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          <span>Back to News</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 mb-8">
        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
          {article.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          {getTitle(article)}
        </h1>
        <div className="flex items-center gap-3 text-xs text-gray-500 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </div>
          <span>•</span>
          <span>By iQ Cars Automotive Desk</span>
        </div>
      </div>

      {/* Main Feature Image */}
      <div className="rounded-3xl overflow-hidden mb-10 shadow-lg border border-gray-200 dark:border-gray-800 aspect-[16/9] bg-gray-100 dark:bg-gray-800">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-5">
        <p className="font-semibold text-lg text-gray-900 dark:text-white leading-relaxed">
          {article.summary}
        </p>
        {article.content.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Share Box */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="text-xs font-bold text-gray-500">Share this article:</div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Share2 className="w-4 h-4 text-emerald-500" />
            <span>{copied ? "Copied Link!" : "Copy"}</span>
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-[#25D366] text-white hover:opacity-90 transition"
            title="Share on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="group space-y-2 block"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white group-hover:text-emerald-500 line-clamp-2">
                  {getTitle(rel)}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
