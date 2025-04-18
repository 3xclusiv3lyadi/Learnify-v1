'use client';

import {useParams} from 'next/navigation';

const SubjectPage = () => {
  const params = useParams();
  const subject = params.subject;

  // Dummy data for topics - replace with actual data fetching
  const topics = [
    `Topic 1 in ${subject}`,
    `Topic 2 in ${subject}`,
    `Topic 3 in ${subject}`,
    `Topic 4 in ${subject}`,
    `Topic 5 in ${subject}`,
    `Topic 6 in ${subject}`,
    `Topic 7 in ${subject}`,
    `Topic 8 in ${subject}`,
    `Topic 9 in ${subject}`,
    `Topic 10 in ${subject}`,
    `Topic 11 in ${subject}`,
    `Topic 12 in ${subject}`,
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">{subject} Topics</h1>
      <ul className="list-disc pl-5">
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectPage;
