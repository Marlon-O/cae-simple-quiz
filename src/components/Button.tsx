type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};

export const Button = ({
  label,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  return (
    <button
      className={`rounded-lg px-4 py-2 font-bold transition-opacity duration-200 cursor-pointer ${
        variant === "primary"
          ? "text-white bg-blue-600 hover:opacity-80"
          : "text-blue-600 border border-blue-600 hover:bg-blue-50"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
