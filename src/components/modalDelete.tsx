// import { Trash2 } from "lucide-react";
// import Modal from "./modal";
// import { Button } from "./button";
// import { useNotification } from "@/context/notification";
// import { useEffect, useState } from "react";

// export default function ModalDelete({
//   data,
//   openModal,
//   onClose,
//   onDelete,
// }: {
//   data: any;
//   openModal: boolean;
//   onClose: () => void;
//   onDelete?: () => void;
// }) {
//   const [item, setItem] = useState<any>(null);

//   useEffect(() => {
//     setTimeout(() => setItem(data));
//   }, [openModal, data]);

//   const handleDelete = () => {
//     onDelete?.();
//     onClose();
//   };

//   return (
//     <Modal openModal={openModal} onClose={onClose} data={[]} position="center">
//       <div className="w-full h-[200px] flex flex-col justify-center items-center space-y-4">
//         <Trash2 className="text-red-500 w-12 h-12" />
//         <div className="text-center space-x-1 text-wrap">
//           <span>Bạn xác nhận muốn xóa</span>
//           <span className="text-red-500">{item}?</span>
//         </div>
//         <div className="col-span-6 flex items-end justify-end space-x-3">
//           <Button
//             className="text-white bg-red-500 font-semibold p-3 rounded-xl border border-red-500 min-w-30 hover:bg-transparent hover:text-red-500"
//             onClick={handleDelete}
//           >
//             Xác nhận
//           </Button>
//           <Button
//             className="text-gray-500! bg-transparent font-semibold p-3 rounded-xl min-w-30 border border-gray-500 hover:bg-transparent!"
//             onClick={onClose}
//           >
//             Hủy
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// }
