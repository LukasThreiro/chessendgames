<template>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        :temporary="false"
        disable-resize-watcher
        :mini-variant="!menuCompact.hidden"
        mini-variant-width="100"
        app
      >
        <div id="sidebar">
          <!--
          <div class="sidebar-toggle">
            <div @click="changeToggleState()" id="btn-toggle">
              <v-icon id="btn-toggle-icon" x-large>mdi-chevron-left</v-icon>
            </div>
          </div>
          -->
          <div class="sidebar-body">
            <a href="/">
              <div class="sidebar-profile" v-show="memberActive">
              <img
                :src="require('../assets/' + profileInfo.photo.file)"
                :alt="profileInfo.photo.title"
              />
              <v-slide-x-transition mode="in-out" leave-absolute>
                <div v-show="menuCompact.hidden" id="profile-name">
                  {{ profileInfo.name }}
                </div>
              </v-slide-x-transition>
            </div>
            </a>
            
            <div class="sidebar-links">
              <small>Menu</small>
              <hr class="divider" />
              <div class="links">
                <a
                  v-for="link in menuLinks"
                  :key="link.title"
                  :href="link.path"
                >
                  <v-icon :title="link.title" class="icon"
                    >{{ link.icon }}</v-icon
                  >
  
                  <v-slide-x-transition mode="in-out" leave-absolute>
                    <div class="link-title" v-show="menuCompact.hidden">
                      {{ link.title }}
                    </div>
                  </v-slide-x-transition>
                </a>
              </div>
            </div>
          </div>
        </div>
      </v-navigation-drawer>
    </div>
  </template>
  
  <script>
    export default {
    name: "MainSidebar",
    data: () => {
      return {
        drawer: true,
        menuCompact: {
          hidden: true,
        },
        profileInfo: {
          name: "Endgame poetry",
          photo: {
            file: "pawn1.jpg",
            title: "Szachownica",
          },
        },
        memberActive: true,
        menuLinks: [
          { path: "/whyworth", title: "", icon: "Dlaczego warto" },
          { path: "/endgametypes", title: "", icon: "Katalog pozycji końcowych" },
          { path: "/play", title: "", icon: "Zmierz się z komputerem" },
          { path: "/literature", title: "", icon: "Literatura" },
        ],
        mainLink: "/"
      };
    },
    methods: {
      changeToggleState() {
        let btnToggleIcon = document.getElementById("btn-toggle-icon");
        this.menuCompact.hidden = !this.menuCompact.hidden;
  
        if (this.menuCompact.hidden) {
          return (btnToggleIcon.style.transform = "rotateY(0deg)");
        } else {
          return (btnToggleIcon.style.transform = "rotateY(180deg)");
        }
      },
    },
  };
  </script>

<style>
    @import "./styles/MainSidebarStyles.css";
</style>