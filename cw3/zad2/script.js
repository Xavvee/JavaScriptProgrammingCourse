const deleteButton = document.getElementById("delete")
const setButton = document.getElementById("set")
const concertText="Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi, cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął policzki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki, wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapas ducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę muzykę i podwaja echem.<p></p> Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy.<p></p> Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."

const addButton = document.querySelector('#add')
const mainElement = document.querySelector('main')

document.getElementById('delete').onclick=resetStyles;
document.getElementById('set').onclick=setStyles;

function resetStyles(){

    var all = document.getElementsByTagName("*");
    console.log(all)
    for (var i=0, max=all.length; i < max; i++) {
        all[i].classList = [];
    }
    

}

function setStyles(){
    document.getElementsByTagName('header')[0].classList.add('azure');
    document.getElementsByTagName('header')[0].classList.add('borderer');
    document.getElementsByTagName('header')[0].classList.add('marginer');
    document.getElementsByTagName('div')[0].classList.add('flexian');
    document.getElementsByTagName('div')[0].classList.add('marginer');
    document.getElementsByTagName('div')[1].classList.add('leftCollumn');
    document.getElementsByTagName('div')[2].classList.add('rightCollumn');
    document.getElementsByTagName('nav')[0].classList.add('azure');
    document.getElementsByTagName('nav')[0].classList.add('borderer');
    document.getElementsByTagName('main')[0].classList.add('azure');
    document.getElementsByTagName('main')[0].classList.add('borderer');
    document.getElementsByTagName('aside')[0].classList.add('azure');
    document.getElementsByTagName('aside')[0].classList.add('borderer');
    document.getElementsByTagName('footer')[0].classList.add('azure');
    document.getElementsByTagName('footer')[0].classList.add('borderer');
    document.getElementsByTagName('footer')[0].classList.add('marginer');
    document.getElementsByTagName('h1')[0].classList.add('colorChange');
    document.getElementsByTagName('h1')[1].classList.add('colorChange');
    document.getElementsByTagName('h1')[2].classList.add('colorChange');
}


deleteButton.addEventListener("click", (event)=>{
    resetStyles;
} )

setButton.addEventListener("click", (event)=>{
    setStyles;
})

let currentIndex = 0;

function addConcertParagraph() {
    const paragraphs = concertText.split('<p></p>');
    if (currentIndex < paragraphs.length) {
      const paragraph = document.createElement('p');
      paragraph.textContent = paragraphs[currentIndex].trim();
      mainElement.appendChild(paragraph);
      currentIndex++;
    }
  
    if (currentIndex === paragraphs.length) {
      addButton.disabled = true;
    }
  }

addButton.addEventListener('click', addConcertParagraph);