export default function CheckBox(props) {
  return (
    <div>
      <input
        onChange={props.onChange}
        type="checkbox"
        required={props.obrigatorio}
        className=""
      />
    </div>
  );
}
