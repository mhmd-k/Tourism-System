import { useState } from "react";
import { mapStore } from "../../zustand/MapStore";
import Popup from "../../components/Popup";

function ItineraryTable() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const trip = mapStore((state) => state.trip);

  const handleOpenCloseModal = () => setIsModalOpen(!isModalOpen);

  console.log(trip);

  return (
    <Popup isOpen={isModalOpen} handleOpenClose={handleOpenCloseModal}>
      <div></div>
    </Popup>
  );
}

export default ItineraryTable;
