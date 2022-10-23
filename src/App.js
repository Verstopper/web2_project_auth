import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Schedule from "./components/Schedule";

function App() {
  const { isLoading, error, isAuthenticated, user } = useAuth0();
  return (
    <>
      <h1>Welcome to 2.ŽRL Zapad</h1>
      {/* TODO insert table here */}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
        {isAuthenticated && <h1>Welcome {user?.name}</h1>}
          <LoginButton />
          <LogoutButton />
        </>
      )}
      <Schedule />
    </>
  );
}

export default App;
