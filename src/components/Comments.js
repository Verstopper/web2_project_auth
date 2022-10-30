import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";

import "../crud_table_styling.css";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let comments = [
  {
    id: 1,
    title: "Primjer komentara",
    round: 4,
    description: "Ovo je tekst komentara",
    author: "adminko.admin@gmail.com",
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 2,
    title: "Improve comment",
    round: 4,
    description: "Improve the comment!",
    author: "adminko.admin@gmail.com",
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 3,
    title: "User1 komentar",
    round: 4,
    description: "Ovo je tekst komentara",
    author: "user1@gmail.com",
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 4,
    title: "User2 komentar",
    round: 4,
    description: "Ovo je tekst komentara",
    author: "user2@gmail.com",
    createdAt: new Date().toLocaleString(),
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

  if (data.field === "id" || data.field === "round") {
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
  create: (comment, email) => {
    count += 1;
    comments.push({
      ...comment,
      id: count,
      createdAt: new Date().toLocaleString(),
      author: email,
    });
    return Promise.resolve(comment);
  },
  update: (data, email) => {
    const comment = comments.find((t) => t.id === data.id);
    if (comment.author === email) {
      comment.title = data.title;
      comment.round = data.round;
      comment.description = data.description;
      return Promise.resolve(comment);
    } else {
      return Promise.reject(
        new Error("Nije moguće ažurirati komentar kojem niste autor")
      );
    }
  },
  delete: (data, email) => {
    const comment = comments.find((t) => t.id === data.id);
    if (comment.author === email) {
      comments = comments.filter((t) => t.id !== comment.id);
      return Promise.resolve(comment);
    } else {
      return Promise.reject(new Error("Nije moguće obrisati komentar"));
    }
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

const Comments = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Komentari"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field
            sortable={false}
            name="id"
            label="Id"
            hideInCreateForm
            hideInUpdateForm
          />
          <Field
            sortable={false}
            name="title"
            label="Naslov"
            placeholder="Naslov"
          />
          <Field
            sortable={false}
            name="description"
            label="Sadržaj"
            render={DescriptionRenderer}
          />
          <Field sortable={false} name="round" label="Kolo"></Field>
          <Field
            sortable={false}
            name="author"
            label="Autor"
            hideInCreateForm
            hideInUpdateForm
          ></Field>
          <Field
            sortable={false}
            name="createdAt"
            label="Vrijeme stvaranja"
            hideInCreateForm
            hideInUpdateForm
          ></Field>
        </Fields>
        {isAuthenticated && (
          <CreateForm
            title="Stvori novi komentar"
            message="Stvori novi komentar!"
            trigger="Stvori novi"
            onSubmit={(comment) => service.create(comment, user?.email)}
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
                errors.description =
                  "Molim unesite kolo za koje se veže komentar";
              }
              if (!values.description) {
                errors.description = "Please, provide comment's description";
              }

              return errors;
            }}
          />
        )}

        {isAuthenticated && (
          <UpdateForm
            title="comment Update Process"
            message="Update comment"
            trigger="Update"
            onSubmit={(comment) => service.update(comment, user?.email)}
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
        )}

        {isAuthenticated && (
          <DeleteForm
            title="comment Delete Process"
            message="Are you sure you want to delete the comment?"
            trigger="Delete"
            onSubmit={(comment) => service.delete(comment, user?.email)}
            submitText="Delete"
            validate={(values) => {
              const errors = {};
              if (!values.id) {
                errors.id = "Please, provide id";
              }
              return errors;
            }}
          />
        )}
      </CRUDTable>
    </div>
  );
};

Comments.propTypes = {};

export default Comments;
