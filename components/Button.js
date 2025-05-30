export default function Tbutton({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xs shadow transition-all duration-200"
    >
      {text}
    </button>
  );
}
