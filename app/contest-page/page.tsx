'use client';

import { useEffect, useState } from 'react';
import AllContests from '@/contests-list';
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContestPage() {
  const [joinedContests, setJoinedContests] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('joinedContests');
    if (stored) setJoinedContests(JSON.parse(stored));
  }, []);

  const handleParticipate = (contestName: string) => {
    if (joinedContests.includes(contestName)) return;

    const updated = [...joinedContests, contestName];
    localStorage.setItem('joinedContests', JSON.stringify(updated));
    setJoinedContests(updated);
  };

  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-10 text-center text-gray-900 font-bold">
          Available Contests
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {AllContests.contests.map((contest) => {
            const joined = joinedContests.includes(contest.name);

            return (
              <div
                key={contest.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    {formatName(contest.name)}
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    {contest.questions.length} Questions • Difficulty: Mixed
                  </p>
                </div>

               {joined ? (
                  <button
                    disabled
                    className="w-full py-2 rounded-xl font-semibold text-sm bg-gray-200 text-gray-500 cursor-not-allowed"
                  >
                    Already Participated
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleParticipate(contest.name);
                      router.push(`/contest/${contest.param}`);
                    }}
                    className="w-full py-2 rounded-xl font-semibold text-sm bg-yellow-400 text-black hover:bg-yellow-300 transition duration-200 cursor-pointer"
                  >
                    Participate
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
