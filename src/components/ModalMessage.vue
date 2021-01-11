<template>
  <div id="modal" class="modal" v-if="modalState.isShow">
    <div class="modal-overlay js-modal-close">
      <div class="modal-container">
        <div class="modal-content">
          <h2 class="modal-content-ttl">
            {{ modalState.countryName }}<br />
            covid-19 detection
          </h2>
          <h5 class="modal-content-ttl">
            total
          </h5>
          <p class="modal-content-txt">
            confirmed: {{ modalState.totalConfirmed }} <br />
            deaths: {{ modalState.totalDeaths }} <br />
            recovered: {{ modalState.totalRecovered }}
          </p>
          <h5 class="modal-content-ttl">
            new
          </h5>
          <p class="modal-content-txt">
            confirmed: {{ modalState.newConfirmed }} <br />
            deaths: {{ modalState.newDeaths }} <br />
            recovered: {{ modalState.newRecovered }}
          </p>
        </div>
        <button class="modal-btn modal-close js-modal-close" @click="close()">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalMessage",
  props: {
    msg: String,
    modalState: {
      countryName: "",
      isShow: false,
      totalConfirmed: "",
      totalDeaths: "",
      totalRecovered: "",
      newConfirmed: "",
      newDeaths: "",
      newRecovered: ""
    }
  },
  methods: {
    close() {
      this.modalState.isShow = false;
    }
  }
};
</script>

<style scoped>
/* .modal {
  display: none;
} */

.modal.is_open {
  display: block;
}

.modal-overlay {
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
}

.modal-container {
  background: #fff;
  border-radius: 4px;
  max-height: 100%;
  max-width: 600px;
  padding: 30px 20px;
  overflow: scroll;
}

.modal-content-ttl {
  font-size: 2rem;
}

.modal-content-txt {
  line-height: 1.67;
}
</style>
