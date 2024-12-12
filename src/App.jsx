
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/routes"
import { ConfirmProvider } from "material-ui-confirm";


function App() {
 

  return (
    <><ConfirmProvider defaultOptions={{
      confirmationButtonProps: { autoFocus: true },
    }}>
      <RouterProvider router={router} /></ConfirmProvider>
    </>
  )
}

export default App
