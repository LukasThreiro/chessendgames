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
                    <h1>Polecana literatura</h1>

                    <p>Poniżej znajdują się książki, które polecamy do dalszej samodzielnej nauki. Przerabianie literatury szachowej może być pracochłonne, ale w dłuższej perspektywie na pewno przyniesie bardzo dużo korzyści.</p>

                    <div class="literature">
                        <ul>
                            <li>A. Panczenko: Teoria i praktyka końcówek szachowych wyd. Fuh Caissa 2015 r.</li>
                            <li>M. Dworecki: Gra końcowa wyd. ARDEN 2004 r.</li>
                            <li>A. Bielawski, A. Michalczyszyn: Nowoczesne końcówki wyd. READ ME 2004 r.</li>
                            <li>J. Konikowski: Szybki kurs końcówek wyd. Penelopa 2002 r.</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
    </v-app>
</template>

<script>
    import MainSidebar from "./MainSidebar.vue"

    export default {
        name: "RecommendedLiterature",
        components: {
            MainSidebar,
        }
    }
</script>

<style>
    @import "./styles/GeneralStyles.css";
</style>