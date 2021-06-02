<script>
export default {
  methods: {
    openModal(modalId) {
      console.log(modalId);
      this.$modal.show(`mobile-full-height-modal-${modalId}`);
    },
    closeModal(modalId) {
      this.$modal.hide(`mobile-full-height-modal-${modalId}`);
    },
  },
};
</script>
