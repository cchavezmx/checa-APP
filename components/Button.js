export default function Button({ children }) {
  return (
    <button className="flex items-center px-4 py-2 mt-2 text-gray-100 bg-gray-800 rounded-lg hover:bg-gray-700">
      {children}
    </button>
  );
}
