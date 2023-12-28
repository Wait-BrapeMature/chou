var button = $('#start')
var numberEle = $('#lottery-number')
var loading = false
var wwwwwinner = []
const total = config.names.length
const enableWinContinuously = config.enableWinContinuously
const finaleWinner = config.winner
const winnerNumber = config.winnerNumber
var usedNumber = []
var winnerTotal = 0
var tempWinner = null

function changeFontSize() {
    const textEl = document.querySelector('#lottery-number')
    const textWidth = textEl.offsetWidth;
    const textLength = textEl.textContent.length;
    const fontSize = Math.floor(textWidth / textLength) * 0.8;
    textEl.style.fontSize = fontSize + 'px';
}



document.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {
        button.click()
    }
});

button.click(function () {
    if (loading) {
        stop(tempWinner)
        return
    }
    loading = true
    button.html('停止')
    setTimeout(function () {
        startLottery()
    }, 1000)
})
function stop(winner) {
    changeFontSize()
    clearInterval(timer)
    numberEle.removeClass('animate-start')
    numberEle.text(config.names[winner])
    changeFontSize()
    if (winnerTotal < winnerNumber) {
        loading = false
        button.html('继续抽奖')
    } else {
        loading = true
        let text = ''
        for (i in wwwwwinner) {
            text += config.names[wwwwwinner[i]] + ' , '
        }
        button.html('最终获奖结果是：' + text)
        button.addClass('result')
    }
}

function getNumber() {
    return Math.floor(Math.random() * total) + 1;
}
function checkUsed(num) {
    if (usedNumber.indexOf(num) != -1) {
        return true
    } else {
        return false
    }
}

function startLottery() {
    changeFontSize()
    let winner = getNumber()
    let isUsed = checkUsed(winner)
    let isWinner
    if (finaleWinner.length == 0) {
        isWinner = true
    } else if (finaleWinner.length == winnerNumber) {
        isWinner = finaleWinner.includes(config.names[winner])
    } else {
        if (winnerTotal < finaleWinner.length) {
            isWinner = finaleWinner.includes(config.names[winner])
        } else {
            isWinner = true
        }
    }
    if (!isUsed && isWinner) {
        usedNumber.push(winner)
        wwwwwinner.push(winner)
    } else {
        startLottery();
        return
    }
    animateNumber(winner)
    winnerTotal = winnerTotal + 1
    tempWinner = winner
}
function changeNumber() {
    numberEle.html(config.names[getNumber()])
    changeFontSize()
}
var timer
function animateNumber(winnerNum) {
    numberEle.addClass('animate-start')
    timer = setInterval(function () {
        changeNumber()
        changeFontSize()
    }, 100)
}
