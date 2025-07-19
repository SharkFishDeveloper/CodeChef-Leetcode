'use client';

import { questionList } from '@/questions-list';
import Link from 'next/link';
import React, { useState } from 'react';

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const Problems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const itemsPerPage = 6;

  const allCategories = Array.from(
    new Set(questionList.flatMap((q) => q.categories || []))
  );

  // Apply filters
  const filteredQuestions = questionList.filter((q) => {
    const matchesSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || (q.categories && q.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProblems = filteredQuestions.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-black">All Problems</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center gap-2 mb-6">
  <input
    type="text"
    value={searchTerm}
    onChange={handleSearchChange}
    placeholder="Search problems..."
    className="w-full md:w-64 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
  />

  <select
    value={selectedCategory}
    onChange={handleCategoryChange}
    className="w-full md:w-48 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
  >
    <option value="">All Categories</option>
    {allCategories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>

      {/* Problem Cards */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {currentProblems.map((question) => (
          <Link
            key={question.param}
            href={`/problem-solve/${question.param}`}
            className="block p-4 border border-gray-200 rounded-2xl shadow hover:shadow-md hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold text-gray-900">{question.name}</h2>

            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(
                question.difficulty
              )}`}
            >
              {question.difficulty}
            </span>

            <div className="mt-3 flex flex-wrap gap-2">
              {question.categories?.map((category) => (
                <span
                  key={category}
                  className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Problems;
