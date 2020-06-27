import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllUsers } from "../../reducers/usersReducer";

const UsersRoute = () => {
  const dispatch = useDispatch();
  const [summary, setSummary] = useState({});
  const users = useSelector(({ users }) => users);

  useEffect(() => {
    const tempSummary = {};
    for (var user of users) {
      tempSummary[user.name] = { count: user.blogs.length, idx: user.id };
    }
    setSummary(tempSummary);
  }, [users]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const tableBodyContent = Object.entries(summary).map((row) => {
    const [name, stat] = row;
    return (
      <tr key={stat.idx}>
        <td>{name}</td>
        <td>{stat.count}</td>
      </tr>
    );
  });

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead style={{ fontWeight: "bold" }}>
          <tr>
            <td>name</td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>{tableBodyContent}</tbody>
      </table>
    </>
  );
};
export default UsersRoute;
