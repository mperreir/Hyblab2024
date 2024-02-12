"use strict";

/* --- INIT --- */
let conversation = $(".conversation");
let arrowDown = $(".conversation-arrow-down");
let isTimeoutActive = false;
var name_user = "Vous";

/* --- OTHER FUNCTIONS --- */
function saveUsername(event){
    if (event.key === 'Enter') {
        name_user = document.getElementById("username_input").value;

        // remove all choices
        let choiceBubbles = $('.choices');
        choiceBubbles.remove();
                
        //exemple of the following conversation
        addVideo(["Ceci est le choix 1","Ceci est le choix 2","Ceci est le choix 3","Ceci est le choix 4"]);
    }
}

/* --- CONVERSATION FUNCTIONS --- */
/* Users speech bubble. content parameter must be an array*/
function addBubbleUser(content) {
    conversation.queue(function (next) {
        // put content into html
        let userBubbles = '<div class="rp_user"><p class="name_user">'+ name_user +'</p><ul>';
        content.forEach(textContentGuide => {
            userBubbles += '<li class="cont_user">' + textContentGuide + '</li>';
        });
        userBubbles += '</ul></div>';

        let responseBubbleUser = $(userBubbles);
        conversation.append(responseBubbleUser);// add html to conversation div

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight('.rp_user'));

        responseBubbleUser.show();
        setTimeout(next, 750);
    });
}

/* Guides speech bubbles. content parameter must be an array*/
function addBubbleGuide(content) {
    conversation.queue(function (next) {
        // put content into html
        let guideBubbles = '<div class="rp_guide"><p class="name_guide">Guide</p><ul>';
        content.forEach(textContentGuide => {
            guideBubbles += '<li class="cont_guide">' + textContentGuide + '</li>';
        });
        guideBubbles += '</ul></div>';

        let responseBubbleGuide = $(guideBubbles);
        conversation.append(responseBubbleGuide);// add html to conversation div

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight('.rp_guide'));

        // Then show speech bubble
        responseBubbleGuide.show();
        setTimeout(next, 750);
    });
}

/* choice bubble. content parameter must be an array */
function addChoiceBubble(content, typeChoices) {
    conversation.queue(function (next) {
        // put content into html
        // let choiceBubblesContent = document.createElement('div');
        // choiceBubblesContent.classList.add('choices');

        // if(typeChoices){
        //     content.forEach(textContentChoice => {
        //         let choiceBubble = document.createElement('button');
        //         choiceBubble.classList.add('choice-bubbles');
        //         choiceBubble.setAttribute('onClick', 'choiceSelected(this)');
        //         choiceBubble.textContent = textContentChoice;
    
        //         choiceBubblesContent.append(choiceBubble);
        //     });
        // }
        // else{
        //     choiceBubblesContent.setAttribute('id', 'firstChoice');

        //     let choiceBubble = document.createElement('label');
        //     choiceBubble.setAttribute('for', 'username_input');

        //     let username_input = document.createElement('input');
        //     username_input.setAttribute('type','text');
        //     username_input.setAttribute('id','username_input');
        //     username_input.setAttribute('name','username_input')
        //     username_input.required = true;
        //     username_input.setAttribute('minlength','2');
        //     username_input.setAttribute('maxlength','20');
        //     username_input.setAttribute('size','10');
        //     username_input.setAttribute('onkeydown','saveUsername(event)');

        //     choiceBubble.textContent = 'Bonjour, je m’appelle';

        //     choiceBubble.append(username_input);

        //     choiceBubblesContent.append(choiceBubble);
        // }
        let choiceBubblesContent = '<div class="choices">';
        if(typeChoices){
            content.forEach(textContentChoice => {
                choiceBubblesContent += '<button class="choice-bubbles" onclick="choiceSelected(this)">'+ textContentChoice + '</button>';
            });
        }
        else{
            choiceBubblesContent = '<div class="choices" id="firstChoice"><label for="username_input">Bonjour, je m’appelle <input type="text" id="username_input" name="username_input" required minlength="2" maxlength="20" size="10" onkeydown="saveUsername(event)"/> ! </label>';
        }
        choiceBubblesContent += '</div>';
        
        let choiceBubbles = $(choiceBubblesContent);
        conversation.append(choiceBubblesContent);// add html to conversation div

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight('.choices'));

        // Then show speech bubble
        choiceBubbles.show();
        setTimeout(next, 750);

        // choiceBubblesContent.removeAttribute('firstChoice');
    });
}

/* add video in conversation  */
function addVideo(content) {
    conversation.queue(function (next) {
        // put content into html
        let video = $('<div class="rp_guide"><p class="name_guide">Guide</p><iframe class="videos" src="https://www.youtube.com/embed/4wR5ubwNarE?si=bT3NZbn262FIpfp2&start=193&end=294&controls=0" title="YouTube video player" frameborder="0"></iframe></div>');
        
        conversation.append(video);// add html to conversation div

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight('.rp_guide'));

        // Then show speech bubble
        video.show();
        setTimeout(next, 750);
    });
}

/* Once choice is selected, we put a bubble user with the answer, and the following conversation  */
function choiceSelected(btnChoiceSelected){
    let textChoice = btnChoiceSelected.textContent || bouton.innerText; // get text content of the choiceBubble selected

    // remove all choices
    let choiceBubbles = $('.choices');
    choiceBubbles.remove();

    //add bubble user
    addBubbleUser([textChoice]);

    //exemple of the following conversation
    addBubbleGuide(["Très bien maintenant choisi un choix parmi ces choix:"]);

    addChoiceBubble(["Ceci est le choix 1","Ceci est le choix 2","Ceci est le choix 3","Ceci est le choix 4","Ceci est le choix 5","Ceci est le choix 6"], true);
}

/* --- AUTOMATIC SCROLL FUNCTIONS --- */

/* Change scroll value of conversation div */
function scrollConversation(offset) {
    conversation.animate({
        scrollTop: '+=' + offset
    }, 500);
}

/* get last speech bubble height */
function getLastBubbleHeight(typeBubble) {
    let lastBubble = conversation.find(typeBubble+':last');
    return lastBubble.outerHeight(true);
}

/* --- IMPLEMENTATION --- */

// Initial speech bubbles


addBubbleGuide(["Bonjour 🤑, bienvenue au quartier de XXXXXX, je peux te guider !","Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !"]);
addBubbleUser(["Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier."]);
addChoiceBubble([],false);

// conversation.dequeue();
// Add speech bubbles
arrowDown.on("click", function () {
    if (!isTimeoutActive) {
        isTimeoutActive = true;

        addBubbleGuide(["Et oui, il en existe plein ! Comme l’association Mosaïque par exemple, qui depuis 2003, s’est lancée dans l’aide aux devoirs. D’ailleurs, en 2023, ils ont aidé onze élèves à obtenir leur brevet des collèges. Bon je ne t’en dis pas plus, Natacha le raconte mieux que moi !"]);
   
        addChoiceBubble(["Ceci est le choix 1","Ceci est le choix 2","Ceci est le choix 3","Ceci est le choix 4","Ceci est le choix 5","Ceci est le choix 6"], true);
        
        // conversation.dequeue();
        isTimeoutActive = false;
    }
});

function scrollSmoothlyToBottom() {
    let div = $("#villejean-conversation");
    console.log("Before Animation - scrollTop:", div.scrollTop());

    div.animate({
        scrollTop: div.prop("scrollHeight")
    }, {
        duration: 1000,
        complete: function () {
            console.log("After Animation - scrollTop:", div.scrollTop());
        }
    });
 };

function addBubble(bubbleJson) {
    let bubbles;
    let responseBubbles;

    console.log(bubbleJson);

    if (bubbleJson["speaker"] == "user") {
        // put content into html
        bubbles = '<div class="rp_user"><p class="name_user">'+ name_user +'</p><ul>';

        bubbleJson["content"].forEach(content => {
            bubbles += '<li class="cont_user">' + content + '</li>';
        });
        bubbles += '</ul></div>';

        responseBubbles = $(bubbles);
        conversation.append(responseBubbles);// add html to conversation div

        // Scroll according to messages height
        //scrollConversation(getLastBubbleHeight('.rp_user'));

    } else {
        // put content into html
        bubbles = '<div class="rp_guide"><p class="name_guide">Guide</p><ul>';
        bubbleJson["content"].forEach(content => {
            bubbles += '<li class="cont_guide">' + content + '</li>';
        });
        bubbles += '</ul></div>';

        responseBubbles = $(bubbles);
        conversation.append(responseBubbles);// add html to conversation div

        // Scroll according to messages height
        //scrollConversation(getLastBubbleHeight('.rp_guide'));
    }

    setTimeout(() => { 
        scrollSmoothlyToBottom();
    }, 900);
}

/*
fetch('./data/villejean.json')
    .then((response) => response.json())
    .then((bubbles) => {
        console.log(bubbles);

        let nextBubble = bubbles["Debut"];
        console.log(nextBubble);

        let i = 0;
        while (i < 10) {
            setTimeout(() => {
                addBubble(nextBubble);

            }, 1000*i);
            i++;
        }

        //nextBubble = nextBubble["next"];
    });

*/