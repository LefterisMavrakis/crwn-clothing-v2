import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import MainLayout from './routes/home/layouts/main-layout/main-layout.component';
import Authentication from './routes/sign-in/authentication.component';



const Shop = () => {
  return (
    <div>
      I am the Shop Page
    </div>
  )
}

const App = () => {
  return (

    <Routes>
      <Route path='/' element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop/>} />
        <Route path='auth' element={<Authentication/>} />
      </Route>
    </Routes>
  );
};

export default App;
