import { useState } from "react";
import Papa from "papaparse";

export default function useCSVParse() {
  let [data, setData] = useState(null);

  function parseFile(file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        setData(result.data);
      },
    });
  }

  return [data, parseFile];
}
