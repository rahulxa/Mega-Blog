import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index"
import { Outlet } from "react-router-dom";

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("fetching data")
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-midnightBlue">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
