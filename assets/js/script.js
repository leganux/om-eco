// OM&ECO Website JavaScript
$(document).ready(function() {
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000, 'easeInOutExpo');
        }
    });

    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Scroll indicator click
    $('.scroll-indicator').click(function() {
        $('html, body').animate({
            scrollTop: $('#about').offset().top - 70
        }, 1000, 'easeInOutExpo');
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.section-title, .about-content, .album-card, .story-card, .contact-item').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    // Counter animation for stats
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count') || $this.text();
            
            if (countTo === '∞') return; // Skip infinity symbol
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger animations on scroll
    $(window).scroll(animateOnScroll);
    animateOnScroll(); // Initial check

    // Trigger counter animation when stats section is visible
    var statsAnimated = false;
    $(window).scroll(function() {
        var statsSection = $('.about-stats');
        if (statsSection.length) {
            var elementTop = statsSection.offset().top;
            var elementBottom = elementTop + statsSection.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom && !statsAnimated) {
                animateCounters();
                statsAnimated = true;
            }
        }
    });

    // Album play button interaction
    $('.play-overlay').click(function() {
        // Add your music player logic here
        location.href = 'https://open.spotify.com/intl-es/artist/7orGHgkV2fHX9wYdULldqa'; // Replace with actual album link
    });

    
   
    // Contact form functionality (if needed in the future)
    function initContactForm() {
        // Contact form logic can be added here
        console.log('Contact form ready');
    }

    // Removed parallax effect to fix section overlap issue

    // Typing effect for hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.text('');
        
        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect
    setTimeout(function() {
        typeWriter($('.hero-subtitle'), 'Donde las emociones se convierten en arte', 80);
    }, 1000);

    // Skill tags hover effect
    $('.skill-tag').hover(
        function() {
            $(this).addClass('pulse');
        },
        function() {
            $(this).removeClass('pulse');
        }
    );

    // Music genre rotation
    const genres = ['Balada Pop', 'Rock', 'Reggae', 'Composición Original', 'IA Musical'];
    let currentGenre = 0;
    
    function rotateGenres() {
        const genreElement = $('.rotating-genre');
        if (genreElement.length) {
            genreElement.fadeOut(300, function() {
                $(this).text(genres[currentGenre]).fadeIn(300);
                currentGenre = (currentGenre + 1) % genres.length;
            });
        }
    }

    // Start genre rotation if element exists
    if ($('.rotating-genre').length) {
        setInterval(rotateGenres, 3000);
    }

    // Image lazy loading
    function lazyLoadImages() {
        $('img[data-src]').each(function() {
            var img = $(this);
            var imgTop = img.offset().top;
            var imgBottom = imgTop + img.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (imgBottom > viewportTop && imgTop < viewportBottom) {
                img.attr('src', img.attr('data-src')).removeAttr('data-src');
            }
        });
    }

    $(window).scroll(lazyLoadImages);
    lazyLoadImages(); // Initial check

    // Mobile menu enhancement
    $('.navbar-toggler').click(function() {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.navbar-nav .nav-link').click(function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // Add loading animation
    function showLoading() {
        $('body').addClass('loading');
    }

    function hideLoading() {
        $('body').removeClass('loading');
    }

    // Hide loading when page is fully loaded
    $(window).on('load', function() {
        hideLoading();
    });

    // Easter egg - Konami code
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var konamiIndex = 0;

    $(document).keydown(function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated
                $('body').addClass('rainbow-mode');
                alert('🎵 ¡Modo arcoíris activado! ¡OM&ECO te saluda! 🎵');
                konamiIndex = 0;
                
                setTimeout(function() {
                    $('body').removeClass('rainbow-mode');
                }, 10000);
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Lyrics functionality
    const lyricsData = {
        'aun-de-pie': {
            title: 'Aún de Pie',
            file: 'Aun de pie.txt'
        },
        'ca-chi-pa': {
            title: 'Ca Chi Pa Verdad y Libertad',
            file: 'Ca chi pa verdad y libertad.txt'
        },
        'circuitos-rotos': {
            title: 'Circuitos Rotos',
            file: 'Circuitos rotos.txt'
        },
        'hacer-lo-correcto': {
            title: 'Hacer lo Correcto',
            file: 'Hacer lo Correcto.txt'
        },
        'karma-vs-darma': {
            title: 'Karma vs Darma',
            file: 'Karma vs darma.txt'
        },
        'perdi': {
            title: 'Perdí',
            file: 'Perdí.txt'
        },
        'protagonista': {
            title: 'Protagonista',
            file: 'Protagonista.txt'
        },
        'spinoff': {
            title: 'Spinoff el Final Alternativo',
            file: 'Spinoff el final alternativo.txt'
        },
        'verdad-que-sana': {
            title: 'Verdad que Sana',
            file: 'Verdad que sana.txt'
        }
    };

    // Handle lyrics selection
    $('#lyricsSelect').change(function() {
        const selectedSong = $(this).val();
        const lyricsContent = $('#lyricsContent');
        
        if (!selectedSong) {
            lyricsContent.html(`
                <div class="lyrics-placeholder text-center">
                    <i class="fas fa-music fa-3x mb-3 text-muted"></i>
                    <p class="text-muted">Selecciona una canción para ver sus letras</p>
                </div>
            `);
            return;
        }

        // Show loading
        lyricsContent.html(`
            <div class="lyrics-loading">
                <div class="spinner"></div>
                <p>Cargando letras...</p>
            </div>
        `);

        // Load lyrics from file
        const songData = lyricsData[selectedSong];
        if (songData) {
            $.get(`assets/letras/${songData.file}`)
                .done(function(data) {
                    lyricsContent.html(`
                        <div class="song-title">${songData.title}</div>
                        <div class="lyrics-text">${data}</div>
                    `);
                })
                .fail(function() {
                    lyricsContent.html(`
                        <div class="lyrics-placeholder text-center">
                            <i class="fas fa-exclamation-triangle fa-3x mb-3 text-warning"></i>
                            <p class="text-muted">Error al cargar las letras. Inténtalo de nuevo.</p>
                        </div>
                    `);
                });
        }
    });

    // Initialize all functions
    initContactForm();
    
    console.log('OM&ECO Website loaded successfully! 🎵');
});

// jQuery easing plugin for smooth animations
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});
