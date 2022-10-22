import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const { isLoading, error } = useAuth0();
  return (
    <>
      <h1>Welcome!</h1>
      {/* TODO insert table here */}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
        </>
      )}
    </>
  );
}

export default App;
