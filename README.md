spTimer
===================================

![demo image](/images/timer.gif)

This is timer for countdown.

## Install

```bash
bower install sp-timer
```

## Install node modules

```bash
npm install
```

## Support

* IE7+
* chrome
* firefox

## Usage

```js
var timer = new sp.Timer( 86420000, {interval:1000} );

timer.addEventListener( "changed", function( timedelta ){
  //do something...
});
timer.start();
```

## API

#### sp.Timer( countdown, opts ):Timer
> Create a timer

#### sp.Timer.start() : void
> Start a countdown.

#### sp.Timer.stop() : void
> Stop a countdown.

## DEMO

```bash
gulp server
```

## Build

```bash
gulp
```

