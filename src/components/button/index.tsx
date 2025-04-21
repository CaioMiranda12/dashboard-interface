export function Button({ children }: { children: string }) {
  return (
    <button className="text-sm text-[#04141C] font-semibold p-2 rounded-lg bg-emerald-400 cursor-pointer hover:bg-emerald-500 transition-all duration-300">
      {children}
    </button>
  )
}