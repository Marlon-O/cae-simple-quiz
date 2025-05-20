import { useState } from "react";
import { Button } from "./Button";

type QuestionProps = {
  activity_name: string;
  stimulus: string;
  answer: boolean;
  feedback: string;
  question_number: number;
  round_title?: string;
  onNext: () => void;
  onAnswer: (
    questionText: string,
    isCorrect: boolean,
    roundTitle: string
  ) => void;
};

function formatMarkedText(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <strong key={i}>{part.slice(1, -1)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export const QuestionCard = ({
  activity_name,
  stimulus,
  answer,
  feedback,
  question_number,
  round_title,
  onNext,
  onAnswer,
}: QuestionProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [blinkFeedback, setblinkFeedback] = useState(false);

  const handleAnswer = (user_answer: boolean) => {
    if (answer !== user_answer) {
      setShowFeedback(true);
      setblinkFeedback(true);

      setTimeout(() => {
        onNext();
        onAnswer(`Q${question_number}`, false, round_title || "Round 1");
      }, 3000);
    } else {
      onNext();
      onAnswer(`Q${question_number}`, true, round_title || "Round 1");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full max-w-xl text-center animate-slide-in-right">
      <h2 className="text-blue-600 text-sm mb-8">
        {activity_name} {round_title ? `/ ${round_title}` : ""} /{" "}
        <strong>Q{question_number}</strong>
      </h2>
      <h3 className="text-xl text-blue-600 mb-8">
        {formatMarkedText(stimulus)}
      </h3>

      {showFeedback && (
        <p
          className={`text-base mb-6 transition-opacity ${
            answer ? "text-blue-600" : "text-red-600"
          } ${blinkFeedback ? "animate-blink" : ""}`}
        >
          {formatMarkedText(feedback)}
        </p>
      )}

      {!showFeedback && (
        <div className="flex justify-around gap-4">
          <Button label="CORRECT" onClick={() => handleAnswer(true)} />
          <Button
            label="INCORRECT"
            onClick={() => handleAnswer(false)}
            variant="secondary"
          />
        </div>
      )}
    </div>
  );
};
