import { useEffect, useState } from 'react';
import type { QuizData, Activity } from '../types/Quiz';

export const useQuizData = () => {
  const [quizInfo, setQuizInfo] = useState<{ name: string; heading: string } | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/quiz');
        if (!res.ok) throw new Error('Failed to fetch quiz data');
        const data: QuizData = await res.json();

        setQuizInfo({ name: data.name, heading: data.heading });
        setActivities(data.activities);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { quizInfo, activities, loading, error };
};
