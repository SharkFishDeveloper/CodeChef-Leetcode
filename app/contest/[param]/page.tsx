'use client';

import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Question } from '@/interface/Question';
import type { ContestRound } from '@/contests-list';

const ContestRound = () => {
  const params = useParams();
  const contestParam = params.param;
  const [allquestions, setAllQuestions] = useState<Question[] | null>(null);
  const [language, setLanguage] = useState<'js' | 'python' | 'cpp' | 'java'>('js');
  const [code, setCode] = useState<string>('');
  const [questionIndex, setQuestionIndex] = useState(0);

  const getStorageKey = (qIdx = questionIndex, lang = language) =>
    `code-${contestParam}-${qIdx}-${lang}`;

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const module = await import(`@/contest/${contestParam}`);
        const contestData = module.default as ContestRound;
        setAllQuestions(contestData.questions);

        const storageKey = getStorageKey(questionIndex, language);
        const savedCode = localStorage.getItem(storageKey);
        const fallbackCode =
          contestData.questions[questionIndex].code[language]?.boilerplate || '';

        setCode(savedCode ?? fallbackCode);
      } catch (error) {
        console.error('Problem not found:', error);
      }
    };

    if (contestParam) loadQuestion();
  }, [contestParam]);

  useEffect(() => {
    if (allquestions && allquestions[questionIndex]) {
      const storageKey = getStorageKey();
      const savedCode = localStorage.getItem(storageKey);
      const fallbackCode = allquestions[questionIndex].code[language]?.boilerplate || '';
      setCode(savedCode ?? fallbackCode);
    }
  }, [questionIndex, language]);

  useEffect(() => {
    const interval = setInterval(() => {
      const key = getStorageKey();
      localStorage.setItem(key, code);
    }, 5000);
    return () => clearInterval(interval);
  }, [code, language, questionIndex]);

  if (!allquestions) return <div className="p-4">Loading...</div>;

  const question = allquestions[questionIndex];

  const handleSubmit = () => {
    //@ts-ignore
    console.log(`${code}\n\n${allquestions[questionIndex].code[language].wrapper}`);
    alert('Thank you for participating');
    redirect('/');
  };

  const handleReset = () => {
    const key = getStorageKey();
    localStorage.removeItem(key);
    const fallback = allquestions[questionIndex].code[language]?.boilerplate || '';
    setCode(fallback);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 py-4 gap-4 bg-white border-b">
        {/* Question Selector */}
        <div className="flex flex-wrap gap-2">
          {allquestions.map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded text-sm ${
                questionIndex === idx ? 'bg-black text-white' : 'border bg-white'
              }`}
              onClick={() => setQuestionIndex(idx)}
            >
              Q{idx + 1}
            </button>
          ))}
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap gap-2">
          {['js', 'python', 'cpp', 'java'].map((lang) => (
            <button
              key={lang}
              className={`px-3 py-1 rounded text-sm ${
                language === lang ? 'bg-black text-white' : 'bg-white border'
              }`}
              onClick={() => setLanguage(lang as any)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Description Section */}
        <div className="w-full md:w-1/2 p-4 md:p-6 overflow-auto border-b md:border-b-0 md:border-r">
          <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
          <p className="mb-4 text-sm text-gray-500">{question.difficulty}</p>
          <div className="bg-black text-white rounded border p-4">
            <MarkdownPreview source={question.description} />
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="w-full md:w-1/2 flex flex-col p-4 md:p-6 overflow-auto bg-gray-100">
          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
            >
              Reset Code
            </button>
          </div>
          <Editor
            height="70vh"
            language={language === 'js' ? 'javascript' : language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{ fontSize: 14 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContestRound;
