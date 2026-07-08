        const audio = document.getElementById("audio-background");
        const btnAudio = document.getElementById("audio-toggle");

        function verificarAudioValido() {
            return (audio && audio.src && !audio.src.includes("COLE_AQUI_O_TEXTO_GERADO") && audio.src.length > 50);
        }

        function entrarNoSite() {
            const splash = document.getElementById("splash-screen");
            splash.style.opacity = 0;
            setTimeout(() => {
                splash.style.display = "none";
            }, 500);

            if (verificarAudioValido()) {
                audio.volume = 0.3;
                audio.play()
                .then(() => { btnAudio.innerText = "⏸️"; })
                .catch(function(error) { btnAudio.innerText = "▶️"; });
            } else {
                alert("Atenção: O código Base64 da música não foi detectado ou está incompleto. O site funcionará, mas sem som.");
                btnAudio.innerText = "▶️";
            }
        }

        function alternarAudio() {
            if (!verificarAudioValido()) {
                btnAudio.innerText = (btnAudio.innerText === "▶️") ? "⏸️" : "▶️";
                return;
            }

            if (audio.paused) {
                audio.volume = 0.3; 
                audio.play()
                .then(() => { btnAudio.innerText = "⏸️"; })
                .catch(() => { btnAudio.innerText = "▶️"; });
            } else {
                audio.pause();
                btnAudio.innerText = "▶️";
            }
        }

        // NOVO SCRIPT DO CARROSSEL: Totalmente Automatizado e Independente da Quantidade
        const track = document.getElementById("track");
        let index = 0;
        
        function moverCarrosselAutomatico() {
            // Conta em tempo real quantos elementos com a classe '.slide' existem no documento
            const totalSlides = document.querySelectorAll(".slide").length;
            
            index++;
            if (index >= totalSlides) {
                index = 0; // Reseta e volta para a primeira imagem de forma cíclica
            }
            
            // Move o track exatamente de 100% em 100% baseado no índice atual
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        // Executa a transição a cada 3 segundos (3000ms)
        setInterval(moverCarrosselAutomatico, 3000);

        function copiarChave() {
            const inputPix = document.getElementById("chave-pix");
            inputPix.select();
            inputPix.setSelectionRange(0, 99999); 
            
            navigator.clipboard.writeText(inputPix.value)
                .then(() => {
                    const msgSucesso = document.getElementById("mensagem-sucesso");
                    msgSucesso.style.display = "block";
                    setTimeout(() => { msgSucesso.style.display = "none"; }, 3000);
                })
                .catch(err => { alert("Erro ao copiar. Por favor, copie manualmente."); });
        }