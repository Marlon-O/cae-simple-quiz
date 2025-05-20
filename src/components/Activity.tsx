import { useState, useEffect, use } from "react";
import type { Activity as ActivityProp, Question, Round } from "../types/Quiz";
import { QuestionCard } from "./QuestionCard";
import { RoundCard } from "./RoundCard";

type ActivityProps = ActivityProp & {
  current_screen: string;
  onAnswer: (
    questionText: string,
    isCorrect: boolean,
    roundTitle: string
  ) => void;
  onComplete: () => void;
};

type QuestionOrRound = Question | Round;

export const Activity = ({
  activity_name,
  questions,
  current_screen,
  onAnswer,
  onComplete,
}: ActivityProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRoundCard, setShowRoundCard] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [inRound, setInRound] = useState(false);

  const isActive =
    current_screen === activity_name.toLowerCase().replace(" ", "_");
  if (!isActive) return null;

  const sortedQuestions: QuestionOrRound[] = [...questions].sort(
    (a, b) => a.order - b.order
  );
  const currentItem = sortedQuestions[currentIndex];

  const isRound =
    currentItem &&
    "round_title" in currentItem &&
    Array.isArray(currentItem.questions);

  useEffect(() => {
    if (!currentItem) {
      onComplete();
    }
  }, [currentItem, onComplete]);

  useEffect(() => {
    if (isRound && !inRound) {
      setShowRoundCard(true);
      const timer = setTimeout(() => {
        setShowRoundCard(false);
        setInRound(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isRound, inRound]);

  if (!currentItem) {
    return null;
  }

  // If it's a round
  if (
    currentItem &&
    "round_title" in currentItem &&
    Array.isArray(currentItem.questions)
  ) {
    const sortedRoundQuestions = [...currentItem.questions].sort(
      (a, b) => a.order - b.order
    );
    const currentQuestionInRound = sortedRoundQuestions[currentRoundIndex];

    if (showRoundCard) {
      return (
        <RoundCard
          activity_name={activity_name}
          round_title={currentItem.round_title}
        />
      );
    }

    return (
      <QuestionCard
        key={currentQuestionInRound.order}
        activity_name={activity_name}
        stimulus={currentQuestionInRound.stimulus}
        answer={currentQuestionInRound.is_correct}
        feedback={currentQuestionInRound.feedback}
        question_number={currentRoundIndex + 1}
        round_title={currentItem.round_title}
        onNext={() => {
          if (currentRoundIndex < sortedRoundQuestions.length - 1) {
            setCurrentRoundIndex((prev) => prev + 1);
          } else {
            setCurrentRoundIndex(0);
            setInRound(false);
            setCurrentIndex((prev) => prev + 1);
          }
        }}
        onAnswer={(questionText, isCorrect, roundTitle) => {
          onAnswer(questionText, isCorrect, roundTitle);
        }}
      />
    );
  }

  // If it's a flat question
  return (
    <QuestionCard
      key={(currentItem as Question).order}
      activity_name={activity_name}
      stimulus={(currentItem as Question).stimulus}
      answer={(currentItem as Question).is_correct}
      feedback={(currentItem as Question).feedback}
      question_number={currentIndex + 1}
      onNext={() => setCurrentIndex((prev) => prev + 1)}
      onAnswer={(questionText, isCorrect, roundTitle) => {
        onAnswer(questionText, isCorrect, roundTitle);
      }}
    />
  );
};
