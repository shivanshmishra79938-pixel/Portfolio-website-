/**
 * SHIVANSH MISHRA - PORTFOLIO SCRIPT
 * Premium Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Loading Screen
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader-wrapper');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower effect
    setInterval(() => {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        follower.style.left = (posX - 15) + 'px';
        follower.style.top = (posY - 15) + 'px';
    }, 10);

    // Cursor scale on hover
    const links = document.querySelectorAll('a, button, .project-card, .skill-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.background = 'rgba(212, 175, 55, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.background = 'transparent';
        });
    });

    // 3. Sticky Navbar & Scroll Progress
    const navbar = document.querySelector('.navbar');
    const progressBar = document.getElementById('progressBar');
    const backToTop = document.getElementById('backToTop');

    window.onscroll = () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Progress Bar
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Scroll Spy (Active Link)
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('.nav-links a[href*=' + id + ']').classList.add('active');
                });
            }
        });

        // Trigger Counter
        revealCounter();
    };

    backToTop.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 4. Mobile Menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Close menu on click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navItems.forEach(link => link.style.animation = '');
        });
    });

    // 5. Typewriter Effect
    const typewriterElement = document.querySelector('.typewriter');
    const words = JSON.parse(typewriterElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 6. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 400);
                }
            });
        });
    });

    // 7. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-scroll');
    
    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            let windowHeight = window.innerHeight;
            let revealTop = revealElements[i].getBoundingClientRect().top;
            let revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                revealElements[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 8. Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    let countTriggered = false;

    function revealCounter() {
        const statsSection = document.querySelector('.stats-grid');
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !countTriggered) {
            counters.forEach(counter => {
                counter.innerText = '0';
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target');
                    const c = +counter.innerText;
                    const increment = target / 50;

                    if (c < target) {
                        counter.innerText = `${Math.ceil(c + increment)}`;
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCounter();
            });
            countTriggered = true;
        }
    }

    // 9. Button Ripple Effect
    const rippleButtons = document.querySelectorAll('.ripple');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple-span');
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });
});

// CSS for ripple effect dynamically injected
const style = document.createElement('style');
style.innerHTML = `
    .ripple-span {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        pointer-events: none;
        border-radius: 50%;
        animation: animateRipple 1s linear infinite;
    }
    @keyframes animateRipple {
        0% { width: 0px; height: 0px; opacity: 0.5; }
        100% { width: 500px; height: 500px; opacity: 0; }
    }
`;
document.head.appendChild(style);
