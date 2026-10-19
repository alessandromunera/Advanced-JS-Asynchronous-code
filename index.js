//RESUELVE TUS EJERCICIOS AQUI


const DOG_API = "https://dog.ceo/api";
const GITHUB_API = "https://api.github.com/users";

// 1. Obtener todas las razas de perros
async function getAllBreeds() {
  const respuesta = await fetch(`${DOG_API}/breeds/list/all`);
  const datos = await respuesta.json();

  return Object.keys(datos.message);
}

// 2. Obtener una imagen aleatoria de perro
async function getRandomDog() {
  const respuesta = await fetch(`${DOG_API}/breeds/image/random`);
  const datos = await respuesta.json();

  return datos.message;
}

// 3. Obtener todas las imágenes de la raza komondor
async function getAllImagesByBreed() {
  const respuesta = await fetch(`${DOG_API}/breed/komondor/images`);
  const datos = await respuesta.json();

  return datos.message;
}

// 4. Obtener todas las imágenes de una raza indicada
async function getAllImagesByBreed2(breed) {
  const respuesta = await fetch(`${DOG_API}/breed/${breed}/images`);
  const datos = await respuesta.json();

  return datos.message;
}

// 5. Obtener el perfil de un usuario de GitHub
async function getGitHubUserProfile(username) {
  const respuesta = await fetch(`${GITHUB_API}/${username}`);
  const datos = await respuesta.json();

  return datos;
}

// 6. Obtener y pintar la foto y el nombre de un usuario
async function printGithubUserProfile(username) {
  const usuario = await getGitHubUserProfile(username);

  const img = usuario.avatar_url;
  const name = usuario.name;

  const imagen = document.createElement("img");
  imagen.src = img;
  imagen.alt = "imagen de usuario";

  const titulo = document.createElement("h1");
  titulo.textContent = name || usuario.login;

  document.body.appendChild(imagen);
  document.body.appendChild(titulo);

  return { img, name };
}

// 7. Obtener el perfil y devolver una tarjeta HTML
async function getAndPrintGitHubUserProfile(username) {
  const usuario = await getGitHubUserProfile(username);

  return `
<section>
    <img src="${usuario.avatar_url}" alt="imagen de usuario">
    <h1>${usuario.name || usuario.login}</h1>
    <p>Public repos: ${usuario.public_repos}</p>
</section>`;
}

// 8. Crear un buscador de usuarios en el DOM
function crearBuscador() {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Nombre de usuario de GitHub";

  const boton = document.createElement("button");
  boton.textContent = "Buscar";

  const resultados = document.createElement("div");

  document.body.appendChild(input);
  document.body.appendChild(boton);
  document.body.appendChild(resultados);

  boton.addEventListener("click", async () => {
    const username = input.value.trim();

    if (username === "") {
      resultados.textContent = "Escribe un nombre de usuario.";
      return;
    }

    try {
      resultados.innerHTML =
        await getAndPrintGitHubUserProfile(username);
    } catch (error) {
      resultados.textContent = "No se pudo encontrar el usuario.";
    }
  });
}

// 9. Obtener varios usuarios de GitHub con Promise.all()
async function fetchGithubUsers(userNames) {
  const promesas = userNames.map(async (name) => {
    const respuesta = await fetch(`${GITHUB_API}/${name}`);
    return respuesta.json();
  });

  const usuarios = await Promise.all(promesas);

  usuarios.forEach(usuario => {
    console.log(usuario.repos_url);
    console.log(usuario.name);
  });

  return usuarios;
}

// El buscador se muestra al abrir la página
crearBuscador();
