// import { useState } from "react";
// impor { useMediaQuery } from "react-res"
// import route from "../routes/route";
// import { SocialLink } from "../layouts/drawer/drawer.index";

// const useOpenDrawer = () => {
//   const isMobile = useMediaQuery({ maxWidth: 768 });
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [resizeDrawer, setResizeDrawer] = useState(false);
//   const [content, setContent] = useState([]);
//   const [key, setKey] = useState(0);

//   const resizeToggle = () => {
//     setResizeDrawer(!resizeDrawer);
//   };

//   const toggle = (id) => {
//     if (id === 1 || id === 5) {
//       setOpenDrawer(false);
//       return;
//     }
//     if (isMobile && key === id && openDrawer) setOpenDrawer(!openDrawer);
//     if (isMobile && (key === 2 || 3 || 4 || 6) && key !== id && openDrawer) {
//       return;
//     } else {
//       setOpenDrawer(!openDrawer);
//     }
//   };

//   const changeContent = (id) => {
//     if (id === 1) setOpenDrawer(false);
//     if (id === 5) setOpenDrawer(false);
//     if (id === 2) {
//       setKey(2);
//       setContent([
//         {
//           title: "Swap",
//           path: route.home,
//         },
//         {
//           title: "Liquidity",
//           path: route.home,
//         },
//         {
//           title: "Overview",
//           path: route.home,
//         },
//       ]);
//     }
//     if (id === 3) {
//       setKey(3);
//       setContent([
//         {
//           title: "Launchpad List",
//           path: route.home,
//         },
//         {
//           title: "Airdrop List",
//           path: route.home,
//         },
//         {
//           title: "Your Pool",
//           path: route.home,
//         },
//       ]);
//     }
//     if (id === 4) {
//       setKey(4);
//       setContent([
//         {
//           title: "Collections",
//           path: route.home,
//         },
//         {
//           title: "Activity",
//           path: route.home,
//         },
//         {
//           title: "Events",
//           path: route.home,
//         },
//         {
//           title: "Profile",
//           path: route.home,
//         },
//       ]);
//     }
//     if (id === 6) {
//       setKey(6);
//       setContent([
//         {
//           title: "Telegram",
//           path: SocialLink.teleGlobal,
//         },
//         {
//           title: "Discord",
//           path: SocialLink.discord,
//         },
//         {
//           title: "X.com",
//           path: SocialLink.tw,
//         },
//         {
//           title: "Medium",
//           path: SocialLink.teleChannel,
//         },
//         {
//           title: "Github",
//           path: SocialLink.teleChannel,
//         },
//       ]);
//     }
//     toggle(id);
//   };

//   return {
//     openDrawer,
//     toggle,
//     resizeDrawer,
//     resizeToggle,
//     content,
//     changeContent,
//   };
// };

// export { useOpenDrawer };
