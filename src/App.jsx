import { RouterProvider } from 'react-router';
import { AppProvider } from './frontend/context/AppContext';
import { router } from './routes/routes';
import { Toaster } from './frontend/components/ui/sonner';
function App() {
    return (<AppProvider>
      <RouterProvider router={router}/>
      <Toaster position="top-right"/>
    </AppProvider>);
}
export default App;
