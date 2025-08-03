import { useEffect, ReactNode } from "react";
import { useTelegram } from "@/hooks/use-telegram";

interface TelegramAppProps {
  children: ReactNode;
}

export default function TelegramApp({ children }: TelegramAppProps) {
  const { webApp, user } = useTelegram();

  useEffect(() => {
    if (webApp) {
      // Configure Telegram WebApp
      webApp.ready();
      webApp.expand();
      
      // Set header color to match our brand
      webApp.setHeaderColor('#1A1A1A');
      
      // Set background color
      webApp.setBackgroundColor('#1A1A1A');
      
      // Enable closing confirmation
      webApp.enableClosingConfirmation();
      
      console.log('Telegram WebApp initialized:', { user });
    }
  }, [webApp, user]);

  return (
    <div className="min-h-screen bg-rich-black text-white">
      {children}
    </div>
  );
}
