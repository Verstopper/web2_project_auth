import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";

import '../crud_table_styling.css';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let comments = [
  {
    id: 1,
    title: "Primjer komentara",
    round: 4,
    description: "Ovo je tekst komentara",
    author: "bit ce uskoro",
    createdAt: "new Date()",
  },
  {
    id: 2,
    title: "Improve comment",
    round: 4,
    description: "Improve the comment!",
    author: "takoder ce biti uskoro",
    createdAt: "new Date()",
  },
];

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id" || data.field==="round") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = comments.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(comments);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (comment) => {
    count += 1;
    comments.push({
      ...comment,
      id: count,
    });
    return Promise.resolve(comment);
  },
  update: (data) => {
    const comment = comments.find((t) => t.id === data.id);
    comment.title = data.title;
    comment.round = data.round;
    comment.description = data.description;
    comment.author = data.author;
    comment.createdAt = data.createdAt;
    return Promise.resolve(comment);
  },
  delete: (data) => {
    const comment = comments.find((t) => t.id === data.id);
    comments = comments.filter((t) => t.id !== comment.id);
    return Promise.resolve(comment);
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

const Comments = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="comments"
      fetchItems={(payload) => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="title" label="Naslov" placeholder="Naslov" />
        <Field
          name="description"
          label="Sadržaj"
          render={DescriptionRenderer}
        />
        <Field name="round" label ="Kolo"></Field>
        <Field name="author" label="Autor"></Field>
        <Field name="createdAt" label="Vrijeme stvaranja"></Field>
      </Fields>
      <CreateForm
        title="Stvori novi komentar"
        message="Stvori novi komentar!"
        trigger="Stvori novi"
        onSubmit={(comment) => service.create(comment)}
        submitText="Stvori"
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Molim unesite naslov komentara";
          }
          if (!values.description) {
            errors.description = "Molim unesite sadržaj";
          }
          if (!values.round) {
            errors.description = "Molim unesite kolo za koje se veže komentar";
          }
          if (!values.description) {
            errors.description = "Please, provide comment's description";
          }

          return errors;
        }}
      />

      <UpdateForm
        title="comment Update Process"
        message="Update comment"
        trigger="Update"
        onSubmit={(comment) => service.update(comment)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.title) {
            errors.title = "Please, provide comment's title";
          }

          if (!values.description) {
            errors.description = "Please, provide comment's description";
          }

          return errors;
        }}
      />

      <DeleteForm
        title="comment Delete Process"
        message="Are you sure you want to delete the comment?"
        trigger="Delete"
        onSubmit={(comment) => service.delete(comment)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

Comments.propTypes = {};

export default Comments;