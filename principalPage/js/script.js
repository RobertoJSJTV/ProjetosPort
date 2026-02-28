function idioma(idioma) {
    if (idioma.value == "en") {
        window.location.href = "index.html"
    } else if (idioma.value == "pt") {
        document.querySelector(".title").innerHTML = "Projetos";
        document.querySelector("#resume").innerHTML = "Currículo";
        document.querySelector("#social-medias").innerHTML = "Redes Sociais";
        document.querySelector(".titulo").innerHTML = "Projetos"
        document.querySelector("#imc").innerHTML = "Projeto Vidraçaria Vridos";
        document.querySelector("#imc-tex").innerHTML = "O projeto é um caso para aprender e treinar javascript, e usando no cotidiano.";
        document.querySelector("#proj-finans").innerHTML = "Projeto Finança Fácil";
        document.querySelector("#proj-finans-tex").innerHTML = "O projeto é um caso para aprender e treinar javascript, e usando no cotidiano.";
        document.querySelector("#vrido-link").innerHTML = "<a href='https://robertojsjtv.github.io/ProjetosPort/ProjetoVidracaria/vidracaria.html' target='_blank' rel='noopener noreferrer'>Saiba mais</a>";
        document.querySelector("#finans-link").innerHTML = "<a href='https://robertojsjtv.github.io/SubProjects/financas' target='_blank' rel='noopener noreferrer'>Saiba mais</a>";
    }
}