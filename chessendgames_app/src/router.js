import { createRouter, createWebHistory } from "vue-router"
import MainPage from "./components/MainPage.vue"
import WhyWorth from "./components/WhyWorth.vue"
import RecommendedLiterature from "./components/RecommendedLiterature.vue"
import PlayAgainstComputer from "./components/PlayAgainstComputer.vue"
import EndgameTypes from "./components/EndgameTypes.vue"

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage
  },
  {
    path: "/whyworth",
    name: "WhyWorth",
    component: WhyWorth
  },
  {
    path: "/literature",
    name: "RecommendedLiterature",
    component: RecommendedLiterature
  },
  {
    path: "/endgametypes",
    name: "EndgameTypes",
    component: EndgameTypes
  },
  {
    path: "/play",
    name: "PlayAgainstComputer",
    component: PlayAgainstComputer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router