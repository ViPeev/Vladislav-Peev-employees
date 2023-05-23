export default function Form({ handleChange, handleSubmit, hasError }) {
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
      <input type="submit" value="Submit" />
      {hasError && <p>File type not supported!</p>}
    </form>
  );
}
