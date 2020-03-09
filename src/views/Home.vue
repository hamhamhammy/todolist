<template>
  <div class="x-padded-container">
    <h1 class="t-size-hero m-t-0 m-b-2">Description</h1>
    <p>This app allows you to create todo items for given dates.</p>
    <p>You can also view the items and modify or delete them.</p>

    <h1 class="t-size-hero m-b-2">Technical Notes</h1>
    <p><a href="https://github.com/hamhamhammy/todolist">Github Repo</a></p>
    <p>This is a single page application (SPA); it is responsive across all devices.</p>
    <p>Frontend is built with Vue CLI (Vue, Webpack, PostCSS, Sass), Vue Router, vuejs-datepicker, axios, date-fns, custom styles kit.</p>
    <p>Backend is built with Express, body-parser, lusca, sqlite.</p>
    <p>Express server is used for development and production, it uses webpackDevMiddleWare to build the app during development; webpackHotMiddleware is enabled for development and runs from server.</p>

    <h1 class="t-size-hero m-b-2">Future</h1>
    <p>User accounts</p>
    <p>Serverside prefetch routes for data</p>
    <p>More scalable database other than sqlite, also maybe GraphQL</p>
    <p>Vuex for central data store</p>
    <p>Searching and filtering of todo items</p>
    <p>Improved page designs and styles</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
