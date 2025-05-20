import type { Activity } from "../types/Quiz";
import { Button } from "./Button";

type HomeCardProps = {
  name: string;
  heading: string;
  activities: Activity[];
  handleStart: (activity_name: string) => void;
};

export const HomeCard = ({
  name,
  heading,
  activities,
  handleStart,
}: HomeCardProps) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 w-full max-w-md text-center">
      <p className="text-blue-600 text-sm font-semibold mb-1">🧠 CAE QUIZ</p>
      <h1 className="text-2xl font-black text-blue-600 mb-3">{name}</h1>
      <p className="text-gray-600 text-sm mb-6">{heading}</p>

      <div className="flex gap-4 justify-center">
        {activities.map((activity) => {
          return (
            <Button
              key={activity.order}
              label={activity.activity_name}
              onClick={() => handleStart(activity.activity_name)}
              variant="primary"
            />
          );
        })}
      </div>
    </div>
  );
};
