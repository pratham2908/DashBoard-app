import { useRef, useEffect, useState } from 'react';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import TableData from './TableData';
const DataPage = ({ data, filter }) => {
    const [finalData, setFinalData] = useState({});
    const [chartType, setChartType] = useState("bar");
    const [selectedFilter, setSelectedFilter] = useState("");
    const selectedData = useRef("");
    useEffect(() => {
        setSelectedFilter("");
        selectedData.current = "";
        setChartType("bar");
        const dataCounts = data.reduce((acc, item) => {
            acc[item[filter]] = (acc[item[filter]] || 0) + 1;
            return acc;
        }, {});
        const result = {};
        for (let key in dataCounts) {
            if (key === "") {
                continue;
            } else if (dataCounts[key] < 10) {
                result["other"] = (result["other"] || 0) + dataCounts[key];
            } else {
                result[key] = dataCounts[key];
            }
        }

        setFinalData(result);

    }, [data, filter]);

    function handleSelect(e) {
        setChartType(e.target.value);
        selectedData.current = "";
        setSelectedFilter("");
    }

    function changeSelectedFilter(value, count) {
        selectedData.current = value.charAt(0).toUpperCase() + value.slice(1) + ": " + count + " (" + Math.round(count / data.length * 100 * 100) / 100 + "%)";
        setSelectedFilter(value.toLowerCase());
    }

    return (
        <div className="data-page">
            <div className="data-control">
                <h1>{filter.charAt(0).toUpperCase() + filter.slice(1)}</h1>
                <select onChange={(e) => handleSelect(e)}>
                    <option value="bar">Bar Chart</option>
                    <option value="pie">Pie Chart</option>
                </select>
            </div>
            <div id="info">Choose any bar or slice to get detailed data</div>
            {selectedData.current != "" ? <div id="selected-data">{selectedData.current}</div> : null}
            {chartType === "bar" ? <BarChart data={finalData} changeFilter={changeSelectedFilter} /> : <PieChart data={finalData} changeFilter={changeSelectedFilter} />}
            <TableData data={data} selectedFilter={selectedFilter} filter={filter} />
        </div>
    )
}

export default DataPage;