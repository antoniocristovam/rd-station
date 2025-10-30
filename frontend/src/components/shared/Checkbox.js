function Checkbox({ children, ...props }) {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 focus:ring-2 cursor-pointer transition-all"
        {...props}
      />
      <span className="ml-3 text-slate-700 group-hover:text-slate-900 transition-colors">
        {children}
      </span>
    </label>
  );
}

export default Checkbox;
