export function compute(data) {
  const employees = data.sort(
    (e1, e2) => parseInt(e1.projectID) - parseInt(e2.projectID)
  );
  const pairs = {};

  for (let i = 0; i < employees.length; i++) {
    for (let j = i + 1; j < employees.length; j++) {
      const current = employees[i];
      const next = employees[j];
      const commonDays = calcTime(current, next);

      if (
        current.employeeID !== next.employeeID &&
        current.projectID === next.projectID &&
        commonDays
      ) {
        let id = `${current.employeeID}-${next.employeeID}`;
        let reverseId = id.split("-").reverse().join("-");
        if (pairs[id]) {
          pairs[id][current.projectID] = {
            period: commonDays,
          };
        } else if (pairs[reverseId]) {
          pairs[reverseId][current.projectID] = {
            period: commonDays,
          };
        } else {
          pairs[id] = {
            [current.projectID]: { period: commonDays },
          };
        }
      }
    }
  }

  let sorted = Object.entries(pairs).sort((a, b) => {
    return calcDaysForPair(b[1]) - calcDaysForPair(a[1]);
  });
  return sorted[0];
}

function calcTime(emp1, emp2) {
  const dateFrom1 = new Date(emp1.dateFrom);
  const dateTo1 = emp1.dateTo === "NULL" ? new Date() : new Date(emp1.dateTo);
  const dateFrom2 = new Date(emp2.dateFrom);
  const dateTo2 = emp2.dateTo === "NULL" ? new Date() : new Date(emp2.dateTo);

  if (dateFrom1 > dateTo2 || dateTo1 < dateFrom2) {
    return false;
  }

  const start = dateFrom1 < dateFrom2 ? dateFrom2 : dateFrom1;
  const end = dateTo1 < dateTo2 ? dateTo1 : dateTo2;
  const commonDays = (end - start) / (1000 * 60 * 60 * 24) + 1;
  return commonDays;
}

function calcDaysForPair(projects) {
  return Object.values(projects).reduce((a, b) => a + b.period, 0);
}
