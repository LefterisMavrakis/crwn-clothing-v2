import { Outlet } from "react-router-dom"
import { Fragment } from "react"
import NavigationBar from "../../../../components/navigation/navigation-bar.component"
const MainLayout = () => {
    return (
      <Fragment>
       <NavigationBar/>
        <Outlet />
      </Fragment>
    )
  }

  export default MainLayout