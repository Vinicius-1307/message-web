export default function Button({ color, children, onClick }) {
  return (
    <div>
      <button
        className={`${color} rounded-lg w-full py-3.5 px-4 text-white text-lg font-bold`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
