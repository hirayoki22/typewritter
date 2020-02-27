class typingEffect {
    constructor(typedText, words, wait = 3000) {
        this.typedText = typedText;
        this.words = words;
        this.wait = wait;
        this.text = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.typing();
    }

    typing() {
        // Get the current word index
        let currentWordIndex = this.wordIndex % this.words.length;

        // Get the current word's value
        let actualWord = this.words[currentWordIndex];

        if (this.isDeleting) {
            this.text = actualWord.substring(0, this.text.length - 1);
        } else {
            this.text = actualWord.substring(0, this.text.length + 1);
        }

        // Insert the word
        this.typedText.innerHTML = `${this.text}<span class="caret"></span>`;

        let typingSpeed = !this.isDeleting ? 200 : 100;

        if (!this.isDeleting && this.text === actualWord) {
            typingSpeed = this.wait;
            this.isDeleting = true;
            
            setTimeout(() => {
                document.querySelector('.caret')
                .style.animation = 'pulseEffect 1s step-end infinite';
            }, 500);
        } 
        else if(this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typingSpeed = 500;
        }

        setTimeout(() => this.typing(), typingSpeed);
    }
}

function initEffect() {
    let typedText = document.querySelector('.typed-text');
    let words = JSON.parse(typedText.dataset.words);
    let wait = parseInt(typedText.dataset.wait, 10);

    return new typingEffect(typedText, words, wait);
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', initEffect);