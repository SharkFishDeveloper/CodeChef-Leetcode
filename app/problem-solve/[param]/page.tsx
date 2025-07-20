'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';
import { Question } from '@/interface/Question';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Editor from '@monaco-editor/react';
import ElapsedTimer from '@/components/ElapsedTimer';
import { X, Code } from 'lucide-react';
import Split from 'react-split';
import LanguageDropdown from '@/components/LanguageDropdown';

export default function ProblemSolve() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const param = params.param as string;

  const [question, setQuestion] = useState<Question | null>(null);
  const [language, setLanguage] = useState('C++');
  const [code, setCode] = useState('// Write your code here');
  const [elapsed, setElapsedTime] = useState(0);
  const [showEditor, setShowEditor] = useState(false);

  const storageKey = `code-${param}-${language}`;

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isSignedIn) router.push('/sign-in');
  }, [isSignedIn]);

  // Load question
  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const module = await import(`@/questions/${param}`);
        setQuestion(module.default);
      } catch (error) {
        console.error('Problem not found:', error);
      }
    };
    if (param) loadQuestion();
  }, [param]);

  // Load saved code when language or question changes
  useEffect(() => {
    const savedCode = localStorage.getItem(storageKey);
    setCode(savedCode || '// Write your code here');
  }, [storageKey]);

  // Auto-save code every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem(storageKey, code);
    }, 5000);
    return () => clearInterval(interval);
  }, [code, storageKey]);

  if (!isSignedIn) return null;

  const editorTopBar = (
    <div className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b font-semibold">
      <LanguageDropdown
        languages={['C++', 'Java', 'Python', 'Js']}
        selected={language}
        onSelect={(lang) => setLanguage(lang)}
      />
      <ElapsedTimer onTick={(val) => setElapsedTime(val)} />
    </div>
  );

  return (
    <div className="h-screen w-full bg-gray-100">
      {!showEditor && (
        <>
          {/* Mobile View */}
          <div className="md:hidden flex flex-col h-full">
            <div className="flex-1 overflow-y-auto bg-white p-4">
              {question ? (
                <>
                  <div className="flex justify-between mb-4">
                    <div>
                      <h1 className="text-xl font-bold">{question.title}</h1>
                    </div>
                    <span
                        className={`text-xs px-2 py-1 rounded font-semibold inline-block mt-1 ${
                          question.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-700'
                            : question.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {question.difficulty}
                      </span>
                  </div>

                  <MarkdownPreview
                    source={question.description.replace(/^\s{4}/gm, '')}
                    className="prose p-2 bg-white"
                  />

                  <button
                    onClick={() => {
                      setShowEditor(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-4 flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
                  >
                    <Code size={16} /> Focus Mode
                  </button>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="h-64 flex flex-col mt-4">
              {editorTopBar}
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value ?? '')}
              />
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex h-full">
            <Split
              className="flex w-full h-full"
              sizes={[50, 50]}
              minSize={200}
              expandToMin
              gutterSize={6}
              gutterAlign="center"
              direction="horizontal"
              cursor="col-resize"
              gutter={() => {
                const gutter = document.createElement('div');
                gutter.className = 'bg-gray-300 hover:bg-gray-400 transition-all duration-150';
                gutter.style.width = '16px';
                gutter.style.cursor = 'col-resize';
                gutter.style.height = '100%';
                return gutter;
              }}
            >
              {/* LEFT: Question Panel */}
              <div className="bg-white shadow p-4 overflow-y-auto">
                {question ? (
                  <>
                    <div className="flex justify-between mb-4">
                      <h1 className="text-2xl font-bold">{question.title}</h1>
                      <span
                        className={`text-xs px-2 py-1 rounded font-semibold mt-1 inline-block ${
                          question.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-700'
                            : question.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      <strong>Submissions:</strong> 1,024 &nbsp;|&nbsp;
                      <strong>Avg Time:</strong> 18 mins
                    </div>

                    <MarkdownPreview
                      source={question.description.replace(/^\s{4}/gm, '')}
                      className="prose p-4 bg-white rounded shadow"
                    />

                    <button
                      onClick={() => {
                        setShowEditor(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="mt-4 flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
                    >
                      <Code size={16} /> Focus Mode
                    </button>
                  </>
                ) : (
                  <p>Loading question...</p>
                )}
              </div>

              {/* RIGHT: Editor */}
              <div className="flex flex-col bg-white shadow rounded overflow-hidden">
                {editorTopBar}
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value ?? '')}
                />
              </div>
            </Split>
          </div>
        </>
      )}

      {/* Focus Mode */}
      {showEditor && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col shadow-lg">
          <div className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b">
            <LanguageDropdown
              languages={['C++', 'Java', 'Python', 'Js']}
              selected={language}
              onSelect={(lang) => setLanguage(lang)}
            />
            <ElapsedTimer onTick={(val) => setElapsedTime(val)} />
            <button
              onClick={() => {
                setShowEditor(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-gray-600 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value ?? '')}
          />
        </div>
      )}
    </div>
  );
}
