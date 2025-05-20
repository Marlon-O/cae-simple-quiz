import { Button } from "./Button";

type ResultItem = {
  question: string;
  result: "CORRECT" | "FALSE";
};

type ResultGroup = {
  round: string;
  questions: ResultItem[];
};

type ResultCardProps = {
  title: string;
  results: ResultGroup[];
  onHome: () => void;
};

export const ResultCard = ({ title, results, onHome }: ResultCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full max-w-md text-center min-w-xs">
      <h2 className="text-blue-600 font-bold text-sm mb-1">{title}</h2>
      <h1 className="text-2xl font-black text-blue-600 mb-4">Results</h1>

      {results.map((item, i) => (
        <div key={i} className="mb-4">
          {results.length > 1 && (
            <h3 className="font-semibold text-left text-blue-500 mb-2">
              {item.round}
            </h3>
          )}
          <ul>
            {item.questions.map((q, idx) => (
              <li
                key={idx}
                className="flex justify-between border-t py-2 text-sm"
              >
                <span>Q{idx + 1}</span>
                <span
                  className={
                    q.result === "CORRECT"
                      ? "text-green-600 font-bold"
                      : "text-red-500 font-bold"
                  }
                >
                  {q.result}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Button label="HOME" onClick={onHome} variant="secondary" />
    </div>
  );
};
