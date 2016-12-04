/**
 * Stub of MusicControl for Android.
 *
 * @providesModule MusicControl
 * @flow
 */
'use strict';

import { NativeModules, DeviceEventEmitter } from 'react-native';
const NativeMusicControl = NativeModules.MusicControlManager;

var handlers = { };
var subscription = null;

var MusicControl = {
  enableBackgroundMode: function(enable){
    NativeMusicControl.enableBackgroundMode(enable)
  },
  setNowPlaying: function(info){
    NativeMusicControl.setNowPlaying(info)
  },
  resetNowPlaying: function(){
    NativeMusicControl.resetNowPlaying()
  },
  enableControl: function(controlName, enable){
    NativeMusicControl.enableControl(controlName, enable)
  },
  handleCommand: function(commandName, value){
    if(handlers[commandName]){
      handlers[commandName](value)
    }
  },
  on: function(actionName, cb){
    if(subscription){
      subscription.remove();
    }
    subscription = DeviceEventEmitter.addListener(
      'RNMusicControlEvent',
      (event) => {
        console.log(event);
        MusicControl.handleCommand(event.name, event.value)
      }
    );
    handlers[actionName] = cb
  },
  off: function(actionName, cb){
    delete(handlers[actionName])
    if(!Object.keys(handlers).length && subscription){
      subscription.remove()
      subscription = null;
    }
  }
};

module.exports = MusicControl;
