export default function ErrorText({
  location,
  errors,
}: {
  location: string;
  errors: { location: string; msg: string }[];
}) {
  const error = errors.find((error) => error.location === location);

  return error ? (
    <p className="text-[#fa5f5f] text-sm text-start self-start mb-2">
      {error.msg}
    </p>
  ) : null;
}
