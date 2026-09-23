<script lang="ts" setup>
import { ref } from 'vue';
import Step1 from './component/createMenuItem/step1.vue';
import Step2 from './component/createMenuItem/step2.vue';
import Step3 from './component/createMenuItem/step3.vue';
import Step4 from './component/createMenuItem/step4.vue';
import ApercueItem from './component/createMenuItem/apercueItem.vue';
import { CircleArrowLeft } from 'lucide-vue-next';
import { steps } from '@/data/repositories/StepRepository.ts';
import { router } from '@/router/routes.ts';

const currentStepId = ref(1);

const nextStep = () => {
    if (currentStepId.value < steps.length) {
        currentStepId.value++;
    }
};

const prevStep = () => {
    if (currentStepId.value > 1) {
        currentStepId.value--;
    }
};

const finishForm = () => {
    console.log("Product successfully created!");
};

const redirect = () => {
    router.push("/");
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 p-6 flex flex-col gap-8">
        
        <div class="flex flex-col gap-6">

            <div @click="redirect" class="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-black w-fit">
                <CircleArrowLeft class="w-5 h-5" />
                <p class="font-medium">Back to products</p>
            </div>

            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 class="text-3xl font-bold text-gray-900">Create a product</h2>
                
                <div class="flex items-center gap-3 overflow-x-auto pb-2">
                    <div 
                        v-for="item in steps" 
                        :key="item.id"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                        :class="currentStepId === item.id ? 'bg-amber-400 text-gray-900 font-bold shadow-sm' : 'bg-gray-200 text-gray-400'"
                    >
                        <span class="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold"
                            :class="currentStepId === item.id ? 'bg-white/40 text-gray-900' : 'bg-gray-300 text-gray-500'"
                        >
                            {{ item.id }}
                        </span>
                        <div class="flex flex-col">
                            <p class="text-sm whitespace-nowrap">{{ item.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            <div class="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Step1 v-if="currentStepId === 1" :itemStep="steps[0]!" @next="nextStep" />
                <Step2 v-else-if="currentStepId === 2" :itemStep="steps[1]!" @next="nextStep" @prev="prevStep" />
                <Step3 v-else-if="currentStepId === 3" :itemStep="steps[2]!" @next="nextStep" @prev="prevStep" />
                <Step4 v-else-if="currentStepId === 4" :itemStep="steps[3]!" @prev="prevStep" @finish="finishForm" />
            </div>

            <div class="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                <ApercueItem />
            </div>

        </div>

    </div>
</template>