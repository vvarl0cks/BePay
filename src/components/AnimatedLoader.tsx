export function AnimatedLoader() {
  return (
    <div className="flex space-x-2 p-4">
      <div className="w-6 h-6 bg-primary rounded-full animate-bounce [animation-delay:-0.3s] shadow-lg"></div>
      <div className="w-6 h-6 bg-accent rounded-full animate-bounce [animation-delay:-0.15s] shadow-lg"></div>
      <div className="w-6 h-6 bg-secondary rounded-full animate-bounce shadow-lg"></div>
    </div>
  );
}
