import { useEffect } from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
    useEffect(() => {
        const links = document.querySelectorAll(".sidebar ul li a");
        links.forEach((link) => {
            link.addEventListener("click", () => {
                links.forEach((link) => link.parentElement.classList.remove("active"));
                link.parentElement.classList.add("active");
            }
            );
        })
    }, []);
    return (
        <div className="sidebar">
            <ul>
                <li className="active">
                    <Link to="/topic">Topic</Link>
                </li>
                <li>
                    <Link to="/sector">Sector</Link>
                </li>
                <li>
                    <Link to="/country">Country</Link>
                </li>
                <li>
                    <Link to="/intensity">Intensity</Link>
                </li>
                <li>
                    <Link to="/region">Region</Link>
                </li>
                <li>
                    <Link to="/relevance">Relevance</Link>
                </li>
                <li>
                    <Link to="/source">Source</Link>
                </li>
                {/* <li>
                    <Link to="/start-year">Start Year</Link>
                </li>
                <li>
                    <Link to="/end-year">End Year</Link>
                </li> */}
            </ul>
        </div>
    );
};

export default SideBar;