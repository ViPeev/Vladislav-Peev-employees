import { compute } from "../utils";

export default function Table({ data, isChecked }) {
  let [pair, { projects, total }] = compute(data,isChecked);

  let [employee1, employee2] = pair.split("-");

  return employee1 !== "None" ? (
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
        {Object.values(projects).map(([k, v], index) => {
          console.log(k, v);
          return (
            <TableRow
              key={k}
              emp1={employee1}
              emp2={employee2}
              projId={k}
              days={v}
              index={index}
              rowSpan={projects.length}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={"2"}>Total Days Together</td>
          <td colSpan={"2"}>{total}</td>
        </tr>
      </tfoot>
    </table>
  ) : (
    <h2>
      It looks like there isn't a pair of employees that worked together at the
      same project and at the same time.
    </h2>
  );
}

function TableRow({ emp1, emp2, projId, days, index, rowSpan}) {
  return (
    <tr>
      {index === 0 && (
        <>
          <td rowSpan={rowSpan}>{emp1}</td>
          <td rowSpan={rowSpan}>{emp2}</td>
        </>
      )}
      <td>{projId}</td>
      <td>{days}</td>
    </tr>
  );
}
