import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
      <TableRow key={stat.id}>
        <TableCell>
          <Link to={`/users/${stat.id}`}>{name}</Link>
        </TableCell>
        <TableCell>{stat.count}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <Typography variant="h6">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ fontWeight: "bold" }}>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBodyContent}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default UsersRoute;
