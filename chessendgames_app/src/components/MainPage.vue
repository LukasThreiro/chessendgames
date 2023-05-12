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
                <div class="rightColumn">
                    <h1>Trening końcówek szachowych</h1>
                    <p>
                        Witryna umożliwia trening końcówek szachowych. Przejdź do leksykonu by zapoznać się z różnymi typami końcówek. To może być pierwszy krok na drodze od amatorskiego grania w szachy do profesjonalnej rozgrywki na wysokim poziomie.
                    </p>
                </div>
            </div>
    </v-app>
</template>

<script>
    import MainSidebar from "./MainSidebar.vue"

    export default {
        name: "MainPage",
        components: {
            MainSidebar,
        }
    }
</script>

<style>
    @import "./styles/GeneralStyles.css";
</style>