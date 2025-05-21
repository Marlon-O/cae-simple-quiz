type RoundCardProps = {
  activity_name: string;
  round_title: string;
};

export const RoundCard = ({ activity_name, round_title }: RoundCardProps) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 w-full md:min-w-md">
      <p className="text-blue-600 text-sm mb-8">{activity_name}</p>
      <h1 className="text-2xl font-black text-blue-600 mb-8">{round_title}</h1>
    </div>
  );
};
