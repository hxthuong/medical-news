// import Modal from "./modal";
// import { Button } from "./button";
// import { X } from "lucide-react";

// interface EditProps<T> {
//   title?: string;
//   position?: "left" | "right" | "center";
//   openModal: boolean;
//   onClose: () => void;
//   onEdit: () => void;
//   width?: string;
//   className?: string;
//   children: React.ReactNode;
// }

// export default function ModalEdit<T>({
//   title,
//   position = "center",
//   openModal,
//   onClose,
//   onEdit,
//   width = "500px",
//   className = "min-h-97.5",
//   children,
// }: EditProps<T>) {
//   return (
//     <Modal
//       openModal={openModal}
//       onClose={onClose}
//       data={[]}
//       position={position}
//       width={width}
//       className={className}
//     >
//       <div className="w-full h-[200px] flex flex-col space-y-4 p-3">
//         <div className="flex items-center justify-between border-b border-b-gray-300 pb-3">
//           <h3 className="text-blue-800 text-xl font-semibold mb-0">{title}</h3>
//           <X onClick={onClose} />
//         </div>
//         <div className="w-full mt-1 mb-3 border-b border-b-gray-300 pb-3">
//           {children}
//         </div>
//         <div className="w-full flex items-end justify-end space-x-3">
//           <Button
//             className="text-white bg-blue-700 font-semibold p-3 rounded-xl border border-blue-700 min-w-30"
//             onClick={onEdit}
//           >
//             Lưu
//           </Button>
//           <Button
//             className="text-gray-500! bg-transparent font-semibold p-3 rounded-xl min-w-30 border border-gray-500 hover:bg-transparent!"
//             onClick={onClose}
//           >
//             Đóng
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// }
