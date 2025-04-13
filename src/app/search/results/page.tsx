'use client';

import {generateStudyMaterials} from '@/ai/flows/generate-study-materials';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [studyMaterials, setStudyMaterials] = useState({
    keyConcepts: '',
    detailedDescriptions: '',
    diagrams: '',
    quiz: '',
    flashcards: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const result = await generateStudyMaterials({topic: query});
          setStudyMaterials({
            keyConcepts: result.keyConcepts,
            detailedDescriptions: result.detailedDescriptions,
            diagrams: result.diagrams,
            quiz: result.quiz,
            flashcards: result.flashcards,
          });
        } catch (error) {
          console.error('Error generating study materials:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStudyMaterials();
  }, [query]);

  const keyConceptsList = studyMaterials.keyConcepts.split('\n').filter(Boolean);
  const detailedDescriptionsList = studyMaterials.detailedDescriptions.split('\n').filter(Boolean);

  // Dummy quiz questions (replace with actual data)
  const quizQuestions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 'Mars',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results for: {query}</h1>

      {isLoading ? (
        <p>Loading study materials...</p>
      ) : (
        <div className="w-full max-w-2xl">
          {/* Key Concepts with Internal Links */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Key Concepts</CardTitle>
              <CardDescription>Click on a concept to learn more.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {keyConceptsList.map((concept, index) => (
                  <li key={index}>
                    <a href={`#concept-${index}`} className="text-primary hover:underline">
                      {concept}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Detailed Descriptions and Diagrams */}
          <Accordion type="single" collapsible>
            {detailedDescriptionsList.map((description, index) => (
              <AccordionItem key={index} value={`concept-${index}`}>
                <AccordionTrigger id={`concept-${index}`}>
                  {keyConceptsList[index] || `Concept ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">{description}</p>
                  {/* Example Diagram/Image */}
                  {studyMaterials.diagrams && (
                    <img
                      src="https://picsum.photos/400/200"
                      alt="Diagram"
                      className="rounded-md shadow-md"
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Quiz (MCQ Implementation) */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Quiz</CardTitle>
              <CardDescription>Test your knowledge!</CardDescription>
            </CardHeader>
            <CardContent>
              {quizQuestions.map((q, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{q.question}</p>
                  <ul className="list-none pl-0">
                    {q.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="mb-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Flashcards</CardTitle>
              <CardDescription>Review key terms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{studyMaterials.flashcards}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
