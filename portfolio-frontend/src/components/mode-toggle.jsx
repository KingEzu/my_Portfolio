import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/themeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="px-5 sm:mx-auto w-full max-w-[1050px] text-end mt-10 mb-5">
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="relative"
      >
        {/* Sun Icon */}
        <Sun
          className={`h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
            theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
            theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
          }`}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
