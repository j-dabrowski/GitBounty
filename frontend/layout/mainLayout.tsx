import Navbar from "../components/navigation/navbar"

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default MainLayout
