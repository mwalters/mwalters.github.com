
function alert_invalid_field(message, element, alerted) {
    if ( ! alerted ) { alert(message); }
    element.className += " field-required";
}

(function() {

    var submitContact = document.getElementById('contact-submit');

    submitContact.addEventListener('click', function(e) {

        var name = document.getElementById('contact-name'),
            email = document.getElementById('contact-email'),
            subject = document.getElementById('contact-subject'),
            message = document.getElementById('contact-message'),
            alerted = false;

        if ( name.value === '' ) {
            e.preventDefault();
            alert_invalid_field('Name is a required field', name, alerted);
            alerted = true;
        }

        if ( email.value === '' ) {
            e.preventDefault();
            alert_invalid_field('Email is a required field', email, alerted);
            alerted = true;
        }

        if ( subject.value === '' ) {
            e.preventDefault();
            alert_invalid_field('Subject is a required field', subject, alerted);
            alerted = true;
        }

        if ( message.value === '' ) {
            e.preventDefault();
            alert_invalid_field('Message is a required field', message, alerted);
        }

    }, false);


})();
