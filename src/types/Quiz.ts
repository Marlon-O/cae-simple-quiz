export type Question = {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: string[];
  feedback: string;
};

export type Round = {
  round_title: string;
  order: number;
  questions: Question[];
};

export type Activity = {
  activity_name: string;
  order: number;
  questions: (Question | Round)[];
};

export type QuizData = {
  name: string;
  heading: string;
  activities: Activity[];
};
