<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" to="/">🎬 CineAPI</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav gap-2">
          <li class="nav-item">
            <a class="nav-link" active-class="active" to="/filmes">Filmes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" active-class="active" to="/diretores">Diretores</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-4">
    <RouterView />
  </div>
</template>