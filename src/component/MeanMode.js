import { data } from "../utils/data";
import { mean, median, mode } from "../utils/utils";

const MeanMode = () => {
  // Generate Table for showing mean,median and mode - START
  const tableGenerator = (finalResult, typeofFilter) => {
    let tr = "";
    tr = tr + "<th style='border: 1px solid black'>" + "Measure" + "</th>";
    finalResult.mean.map((column, index) => {
      tr =
        tr +
        "<th style='border: 1px solid black'>" +
        " Class " +
        (index + 1) +
        "</th>";
    });

    for (const [key, value] of Object.entries(finalResult)) {
      tr = tr + "<tr style='border: 1px solid black'>";

      tr =
        tr +
        "<th style='border: 1px solid black'>" +
        typeofFilter +
        " " +
        key +
        "</th>";
      const withTax = value.map((column) => {
        tr = tr + "<th style='border: 1px solid black'>" + column + "</th>";
      });

      tr = tr + "</tr>";
    }
    // NOTE : Here you can return jsx, for now i just return plain table as a string and then loaded this string with dynmic HTML.
    return (
      "<table style='border-collapse: collapse;border-spacing: 0;width: 70%;border: 1px solid #ddd;'>" +
      tr +
      "</table>"
    );
  };

  // Generate Table for showing mean,median and mode - END

  // Processing entire data set,mapping that data set to calculate mean,median and mode. - START
  function processData(typeofFilter) {
    let tempData = data.map((obj) => ({
      ...obj,
      Gamma: (obj.Ash * obj.Hue) / obj.Magnesium, // Adding Gamma property based on the formula
    }));

    //Grouping dataset based on class alcohol and mapping Flavanoids and Gamma respectively.
    let tempResult = tempData.reduce(function (r, a) {
      r[a.Alcohol] = r[a.Alcohol] || [];
      r[a.Alcohol].push(a[typeofFilter]);
      return r;
    }, {});

    let tempFinalResult = { mean: [], mode: [], median: [] };
    //This will prepare mean,median and mode for Flavanoids and Gamma respectively.
    for (const property in tempResult) {
      tempFinalResult.mean.push(mean(tempResult[property]));
      tempFinalResult.median.push(median(tempResult[property]));
      tempFinalResult.mode.push(mode(tempResult[property]));
    }
    return tableGenerator(tempFinalResult, typeofFilter);
  }

  // Processing entire data set,mapping that data set to calculate mean,median and mode. - START

  return (
    <div>
      <center>
        <h1> Data Visualization</h1>
      </center>

      <div style={{ marginLeft: "5px", marginRight: "5px" }}>
        <div
          style={{ float: "left", width: "50%", padding: "5px" }}
          dangerouslySetInnerHTML={{ __html: processData("Flavanoids") }}
        ></div>
        <div
          style={{ float: "left", width: "48%", padding: "5px" }}
          dangerouslySetInnerHTML={{ __html: processData("Gamma") }}
        ></div>
      </div>
    </div>
  );
};

export default MeanMode;
