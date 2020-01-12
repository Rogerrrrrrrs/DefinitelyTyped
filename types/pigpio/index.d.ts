// Type definitions for pigpio 1.2
// Project: https://github.com/fivdi/pigpio
// Definitions by: ManerFan <https://github.com/manerfan>
//                 erikma <https://github.com/erikma>
//                 park012241 <https://github.com/park012241>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import { EventEmitter } from 'events';

/************************************
 * Gpio
 ************************************/

/**
 * General Purpose Input Output
 */
export class Gpio extends EventEmitter {
    /**
     * Returns a new Gpio object for accessing a GPIO
     * @param gpio      an unsigned integer specifying the GPIO number
     * @param options   object (optional)
     */
    constructor(
        gpio: number,
        options?: {
            /**
             * INPUT, OUTPUT, ALT0, ALT1, ALT2, ALT3, ALT4, or ALT5 (optional, no default)
             */
            mode?: number;

            /**
             * PUD_OFF, PUD_DOWN, or PUD_UP (optional, no default)
             */
            pullUpDown?: number;

            /**
             * interrupt edge for inputs. RISING_EDGE, FALLING_EDGE, or EITHER_EDGE (optional, no default)
             */
            edge?: number;

            /**
             * interrupt timeout in milliseconds (optional, defaults to 0 meaning no timeout if edge specified)
             */
            timeout?: number;

            /**
             * boolean specifying whether or not alert events are emitted when the GPIO changes state (optional, default false)
             */
            alert?: boolean
        }
    );

    /**
     * Sets the GPIO mode.
     * @param mode  INPUT, OUTPUT, ALT0, ALT1, ALT2, ALT3, ALT4, or ALT5
     */
    mode(mode: number): Gpio;

    /**
     * Sets or clears the resistor pull type for the GPIO.
     * @param pud   PUD_OFF, PUD_DOWN, or PUD_UP
     */
    pullUpDown(pud: number): Gpio;

    /**
     * Returns the GPIO mode.
     */
    getMode(): number;

    /**
     * Returns the GPIO level, 0 or 1.
     */
    digitalRead(): number;

    /**
     * Sets the GPIO level to 0 or 1. If PWM or servo pulses are active on the GPIO they are switched off.
     * @param level     0 or 1
     */
    digitalWrite(level: number): Gpio;

    /**
     * Sends a trigger pulse to the GPIO. The GPIO is set to level for pulseLen microseconds and then reset to not level.
     * @param pulseLen  pulse length in microseconds (1 - 100)
     * @param level     0 or 1
     */
    trigger(pulseLen: number, level: number): Gpio;

    /**
     * Starts PWM on the GPIO. Returns this.
     * @param dutyCycle     an unsigned integer >= 0 (off) and <= range (fully on). range defaults to 255.
     */
    pwmWrite(dutyCycle: number): Gpio;

    /**
     * The same to #pwmWrite.
     * @param dutyCycle     an unsigned integer >= 0 (off) and <= range (fully on). range defaults to 255.
     */
    analogWrite(dutyCycle: number): Gpio;

    /**
     * Starts hardware PWM on the GPIO at the specified frequency and dutyCycle. Frequencies above 30MHz are unlikely to work.
     * @param frequency     an unsigned integer >= 0 and <= 125000000
     * @param dutyCycle     an unsigned integer >= 0 (off) and <= 1000000 (fully on).
     */
    hardwarePwmWrite(frequency: number, dutyCycle: number): Gpio;

    /**
     * Returns the PWM duty cycle setting on the GPIO.
     */
    getPwmDutyCycle(): number;

    /**
     * Selects the duty cycle range to be used for the GPIO. Subsequent calls to pwmWrite will use a duty cycle between 0 (off) and range (fully on).
     * @param range     an unsigned integer in the range 25 through 40000
     */
    pwmRange(range: number): Gpio;

    /**
     * Returns the duty cycle range used for the GPIO.
     * If hardware PWM is active on the GPIO the reported range will be 1000000.
     */
    getPwmRange(): number;

    /**
     * Returns the real range used for the GPIO.
     * If hardware PWM is active on the GPIO the reported real range will be approximately 250M divided by the set PWM frequency.
     */
    getPwmRealRange(): number;

    /**
     * Sets the frequency in hertz to be used for the GPIO. Returns this.
     * @param frequency      an unsigned integer >= 0
     */
    pwmFrequency(frequency: number): Gpio;

    /**
     * Returns the frequency (in hertz) used for the GPIO. The default frequency is 800Hz.
     */
    getPwmFrequency(): number;

    /**
     * Starts servo pulses at 50Hz on the GPIO, 0 (off), 500 (most anti-clockwise) to 2500 (most clockwise)
     * @param pulseWidth    pulse width in microseconds, an unsigned integer, 0 or a number in the range 500 through 2500
     */
    servoWrite(pulseWidth: number): Gpio;

    /**
     * Returns the servo pulse width setting on the GPIO.
     */
    getServoPulseWidth(): number;

    /**
     * Enables interrupts for the GPI
     * @param edge      RISING_EDGE, FALLING_EDGE, or EITHER_EDGE
     * @param timeout   interrupt timeout in milliseconds (optional, defaults to 0 meaning no timeout)
     */
    enableInterrupt(edge: number, timeout?: number): Gpio;

    /**
     * Disables interrupts for the GPIO. Returns this.
     */
    disableInterrupt(): Gpio;

    /**
     * Enables alerts for the GPIO. Returns this.
     */
    enableAlert(): Gpio;

    /**
     * Disables aterts for the GPIO. Returns this.
     */
    disableAlert(): Gpio;

    /**
     * Sets a glitch filter on a GPIO. Returns this.
     * @param steady    Time, in microseconds, during which the level must be stable. Maximum value: 300000
     */
    glitchFilter(steady: number): Gpio;

    /*----------------------*
     * mode
     *----------------------*/

    /**
     * Indicates that the GPIO is an input.
     */
    static INPUT: number;

    /**
     * Indicates that the GPIO is an output.
     */
    static OUTPUT: number;

    /**
     * Indicates that the GPIO is in alternative mode 0.
     */
    static ALT0: number;

    /**
     * Indicates that the GPIO is in alternative mode 1.
     */
    static ALT1: number;

    /**
     * Indicates that the GPIO is in alternative mode 2.
     */
    static ALT2: number;

    /**
     * Indicates that the GPIO is in alternative mode 03.
     */
    static ALT3: number;

    /**
     * Indicates that the GPIO is in alternative mode 4.
     */
    static ALT4: number;

    /**
     * Indicates that the GPIO is in alternative mode 5.
     */
    static ALT5: number;

    /*----------------------*
     * pud
     *----------------------*/

    /**
     * Niether the pull-up nor the pull-down resistor should be enabled.
     */
    static PUD_OFF: number;

    /**
     * Enable pull-down resistor.
     */
    static PUD_DOWN: number;

    /**
     * Enable pull-up resistor.
     */
    static PUD_UP: number;

    /*----------------------*
     * isr
     *----------------------*/

    /**
     * Indicates that the GPIO fires interrupts on rising edges.
     */
    static RISING_EDGE: number;

    /**
     * Indicates that the GPIO fires interrupts on falling edges.
     */
    static FALLING_EDGE: number;

    /**
     * Indicates that the GPIO fires interrupts on both rising and falling edges.
     */
    static EITHER_EDGE: number;

    /*----------------------*
     * timeout
     *----------------------*/

    /**
     * The level argument passed to an interrupt event listener when an interrupt timeout expires.
     */
    static TIMEOUT: number;

    /*----------------------*
     * gpio numbers
     *----------------------*

    /**
     * The smallest GPIO number.
     */
    static MIN_GPIO: number;

    /**
     * The largest GPIO number.
     */
    static MAX_GPIO: number;

    /**
     * The largest user GPIO number.
     */
    static MAX_USER_GPIO: number;
}

/************************************
 * GpioBank
 ************************************

 /**
  * Banked General Purpose Input Output
  */
export class GpioBank {
    /**
     * Returns a new GpioBank object for accessing up to 32 GPIOs as one operation.
     * @param bank  BANK1 or BANK2 (optional, defaults to BANK1)
     */
    constructor(bank?: number);

    /**
     * Returns the current level of all GPIOs in the bank.
     */
    read(): number;

    /**
     * For each GPIO in the bank, sets the GPIO level to 1 if the corresponding bit in bits is set.
     * @param bits  a bit mask of the the GPIOs to set to 1
     */
    set(bits: number): GpioBank;

    /**
     * For each GPIO in the bank, sets the GPIO level to 0 if the corresponding bit in bits is set.
     * @param bits   a bit mask of the the GPIOs to clear or set to 0
     */
    clear(bits: number): GpioBank;

    /**
     * Returns the bank identifier (BANK1 or BANK2.)
     */
    bank(): number;

    /**
     * Identifies bank 1.
     */
    static BANK1: number;

    /**
     * Identifies bank 2.
     */
    static BACK2: number;
}

/************************************
 * Notifier
 ************************************

 /**
  * Notification Stream
  */
export class Notifier {
    /**
     * Returns a new Notifier object that contains a stream which provides notifications about state changes on any of GPIOs 0 through 31 concurrently.
     * @param options   Used to configure which GPIOs notifications should be provided for.
     */
    constructor(options?: {
        /**
         * a bit mask indicating the GPIOs of interest, bit0 corresponds to GPIO0, bit1 corresponds to GPIO1, ..., bit31 corresponds to GPIO31.
         * If a bit is set, the corresponding GPIO will be monitored for state changes. (optional, no default)
         */
        bits: number;
    })

    /**
     * Starts notifications for the GPIOs specified in the bit mask.
     * @param bits  a bit mask indicating the GPIOs of interest, bit0 corresponds to GPIO0, bit1 corresponds to GPIO1, ..., bit31 corresponds to GPIO31.
     * If a bit is set, the corresponding GPIO will be monitored for state changes.
     */
    start(bits: number): Notifier;

    /**
     * Stops notifications. Notifications can be restarted with the start method.
     */
    stop(): Notifier;

    /**
     * Stops notifications and releases resources.
     */
    close(): Notifier;

    /**
     * Returns the notification stream which is a Readable stream.
     */
    stream(): NodeJS.ReadableStream;

    /**
     * The number of bytes occupied by a notification in the notification stream.
     */
    static NOTIFICATION_LENGTH: number;

    /**
     * Indicates a keep alive signal on the stream and is sent once a minute in the absence of other notification activity.
     */
    static PI_NTFY_FLAGS_ALIVE: number;
}

/************************************
 * Configuration
 ************************************/

/**
 * PI_CLOCK_PWM
 */
export const CLOCK_PWM: number;

/**
 * PI_CLOCK_PCM
 */
export const CLOCK_PCM: number;

/**
 * PI_DISABLE_FIFO_IF
 * Disables the pipe interface.
 */
export const DISABLE_FIFO_IF: number;

/**
 * PI_DISABLE_SOCK_IF
 * Disables the socket interface.
 */
export const DISABLE_SOCK_IF: number;

/**
 * PI_LOCALHOST_SOCK_IF
 * Disables remote socket access (this means that the socket interface is only usable from the local Pi).
 */
export const LOCALHOST_SOCK_IF: number;

/**
 * Initialize the pigpio package
 */
export function initialize(): void;

/**
 * Terminate the pigpio package
 */
export function terminate(): void;

/**
 * The configureClock function can be used to configure the sample rate and timing peripheral.
 * @param microseconds  an unsigned integer specifying the sample rate in microseconds (1, 2, 4, 5, 8, or 10)
 * @param peripheral    an unsigned integer specifying the peripheral for timing (CLOCK_PWM or CLOCK_PCM)
 */
export function configureClock(microseconds: number, peripheral: number): void;

/**
 * Configures pigpio to use the specified socket port.
 * The default setting is to use port 8888.
 * If configureSocketPort is called, it must be called before creating Gpio objects.
 * @param port          an unsigned integer specifying the pigpio socket port number
 */
export function configureSocketPort(port: number): void;

/**
 * Returns the Raspberry Pi hardware revision as an unsigned integer. Returns 0
 * if the hardware revision can not be determined.
 */
export function hardwareRevision(): number;

/**
 * Configures pigpio support of the fifo and socket interfaces.
 * This function is only effective if called before creating Gpio objects.
 * The default setting (0) is that both interfaces are enabled.
 * @param ifFlags flags to configure the fifo and socket interfaces. (DISABLE_FIFO_IF, DISABLE_SOCK_IF, LOCALHOST_SOCK_IF)
 */
export function configureInterfaces(ifFlags: number): number;

/**
 * Gets the current unsigned 32-bit integer value of the number of microseconds
 * since system boot. This value wraps around the 32-bit space in just over an hour.
 * Use tickDiff() to get the difference between two tick values, to
 * ensure the correct JavaScript operations are used to account for the possibility
 * of overflow.
 */
export function getTick(): number;

/**
 * Returns the difference in microseconds between the end and start tick counts.
 * The tick counts can be retrieved using getTick(), or may be passed
 * in a GPIO event callback.
 * @param startTick    The start of the measured interval. An unsigned integer tick value.
 * @param endTick      The end of the measured interval. An unsigned integer tick value.
 */
export function tickDiff(startTick: number, endTick: number): number;

/**
 * Clears all waveforms and any data added by calls to the waveAdd* functions.
 */
export function waveClear(): void;

/**
 * Starts a new empty waveform.
 * You wouldn't normally need to call this function as it is automatically called after a waveform is created with the gpioWaveCreate function.
 */
export function waveAddNew(): void;

/**
 * Adds a series of pulses to the current waveform. Returns the new total number of pulses in the current waveform.
 * Returns the new total number of pulses in the current waveform.
 * @param pulses an array of pulses objects.
 * The pulse objects are built with the following properties:
 * 
 * gpioOn - an unsigned integer specifying the GPIO number to be turned on.
 * 
 * gpioOff - an unsigned integer specifying the GPIO number to be turned off.
 * 
 * usDelay - an unsigned integer specifying the pulse length in microseconds.
 */
export function waveAddGeneric(pulses: pulses[]): number;

interface pulses {
    gpioOn: number,
    gpioOff: number,
    usDelay: number
}

/**
 * Creates a waveform from added data.
 * Returns a wave id. 
 * All data previously added with waveAdd* methods get cleared.
 */
export function waveCreate(): number;

/**
 * Deletes a waveform by the given wave id.
 * @param waveId >=0, as returned by waveCreate
 */
export function waveDelete(waveId: number): void;

/**
 * Transmits a waveform. 
 * Returns the number of DMA control blocks in the waveform.
 * The SYNC variants of the waveMode wait for the current waveform to reach the end of a cycle or finish before starting the new waveform.
 * @param waveId >=0, as returned by waveCreate
 * @param waveMode WAVE_MODE_ONE_SHOT, WAVE_MODE_REPEAT, WAVE_MODE_ONE_SHOT_SYNC or WAVE_MODE_REPEAT_SYNC
 */
export function waveTxSend(waveId: number, waveMode: number): void;

/**
 * PI_WAVE_MODE_ONE_SHOT
 * The waveform is sent once.
 */
export const WAVE_MODE_ONE_SHOT: number;

/**
 * PI_WAVE_MODE_REPEAT
 * The waveform cycles repeatedly.
 */
export const WAVE_MODE_REPEAT: number;

/**
 * PI_WAVE_MODE_ONE_SHOT_SYNC
 * The waveform is sent once, waiting for the current waveform to finish before starting the new waveform.
 */
export const WAVE_MODE_ONE_SHOT_SYNC: number;

/**
 * PI_WAVE_MODE_REPEAT_SYNC
 * The waveform cycles repeatedly, waiting for the current waveform to finish before starting the new waveform.
 */
export const WAVE_MODE_REPEAT_SYNC: number;

/**
 * Transmits a chain of waveforms. 
 * @param chain Array of waves to be transmitted, contains an ordered list of wave_ids and optional command codes and related data
 * The following command codes are supported:
 * 
 * Name | Command & Data | Description |
 *  ---: | ---: | ---: |
 * Loop Start | 255 0	| Identify start of a wave block
 * Loop Repeat	| 255 1 x y	| loop x + y*256 time
 * Delay	| 255 2 x y	| delay x + y*256 microseconds
 * Loop Forever |	255 3	| loop forever
 */
export function waveChain(chain: number[]): void;

/**
 * Returns the current transmitting wave id.
 */
export function waveTxAt(): number;

/**
 * Returns 1 if the current waveform is still transmitting, otherwise 0.
 */
export function waveTxBusy(): number;

/**
 * Aborts the current waveform.
 */
export function waveTxStop(): void;

/**
 * Returns the length in microseconds of the current waveform.
 */
export function waveGetMicros(): number;

/**
 * Returns the length in microseconds of the longest waveform created since gpioInitialise was called.
 */
export function waveGetHighMicros(): number;

/**
 * Returns the maximum possible size of a waveform in microseconds.
 */
export function waveGetMaxMicros(): number;

/**
 * Returns the length in pulses of the current waveform.
 */
export function waveGetPulses(): number;

/**
 * Returns the length in pulses of the longest waveform created since gpioInitialise was called.
 */
export function waveGetHighPulses(): number;

/**
 * Returns the maximum possible size of a waveform in pulses.
 */
export function waveGetMaxPulses(): number;

/**
 * Returns the length in DMA control blocks of the current waveform.
 */
export function waveGetCbs(): number;

/**
 * Returns the length in DMA control blocks of the longest waveform created since gpioInitialise was called.
 */
export function waveGetHighCbs(): number;

/**
 * Returns the maximum possible size of a waveform in DMA control blocks.
 */
export function waveGetMaxCbs(): number;