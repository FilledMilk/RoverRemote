radio.onReceivedNumber(function (receivedNumber) {
    OLED.clear()
    OLED.writeStringNewLine("Temperature C˚ = ")
    OLED.writeNumNewLine(receivedNumber)
})
radio.onReceivedValue(function (name, value) {
    if (name == "sonar") {
        OLED.clear()
        OLED.writeString("Distance (in.)")
        OLED.writeNumNewLine(value)
    }
})
let loading = 0
let speed = 1
led.enable(false)
OLED.init(128, 64)
radio.setGroup(1)
radio.setTransmitPower(7)
OLED.writeStringNewLine("Welcome to Bobtronics tank")
basic.pause(2000)
for (let index = 0; index < 101; index++) {
    OLED.drawLoading(loading)
    basic.pause(20)
    loading += 1
}
basic.pause(1000)
OLED.clear()
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) == 1023) {
        radio.sendString("f")
    } else if (pins.analogReadPin(AnalogPin.P1) == 2) {
        radio.sendString("b")
    } else if (pins.analogReadPin(AnalogPin.P0) == 1023) {
        radio.sendString("l")
    } else if (pins.analogReadPin(AnalogPin.P0) == 2) {
        radio.sendString("r")
    } else if (pins.digitalReadPin(DigitalPin.P9) == 1) {
        radio.sendString("on")
        OLED.clear()
        OLED.writeString("light on")
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        radio.sendString("off")
        OLED.clear()
        OLED.writeString("light off")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 1) {
        radio.sendString("rsonar")
    } else if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        radio.sendString("rtemp")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 1) {
        OLED.clear()
    } else {
        radio.sendString("s")
    }
})
