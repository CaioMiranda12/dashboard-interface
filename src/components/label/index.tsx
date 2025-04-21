export function Label({ name }: { name: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-white mb-2">{name}</label>
      <input
        className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
        type="text" />
    </div>
  )
}