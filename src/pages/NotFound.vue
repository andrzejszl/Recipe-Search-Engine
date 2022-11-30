<template>
    <main>
        <base-card>
            <h2>Page not found</h2>
            <base-button link to="/home">Go to Home Page</base-button>
        </base-card>
    </main>
</template>

<style lang="scss" scoped>
    main {
        padding-top: 50px;
        min-height: calc(100vh - 100px);
        background-color: #434242;
        h2 {
            text-align: center;
            font-size: 3rem;
        }
    }
</style>