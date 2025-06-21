import { AppProviders } from "./components/providers/AppProviders";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
