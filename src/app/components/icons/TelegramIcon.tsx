export const TelegramIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.12613 13.0867C10.5001 10.449 14.7434 8.6963 16.8742 7.84597C22.9386 5.43384 24.2134 5.01735 25.0329 5C25.2151 5 25.6156 5.03471 25.8889 5.24295C26.1074 5.41648 26.162 5.64208 26.1984 5.81561C26.2349 5.98915 26.2713 6.35357 26.2349 6.63123C25.9071 9.9284 24.4865 17.9284 23.7581 21.6073C23.4486 23.1691 22.8476 23.6897 22.2648 23.7417C20.9899 23.8459 20.0248 22.9435 18.8045 22.1799C16.8742 20.9825 15.7997 20.2364 13.9239 19.0564C11.7567 17.7027 13.159 16.9566 14.3974 15.7419C14.7252 15.4295 20.3161 10.5705 20.4254 10.1366C20.4436 10.0846 20.4436 9.87634 20.3161 9.77222C20.1887 9.66809 20.0066 9.7028 19.8608 9.73751C19.6605 9.77222 16.601 11.7158 10.6458 15.5509C9.77169 16.1236 8.9886 16.4013 8.27835 16.3839C7.49525 16.3666 6.00191 15.9674 4.8728 15.6203C3.50694 15.2039 2.41425 14.9783 2.50531 14.2494C2.55994 13.8676 3.10629 13.4859 4.12613 13.0867Z"
        fill={color ? color : "#C6C6C6"}
      />
    </svg>
  );
};
