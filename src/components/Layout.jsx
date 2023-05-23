import Papa from "papaparse";
import Table from "./Table";
import Form from "./Form";
import { useState } from "react";

export default function Layout() {
  let [file, setFile] = useState({ current: null, error: false });
  let [data, setData] = useState(null);

  const handleChange = (e) => {
    const fileType = e.target.files[0]?.type;

    if (fileType === "text/csv") {
      setFile({ error: false, current: e.target.files[0] });
    } else if (fileType) {
      setFile((prev) => {
        return { ...prev, error: true };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file.current) {
      Papa.parse(file.current, {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          setData(result.data);
        },
      });
    }
  };

  return (
    <main>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        hasError={file.error}
      />
      {data && <Table data={data} />}
    </main>
  );
}
