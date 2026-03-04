// import * as React from "react";
// import Lightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";

// const images = [
//   {
//     src: "https://images.yet-another-react-lightbox.com/image02.645bc7e4.3840x5070.128w.jpg",
//     width: 320,
//     height: 213,
//   },
//   {
//     src: "https://images.yet-another-react-lightbox.com/image03.13c5eeb7.3840x5120.828w.jpg",
//     width: 640,
//     height: 427,
//   },
//   {
//     src: "https://images.yet-another-react-lightbox.com/image04.2d71a97f.3840x2546.828w.jpg",
//     width: 1200,
//     height: 800,
//   },
// ];

// export default function Gallery() {
//   const [open, setOpen] = React.useState(true);
//   const thumbnailsRef = React.useRef(null);

//   return (
//     <>
//       {/* <button type="button" onClick={() => setOpen(true)}>
//         Open Lightbox
//       </button> */}

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={images}
//         plugins={[Thumbnails]}
//         thumbnails={{ ref: thumbnailsRef }}
//         on={{
//           click: () => {
//             (thumbnailsRef.current?.visible
//               ? thumbnailsRef.current?.hide
//               : thumbnailsRef.current?.show)?.();
//           },
//         }}
//       />
//     </>
//   );
// }
