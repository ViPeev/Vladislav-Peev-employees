export default function Form({
  handleChange,
  handleSubmit,
  hasError,
  handleCheck,
  isChecked,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fileUpload">Upload File</label>
      <input
        type="file"
        id="fileUpload"
        name="fileUpload"
        accept=".csv"
        onChange={handleChange}
      />
      <label htmlFor="lastDay">Include last day</label>
      <input
        type="checkbox"
        name="lastDay"
        id="lastDay"
        value={isChecked}
        onChange={handleCheck}
      />
      <input type="submit" value="Submit" />
      {hasError && <p>File type not supported!</p>}
    </form>
  );
}
