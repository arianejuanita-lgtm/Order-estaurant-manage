<script setup lang="ts">
const props=defineProps<{
   sousTotal:number
}>();

const tva = props.sousTotal * 0.1925;

const total=props.sousTotal + tva + 5;

</script>

<template>
    <div>
         <h3>Facturation Transparante</h3>
            <div>
                <p>Details du reglement</p>
            </div>

            <div>
                <div>
                    <div><p>Sous-total articles</p></div>
                    <div><p>${{ sousTotal }}</p></div>
                </div>

                <div>
                    <div><p>Livraison</p></div>
                    <div><p>Gratuite</p></div>
                </div>

                <div>
                    <div><p>TVA</p></div>
                    <div><p>${{ tva }}</p></div>
                </div>

                <div>
                    <div><p>Frais de service emballage</p></div>
                    <div><p>$ 5</p></div>
                </div>

                <div>
                    <div><p>Total net a payer</p></div>
                    <div><p>{{ total }}</p></div>
                </div>

                <div>
                    <div></div>
                    <div>
                        <div><p>Confirmer</p></div>
                        <div><p>Payer ${{ total }}</p></div>
                    </div>
                </div>


            </div>
    </div>
</template>

<style scoped></style>