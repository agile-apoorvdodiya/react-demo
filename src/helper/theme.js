export const toggleDarkMode = () => {
  const isDark = localStorage.getItem("isDark") === 'true';
  console.log(isDark, typeof isDark);
  localStorage.setItem("isDark", isDark ? false : true);
  setTheme(!isDark);
};

export const getTheme = () => {
  const isDark = localStorage.getItem("isDark") === 'true';
  setTheme(isDark);
  return isDark
};

const setTheme = (value) => {
  const classlist = document.getElementsByTagName("html")[0].classList;
  value ? classlist.add("dark") : classlist.remove("dark");
};
