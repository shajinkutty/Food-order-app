import "./filter.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchProductAPI,
  fetchProductAPIByCategory,
} from "../../redux/productSlice";

const filters = [
  {
    id: 1,
    name: "all",
    displayName: "All",
  },
  {
    id: 2,
    name: "pizza",
    displayName: "Pizza",
  },
  {
    id: 3,
    name: "burgur",
    displayName: "Burgur",
  },
];

function Filter() {
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="filter-container">
        <ul>
          {filters.map((f) => (
            <li
              key={f.id}
              onClick={() => {
                setFilter(f.name);
                f.name === "all"
                  ? dispatch(fetchProductAPI())
                  : dispatch(fetchProductAPIByCategory(f.name));
              }}
              className={filter === f.name ? "selected" : ""}
            >
              {f.displayName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filter;
