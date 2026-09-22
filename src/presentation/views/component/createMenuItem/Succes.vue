<script lang="ts" setup>
import { MenuItem } from '@/domain/entities/MenuItem';
import { Check } from 'lucide-vue-next';
import { ArrowRight } from 'lucide-vue-next';
import { Plus } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { useCreateMenuItem   } from '@/presentation/stores/useCreateMenuItem';
const createStore = useCreateMenuItem();
const form = createStore.formState;
</script>
<template>

<div>
    <div><Check /></div>

    <div>
        <h2>Produit cree avec succes !!</h2>
        <p>Votre produit a ete ajoutee a votre liste de menu  </p>
    </div>

    <div>
        <div><img src="" alt=""></div>
        <div>
            <p>{{ form.name }}</p>
            <p>{{ form.price }}</p>
            <p v-if="form.isAvailable">Disponible</p>
        </div>
    </div>

    <RouterLink to="/">
        <p>Voir le produit</p>
        <ArrowRight />
    </RouterLink>

       <RouterLink to="/create-menu-item">
          <Plus />
        <p>Creer un autre produit</p>
    </RouterLink>

    <div>
        <p>Retour aux produits</p>
    </div>


</div>

</template>