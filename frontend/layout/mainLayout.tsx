import Navbar from "../components/navigation/navbar"

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  )
}

export default MainLayout
