<script>
export default {
  methods: {
    openModal(modalId) {
      this.$modal.show(`mobile-full-height-modal-${modalId}`);
    },
    closeModal(modalId) {
      this.$modal.hide(`mobile-full-height-modal-${modalId}`);
    },
  },
};
</script>
