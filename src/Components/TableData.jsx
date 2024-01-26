import { useEffect, useState } from "react";

const TableData = ({ data, selectedFilter, filter }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        console.log(data);
        let result = data.filter((item) => {
            if (selectedFilter == "") return true;
            return item[filter] == selectedFilter;
        });
        if (selectedFilter == "") result = [];
        result.map(item => {
            delete item._id;
            delete item.url;
            delete item.title;
            delete item.published;
            delete item.added;
            delete item.source;
            delete item.insight;
        })
        setTableData([...result]);
    }, [data, selectedFilter, filter])
    return (
        <table>
            <thead>
                <tr>
                    {tableData && tableData.length > 0 ? Object.keys(tableData[0]).map((key, index) => {
                        return (
                            <th key={index}>{key}</th>
                        )
                    }) : null}
                </tr>
            </thead>
            <tbody>
                {tableData.map((item, index) => {
                    return (
                        <tr key={index}>
                            {Object.keys(item).map((key, index) => {
                                return (
                                    <td key={index}>{item[key]}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableData;