'use client';

import {generateStudyMaterials} from '@/ai/flows/generate-study-materials';
import {generateQuiz, GenerateQuizOutput} from '@/ai/flows/generate-quiz';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
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
  const [quizQuestions, setQuizQuestions] = useState<GenerateQuizOutput | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudyMaterialsAndQuiz = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const studyMaterialsResult = await generateStudyMaterials({topic: query});
          setStudyMaterials({
            keyConcepts: studyMaterialsResult.keyConcepts,
            detailedDescriptions: studyMaterialsResult.detailedDescriptions,
            diagrams: studyMaterialsResult.diagrams,
            quiz: studyMaterialsResult.quiz,
            flashcards: studyMaterialsResult.flashcards,
          });

          const quizResult = await generateQuiz({topic: query});
          setQuizQuestions(quizResult);
        } catch (error) {
          console.error('Error generating study materials or quiz:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStudyMaterialsAndQuiz();
  }, [query]);

  const keyConceptsList = studyMaterials.keyConcepts.split('\n').filter(Boolean);
  const detailedDescriptionsList = studyMaterials.detailedDescriptions.split('\n').filter(Boolean);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    if (quizQuestions && quizQuestions.quizQuestions) {
      quizQuestions.quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
    }
    setIsQuizSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results for: {query}</h1>

      {isLoading ? (
        <p>Loading study materials...</p>
      ) : (
        <div className="w-full max-w-2xl">

           <Card className="mt-4">
            <CardHeader>
              <CardTitle>Flashcards</CardTitle>
              <CardDescription>Review key terms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{studyMaterials.flashcards}</p>
            </CardContent>
          </Card>


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
              {quizQuestions && quizQuestions.quizQuestions ? (
                quizQuestions.quizQuestions.map((q, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{q.question}</p>
                    <RadioGroup onValueChange={value => handleAnswerChange(index, value)}>
                      {q.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mb-2">
                          <RadioGroupItem value={option} id={`question-${index}-option-${optionIndex}`} className="mr-2" />
                          <label htmlFor={`question-${index}-option-${optionIndex}`} className="inline-flex items-center">
                            {option}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))
              ) : (
                <p>Loading quiz questions...</p>
              )}
              <Button onClick={calculateScore} disabled={isQuizSubmitted}>
                Submit Quiz
              </Button>
              {isQuizSubmitted && (
                <div className="mt-4">
                  <p>
                    You scored {score} out of {quizQuestions?.quizQuestions.length}!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>


        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
