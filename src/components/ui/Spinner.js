// Spinner.jsx
// Indicateur de chargement animé.
//
// Props :
//   size : "sm" | "md" | "lg"

const SIZE_CLASSES = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-3",
};

export default function Spinner({ size = "md" }) {
  return (
    <div
      className={`
        ${SIZE_CLASSES[size]}
        rounded-full border-breezy-border border-t-breezy-dark
        animate-spin
      `}
      role="status"
      aria-label="Chargement..."
    />
  );
}
