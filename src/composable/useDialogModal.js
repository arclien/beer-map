export default function ({ root }) {
  const openModal = ({ title, text, handler }) => {
    root.$modal.show('dialog', {
      title,
      text,
      buttons: handler.map(({ title, callback }) => {
        return {
          title,
          handler: callback,
        };
      }),

    });
  };

  const closeModal = () => {
    root.$modal.hide('dialog');
  };
  return {
    openModal,
    closeModal,
  };
}