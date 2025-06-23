import { AppProviders } from "./components/providers/AppProviders";
import { Toaster } from "./components/ui/sonner";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <AppProviders>
      <AppRouter />
      <Toaster />
    </AppProviders>
  );
}

export default App;
