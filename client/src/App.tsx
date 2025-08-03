import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TelegramApp from "@/components/telegram-app";
import Home from "@/pages/home";
import Predictions from "@/pages/predictions";
import Courses from "@/pages/courses";
import TrustManagement from "@/pages/trust-management";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/predictions" component={Predictions} />
      <Route path="/courses" component={Courses} />
      <Route path="/trust-management" component={TrustManagement} />
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
