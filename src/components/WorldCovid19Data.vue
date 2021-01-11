<template>
  <div>
    <div>
      <h1>{{ msg }}</h1>
      <h3>Today Covid-19 Total Comfirmed</h3>
      <h4>Date: {{ state.todayDate }}</h4>
      <svg id="home-world-svg" />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";
import { defineComponent, reactive } from "vue";
import worldDataJson from "@/assets/data/world/world.geojson";
import notShowList from "@/lib/not-show-list.js";

export default defineComponent({
  name: "WorldCovid19Data",
  props: {
    msg: String
  },
  setup() {
    const state = reactive({
      svg: {},
      geoPath: {},
      worldCovid19Data: {},
      todayDate: "???",
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
  async mounted() {
    const width = 1000;
    const height = 500;

    const svg = d3
      .select("#home-world-svg")
      .attr("width", width)
      .attr("height", height);
    this.svg = svg;

    var projection = d3
      .geoMercator()
      .center([0, 40])
      .scale(150)
      .rotate([180, 0]);
    //.translate([width / 2, height / 2]);

    const geoPath = d3.geoPath().projection(projection);
    this.geoPath = geoPath;

    const worldGeoData = await worldDataJson;
    this.state.worldCovid19Data = await axios.get(
      "https://api.covid19api.com/summary"
    );
    console.log(this.state.worldCovid19Data.data.Date);
    this.state.todayDate = this.state.worldCovid19Data.data.Date;
    this.displayCovid19WorldMap(worldGeoData);
  },
  methods: {
    displayCovid19WorldMap(data) {
      console.log(data);
      this.svg
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", data => {
          if (notShowList.checkTooLargeMap(this.geoPath(data).substr(0, 7)))
            return;
          return this.geoPath(data);
        })
        .attr("class", "country")
        .style("stroke", "#ffffff")
        .style("stroke-width", 0.1)
        .style("fill", countryGeoData => {
          console.log(
            this.convid19ChangeColor(
              countryGeoData,
              this.state.worldCovid19Data
            )
          );
          return this.convid19ChangeColor(
            countryGeoData,
            this.state.worldCovid19Data
          );
        })
        .on("mouseover", data => {
          //TODO 吹き出しを出す
          console.log(data.target.__data__.properties);
        })
        .on("click", data => {
          this.countryConvid19Detail(
            data.target.__data__.properties.NAME,
            data.target.__data__.properties.ISO_A2,
            this.state.worldCovid19Data
          );
          this.state.clickModal.isShow = true;
        });
    },
    convid19ChangeColor(countryGeoData, covidDataSet) {
      let countryCovidData = null;
      covidDataSet.data.Countries.forEach(element => {
        if (countryGeoData.properties.ISO_A2 === element.CountryCode) {
          countryCovidData = element;
          return;
        }
      });
      if (countryCovidData) {
        const totalCovid19 = countryCovidData.TotalConfirmed;
        if (totalCovid19 > 1000000) return "#ff0000";
        if (totalCovid19 > 100000) return "#ff6347";
        if (totalCovid19 > 10000) return "#ff8c00";
        if (totalCovid19 > 1000) return "#ffff00";
        if (totalCovid19 > 100) return "#ffffe0";
        return "#fff";
      }
      return "#fff";
    },
    countryConvid19Detail(countryName, countryISO_A2, covidDataSet) {
      let countryCovidData = null;
      covidDataSet.data.Countries.forEach(element => {
        if (countryISO_A2 === element.CountryCode) {
          countryCovidData = element;
          return;
        }
      });
      this.state.clickModal.countryName = countryName;
      this.state.clickModal.totalConfirmed = countryCovidData.TotalConfirmed;
      this.state.clickModal.totalDeaths = countryCovidData.TotalDeaths;
      this.state.clickModal.totalRecovered = countryCovidData.TotalRecovered;
      this.state.clickModal.newConfirmed = countryCovidData.NewConfirmed;
      this.state.clickModal.newDeaths = countryCovidData.NewDeaths;
      this.state.clickModal.newRecovered = countryCovidData.NewRecovered;
      console.log("countryCovidData", countryCovidData);
      this.$emit("modal-action",this.state.clickModal)
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
#home-world-svg {
  margin: auto;
}

a {
  color: #42b983;
}
</style>
