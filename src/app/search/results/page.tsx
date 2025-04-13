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
    const flashcardsList = studyMaterials.flashcards.split('\n').filter(Boolean);


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
              <CardDescription>Flip the card to review key terms.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcardsList.map((flashcard, index) => {
                  const [topic, description] = flashcard.split(':').map(str => str.trim());
                  return (
                    <div key={index} className="flip-card">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          <p className="font-semibold text-lg">{topic}</p>
                        </div>
                        <div className="flip-card-back">
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Detailed Descriptions</CardTitle>
              <CardDescription>Explore in-depth explanations.</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>


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
             {/* Topic Summary Section */}
             <Card className="mt-4">
              <CardHeader>
                <CardTitle>Topic Summary</CardTitle>
                <CardDescription>A brief overview of the topic.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{studyMaterials.keyConcepts}</p>
              </CardContent>
            </Card>


        </div>
      )}
        <style jsx>{`
        .flip-card {
          background-color: transparent;
          width: 300px;
          height: 200px;
          border: 1px solid #f1f1f1;
          perspective: 1000px; /* Remove this if you don't want the 3D effect */
        }

        /* This container is needed to position the front and back side */
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        /* Do an horizontal flip when the flip-card container is hovered over */
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        /* Position the front and back side */
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden; /* Safari */
          backface-visibility: hidden;
        }

        /* Style the front side (fallback if image is missing) */
        .flip-card-front {
          background-color: #bbb;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        /* Style the back side */
        .flip-card-back {
          background-color: dodgerblue;
          color: white;
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default SearchResultsPage;
