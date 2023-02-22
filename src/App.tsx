import { useRoutes } from 'react-router-dom'
import routes from './router'
import './App.less'
import DefaultLayout from './layouts'

function App() {
  const element = useRoutes(routes)
  return (
    // <div className='app-container'>
    //   <PageHeader/>
    //   <div className='app-container-main'>
    //     {element}
    //   </div>
    // </div>
    <DefaultLayout element={element}></DefaultLayout>
  );
}

export default App;

