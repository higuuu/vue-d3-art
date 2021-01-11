<template>
  <div class="home">
    <WorldCovid19Data msg="Welcome to Data Visualization" @modal-action='modalAction'/>
    <ModalMessage class="modal-message" :modal-state="state.clickModal" />
  </div>
</template>

<script>
// @ is an alias to /src
import WorldCovid19Data from "@/components/WorldCovid19Data.vue";
import ModalMessage from "@/components/ModalMessage.vue";
import { defineComponent, reactive } from "vue";

export default defineComponent ({
  name: "Home",
  components: {
    WorldCovid19Data,
    ModalMessage
  },
  setup() {
    const state = reactive({
      clickModal: {
        isShow: false,
        countryName: "",
        totalConfirmed: "",
        totalDeaths: "",
        totalRecovered: "",
        newConfirmed: "",
        newDeaths: "",
        newRecovered: ""
      }
    });
    return { state };
  },
  methods: {
    modalAction(clickModalState){
      console.log("modal action")
      this.state.clickModal = clickModalState
    }
  }
});
</script>

