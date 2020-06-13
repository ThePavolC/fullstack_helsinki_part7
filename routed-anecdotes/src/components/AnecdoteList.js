import React from "react";
import { Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes, voteHandler }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          <button onClick={() => voteHandler(anecdote.id)}>vote</button>
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
