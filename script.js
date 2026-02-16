
        // Initialize Lucide icons
        lucide.createIcons();
        
        // Division toggle function
        function toggleDivision(element, divisionId) {
            const checkbox = element.querySelector('input[type="checkbox"]');
            const checkIcon = element.querySelector('.check-icon');
            
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                element.classList.add('selected');
                checkIcon.classList.remove('hidden');
            } else {
                element.classList.remove('selected');
                checkIcon.classList.add('hidden');
            }
        }
        
        // Form submission handler - WhatsApp Integration
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loader
            const btnText = document.getElementById('btnText');
            const btnLoader = document.getElementById('btnLoader');
            const btnIcon = document.getElementById('btnIcon');
            const submitBtn = document.getElementById('submitBtn');
            
            btnText.textContent = 'Opening WhatsApp...';
            btnLoader.classList.remove('hidden');
            btnIcon.classList.add('hidden');
            submitBtn.disabled = true;
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const age = document.getElementById('age').value;
            
            // Get selected divisions
            const divisions = [];
            document.querySelectorAll('input[name="divisions"]:checked').forEach(function(checkbox) {
                divisions.push(checkbox.value);
            });
            
            // Validate at least one division is selected
            if (divisions.length === 0) {
                document.getElementById('divisionError').classList.remove('hidden');
                btnText.textContent = 'Submit Registration';
                btnLoader.classList.add('hidden');
                btnIcon.classList.remove('hidden');
                submitBtn.disabled = false;
                return;
            } else {
                document.getElementById('divisionError').classList.add('hidden');
            }
            
            const experience = document.getElementById('experience').value;
            const skills = document.getElementById('skills').value;
            const whyJoin = document.getElementById('whyJoin').value;
            const availability = document.getElementById('availability').value;
            
            // Format message for WhatsApp
            let message = `*New Media Team Registration* 📹\n\n`;
            message += `*Personal Information*\n`;
            message += `Name: ${fullName}\n`;
            message += `Email: ${email}\n`;
            message += `Phone: ${phone}\n`;
            message += `Age/Grade: ${age}\n\n`;
            message += `*Selected Divisions*\n`;
            message += `${divisions.join(', ')}\n\n`;
            message += `*Experience & Skills*\n`;
            message += `Experience Level: ${experience || 'Not specified'}\n`;
            message += `Skills: ${skills || 'None specified'}\n\n`;
            message += `*Why Join:*\n${whyJoin}\n\n`;
            message += `*Availability:* ${availability}`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // WhatsApp API URL - Using Ghana number format (233 + number without leading 0)
            // Original number: 0574168196 -> International: 233574168196
            const whatsappNumber = '233574168196';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Show success message
            document.getElementById('confirmationEmail').textContent = email;
            document.getElementById('registrationForm').classList.add('hidden');
            document.getElementById('successMessage').classList.remove('hidden');
            document.getElementById('successMessage').classList.add('fade-in');
            
            // Reset button state
            btnText.textContent = 'Submit Registration';
            btnLoader.classList.add('hidden');
            btnIcon.classList.remove('hidden');
            submitBtn.disabled = false;
            
            // Re-initialize lucide icons for the success message
            lucide.createIcons();
        });
        
        // Reset form function
        function resetForm() {
            document.getElementById('registrationForm').reset();
            document.getElementById('registrationForm').classList.remove('hidden');
            document.getElementById('successMessage').classList.add('hidden');
            document.getElementById('successMessage').classList.remove('fade-in');
            
            // Reset division cards visual state
            document.querySelectorAll('.division-card').forEach(card => {
                card.classList.remove('selected');
                const checkIcon = card.querySelector('.check-icon');
                if (checkIcon) checkIcon.classList.add('hidden');
            });
            
            // Reset checkboxes
            document.querySelectorAll('input[name="divisions"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
