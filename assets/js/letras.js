$(document).ready(function() {
    // Album switching functionality
    $('.list-group-item[data-album]').click(function() {
        const albumId = $(this).data('album');
        
        // Update active state in sidebar
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
        
        // Hide all album sections
        $('.album-lyrics').removeClass('active').hide();
        
        // Show selected album
        $('#' + albumId).addClass('active').show();
        
        // Hide lyrics display
        $('#lyrics-display').hide();
    });

    // Song card click functionality
    $(document).on('click', '.song-card', function() {
        const songId = $(this).data('song');
        const songTitle = $(this).find('h6').text().replace('🎵 ', '').replace('🎶 ', '');
        const albumTitle = $(this).closest('.album-lyrics').find('.album-header h3').text();
        
        // Update song info
        $('#song-title').text(songTitle);
        $('#song-album').text('Álbum: ' + albumTitle);
        
        // Load lyrics based on song ID
        loadLyrics(songId, songTitle, albumTitle);
        
        // Show lyrics display
        $('#lyrics-display').show();
        
        // Scroll to lyrics display
        $('html, body').animate({
            scrollTop: $('#lyrics-display').offset().top - 100
        }, 500);
    });

    function loadLyrics(songId, songTitle, albumTitle) {
        // Map song IDs to file paths
        const lyricsMap = {
            // Spoiler Alert Sobreviví
            'aun-de-pie': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Aun de pie.txt',
            'ca-chi-pa': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Ca chi pa verdad y libertad.txt',
            'circuitos-rotos': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Circuitos rotos.txt',
            'hacer-lo-correcto': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Hacer lo Correcto.txt',
            'karma-vs-darma': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Karma vs darma.txt',
            'perdi': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Perdí.txt',
            'protagonista': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Protagonista.txt',
            'spinoff': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Spinoff el final alternativo.txt',
            'verdad-que-sana': 'assets/letras-organizadas/Spoiler Alert Sobrevivi/Verdad que sana.txt',
            
            // Modo Guerra
            'modo-guerra-activo': 'assets/letras-organizadas/Modo Guerra/Modo guerra activo.txt',
            'no-queremos-simps': 'assets/letras-organizadas/Modo Guerra/No queremos simps.txt',
            'el-examen-hardcore': 'assets/letras-organizadas/Modo Guerra/El examen hardcore.txt',
            'el-examen': 'assets/letras-organizadas/Modo Guerra/El Examen.txt',
            'tribu-y-compas': 'assets/letras-organizadas/Modo Guerra/Tribu y compas.txt',
            'vida-en-conciencia': 'assets/letras-organizadas/Modo Guerra/Vida en conciencia.txt',
            'pinche-pelon-tenia-razon': 'assets/letras-organizadas/Modo Guerra/El piche pelon tenia razon.txt',
            'prologo': 'assets/letras-organizadas/Modo Guerra/Prologo.txt',
            
            // Creando y Fluyendo
            'construyamos-puentes': 'assets/letras-organizadas/Creando y Fluyendo/Construyamos puentes.txt',
            'creer-es-crear': 'assets/letras-organizadas/Creando y Fluyendo/Creer es crear.txt',
            'un-solo-ser': 'assets/letras-organizadas/Creando y Fluyendo/Un solo ser (mantra de luz y raiz).txt',
            
            // Equilibrio Universal
            'intro': 'assets/letras-organizadas/Equilibrio Universal/0 intro.txt',
            'mente-liberala': 'assets/letras-organizadas/Equilibrio Universal/Mente(Liberala).txt',
            'cuerpo-templo-sol': 'assets/letras-organizadas/Equilibrio Universal/2. Cuerpo (Templo del Sol).txt',
            'lattice-somos-uno': 'assets/letras-organizadas/Equilibrio Universal/🎶 4. Lattice (Somos Uno).txt',
            'fuego-sol-interno': 'assets/letras-organizadas/Equilibrio Universal/5. Fuego (Sol Interno).txt',
            'tierra-estoy-aqui': 'assets/letras-organizadas/Equilibrio Universal/6. Tierra (Estoy Aquí).txt',
            'agua-dejalo-fluir': 'assets/letras-organizadas/Equilibrio Universal/7. Agua (Déjalo Fluir).txt',
            'aire-respira-vuela': 'assets/letras-organizadas/Equilibrio Universal/8. Aire (Respira y Vuela).txt',
            'equilibrio-universal-om': 'assets/letras-organizadas/Equilibrio Universal/9. Equilibrio Universal (OM).txt',
            
            // Love Love Love Makes The World Go Round
            'spy-family-mision-amor': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/Spy x Family (Mision Amor).txt',
            'mi-papa-es-spy': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/Mi papa es un Spy - version desde Anya.txt',
            'deseo-juramento-negro': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/Deseo el juramento negro.txt',
            'amor-hace-mundo-girar': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/El amor hace al mundo girar.txt',
            'love-makes-world-title': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/Love Love Love makes the world go round.txt',
            'me-enamore': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/Me enamore.txt',
            'nos-casamos-agosto': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/nos casamos en agosto.txt',
            'paso-a-paso': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/paso a paso.txt',
            'esperanza-alma': 'assets/letras-organizadas/Love Love Love Makes The World Go Round/una esperanza del alma.txt',
            
            // Tiempo del Quinto Sol
            'corazon-dragon': 'assets/letras-organizadas/Tiempo del Quinto Sol/Corazon de Dragon.txt',
            'coyolxauqui-rebelion': 'assets/letras-organizadas/Tiempo del Quinto Sol/Coyolxauqui Rebelion en la noche.txt',
            'danza-tlaloc': 'assets/letras-organizadas/Tiempo del Quinto Sol/Danza de Tlaloc.txt',
            'retorno-kukulkan': 'assets/letras-organizadas/Tiempo del Quinto Sol/El retorno de kukulkan.txt',
            'espejo-serpiente': 'assets/letras-organizadas/Tiempo del Quinto Sol/Espejo y serpiente.txt',
            'hijos-maiz': 'assets/letras-organizadas/Tiempo del Quinto Sol/Hijos del MAiz.txt',
            'tepozan-corazon-basalto': 'assets/letras-organizadas/Tiempo del Quinto Sol/Tepozan Corazon de basalto.txt',
            'tonantzin-madre-viva': 'assets/letras-organizadas/Tiempo del Quinto Sol/Tonantzin madre viva.txt',
            
            // Singles
            'cuatro-dias-distancia': 'assets/letras-organizadas/Singles/Cuatro dias de distancia.txt',
            'no-fue-magia-traicion': 'assets/letras-organizadas/Singles/No Fue Magia (Fue Traicion).txt',

            // Ecos del ayer - El sueño
            'walkman-infancia': 'assets/letras-organizadas/Ecos del ayer - El sueño/El walkman de mi infancia.md',
            'jugar-calle': 'assets/letras-organizadas/Ecos del ayer - El sueño/Jugar en la calle.md',
            'pinata-navidad': 'assets/letras-organizadas/Ecos del ayer - El sueño/la piñata de navidad.md',
            'tv-educo': 'assets/letras-organizadas/Ecos del ayer - El sueño/La tv me educo .md',
            'tortillas-maquinitas': 'assets/letras-organizadas/Ecos del ayer - El sueño/Las tortillas y las maquinitas.md',
            'modem-56k': 'assets/letras-organizadas/Ecos del ayer - El sueño/modem56k.md',
            'videocentro': 'assets/letras-organizadas/Ecos del ayer - El sueño/Videocentro.md',

            // 11-11 11 Canciones 11 Mensajes
            'intro-11-11': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/1, Intro.md',
            'sabios-antiguos': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/2. Sabios Antiguos.md',
            'ia-bendicion-maldicion': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/3. La IA: ¿Bendición o Maldición?.md',
            'gente-poder': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/4. Gente de Poder.md',
            'ellos-saben': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/ 5. Ellos lo Saben.md',
            'diablo-mundo': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/6.- El Diablo en el Mundo.md',
            'iris-ventana-alma': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/7. El Iris: La Ventana del Alma.md',
            'worldcoin-altman': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/ 8. Worldcoin, Altman y las Consecuencias.md',
            'ya-esta-pasando': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/9. Ya Está Pasando.md',
            'abre-ojos': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/10. Abre los Ojos.md',
            'disyuntiva-creador': 'assets/letras-organizadas/11-11 11 Canciones 11 Mensajes/11. La Disyuntiva (Carta del Creador).md',

            // Living Not Easy with Eyes Closed
            'all-those-yesterdays': 'assets/letras-organizadas/Living Not Easy with Eyes Closed/All those yesterdays.txt',
            'dont-imagine-create': 'assets/letras-organizadas/Living Not Easy with Eyes Closed/Don\'t imagine, Create.txt',
            'free-as-a-bird': 'assets/letras-organizadas/Living Not Easy with Eyes Closed/Free as a bird again.txt',
            'i-found-new-love': 'assets/letras-organizadas/Living Not Easy with Eyes Closed/I found a new love.txt',
            'i-was-the-right': 'assets/letras-organizadas/Living Not Easy with Eyes Closed/I was the right.txt',
            'living-not-easy-intro': 'assets/letras-organizadas/Living Not Easy with Eyes Closed/intro.txt',
            'revolution-in-my-life': 'assets/letras-organizadas/Living Not Easy with Eyes Closed/Revolition in my life.txt',
            'shadows-in-the-sun': 'assets/letras-organizadas/Living Not Easy with Eyes Closed/Shadows in the sun.txt'
        };

        const filePath = lyricsMap[songId];
        
        if (filePath) {
            // Try to load the lyrics file
            $.get(filePath)
                .done(function(data) {
                    // Format the lyrics text
                    const formattedLyrics = data.replace(/\n/g, '<br>');
                    $('#lyrics-text').html(formattedLyrics);
                })
                .fail(function() {
                    $('#lyrics-text').html('<p class="text-muted"><i class="fas fa-exclamation-triangle me-2"></i>Letras no disponibles en este momento.</p>');
                });
        } else {
            $('#lyrics-text').html('<p class="text-muted"><i class="fas fa-exclamation-triangle me-2"></i>Letras no disponibles en este momento.</p>');
        }
    }

    // Initialize - show first album
    $('#spoiler-alert').show();
});
