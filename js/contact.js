document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation simple des champs
            if (!name || !email || !subject || !message) {
                showNotification('Veuillez remplir tous les champs du formulaire.', 'error');
                return;
            }
            
            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Dans un cas réel, vous enverriez les données à un backend
            // Ici, nous simulons une requête réussie
            
            // Simuler un délai de traitement
            setTimeout(() => {
                // Afficher un message de succès
                showNotification('Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais.', 'success');
                
                // Réinitialiser le formulaire
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Fonction pour afficher les notifications
    function showNotification(message, type) {
        // Vérifier si une notification existe déjà
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Ajouter la notification au document
        document.body.appendChild(notification);
        
        // Afficher la notification avec animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Configurer le bouton de fermeture
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Fermer automatiquement après 5 secondes pour les messages de succès
        if (type === 'success') {
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        }
    }
}); 