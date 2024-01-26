import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import DataPage from "./DataPage";
import '../Styles/Main.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Loader from "./Loader";
const Main = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://fine-plum-horse-cape.cyclic.app/getData";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="Main">
            {isLoading ? <Loader /> : <>
                <SideBar />
                <Routes>
                    <Route path="/:id" element={<MyComponent data={data} />}>
                    </Route>
                </Routes>
            </>}

        </div>
    );
};

export default Main;

const MyComponent = ({ data }) => {
    return (
        <DataPage data={data} filter={useLocation().pathname.substring(1)} />
    )
}