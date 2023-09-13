// Mean calculation - START
export const mean = (meanDataArr) => {
  const sum = meanDataArr.reduce((a, b) => a + b, 0);
  const meanResult = sum / meanDataArr.length || 0;
  return meanResult.toFixed(3);
};
// Mean calculation - END

// Median calculation - START
export const median = (meanDataArr) => {
  const mid = Math.floor(meanDataArr.length / 2);
  const sortedArr = meanDataArr.sort((a, b) => a - b);

  //NOTE : if length of array  is even  then return middle value-1 else return middle value.
  return (
    meanDataArr.length % 2 === 0
      ? (sortedArr[mid - 1] + sortedArr[mid]) / 2
      : sortedArr[mid]
  ).toFixed(3);
};
// Median calculation - END

// Mode calculation - START
export const mode = (meanDataArr) => {
  //It traverse trough all element and maintains a count of repititive element and return highest repetitive value.
  return Object.values(
    meanDataArr.reduce((count, e) => {
      if (!(e in count)) {
        count[e] = [0, e];
      }
      count[e][0]++;
      return count;
    }, {})
  )
    .reduce(
      (meanDataArr, v) => (v[0] < meanDataArr[0] ? meanDataArr : v),
      [0, null]
    )[1]
    .toFixed(3);
};
// Mode calculation - END
