export function compute(data, isChecked) {
  const employees = data.sort(
    (e1, e2) => parseInt(e1.employeeID) - parseInt(e2.employeeID)
  );

  const pairs = {};

  for (let i = 0; i < employees.length; i++) {
    for (let j = i + 1; j < employees.length; j++) {
      const current = employees[i];
      const next = employees[j];

      if (
        current.projectID === next.projectID &&
        current.employeeID !== next.employeeID
      ) {
        const dates = extractDates(current, next);
        const isCommon = isPeriodCommon(dates);

        if (isCommon) {
          const id = `${current.employeeID}-${next.employeeID}`;
          const commonDays = calcTime(dates, isChecked);

          if (pairs[id]) {
            pairs[id].total += commonDays;
            pairs[id].projects.push([current.projectID, commonDays]);
          } else {
            pairs[id] = {
              total: commonDays,
              projects: [[current.projectID, commonDays]],
            };
          }
        }
      }
    }
  }

  const sorted = Object.entries(pairs).sort((a, b) => {
    return b.total - a.total;
  });

  return sorted[0] || ["None-None", {}];
}

function calcTime({ dateFrom1, dateTo1, dateFrom2, dateTo2 }, isChecked) {
  const lastDay = isChecked ? 1 : 0;
  const start = dateFrom1 < dateFrom2 ? dateFrom2 : dateFrom1;
  const end = dateTo1 < dateTo2 ? dateTo1 : dateTo2;
  const commonDays = (end - start) / (1000 * 60 * 60 * 24) + lastDay;

  return commonDays;
}

function extractDates(emp1, emp2) {
  const dateFrom1 = new Date(emp1.dateFrom);
  const dateTo1 = emp1.dateTo === "NULL" ? new Date() : new Date(emp1.dateTo);
  const dateFrom2 = new Date(emp2.dateFrom);
  const dateTo2 = emp2.dateTo === "NULL" ? new Date() : new Date(emp2.dateTo);

  return { dateFrom1, dateTo1, dateFrom2, dateTo2 };
}

function isPeriodCommon({ dateFrom1, dateTo1, dateFrom2, dateTo2 }) {
  return dateFrom1 < dateTo2 && dateTo1 > dateFrom2;
}

///die antwort ist sieben
