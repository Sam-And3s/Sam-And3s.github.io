(function () {
    const numOfFlowers = 30; // Ajusta el número de flores según lo necesario
    const numOfBranches = 5; // Número de ramas por ramo

    // Función para obtener un valor aleatorio dentro de un rango
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Crear las flores
    function createFlower(branchX, branchY) {
        const flowerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        flowerGroup.setAttribute("class", "flower");

        const petals = 5; // Número de pétalos por flor
        const petalRx = 5; // Ancho de cada pétalo
        const petalRy = 10; // Alto de cada pétalo
        for (let i = 0; i <= petals; i++) {
            let petal = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            petal.setAttribute("cx", branchX);
            petal.setAttribute("cy", branchY);
            petal.setAttribute("rx", petalRx);
            petal.setAttribute("ry", petalRy);
            petal.setAttribute("fill", "#fff");
            petal.setAttribute("stroke", "#e0e0e0");
            petal.setAttribute("stroke-width", "1");
            petal.setAttribute("transform", `rotate(${i * (360 / petals)}, ${branchX}, ${branchY})`);
            flowerGroup.appendChild(petal);
        }

        // Crear el centro de la flor
        const flowerCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        flowerCenter.setAttribute("cx", branchX);
        flowerCenter.setAttribute("cy", branchY);
        flowerCenter.setAttribute("r", "3");
        flowerCenter.setAttribute("fill", "#75573a");
        flowerGroup.appendChild(flowerCenter);

        return flowerGroup;
    }

    // Crear el jardín de flores
    function growGarden() {
        const ground = document.getElementById("ground");
        const groundRect = ground.getBoundingClientRect(); // Obtiene el tamaño y posición del suelo
        
        let svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgContainer.setAttribute("class", "gypsophila");
        svgContainer.setAttribute("width", "300");
        svgContainer.setAttribute("height", "200");
        svgContainer.style.position = "absolute";
        
        // Ajuste de la posición X, asegurando que el jardín no se salga del área verde
        let maxLeft = groundRect.right - 300; // 300 es el ancho del contenedor SVG
        let leftPosition = getRandomArbitrary(groundRect.left, maxLeft);
        svgContainer.style.left = `${leftPosition}px`;
        
        // Ajuste de la posición Y, asegurando que el jardín no se salga del área verde
        let maxBottom = groundRect.top - 200; // 200 es la altura del contenedor SVG
        let bottomPosition = getRandomArbitrary(groundRect.bottom - 200, groundRect.bottom);
        svgContainer.style.bottom = `${bottomPosition}px`;

        // Punto de inicio fijo para las ramas
        const startX = 150;
        const startY = 200;

        // Crear ramas
        for (let j = 0; j < numOfBranches; j++) {
            let branchX = startX;
            let branchY = startY;
            let endX = branchX + getRandomArbitrary(-50, 50);
            let endY = branchY - getRandomArbitrary(50, 100);

            let branch = document.createElementNS("http://www.w3.org/2000/svg", "line");
            branch.setAttribute("x1", branchX);
            branch.setAttribute("y1", branchY);
            branch.setAttribute("x2", endX);
            branch.setAttribute("y2", endY);
            branch.setAttribute("stroke", "rgb(13, 194, 13)");
            branch.setAttribute("stroke-width", "2");
            svgContainer.appendChild(branch);

            // Crear flores a lo largo de la rama
            for (let i = 0; i < numOfFlowers / numOfBranches; i++) {
                let flowerX = endX + getRandomArbitrary(-15, 15);
                let flowerY = endY + getRandomArbitrary(-15, 15);

                // Evitar que las flores se salgan de los límites de la pantalla
                flowerX = Math.max(0, Math.min(flowerX, window.innerWidth));  // Asegura que flowerX esté dentro del ancho visible
                flowerY = Math.max(0, Math.min(flowerY, window.innerHeight)); // Asegura que flowerY esté dentro de la altura visible

                let flower = createFlower(flowerX, flowerY);
                svgContainer.appendChild(flower);
            }
        }

        ground.appendChild(svgContainer);
    }

    // Crear las estrellas en el fondo
    function createStars() {
        const sky = document.getElementById("sky");

        const numStars = 100; // Número de estrellas a crear
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");

            // Posición aleatoria de las estrellas
            const xPos = getRandomArbitrary(0, window.innerWidth);
            const yPos = getRandomArbitrary(0, window.innerHeight);

            star.style.left = `${xPos}px`;
            star.style.top = `${yPos}px`;

            sky.appendChild(star);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // Crear las estrellas cuando la página se cargue
        createStars();
        document.body.addEventListener("click", growGarden);
    });
})();
