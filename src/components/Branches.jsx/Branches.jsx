import "./branches.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderType } from "../../redux/userSlice";
import { FaRegBuilding } from "react-icons/fa";
import Button from "../FormInputs/Button";

const branches = [
  {
    id: 1,
    title: "Neyyattinkara",
    location: "Near Akshaya complex",
    city: "Neyyattinkara",
    district: "Trivandrum",
  },
  {
    id: 2,
    title: "Balaramapuram",
    location: "Near Govt.HSS School",
    city: "Balaramapuram",
    district: "Trivandrum",
  },
];

export default function Branches({ handleSelect }) {
  const [branchId, setBranchId] = useState(null);
  const dispatch = useDispatch();

  const selectHandler = (id) => {
    setBranchId(id);
    dispatch(updateOrderType(branches.find((b) => b.id === id)));
  };
  return (
    <div className="section">
      <div className="branches">
        {branches.map((branch) => (
          <motion.div
            className={branchId === branch.id ? "branch selected" : "branch"}
            key={branch.id}
            onClick={() => selectHandler(branch.id)}
          >
            <FaRegBuilding size={40} />
            <h3>{branch.title}</h3>
            <p>{branch.location}</p>
            <p>
              {branch.city}, {branch.district}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="footer">
        <Button name="Select" onClick={handleSelect} />
      </div>
    </div>
  );
}
