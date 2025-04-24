import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Function to handle theme change when the switch is toggled
  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="toggleSwitch"
          className="hidden"
          checked={theme === 'dark'}  // Bind checkbox checked state to theme
          onChange={handleToggle} // Trigger theme change on toggle
        />
        <label
          htmlFor="toggleSwitch"
          className={`select-none relative inline-flex h-6 w-14 items-center rounded-full transition-colors duration-200 cursor-pointer ${
            theme === 'dark' ? 'bg-[#0E947A]' : 'bg-[#E6E6E6]'
          }`}
        >
          <span
            id="toggleText"
            className={`absolute w-full text-xs transition-transform duration-200 ${
              theme === 'dark' ? 'text-white text-left pl-2' : 'text-black text-right pr-1.5'
            }`}
          >
            {theme === 'dark' ? 'ON' : 'OFF'}
          </span>
          <span
            id="toggleBall"
            className={`inline-block w-[17px] h-[17px] transform rounded-full bg-white transition-transform duration-200 ${
              theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
            }`}
          ></span>
        </label>
      </div>
    </div>
  );
};

export default ThemeToggler;
