<script>
export default {
  methods: {
    openModal({ title, text, handler }) {
      this.$modal.show('dialog', {
        title: title,
        text: text,
        buttons: handler.map(({ title, callback }) => {
          return {
            title,
            handler: callback,
          };
        }),

      });
    },
    closeModal() {
      this.$modal.hide('dialog');
    },
  },
};
</script>
