import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TVSeries from "./pages/TVSeries";
import { filteredAllGenres } from "./genres";
import Genre from "./pages/Genre";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVSeries />} />
          {filteredAllGenres.map((genre) => (
            <Route
              path={`/${genre.toLowerCase}`}
              element={<Genre genre={genre} />}
            />
          ))}
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
