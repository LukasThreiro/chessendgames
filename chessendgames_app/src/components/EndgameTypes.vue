<template>
    <v-app>
        <div class="heading">
            <img class="headingImg" src="../assets/cbw4.png" alt="Heading">
        </div>
        <div class="home">
                <div class="leftColumn">
                    <MainSidebar />
                    <img src="../assets/chess_wallpaper1.jpg" alt="" width="350" height="600"/>
                </div>
                <div class="rightColumnv2">
                    <h1>Typy pozycji końcowych</h1>
                    <p>
                        Poniżej znajduje się spis różnych typów pozycji końcowych. Zachęcamy do zapoznawania się z nimi po kolei. Trening końcówek wymaga cierpliwości i pozytywnego nastawienia.
                    </p>

                    <el-tag class="positionList" type="success" v-for="e in endgameTypes" :key="e._id">
                        <button class="endgameTypeButton" @click="showDescription(e)">
                            {{ e.name }}
                        </button>
                    </el-tag>

                    <div v-if="selectedEndgameType">
                        <p> {{ selectedEndgameType.name }} </p>
                        <p> {{ selectedEndgameType.desc }} </p>
                        <p>
                            <button onclick="location.href=' {{selectedEndgameType.video_url}} '" type="button"> 
                                Zobacz na YouTube 
                            </button>
                        </p>
                    </div>
                </div>
            </div>
    </v-app>
</template>

<script>
    import MainSidebar from "./MainSidebar.vue"
    import generalCfg from "../../generalCfg.js"

    export default {
        name: "EndgameTypes",
        components: {
            MainSidebar,
        },
        data() {
            return {
                endgameTypes: [],
                selectedEndgameType: ""
            };
        },
        methods: {
            async getData() {
                try {
                    let response = await fetch(generalCfg.backendUrl + "/endgameTypes", {
                        method: "POST",
                    });
                    this.endgameTypes = await response.json();
                } catch (error) {
                    console.log(error);
                }
            },
            async showDescription(e) {
                this.selectedEndgameType = e;
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style>
    @import "./styles/GeneralStyles.css";
</style>