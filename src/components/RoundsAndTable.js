import { useAuth0 } from "@auth0/auth0-react";
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
    round: 5,
    home: "Sloga",
    guest: "Omišalj",
    homeScore: 36,
    guestScore: 30,
    date: "23-10-2022",
  },
  {
    id: 2,
    round: 5,
    home: "Ivanić",
    guest: "Udarnik",
    homeScore: 29,
    guestScore: 29,
    date: "23-10-2022",
  },
  {
    id: 3,
    round: 5,
    home: "Murvica",
    guest: "Trešnjevka",
    homeScore: 33,
    guestScore: 21,
    date: "23-10-2022",
  },
  {
    id: 4,
    round: 5,
    home: "Liburnija-Opatija",
    guest: "Rudar",
    homeScore: 22,
    guestScore: 36,
    date: "23-10-2022",
  },
  {
    id: 5,
    round: 5,
    home: "Samobor",
    guest: "Senia",
    homeScore: 31,
    guestScore: 19,
    date: "23-10-2022",
  },
  {
    id: 6,
    round: 5,
    home: "Lokomotiva Zagreb 2",
    guest: "Š.R.Karlovac",
    homeScore: 32,
    guestScore: 30,
    date: "23-10-2022",
  },
  {
    id: 7,
    round: 4,
    home: "Senia",
    guest: "Sloga",
    homeScore: 17,
    guestScore: 20,
    date: "16-10-2022",
  },
  {
    id: 8,
    round: 4,
    home: "Rudar",
    guest: "Samobor",
    homeScore: 36,
    guestScore: 24,
    date: "16-10-2022",
  },
  {
    id: 9,
    round: 4,
    home: "Udarnik",
    guest: "Lokomotiva Zagreb 2",
    homeScore: 25,
    guestScore: 25,
    date: "16-10-2022",
  },
  {
    id: 10,
    round: 4,
    home: "Trešnjevka",
    guest: "Liburnija-Opatija",
    homeScore: 23,
    guestScore: 22,
    date: "15-10-2022",
  },
  {
    id: 11,
    round: 4,
    home: "Š.R.Karlovac",
    guest: "Murvica",
    homeScore: 31,
    guestScore: 33,
    date: "15-10-2022",
  },
  {
    id: 12,
    round: 4,
    home: "Omišalj",
    guest: "Ivanić",
    homeScore: 29,
    guestScore: 33,
    date: "15-10-2022",
  },
];

localStorage.setItem("initialData", JSON.stringify(initialData));

function getScoreForTeam(teamName) {
  let scores = 0;
  const homeMatchesForTeam = initialData.filter((team) => {
    return team.home === teamName;
  });

  const homePoints = homeMatchesForTeam.map((x) => [
    x.homeScore - x.guestScore,
  ]);
  //   console.log("HOME POINTS FOR", teamName, homePoints);

  const guestMatchesForTeam = initialData.filter((team) => {
    return team.guest === teamName;
  });

  const guestPoints = guestMatchesForTeam.map((x) => [
    x.guestScore - x.homeScore,
  ]);
  //   console.log("GUEST POINTS FOR", teamName, guestPoints);
  const overallPoints = homePoints.concat(guestPoints).flatMap((num) => num);
  for (var i = 0; i < overallPoints.length; i++) {
    if (overallPoints[i] > 0) {
      scores += 3;
    } else if (overallPoints[i] < 0) {
      scores += 0;
    } else {
      scores += 1;
    }
  }

  return scores;
}

function getGoalDiffForTeam(teamName) {
  const homeMatchesForTeam = initialData.filter((team) => {
    return team.home === teamName;
  });

  const homeGiven = homeMatchesForTeam.reduce((accumulator, object) => {
    return accumulator + object.homeScore;
  }, 0);

  const homeTaken = homeMatchesForTeam.reduce((accumulator, object) => {
    return accumulator + object.guestScore;
  }, 0);

  const guestMatchesForTeam = initialData.filter((team) => {
    return team.guest === teamName;
  });

  const guestGiven = guestMatchesForTeam.reduce((accumulator, object) => {
    return accumulator + object.guestScore;
  }, 0);

  const guestTaken = guestMatchesForTeam.reduce((accumulator, object) => {
    return accumulator + object.homeScore;
  }, 0);

  //   console.log("HOME UTAKMICE ZA TIM: ", teamName + "==> ", homeMatchesForTeam);
  //   console.log("GUEST UTAKMICE ZA TIM: ", teamName, "==> ", guestMatchesForTeam);

  return homeGiven + guestGiven - homeTaken - guestTaken;
}

let teamsWithScores = [
  {
    name: "Sloga",
    score: getScoreForTeam("Sloga"),
    goalDiff: getGoalDiffForTeam("Sloga"),
  },
  {
    name: "Omišalj",
    score: getScoreForTeam("Omišalj"),
    goalDiff: getGoalDiffForTeam("Omišalj"),
  },
  {
    name: "Ivanić",
    score: getScoreForTeam("Ivanić"),
    goalDiff: getGoalDiffForTeam("Ivanić"),
  },
  {
    name: "Udarnik",
    score: getScoreForTeam("Udarnik"),
    goalDiff: getGoalDiffForTeam("Udarnik"),
  },
  {
    name: "Lokomotiva Zagreb 2",
    score: getScoreForTeam("Lokomotiva Zagreb 2"),
    goalDiff: getGoalDiffForTeam("Lokomotiva Zagreb 2"),
  },
  {
    name: "Š.R.Karlovac",
    score: getScoreForTeam("Š.R.Karlovac"),
    goalDiff: getGoalDiffForTeam("Š.R.Karlovac"),
  },
  {
    name: "Trešnjevka",
    score: getScoreForTeam("Trešnjevka"),
    goalDiff: getGoalDiffForTeam("Trešnjevka"),
  },
  {
    name: "Senia",
    score: getScoreForTeam("Senia"),
    goalDiff: getGoalDiffForTeam("Senia"),
  },
  {
    name: "Samobor",
    score: getScoreForTeam("Samobor"),
    goalDiff: getGoalDiffForTeam("Samobor"),
  },
  {
    name: "Liburnija-Opatija",
    score: getScoreForTeam("Liburnija-Opatija"),
    goalDiff: getGoalDiffForTeam("Liburnija-Opatija"),
  },
  {
    name: "Murvica",
    score: getScoreForTeam("Murvica"),
    goalDiff: getGoalDiffForTeam("Murvica"),
  },
  {
    name: "Rudar",
    score: getScoreForTeam("Rudar"),
    goalDiff: getGoalDiffForTeam("Rudar"),
  },
];

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  // STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  // STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

//sorter for rounds
const getSorter1 = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.NUMBER_ASCENDING(mapper);

  if (data.field === "round") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }

  return sorter;
};

// const getSorter2 = (data) => {
//   // const mapper = (x) => x[data.field];
//   // let sorter = SORTERS.NUMBER_DESCENDING(mapper);

//   // if (data.field === "score") {
//   //   sorter =
//   //     data.direction === "descending"
//   //       ? SORTERS.NUMBER_ASCENDING(mapper)
//   //       : SORTERS.NUMBER_DESCENDING(mapper);
//   // }

//   // return sorter;
//   return data.sort(function (a, b) {
//     if(a.)
//   })
// };

let count = initialData.length;
const service1 = {
  fetchItems: (payload) => {
    let result = Array.from(initialData);
    result = result.sort(getSorter1(payload.sort));
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
    match.homeScore = data.homeScore;
    match.guestScore = data.guestScore;
    match.date = data.date;
    return Promise.resolve(match);
  },
  delete: (data) => {
    const match = initialData.find((t) => t.id === data.id);
    initialData = initialData.filter((t) => t.id !== match.id);
    return Promise.resolve(match);
  },
};

const service2 = {
  fetchItems: (payload) => {
    let result = Array.from(teamsWithScores).sort(function (a, b) {
      if (a.score === b.score) {
        return b.goalDiff - a.goalDiff;
      } else {
        return b.score - a.score;
      }
    });
    return Promise.resolve(result);
  },
};

const styles = { container: { margin: "auto", width: "fit-content" } };

const RoundsAndTables = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Tablica bodova"
        fetchItems={(payload) => service2.fetchItems(payload)}
      >
        <Fields>
          <Field sortable={false} name="name" label="Klub" placeholder="Klub" />
          <Field
            sortable={false}
            name="score"
            label="Bodovi"
            placeholder="Bodovi"
          />
          <Field
            sortable={false}
            name="goalDiff"
            label="Gol-Razlika"
            placeholder="Gol-razlika"
          />
        </Fields>
      </CRUDTable>
      <hr></hr>
      <CRUDTable
        caption="Odigrana kola"
        fetchItems={(payload) => service1.fetchItems(payload)}
      >
        <Fields>
          <Field name="round" label="Kolo" placeholder="Kolo" />
          <Field name="home" label="Domaći" placeholder="Domaći" />
          <Field
            name="homeScore"
            label="Domaći golovi"
            placeholder="Domaći golovi"
          />
          <Field
            name="guestScore"
            label="Gosti golovi"
            placeholder="Gosti golovi"
          />
          <Field name="guest" label="Gosti" placeholder="Gosti" />
          <Field name="date" label="Datum" placeholder="Datum" />
        </Fields>
        {isAuthenticated && user?.email === "adminko.admin@gmail.com" && (
          <CreateForm
            title="Dodaj novo odigrano kolo"
            message="Pazi na imena klubova! Datum unesi u obliku DD-MM-YYYY "
            trigger="Dodaj novo odigrano kolo"
            onSubmit={(match) => service1.create(match)}
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

        {isAuthenticated && user?.email === "adminko.admin@gmail.com" && (
          <UpdateForm
            title="Ažuriranje unosa"
            message="Ažuriraj unos"
            trigger="Ažuriraj"
            onSubmit={(match) => service1.update(match)}
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
          />
        )}

        {isAuthenticated && user?.email === "adminko.admin@gmail.com" && (
          <DeleteForm
            title="Brisanje unosa"
            message="Jeste li sigurni da želite izbrisati ovaj unos"
            trigger="Izbriši!"
            onSubmit={(match) => service1.delete(match)}
            submitText="Izbriši"
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

RoundsAndTables.propTypes = {};

export default RoundsAndTables;
