const tableiser = function (lines: string[]): string {
  // make it a JSON object w/ headers as keys
  const table: Record<string, string[]> = {};
  const headers = lines[0].split(';');
  for (let i = 0; i < headers.length; i++) {
    const col = headers[i];
    table[col] = [];
    for (let o = 1; o < lines.length; o++) {
      const row = lines[o];
      table[col].push(row.split(';')[i] ? row.split(';')[i] : '');
    }
  }

  // define column sizes
  const sizes = [];
  for (let i = 0; i < Object.keys(table).length; i++) {
    let highestNum = 0;
    const strings = [Object.keys(table)[i], ...Object.values(table)[i]];
    for (let o = 0; o < strings.length; o++) {
      const string = strings[o];
      if (string.length > highestNum) highestNum = string.length;
    }
    sizes.push(highestNum);
  }

  // sexy ascii table time
  const result: string[] = [];
  const header = [];
  const headerLine = [];
  for (let i = 0; i < Object.keys(table).length; i++) {
    const elem = Object.keys(table)[i];
    header.push(elem.padEnd(sizes[i]));
    headerLine.push(''.padEnd(sizes[i], '-'));
  }
  result.push(header.join('| '));
  result.push(headerLine.join('+-'));

  for (let i = 1; i < lines.length; i++) {
    const strings = lines[i].split(';');
    const row = [];
    for (let o = 0; o < strings.length; o++) {
      const elem = strings[o];
      row.push(elem.padEnd(sizes[o]));
    }
    result.push(row.join('| '));
  }
  return result.join('\n');
};
console.log(
  tableiser(
    `Name;Street;City;Age;Banana
Peter Pan;Am Hang 5;12345 Einsam;42;
Maria Schmitz;Kölner Straße 45;50123 Köln;43;yes
Paul Meier;Münchener Weg 1;87654 München;;no`.split('\n')
  )
);
