import './style.css'
import ancientsData from './src/data/ancients'
import cards from './src/data/mythicCards/index'
import backSide from './src/assets/mythicCardBackground.jpg'

const ancientsContainer = document.querySelector('.ancients-container')
const hideDificulties = document.querySelector('.hide-dificulties-container')
const veryEasy = document.getElementById('very-easy')
const easy = document.getElementById('easy')
const normal = document.getElementById('normal')
const hard = document.getElementById('hard')
const veryHard = document.getElementById('very-hard')
const backside = document.querySelector('.backside')
const frontSide = document.querySelector('.front-side')
const mixUp = document.querySelector('.mix-up')
const cardContainer = document.querySelector('.card-container')
const cardBackside = document.querySelector('.backside')
const cardFrontside = document.querySelector('.front-side')
const stageContainer = document.querySelector('.stage-container')
const firstGreen = document.getElementById('first-green')
const firstBrown = document.getElementById('first-brown')
const firstBlue = document.getElementById('first-blue')
const secondGreen = document.getElementById('second-green')
const secondBrown = document.getElementById('second-brown')
const secondBlue = document.getElementById('second-blue')
const thirdGreen = document.getElementById('third-green')
const thirdBrown = document.getElementById('third-brown')
const thirdBlue = document.getElementById('third-blue')

let currentStage = 'firstStage'
let finalPack = []
let currentBoss;
let currentDificult;
let isGameStarted = false
let finalCardsArr = []





function createHtmlEl(tagName, className, background, id) {
    const element = document.createElement(tagName)
    element.className = className
    background && (element.style.backgroundImage = `url(${background})`)
    element.id = id
    return element
}

const bossCards = ancientsData.map(el => createHtmlEl('div', 'ancient-card', el.cardFace, el.id))
ancientsContainer.append(...bossCards)



function updateCircles() {
    firstGreen.textContent = currentBoss.firstStage.greenCards
    firstBrown.textContent = currentBoss.firstStage.brownCards
    firstBlue.textContent = currentBoss.firstStage.blueCards
    secondGreen.textContent = currentBoss.secondStage.greenCards
    secondBrown.textContent = currentBoss.secondStage.brownCards
    secondBlue.textContent = currentBoss.secondStage.blueCards
    thirdGreen.textContent = currentBoss.thirdStage.greenCards
    thirdBrown.textContent = currentBoss.thirdStage.brownCards
    thirdBlue.textContent = currentBoss.thirdStage.blueCards
}



bossCards.forEach(el => el.addEventListener('click', (e) => {
    const bossName = e.target.id
    currentBoss = JSON.parse(JSON.stringify(ancientsData.find(function (boss) {
        return boss.id === bossName
    })))
    cardFrame(e.target)
    hideDificulties.classList.remove('hide-dificulties-container')

    mixUp.classList.add('hide-mix-up')
    stageContainer.classList.add('hide-stage-container');
    cardContainer.classList.add('hide-card-container');

    [veryEasy, easy, normal, hard, veryHard].forEach(el => {
        el.classList.remove('chose-didificult')
    })
}))

function cardFrame(activeElement) {
    bossCards.forEach(element => {
        element.classList.remove('activeBoss')
        activeElement.classList.add('activeBoss')
    })
}



[veryEasy, easy, normal, hard, veryHard].forEach((el, idx, arr) => el.addEventListener('click', (e) => {
    currentDificult = e.target.id
    arr.forEach(el => el.classList.remove('chose-didificult'))
    
    isGameStarted && (cardContainer.replaceChildren())

    if (isGameStarted) {
        console.log(isGameStarted);
        currentBoss = JSON.parse(JSON.stringify(ancientsData.find(function (boss) {
        return boss.id === currentBoss.id
    })))}

    isGameStarted && (currentStage = 'firstStage')
    updateCircles()

    e.target.classList.add('chose-didificult')
    createFirstPack()
    mixUp.classList.remove('hide-mix-up')

}))

function createFirstPack() {
    const {firstStage, secondStage, thirdStage} = currentBoss
    const cardCountGreen = firstStage.greenCards + secondStage.greenCards + thirdStage.greenCards
    const  cardCountBrown = firstStage.brownCards + secondStage.brownCards + thirdStage.brownCards    
    const cardCountBlue = firstStage.blueCards + secondStage.blueCards + thirdStage.blueCards
    let greenPack;
    let brownPack;
    let bluePack;
    if (currentDificult === 'very-easy') {
        greenPack = takeFirstCase('greenCards', cardCountGreen)
        brownPack = takeFirstCase('brownCards', cardCountBrown)
        bluePack = takeFirstCase('blueCards', cardCountBlue)
    }
    if (currentDificult === 'easy') {
        greenPack = takeSecondCase('greenCards')
        brownPack = takeSecondCase('brownCards')
        bluePack = takeSecondCase('blueCards')
    }
    if (currentDificult === 'normal') {
        greenPack = takeThirdCase('greenCards')
        brownPack = takeThirdCase('brownCards')
        bluePack = takeThirdCase('blueCards')
    }
    if (currentDificult === 'hard') {
        greenPack = takeFourthCase('greenCards')
        brownPack = takeFourthCase('brownCards')
        bluePack = takeFourthCase('blueCards')
    }
    if (currentDificult === 'very-hard') {
        greenPack = takeFifthCase('greenCards', cardCountGreen)
        brownPack = takeFifthCase('brownCards', cardCountBrown)
        bluePack = takeFifthCase('blueCards', cardCountBlue)
    }
    let cutGreenPack = cutCardPack(greenPack, cardCountGreen)
    let cutBrownPack = cutCardPack(brownPack, cardCountBrown);
    let cutBluePack = cutCardPack(bluePack, cardCountBlue);

    let randomGreenPack = getRandomPack(cutGreenPack)
    let randomBrownPack = getRandomPack(cutBrownPack)
    let randomBluePack = getRandomPack(cutBluePack)

    const firstStagePack =  getStagePack(randomBluePack, randomBrownPack, randomGreenPack, currentBoss.firstStage)
}

function getRandomPack(arr) {
    let newArr = [...arr]
        let j, temp;
        for(let i = newArr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = newArr[j];
            newArr[j] = newArr[i];
            newArr[i] = temp;
        }
        return newArr;
    }
 
function cutCardPack(pack, needCardCount) {
    let finalPack = [];
    for(let i = 0; i < needCardCount; i++) {
        const randomIndex = Math.floor(Math.random() * pack.length);
        pack = pack.filter((el, index) => {
            if (index === randomIndex) {
                finalPack.push(el)
                return false
            }
            return true
        })
    }
    return finalPack
}

function takeFirstCase(cardColor, bossCardsCount) {
    let easyCards = cards[cardColor].filter(el=> {
        return el.difficulty === 'easy'
    })
    if (bossCardsCount - easyCards.length <= 0) {
        return easyCards
    }
    if (bossCardsCount - easyCards.length > 0) {
        let odds = bossCardsCount - easyCards.length
        let normalCards = cards[cardColor].filter(el => el.difficulty === 'normal')
        for(let i = 0; i < odds; i++) {
            const randomIndex = Math.floor(Math.random() * normalCards.length);
            normalCards = normalCards.filter((el, index) => {
                if (index === randomIndex) {
                    easyCards.push(el)
                    return false
                }
                return true
            })
        }
        return easyCards
    }
}

function takeSecondCase(cardColor) {
    return cards[cardColor].filter(el=> {
        return el.difficulty === 'easy' || el.difficulty === 'normal'
    })
}

function takeThirdCase(cardColor) {
    return cards[cardColor]
}

function takeFourthCase(cardColor) {
    return cards[cardColor].filter((el=> {
        return el.difficulty === 'normal' || el.difficulty === 'hard'
    }))
}

mixUp.addEventListener('click', (e) => {
    mixUp.classList.add('hide-mix-up')
    cardContainer.classList.remove('hide-card-container')
    stageContainer.classList.remove('hide-stage-container')

    isGameStarted = true

    

    finalCardsArr = finalPack.map((el, id) => {
        console.log(el);
        const front = createHtmlEl('div', 'front-side', el.cardFace) 
        front.classList.add('card')
        const back = createHtmlEl('div', 'backside', backSide, el.color)
        back.classList.add('card')
        const cardContainer = createHtmlEl('div', 'cardWrapper', null, id)
        cardContainer.style.zIndex = 15 - id
        cardContainer.append(front, back)

        cardContainer.addEventListener('click', (e) => {
                cardContainer.classList.toggle('cardWrapperOpen')
                cardContainer.style.zIndex = id
                back.classList.toggle('hide-backside')
                front.classList.toggle('show-front-side')
                console.log(e.target.id);
                checkCard(e.target.id)
            })

        return cardContainer
    }).reverse()
 console.log(finalCardsArr)
    cardContainer.append(...finalCardsArr)

    updateCircles()
}
)



const checkCard = (color) => {
    console.log(currentBoss)
    let  currentFirstStageCount = currentBoss.firstStage.greenCards + currentBoss.firstStage.brownCards + currentBoss.firstStage.blueCards
    let  currentSecondStageCount = currentBoss.secondStage.greenCards + currentBoss.secondStage.brownCards + currentBoss.secondStage.blueCards
    let  currentThirdStageCount = currentBoss.thirdStage.greenCards + currentBoss.thirdStage.brownCards + currentBoss.thirdStage.blueCards
    console.log('+', currentFirstStageCount)
    if (currentFirstStageCount > 0) {
    currentBoss[currentStage][`${color}Cards`] -= 1
    } else if (currentSecondStageCount > 0) {
        currentStage = 'secondStage'
        currentBoss[currentStage][`${color}Cards`] -= 1
        console.log(currentStage)
    } else if (currentThirdStageCount > 0) {
        currentStage = 'thirdStage'
        currentBoss[currentStage][`${color}Cards`] -= 1
        console.log(currentStage)
    }
    console.log(currentBoss)
    console.log(ancientsData);
    updateCircles()
}

function takeFifthCase(cardColor, bossCardsCount) {
    let hardCards = cards[cardColor].filter(el=> {
        return el.difficulty === 'hard'
    }) 
    if (bossCardsCount - hardCards.length <= 0) {
        return hardCards
    }
    if (bossCardsCount - hardCards.length > 0) {
        let odds = bossCardsCount - hardCards.length
        let normalCards = cards[cardColor].filter(el => el.difficulty === 'normal')
        for(let i = 0; i < odds; i++) {
            const randomIndex = Math.floor(Math.random() * normalCards.length);
            normalCards = normalCards.filter((el, index) => {
                if (index === randomIndex) {
                    hardCards.push(el)
                    return false
                }
                return true
            })
        } 
        return hardCards
    }
}

function getStagePack(randomBluePack, randomBrownPack, randomGreenPack, currentBossStage) {
    let fitrstStageGreenCardsCount = currentBoss.firstStage.greenCards
    let fitrstStageBrownCardsCount = currentBoss.firstStage.brownCards
    let fitrstStageBlueCardsCount = currentBoss.firstStage.blueCards

    let secondStageGreenCardsCount = currentBoss.secondStage.greenCards
    let secondStageBrownCardsCount = currentBoss.secondStage.brownCards
    let secondStageBlueCardsCount = currentBoss.secondStage.blueCards

    let thirdStageGreenCardsCount = currentBoss.thirdStage.greenCards
    let thirdStageBrownCardsCount = currentBoss.thirdStage.brownCards
    let thirdStageBlueCardsCount = currentBoss.thirdStage.blueCards

    let firstStageCards = []

    firstStageCards.push(...randomGreenPack.splice(0, fitrstStageGreenCardsCount))
    firstStageCards.push(...randomBrownPack.splice(0, fitrstStageBrownCardsCount))
    firstStageCards.push(...randomBluePack.splice(0, fitrstStageBlueCardsCount))

    let secondStageCards = []

    secondStageCards.push(...randomGreenPack.splice(0, secondStageGreenCardsCount))
    secondStageCards.push(...randomBrownPack.splice(0, secondStageBrownCardsCount))
    secondStageCards.push(...randomBluePack.splice(0, secondStageBlueCardsCount))

    let thirdStageCards = []

    thirdStageCards.push(...randomGreenPack.splice(0, thirdStageGreenCardsCount))
    thirdStageCards.push(...randomBrownPack.splice(0, thirdStageBrownCardsCount))
    thirdStageCards.push(...randomBluePack.splice(0, thirdStageBlueCardsCount))

    let randomFirstStageCards = getRandomPack(firstStageCards)
    let randomSecondStageCards = getRandomPack(secondStageCards)
    let randomThirdStageCards = getRandomPack(thirdStageCards)

    finalPack = randomFirstStageCards.concat(randomSecondStageCards, randomThirdStageCards)
    console.log(finalPack)
}



