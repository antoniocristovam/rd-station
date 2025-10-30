function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
