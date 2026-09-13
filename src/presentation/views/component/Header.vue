<script setup lang="ts">
import SVG from '../../../assets/SVG.png'
import boutton from '../comom/Boutton.vue';
import { Search } from 'lucide-vue-next';
import { User } from 'lucide-vue-next';
import { ShoppingBag } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
const titre='Order now';
</script>

<template>
    <div class="header">
    <div class="logo">
        <div class="img">
          <img :src="SVG" alt="SVG" >
        </div>
        <div>
            <p>Foodly</p>
            <p>KITCHEN</p>
        </div>
    </div>

    <div class="navbar">
        <RouterLink to="/">
        <div>Home</div></RouterLink>
        <RouterLink to="/addMenuItem">
         <div>Menu</div>
         </RouterLink>
          <div>Categorie</div>
           <div>About</div>
            <div>Blog</div>
             <div>Contact</div>
    </div>

    <div class="action">
        <div> <Search /></div>
        <div><User/></div>
        <div><ShoppingBag /></div>
        <RouterLink to="/">

        <boutton :title=titre :haut="40"/></RouterLink>
    </div>
    </div>
</template>

<style scoped>

.header {
  width: 100%;
  height: 80px;
  padding: 0 50px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #ffffff;

  position: sticky;
  top: 0;
  z-index: 1000;
}


.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
}

.img {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
  overflow: hidden;
}

.img img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.logo p {
  margin: 0;
  line-height: 1;
}

.logo p:first-child {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.logo p:last-child {
  margin-top: 5px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #888;
}

.navbar {
  display: flex;
  align-items: center;
  gap: 35px;
}

.navbar div {
  position: relative;

  font-size: 15px;
  font-weight: 500;
  color: #333;

  cursor: pointer;
  transition: color 0.3s ease;
}

.navbar div:hover {
  color: #e85d04;
}

.navbar div::after {
  content: "";

  position: absolute;
  left: 0;
  bottom: -8px;

  width: 0;
  height: 2px;

  background: #e85d04;
  border-radius: 10px;

  transition: width 0.3s ease;
}

.navbar div:hover::after {
  width: 100%;
}


.action {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
  justify-content: flex-end;
}

.action > div {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  cursor: pointer;

  color: #333;
  background: #f7f7f7;

  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.action > div:hover {
  background: #e85d04;
  color: white;
  transform: translateY(-2px);
}

.action svg {
  width: 19px;
  height: 19px;
  stroke-width: 2;
}

@media (max-width: 1000px) {
  .header {
    padding: 0 25px;
  }

  .navbar {
    gap: 18px;
  }

  .navbar div {
    font-size: 14px;
  }

  .logo {
    min-width: auto;
  }

  .action {
    min-width: auto;
  }
}

@media (max-width: 800px) {
  .navbar {
    display: none;
  }

  .header {
    padding: 0 20px;
  }
}

@media (max-width: 500px) {
  .logo p:first-child {
    font-size: 18px;
  }

  .logo p:last-child {
    font-size: 7px;
    letter-spacing: 2px;
  }

  .img,
  .img img {
    width: 42px;
    height: 42px;
  }

  .action > div {
    width: 36px;
    height: 36px;
  }

  .action {
    gap: 6px;
  }
}
</style>