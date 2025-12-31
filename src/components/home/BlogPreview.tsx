export default function BlogPreview() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-neutral-100">
      <p className="text-neutral-500 font-medium">Didn't find what you were looking for?</p>
      <button className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-200 text-sm font-bold hover:bg-neutral-50 transition-all">
        View all articles
        <span className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-[10px]">→</span>
      </button>
    </section>
  );
}  