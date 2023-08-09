export default function InputComponent(props) {
  const modifyPlaceholder = `${props.placeholder}`;

  return (
    <div>
      <input
        onChange={props.onChange}
        type={props.type}
        value={props.valor}
        required={props.obrigatorio}
        placeholder={modifyPlaceholder}
        className="text-black rounded-lg w-full border-solid border-2 border-slate-200 mb-3 py-3.5 px-4 "
      />
    </div>
  );
}
