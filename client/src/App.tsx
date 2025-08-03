import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TelegramApp from "@/components/telegram-app";
import Home from "@/pages/home-new";
import Predictions from "@/pages/predictions";
import Courses from "@/pages/courses";
import TrustManagement from "@/pages/trust-management";
import Consultations from "@/pages/consultations";
import Partners from "@/pages/partners";
import Purchases from "@/pages/purchases";
import Support from "@/pages/support";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/predictions" component={Predictions} />
      <Route path="/courses" component={Courses} />
      <Route path="/trust-management" component={TrustManagement} />
      <Route path="/consultations" component={Consultations} />
      <Route path="/partners" component={Partners} />
      <Route path="/purchases" component={Purchases} />
      <Route path="/support" component={Support} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TelegramApp>
          <Toaster />
          <Router />
        </TelegramApp>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
