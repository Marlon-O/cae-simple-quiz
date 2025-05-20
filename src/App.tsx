import { useState } from "react";
import { useQuizData } from "./hooks/useQuizData";
import { HomeCard } from "./components/HomeCard";
import { Activity } from "./components/Activity";
import { useUnloadWarning } from "./hooks/useUnloadWarning";
import { ResultCard } from "./components/ResultCard";

type ResultItem = {
  question: string;
  result: "CORRECT" | "FALSE";
};

type ResultGroup = {
  round: string;
  questions: ResultItem[];
};

function App() {
  const { quizInfo, activities, loading, error } = useQuizData();
  const [currentScreen, setCurrentScreen] = useState("home");
  const [started, setStarted] = useState(false);

  const [results, setResults] = useState<ResultGroup[]>([]);
  const [showResult, setShowResult] = useState(false);

  const [currentActivity, setCurrentActivity] = useState("");

  useUnloadWarning(started);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !quizInfo)
    return <p className="text-center text-red-500">{error}</p>;

  const handleStart = (activity_name: string) => {
    setCurrentScreen(activity_name.toLowerCase().replace(" ", "_"));
    setStarted(true);
    setCurrentActivity(activity_name);
  };

  const handleAnswer = (
    questionText: string,
    isCorrect: boolean,
    roundTitle: string
  ) => {
    setResults(prev => {
      const existingRound = prev.find(
        (r) => "round" in r && r.round === roundTitle
      ) as ResultGroup;

      if (existingRound) {
        // Check if the question already exists
        const alreadyAnswered = existingRound.questions.some(q => q.question === questionText);
        if (alreadyAnswered) return prev;
        
        existingRound.questions.push({
          question: questionText,
          result: isCorrect ? "CORRECT" : "FALSE"
        });
        return [...prev];
      } else {
        return [
          ...prev,
          {
            round: roundTitle,
            questions: [
              { question: questionText, result: isCorrect ? "CORRECT" : "FALSE" }
            ]
          }
        ];
      }
    });
  }

  if (showResult) {
    return (
      <ResultCard
        title={currentActivity}
        results={results}
        onHome={() => {
          setCurrentScreen("home");
          setStarted(false);
          setShowResult(false);
          setResults([]);
        }}
      />
    );
  }

  if (!started) {
    return (
      <HomeCard
        name={quizInfo.name}
        heading={quizInfo.heading}
        activities={activities}
        handleStart={handleStart}
      />
    );
  }

  return (
    <>
      {activities
        .sort((a, b) => a.order - b.order)
        .map((activity) => {
          return (
            <Activity
              key={activity.order}
              activity_name={activity.activity_name}
              order={activity.order}
              questions={activity.questions}
              current_screen={currentScreen}
              onAnswer={handleAnswer}
              onComplete={() => setShowResult(true)}
            />
          );
        })}
    </>
  );
}

export default App;
