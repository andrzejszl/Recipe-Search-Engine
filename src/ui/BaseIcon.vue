<template>
    <div class="rating-container">
        <div class="icon">{{ icon }}</div>
        <span class="text">{{ text }}</span>
        <span class="value">{{ value }}</span>
    </div>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
    icon: String,
    text: String,
    value: String,
})
</script>

<style lang="scss" scoped>
.rating-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    .icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: green;
        padding: 5px;
        font-size: 1.8rem;
        text-align: center;
        color: white;
        margin-bottom: 0;
    }
    .text {
        display: inline;
        font-size: 1.2rem;
        margin: 0;
    }
    .value {
        position: relative;
        top: -10px;
        margin: 0;
        display: inline;
        font-size: 2rem;
        color: #22A39F;
    }
}
</style>