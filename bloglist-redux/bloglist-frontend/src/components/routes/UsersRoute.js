import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersRoute = ({ users }) => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const tempSummary = {};
    for (var user of users) {
      tempSummary[user.name] = { count: user.blogs.length, id: user.id };
    }
    setSummary(tempSummary);
  }, [users]);

  const tableBodyContent = Object.entries(summary).map((row) => {
    const [name, stat] = row;
    return (
      <tr key={stat.id}>
        <td>
          <Link to={`/users/${stat.id}`}>{name}</Link>
        </td>
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
