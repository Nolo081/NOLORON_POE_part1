

document.addEventListener("DOMContentLoaded", function () {
    // reffecenced from lecturers poe workshop vid
    const contactForm = document.querySelector(".form-panel form");
    const submitBtn = document.querySelector(".submit-btn");

    //admin email
    const adminEmail = "ST10521269@noloron.co.za"; 

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();


            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }


            const firstName = document.getElementById("first-name").value.trim();
            const lastName = document.getElementById("last-name").value.trim();
            const email = document.getElementById("email").value.trim();
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value.trim();

            // Combines first and last name 
            const fullName = firstName + " " + lastName;

            // applying the regex method validsation style
            const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ \-']*$/;

            if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
                alert("Please enter a valid first and last name.");
                return;
            }

            if (message.length < 10) {
                alert("Your message must contain at least 10 characters.");
                return;
            }

            // stops too much clicks while sending data.
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            try {
               
                const response = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(adminEmail), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: fullName,
                        email: email,
                        service_interested_in: service,
                        message: message,
                        _subject: "NOLORON Website Enquiry / Contact Form",
                        _template: "table"
                    })
                });

                const result = await response.json();

                if (response.ok && (result.success === true || result.success === "true")) {
                    alert("Your information has been sent successfully!");
                    contactForm.reset();
                } else {
                    throw new Error(result.message || "The email service did not confirm submission.");
                }
            } catch (error) {
                console.error("Form submission error:", error);
                alert("Message not confirmed. Please check your connection or try again later.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "SEND MESSAGE →";
            }
        });
    }
    //2. Dark  Light Mode button 
    const themeToggleBtn = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;

    // Check for saved user preference in localStorage
    const savedTheme = localStorage.getItem("noloron_theme");
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            const currentTheme = htmlElement.getAttribute("data-theme");
            
            if (currentTheme === "dark") {
                htmlElement.removeAttribute("data-theme");
                localStorage.setItem("noloron_theme", "light");
            } else {
                htmlElement.setAttribute("data-theme", "dark");
                localStorage.setItem("noloron_theme", "dark");
            }
        });
    }
    //  Live Digital Clock and Date Display
    const clockContainer = document.getElementById("liveClock");

    function updateClock() {
        if (!clockContainer) return;
        const now = new Date();
        
        // Format Date (e.g., Mon, oct, 2026)
        const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-ZA', dateOptions);
        
        // Format Time (e.g., 14:05:32)
        const timeString = now.toTimeString().split(' ')[0];
        
        clockContainer.innerHTML = `<span>${dateString}</span> | <span> ${timeString}</span>`;
    }

    if (clockContainer) {
        setInterval(updateClock, 1000);
        updateClock(); // Initial call
    }

    //  Interactive Card Mouse-Move Effect 
    const interactiveCards = document.querySelectorAll(".project-card, .card, .service-card, .info-card");
    
    interactiveCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // X position inside card
            const y = e.clientY - rect.top;  // Y position inside card
            
            // Apply a subtle dynamic border glow or movement matching mouse position
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            
        });
    });

    // Lightbox & Image Gallery Navigation Logic
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    
    // Collect all zoomable images (.gallery-img and .project-media-large)
    const zoomableImages = document.querySelectorAll(".gallery-img, .project-media-large");
    let currentIndex = 0;
    let lastFocusedElement = null;

    function openLightbox(index) {
        if (!lightbox || zoomableImages.length === 0) return;
        currentIndex = index;
        lastFocusedElement = document.activeElement;
        
        const targetImg = zoomableImages[currentIndex];
        lightboxImg.src = targetImg.src;
        lightboxImg.alt = targetImg.alt || "Enlarged view";
        
        lightbox.removeAttribute("hidden");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Disable background scrolling
        
        lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.setAttribute("hidden", "true");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImg.src = "";
        document.body.style.overflow = ""; // Restore background scrolling
        
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % zoomableImages.length;
        openLightbox(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + zoomableImages.length) % zoomableImages.length;
        openLightbox(currentIndex);
    }

    if (lightbox && zoomableImages.length > 0) {
        zoomableImages.forEach((img, index) => {
            img.addEventListener("click", () => openLightbox(index));
            img.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                }
            });
        });

        if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
        if (lightboxNext) lightboxNext.addEventListener("click", showNextImage);
        if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevImage);

        // Click outside image to close it 
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // navigat
        document.addEventListener("keydown", (e) => {
            if (lightbox.getAttribute("hidden") === null) {
                if (e.key === "Escape") {
                    closeLightbox();
                } else if (e.key === "ArrowRight") {
                    showNextImage();
                } else if (e.key === "ArrowLeft") {
                    showPrevImage();
                }
            }
        });
    }

    // map code
    //incoporated ais knowledge to find which map provider would be best suited as well as most compatable to my websites aestetic
    const mapElement = document.getElementById("contactMap");
    if (mapElement && typeof L !== "undefined") {
        // Coordinates 
        const officeCoords = [-26.2041, 28.0473];
        
        const contactMap = L.map('contactMap', {
            scrollWheelZoom: false
        }).setView(officeCoords, 13);

        // 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(contactMap);

        // 
        L.marker(officeCoords).addTo(contactMap)
            .bindPopup("<b>NOLORON Technologies</b><br>Gauteng, South Africa<br>Built to Solve.")
            .openPopup();
    }
    
});
