<template>
    <v-app>
        <div class="home">
                <div class="leftColumn">
                    <MainSidebar />
                    <img src="../assets/chess_wallpaper1.jpg" alt="" width="350" height="600"/>
                </div>
                <div class="rightColumn">
                    <h1>Dzień dobry!</h1>
                    <p>
                        Na tej stronie możesz całkowicie za darmo nauczyć się rozgrywać różne pozycje końcowe.
                    </p>
                    <p>
                        Zachęcamy do zapoznania się z leksykonem pozycji i przerabiania poszczególnych typów końcówek w kolejności zgodnej z numeracją. Gra końcowa to najtrudniejszy etap partii, trening wymaga skupienia a efekty pojawiają się powoli. Jeśli aspirujesz do zostania profesjonalnym szachistą, nauka końcówek jest niezbędna.
                    </p>
                    <p>
                        Gdy nie będziesz znał się na końcówkach, będziesz przegrywał partie nie wiedząc nawet dlaczego. Stockfish też ci tego nie wytłumaczy. Po prostu nie będziesz w stanie ocenić, kiedy warto wymienić figury by przejść do końcówki, a kiedy nie. Przeciwnik wiedzący te rzeczy z łatwością cię pokona. Dlatego zacznij naukę już teraz.
                    </p>
                </div>
            </div>
    </v-app>
</template>

<script>
    import MainSidebar from "./MainSidebar.vue"

    export default {
        name: "WhyWorth",
        components: {
            MainSidebar,
        }
    }
</script>

<style>
    @import "./styles/GeneralStyles.css";
</style>