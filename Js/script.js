

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
    
});
