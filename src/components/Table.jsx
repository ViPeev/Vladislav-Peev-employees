import { compute } from "../utils";

export default function Table({ data }) {
  let [pair, projects] = compute(data);
  
  let [employee1, employee2] = pair.split("-");
  let totalDays = Object.values(projects).reduce((a, b) => a + b.period, 0);

  return (
    <table>
      <caption>Colleagues with the most time worked together</caption>
      <thead>
        <tr>
          <th>Employee 1 ID</th>
          <th>Employee 2 ID</th>
          <th>Project ID</th>
          <th>Common Days on Project </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(projects).map(([k, v]) => {
          return (
            <TableRow
              key={k}
              emp1={employee1}
              emp2={employee2}
              projId={k}
              days={v.period}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={"2"}>Total Days Together</td>
          <td colSpan={"2"}>{totalDays}</td>
        </tr>
      </tfoot>
    </table>
  );
}

function TableRow({ emp1, emp2, projId, days }) {
  return (
    <tr>
      <td>{emp1}</td>
      <td>{emp2}</td>
      <td>{projId}</td>
      <td>{days}</td>
    </tr>
  );
}
