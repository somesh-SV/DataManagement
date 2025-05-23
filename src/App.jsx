import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AddItems from './components/AddItems';
import ItemsList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import EditItem from './components/EditItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/items" element={<ItemsList />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
