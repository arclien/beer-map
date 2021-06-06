export default function ({ root }) {
  const openModal = (modalId) => {
    root.$modal.show(`mobile-full-height-modal-${modalId}`);
  };

  const closeModal = (modalId) => {
    root.$modal.hide(`mobile-full-height-modal-${modalId}`);
  };
  return {
    openModal,
    closeModal,
  };
}