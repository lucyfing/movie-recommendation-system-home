import { useRoutes } from 'react-router-dom'
import routes from './router'
import DefaultLayout from './layouts'

function App() {
  const element = useRoutes(routes)
  return (
    <DefaultLayout element={element}></DefaultLayout>
  );
}

export default App;

