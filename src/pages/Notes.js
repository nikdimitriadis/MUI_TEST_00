import React from "react";
import { useEffect, useState } from "react";

import { Container } from "@material-ui/core";
import Masonry from "react-masonry-css";

import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNotes(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const deleteHandler = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((item) => item.id !== id);
    setNotes(newNotes);
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes?.map((note) => (
          <div key={note?.id}>
            <NoteCard note={note} deleteHandler={deleteHandler} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
