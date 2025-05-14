interface LabelProps {
  title: string;
  description: string;
}

export function Label({ title, description }: LabelProps) {
  return (
    <div className="mb-5 lg:mb-0">
      <h1 className="text-white text-xl font-bold">{title}</h1>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}