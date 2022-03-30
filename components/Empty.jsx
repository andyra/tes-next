export default function Empty({ children }) {
  return (
    <div className="p-16 bg-slate-100 dark:bg-white/10 rounded-lg text-slate-500 dark:text-white/50 text-center">
      {children}
    </div>
  );
}
