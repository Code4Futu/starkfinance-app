export const ChartIcon = ({ onClick }) => {
  return (
    <svg
      onClick={() => onClick()}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M17.293 2.293C17 2.586 17 3.057 17 4V17C17 17.943 17 18.414 17.293 18.707C17.586 19 18.057 19 19 19C19.943 19 20.414 19 20.707 18.707C21 18.414 21 17.943 21 17V4C21 3.057 21 2.586 20.707 2.293C20.414 2 19.943 2 19 2C18.057 2 17.586 2 17.293 2.293ZM10 7C10 6.057 10 5.586 10.293 5.293C10.586 5 11.057 5 12 5C12.943 5 13.414 5 13.707 5.293C14 5.586 14 6.057 14 7V17C14 17.943 14 18.414 13.707 18.707C13.414 19 12.943 19 12 19C11.057 19 10.586 19 10.293 18.707C10 18.414 10 17.943 10 17V7ZM3.293 9.293C3 9.586 3 10.057 3 11V17C3 17.943 3 18.414 3.293 18.707C3.586 19 4.057 19 5 19C5.943 19 6.414 19 6.707 18.707C7 18.414 7 17.943 7 17V11C7 10.057 7 9.586 6.707 9.293C6.414 9 5.943 9 5 9C4.057 9 3.586 9 3.293 9.293ZM3 21.25C2.80109 21.25 2.61032 21.329 2.46967 21.4697C2.32902 21.6103 2.25 21.8011 2.25 22C2.25 22.1989 2.32902 22.3897 2.46967 22.5303C2.61032 22.671 2.80109 22.75 3 22.75H21C21.1989 22.75 21.3897 22.671 21.5303 22.5303C21.671 22.3897 21.75 22.1989 21.75 22C21.75 21.8011 21.671 21.6103 21.5303 21.4697C21.3897 21.329 21.1989 21.25 21 21.25H3Z"
        fill="#1A1C24"
      />
    </svg>
  );
};
