(function(){

  /**
   * @function
   * @return Date
   */
  var now = function(){ return +new Date() };

  /**
   * @function
   * @return array
   */
  var cloneArgs = function( params, index ){
    var result = [];

    for ( var i = index; i < params.length ; i++) {
      result.push( params[i] );
    }
    return result;
  };

  /**
   * @function
   * @return array
   */
  var extend = function( target ){

    var cloneIndex = 1, cloneObj;

    for ( cloneIndex ; cloneIndex < arguments.length  ; cloneIndex++  ) {
      cloneObj = arguments[cloneIndex];

      for ( var i in cloneObj ) {
        
        target[i] = cloneObj[i];
      }
    }
    return target;
  };

  /**
   * @param {Number} ms
   * @return Object
   */
  var parseTimedelta = function( ms ){

    var totalSec = parseInt(ms / 1000);

    return {
      ms:ms % 1000,
      second:totalSec % 60,
      minute:parseInt( (totalSec % 3600) / 60 ),
      hour:parseInt( ( totalSec % 86400 ) / 3600 ),
      day:parseInt(  totalSec / 86400  ),

    };
  };

  /**
   * @class
   */
  var Observer = function(){
    this.events_ = {};
  };

  Observer.prototype = {

    /**
    * @param {String} type
    * @param {function} func
    **/
    addEventListener:function( type, func ){

      if ( !this.events_[type] ) this.events_[type] = [];
      this.events_[type].push( func );
    },

    /**
    * @param {String} type
    * @param {function} func
    **/
    removeEventListener:function( type, func ){

      var events = this.events_[type];

      if ( events ) {
        for (var index = events.length ; i >= 0 ; i--) {
          if ( events[index] == func ) {
            events[index].splice( index, 1 );
            break;
          }
        }
      }
    },

    /**
    * @param {String} type
    * @param {*} ...
    **/
    trigger:function( type ){

     var events = this.events_[type],
         //for ie7
         params = cloneArgs( arguments, 1 );

     if ( events ) {
       for( var i = 0;i < events.length; i++ ) {

         events[i].apply( this, params );
       }
     }
    }
    
  };

  /**
   * @class
   */
  var Timer = function( countdown, opts ){

    Observer.call( this );

    this.opts_ = {
      interval:500
    };

    if ( countdown ) this.update( countdown );
    if ( opts ) extend( this.opts_, opts )
  };

  extend( Timer.prototype, new Observer(), {

    countdown:0,

    /**
     * @function
     * @params {Number} countdown
     */
    update:function( countdown ){

      this.countdown = countdown;
    },

    /**
     * @function
     */
    start:function(){

      this.nowDate_ = now();
      this.trigger( "start" );
      this.clearFunc = this.listen_();
    },

    /**
     * @private
     */
    listen_:function(){

      var _this = this,
      timeId = setInterval(function(){
        var ms = _this.countdown + _this.nowDate_ - now();

        if ( ms > 0 ) _this.trigger( "changed", parseTimedelta( ms ), ms );
        else _this.stop();
      }, _this.opts_.interval);

      return function(){ clearInterval( timeId ); };
    },

    /**
     *
     */
    stop:function(){

      this.clearFunc && this.clearFunc() && this.trigger( "stop" );
    }

  });


  if ( typeof module != "undefined" ) {
    module.exports = Timer;
  }

  if ( typeof window != "undefined" ) {
    var sp = window.sp || {};
    sp.Timer = Timer;
    window.sp = sp;
  }

})();

