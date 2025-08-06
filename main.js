document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const mouseMovement = document.querySelector(".cursor");
    const navbarLinks = document.querySelectorAll(".nav-links li"); 

    menuToggle.addEventListener('click', function () {
        navList.classList.toggle('active');
    });

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            navList.classList.remove('active');
        });
    });

    // Smooth scrolling for cta button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Cursor animation
    window.addEventListener("mousemove", function(e) {
        mouseMovement.style.top = e.pageY + "px";
        mouseMovement.style.left = e.pageX + "px";
    });

    navbarLinks.forEach((link) => {
        link.addEventListener("mouseover", () => {
            mouseMovement.classList.add("link-animate");
            link.classList.add("link-hovering");
        });
        link.addEventListener("mouseleave", () => {
            mouseMovement.classList.remove("link-animate");
            link.classList.remove("link-hovering");
        });
    });

    // Scroll animations
    const sections = document.querySelectorAll('.section');
    const projectCards = document.querySelectorAll('.project-card');
    const contactSection = document.querySelector('.contact-section');
    const contactElements = contactSection ? contactSection.querySelectorAll('label, input, textarea, button') : [];
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Staggered animation for project cards
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // Staggered animation for contact form elements
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate all contact form elements with staggered delays
                    contactElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('animate');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        contactObserver.observe(contactSection);
    }

    // Particle animation for home section
    const canvas = document.getElementById("particle-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particlesArr = [];
        let hue = 0;
        let frame = 0;

        window.addEventListener("resize", () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        });

        const mouse = {
            x: undefined,
            y: undefined,
        };

        canvas.addEventListener("click", (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
            hue += 8;
            if (particlesArr.length < 100) {
                for (let i = 0; i < 50; i++) {
                    particlesArr.push(new Particle());
                }
            }
        });

        canvas.addEventListener("mousemove", (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
            hue += 2;
            if (frame % 2 === 0) {
                for (let i = 0; i < 7; i++) {
                    particlesArr.push(new Particle());
                }
            }
        });

        class Particle {
            constructor() {
                this.x = mouse.x;
                this.y = mouse.y;
                this.size = Math.random() * 15 + 1;
                this.speedX = Math.random() * 5 - 1.5;
                this.speedY = Math.random() * 5 - 1.5;
                this.color = "hsl(" + hue + ",100%,50%)";
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function managePar() {
            for (let i = 0; i < particlesArr.length; i++) {
                for (let j = i; j < particlesArr.length; j++) {
                    const dx = particlesArr[i].x - particlesArr[j].x;
                    const dy = particlesArr[i].y - particlesArr[j].y;
                    const dis = Math.sqrt(dx * dx + dy * dy);

                    if (dis < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = particlesArr[i].color;
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(particlesArr[i].x, particlesArr[i].y);
                        ctx.lineTo(particlesArr[j].x, particlesArr[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
                particlesArr[i].update();
                particlesArr[i].draw();

                if (particlesArr[i].size <= 0.3) {
                    particlesArr.splice(i, 1);
                    i--;
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            managePar();
            frame++;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Particle animation for contact section
    const contactCanvas = document.getElementById("contact-particle-canvas");
    if (contactCanvas) {
        const ctx = contactCanvas.getContext("2d");

        contactCanvas.width = contactCanvas.offsetWidth;
        contactCanvas.height = contactCanvas.offsetHeight;

        const contactParticlesArr = [];
        let contactHue = 0;
        let contactFrame = 0;

        window.addEventListener("resize", () => {
            setTimeout(() => {
                contactCanvas.width = contactCanvas.offsetWidth;
                contactCanvas.height = contactCanvas.offsetHeight;
            }, 100);
        });

        const contactMouse = {
            x: undefined,
            y: undefined,
        };

        contactCanvas.addEventListener("click", (event) => {
            contactMouse.x = event.x;
            contactMouse.y = event.y;
            contactHue += 8;
            if (contactParticlesArr.length < 100) {
                for (let i = 0; i < 50; i++) {
                    contactParticlesArr.push(new ContactParticle());
                }
            }
        });

        contactCanvas.addEventListener("mousemove", (event) => {
            contactMouse.x = event.x;
            contactMouse.y = event.y;
            contactHue += 2;
            if (contactFrame % 2 === 0) {
                for (let i = 0; i < 7; i++) {
                    contactParticlesArr.push(new ContactParticle());
                }
            }
        });

        class ContactParticle {
            constructor() {
                this.x = contactMouse.x;
                this.y = contactMouse.y;
                this.size = Math.random() * 15 + 1;
                this.speedX = Math.random() * 5 - 1.5;
                this.speedY = Math.random() * 5 - 1.5;
                this.color = "hsl(" + contactHue + ",100%,50%)";
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function manageContactPar() {
            for (let i = 0; i < contactParticlesArr.length; i++) {
                for (let j = i; j < contactParticlesArr.length; j++) {
                    const dx = contactParticlesArr[i].x - contactParticlesArr[j].x;
                    const dy = contactParticlesArr[i].y - contactParticlesArr[j].y;
                    const dis = Math.sqrt(dx * dx + dy * dy);

                    if (dis < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = contactParticlesArr[i].color;
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(contactParticlesArr[i].x, contactParticlesArr[i].y);
                        ctx.lineTo(contactParticlesArr[j].x, contactParticlesArr[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
                contactParticlesArr[i].update();
                contactParticlesArr[i].draw();

                if (contactParticlesArr[i].size <= 0.3) {
                    contactParticlesArr.splice(i, 1);
                    i--;
                }
            }
        }

        function animateContact() {
            ctx.clearRect(0, 0, contactCanvas.width, contactCanvas.height);
            manageContactPar();
            contactFrame++;
            requestAnimationFrame(animateContact);
        }
        animateContact();
    }

    // Floating input animation
    const inputs = document.querySelectorAll(".input input.inside-input");
    inputs.forEach(input => {
        input.addEventListener("focus", function () {
            if (!this.classList.contains("onFocus")) {
                this.classList.add("onFocus");
            }
        });

        input.addEventListener("blur", function () {
            if (this.value === "" && this.classList.contains("onFocus")) {
                this.classList.remove("onFocus");
            }
        });
    });

    // Clear form after submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            // Allow the form to submit normally to Formspree
            // After a short delay, clear the form fields
            setTimeout(function () {
                contactForm.reset();
                
                // Remove the onFocus class from all inputs
                inputs.forEach(input => {
                    input.classList.remove("onFocus");
                });
            }, 1000);
        });
    }
});
