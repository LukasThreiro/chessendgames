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
                    <h1>Dzień dobry!</h1>
                    <p>
                        Witryna umożliwia trening końcówek szachowych. Przejdź do leksykonu by zapoznać się z różnymi typami końcówek. Przejdź do sekcji gry z komputerem, aby spróbować swoich sił przeciwko silnikowi szachowemu. Jeśli chcesz znaleźć więcej informacji o poprawnym sposobie trenowania oraz dowiedzieć się więcej o tym, dlaczego warto to robić, przejdź do zakładki Dlaczego Warto. To może być pierwszy krok na drodze od amatorskiego grania w szachy do profesjonalnej rozgrywki na wysokim poziomie.
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