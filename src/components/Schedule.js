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

let initialData = [
  {
    id: 1,
    round: 6,
    home: "Omišalj",
    guest: "Udarnik",
    date: "29-10-2022",
  },
  {
    id: 2,
    round: 6,
    home: "Š.R.Karlovac",
    guest: "Ivanić",
    date: "29-10-2022",
  },
  {
    id: 3,
    round: 6,
    home: "Trešnjevka",
    guest: "Lokomotiva Zagreb 2",
    date: "29-10-2022",
  },
  {
    id: 4,
    round: 6,
    home: "Rudar",
    guest: "Murvica",
    date: "29-10-2022",
  },
  {
    id: 5,
    round: 6,
    home: "Senia",
    guest: "Liburnija-Opatija",
    date: "29-10-2022",
  },
  {
    id: 6,
    round: 7,
    home: "Liburnija-Opatija",
    guest: "Sloga",
    date: "05-11-2022",
  },
  {
    id: 7,
    round: 7,
    home: "Lokomotiva Zagreb 2",
    guest: "Rudar",
    date: "05-11-2022",
  },
  {
    id: 8,
    round: 7,
    home: "Ivanić",
    guest: "Trešnjevka",
    date: "05-11-2022",
  },
];

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  // STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  // STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.NUMBER_ASCENDING(mapper);

  if (data.field === "round") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
    // } else if (data.field === "date") {
    //   sorter =
    //     data.direction === "ascending"
    //       ? SORTERS.STRING_ASCENDING(mapper)
    //       : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = initialData.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(initialData);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (match) => {
    count += 1;
    initialData.push({
      ...match,
      id: count,
    });
    return Promise.resolve(match);
  },
  update: (data) => {
    const match = initialData.find((t) => t.id === data.id);
    match.round = data.round;
    match.home = data.home;
    match.guest = data.guest;
    match.date = data.date;
    return Promise.resolve(match);
  },
  delete: (data) => {
    const match = initialData.find((t) => t.id === data.id);
    initialData = initialData.filter((t) => t.id !== match.id);
    return Promise.resolve(match);
  },
};

const styles = { container: { margin: "auto", width: "fit-content" } };

const Schedule = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="RASPORED UTAKMICA"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="round" label="Kolo" placeholder="Kolo" />
          <Field name="home" label="Domaći" placeholder="Domaći" />
          <Field name="guest" label="Gosti" placeholder="Gosti" />
          <Field name="date" label="Datum" placeholder="Datum" />
        </Fields>
        {(isAuthenticated && user?.email==="adminko.admin@gmail.com") && (
          <CreateForm
            title="Dodaj novu utakmicu u raspored"
            message="Stvori novu utakmicu u rasporedu!"
            trigger="Stvori novi unos"
            onSubmit={(match) => service.create(match)}
            submitText="Stvori"
            validate={(values) => {
              const errors = {};
              if (!values.guest) {
                errors.title = "Unesite goste!";
              }
              if (!values.home) {
                errors.description = "Unesite domaće";
              }
              if (!values.date) {
                errors.description = "Unesite datum!";
              }
              if (!values.round) {
                errors.description = "Unesite kolo!";
              }

              return errors;
            }}
          />
        )}

        {(isAuthenticated && user?.email==="adminko.admin@gmail.com") && <UpdateForm
          title="Ažuriranje unosa"
          message="Ažuriraj unos"
          trigger="Ažuriraj"
          onSubmit={(match) => service.update(match)}
          submitText="Ažuriraj!"
          validate={(values) => {
            const errors = {};
            if (!values.guest) {
              errors.title = "Unesite goste!";
            }
            if (!values.home) {
              errors.description = "Unesite domaće";
            }
            if (!values.date) {
              errors.description = "Unesite datum!";
            }
            if (!values.round) {
              errors.description = "Unesite kolo!";
            }

            return errors;
          }}
        />}

        {(isAuthenticated && user?.email==="adminko.admin@gmail.com") && <DeleteForm
          title="Brisanje unosa"
          message="Jeste li sigurni da želite izbrisati ovaj unos"
          trigger="Izbriši!"
          onSubmit={(match) => service.delete(match)}
          submitText="Izbriši"
          validate={(values) => {
            const errors = {};
            if (!values.id) {
              errors.id = "Please, provide id";
            }
            return errors;
          }}
        />}
      </CRUDTable>
    </div>
  );
};

Schedule.propTypes = {};

export default Schedule;
