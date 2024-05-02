<template>
  <header class="header">
    <div class="header__container">
      <div class="user flex center">
        <img :src="account?.picture" class="rounded-full size-12" alt="">
        <p class="ml-5 mr-40 translate-y-0.5">{{ account?.name }}</p>
      </div>
    </div>
  </header>


  <div class="nav" id="navbar">
      <div class="nav_container w-60">
          <div>
              <a href="#" class="nav__link nav__logo">
                  <span class="nav__logo-name text-4xl">TodoList</span>
              </a>

              <div class="nav__list">
                  <div class="nav__items mt-12">
                      <a href="#" class="nav__link">
                          <box-icon name='home-alt' ></box-icon>
                          <span class="nav__name ml-3">Home</span>
                      </a>
                  </div>
              </div>
          </div>

          <a href="#" @click="logout" v-if="!accountStore.isAccountEmpty" class="nav__link nav__logout">
            <box-icon name='log-out' class="nav-icon size-8"></box-icon>
            <span class="ml-3">Log Out</span>
          </a>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/AccoutStore"
import type { Account } from "@/types/account";

const accountStore = useAccountStore()
const props = defineProps({
  account: Object as () => Account
})

const logout = () => {
  localStorage.clear()
  location.reload()
}
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  :root {
    --normal-font-size: 1rem;
    --small-font-size: .875rem;
    --smaller-font-size: .813rem;
  }
}

/*========== BASE ==========*/
*, ::before, ::after {
  box-sizing: border-box;
}

body {
  margin: 3.5rem 0 0 0;
  padding: 1rem 1rem 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  border-color: var(--body-color);
  color: var(--text-color);
}

img {
  max-width: 100%;
  height: auto;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--container-color);
  box-shadow: 0 1px 0 rgb(22, 8, 43, .1);
  padding: 0 1rem;
  z-index: 100;
}

.header__container {
  display: flex;
  align-items: center;
  height: 5rem;
  justify-content: end;
}

.header__img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.header__logo {
  color: var(--title-color);
  font-weight: var(--font-medium);
  display: none;
}

.header__search {
  display: flex;
  padding: .40rem .75rem;
  background-color: var(--first-color-light);
  border-radius: .25px;
}

.header__input {
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--first-color-light);
}

.header__input::placeholder {
  font-family: var(--body-font);
  color: var(--text-color);
}

.header__icon,
.header__toggle {
  font-size: 1.2rem;
}

.header__toggle {
  color: var(--title-color);
  cursor: pointer;
}

/* NAV */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  padding: 1rem 1rem 3rem;
  background-color: var(--container-color);
  box-shadow: 1px 0 0 rgb(22, 8, 43, .1);
  z-index: 100;
  transition: .4s;
}

.nav__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 3rem;
  overflow: auto;
  scrollbar-width: none;
}

.nav__container::-webkit-scrollbar {
  display: none;
}

.nav__logo {
  font-weight: var(--font-semi-bold);
  margin-bottom: 2.5rem;
}

.nav__list,
.nav__items {
  display: grid;
}

.nav__list {
  row-gap: 2.5rem;
  margin-bottom: 2.5rem;
}

.nav__items {
  row-gap: 1.5rem;
}

.nav__subtitle {
  font-size: var(--normal-font-size);
  text-transform: uppercase;
  letter-spacing: .1rem;
  color: var(--text-color-light);
}

.nav__logo-name {
  color:#e30808;
}

.nav__link {
  display: flex;
  align-items: center;
  color: var(--text-color);
}

.nav__link:hover {
  color: #e30808;
  transition: color 0.3s ease;
}


.nav__icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.nav__name {
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  white-space: nowrap;
}

.nav__logout {
  margin-top: 5rem;
}

/* Dropdown */



.nav__dropdown-content {
  display: grid;
  row-gap: .5rem;
  padding: .75rem 2.5rem .75rem 1.8rem;
}

.nav__dropdown-item {
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  color: var(--text-color);
}

.nav__dropdown-item:hover {
  color: #e30808;
}

.nav__dropdown-icon {
  margin-left: auto;
  transition: .4s;
}

/* Show collapse */
.nav__dropdown:hover {
  max-height: 100rem;
}

/* Rotate icon arrow */
.nav__dropdown:hover .nav__dropdown-icon {
  transform: rotate(180deg);
}

.show-menu {
  left: 0;
}
</style>