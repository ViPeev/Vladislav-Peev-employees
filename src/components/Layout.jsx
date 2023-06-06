import Table from "./Table";
import Form from "./Form";
import useCSVParse from "../hooks";
import { useState } from "react";

export default function Layout() {
  let [file, setFile] = useState({ current: null, error: false });
  let [data, setData] = useCSVParse();
  let [check, setCheck] = useState(false);

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

  const handleCheck = (e) => {
    setCheck((current) => !current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file.current) {
      setData(file.current);
    }
  };

  return (
    <main>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        hasError={file.error}
        isChecked={check}
        handleCheck={handleCheck}
      />
      {data && <Table data={data} isChecked={check} />}
    </main>
  );
}
