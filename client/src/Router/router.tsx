import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from 'react-router-dom';
import Main from '../component/main';
import Tiermaker from '../component/tier-maker';
import Spinner from '../component/spinner';
import Picker from '../component/picker';
import Tournament from '../component/tournament';
import Ladders from '../component/ladders';
import PreferWorldcup from '../component/prefer-worldcup';
import Header from '../component/header';
import CustomMatchBracket from '../component/test';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route element={<Header />}>
            <Route path="/ladders" element={<Ladders />} />
            <Route path="/spinner" element={<Spinner />} />
            {/* <Route path="/tournament" element={<Tournament />} /> */}
            <Route path="/tournament" element={<CustomMatchBracket />} />
            <Route path="/picker" element={<Picker />} />
            <Route path="/tiermaker" element={<Tiermaker />} />
            <Route path="/prefer-worldcup" element={<PreferWorldcup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
