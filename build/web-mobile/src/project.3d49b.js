window.__require=function t(e,i,o){function s(r,a){if(!i[r]){if(!e[r]){var c=r.split("/");if(c=c[c.length-1],!e[c]){var l="function"==typeof __require&&__require;if(!a&&l)return l(c,!0);if(n)return n(c,!0);throw new Error("Cannot find module '"+r+"'")}}var u=i[r]={exports:{}};e[r][0].call(u.exports,function(t){return s(e[r][1][t]||t)},u,u.exports,t,e,i,o)}return i[r].exports}for(var n="function"==typeof __require&&__require,r=0;r<o.length;r++)s(o[r]);return s}({Animation:[function(t,e,i){"use strict";cc._RF.push(e,"d0adaNFRYFCzoEDqsv3eUKo","Animation");var o=cc.Enum({None:0,FadeIn:1,FadeOut:2,Shake:3,Blink:4,Scale:5,Move:6}),s=cc.Enum({Level1:1,Level2:2,Level3:3,Level4:4,Level5:5});cc.Class({extends:cc.Component,editor:!1,properties:{action:{default:o.None,displayName:"\u52a8\u4f5c",type:o,notify:function(){}},delayTime:{default:0,displayName:"\u5ef6\u8fdf\u65f6\u95f4"},actionTime:{default:0,displayName:"\u52a8\u753b\u65f6\u957f"},shakeStrength:{default:1,displayName:"\u9707\u52a8\u5f3a\u5ea6",type:s},blinkCount:{default:1,displayName:"\u95ea\u70c1\u6b21\u6570"},scaleSize:{default:1,displayName:"\u7f29\u653e\u6bd4\u4f8b"},moveBegan:{default:cc.v2(0,0),displayName:"\u5f00\u59cb\u5750\u6807"},moveEnd:{default:cc.v2(0,0),displayName:"\u7ed3\u675f\u5750\u6807"},preview:{default:"0",notify:!1},_recordData:null},_record:!1,_recover:!1,onLoad:function(){this._runAction()},onDestroy:function(){if(this.action!==o.None&&this.action===o.FadeOut){var t=cc.delayTime(this.delayTime),e=cc.fadeOut(this.actionTime),i=cc.callFunc(this._actionOver.bind(this)),s=cc.sequence([t,e,i]);this.node.stopAllActions(),this.node.runAction(s)}},_runAction:function(){if(this.action!==o.None&&this.action!==o.FadeOut)if(this.actionTime>0){var t=this._genAct(this.action);if(t){var e=[];this.delayTime>0&&e.push(cc.delayTime(this.delayTime)),e.push(t),e.push(cc.callFunc(this._actionOver.bind(this)));var i=cc.sequence(e);this.node.runAction(i)}}else console.log("\u6307\u5b9a\u7684\u52a8\u753b\u65f6\u95f4\u4e3a0,\u8df3\u8fc7\u8be5\u52a8\u753b!");else this._actionOver()},_actionOver:function(){console.log("action over")},_genAct:function(t){var e=null;if(t===o.FadeOut)this.node.opacity=255,e=cc.fadeOut(this.actionTime);else if(t===o.FadeIn)this.node.opacity=0,e=cc.fadeIn(this.actionTime);else if(t===o.Shake){for(var i=[],s=[{strength:1,count:3,max:10},{strength:2,count:5,max:12},{strength:3,count:7,max:15},{strength:4,count:9,max:20},{strength:5,count:11,max:25}],n=0,r=0,a=0;a<s.length;a++){var c=s[a];if(c.strength===this.shakeStrength){n=c.count,r=c.max;break}}n=Math.floor(this.actionTime/.05);var l=this.node.getPosition();if(n>0&&r>0){for(var u=0;u<n;u++){var d=l.x+this._randomPos(r),h=l.y+this._randomPos(r),p=cc.moveTo(.05,cc.v2(d,h));i.push(p)}e=cc.sequence(i)}else console.log("\u672a\u67e5\u627e\u5230\u6643\u52a8\u7684\u914d\u7f6e!")}else t===o.Blink?e=cc.blink(this.actionTime,this.blinkCount):t===o.Scale?e=cc.scaleTo(this.actionTime,this.scaleSize):t===o.Move&&(this.node.setPosition(this.moveBegan),e=cc.moveTo(this.actionTime,this.moveEnd));return e},_randomByMaxValue:function(t){return Math.floor(Math.random()*t)},_randomPos:function(t){return this._randomByMaxValue(2)%2==0?this._randomByMaxValue(t):-this._randomByMaxValue(t)}}),cc._RF.pop()},{}],GameUtil:[function(t,e,i){"use strict";cc._RF.push(e,"3cfb39TY4VA8I4lxpqQd6mF","GameUtil"),e.exports={transformUrl:function(t){if(t){var e="db://assets/resources/",i=t.indexOf(e),o=t.indexOf(".prefab");if(-1!==i&&-1!==o){var s=e.length;return t.substring(s,o)}return null}return null}},cc._RF.pop()},{}],LocalStorage:[function(t,e,i){"use strict";cc._RF.push(e,"f34d4vB739GsKLfKcqqtfwy","LocalStorage"),e.exports={},cc._RF.pop()},{}],ObserverMgr:[function(t,e,i){"use strict";cc._RF.push(e,"a18958flXNAQ5o/+voRIY6v","ObserverMgr");var o={obsArray:{},addEventListener:function(t,e,i){void 0===i&&console.log("[ObserverMgr] \u6ce8\u518c\u6d88\u606f [%s]:%s \u7684\u4f5c\u7528\u4e8e\u672a\u5b9a\u4e49",t,e.name),void 0===this.obsArray[t]&&(this.obsArray[t]=[]);for(var o=0;o<this.obsArray[t].length;o++){var s=this.obsArray[t][o];if(s.func===e&&s.ob===i)return}this.obsArray[t].push({func:e,ob:i})},removeEventListener:function(t,e,i){var o=!1,s=this.obsArray[t];if(s)for(var n=0;n<s.length;){var r=s[n],a=r.func,c=r.ob;e===a&&i===c?(s.splice(n,1),o=!0):n++}return o},removeEventListenerWithObject:function(t){for(var e in this.obsArray)for(var i=this.obsArray[e],o=0;o<i.length;){i[o].ob===t?i.splice(o,1):o++}},cleanAllEventListener:function(){this.obsArray={}},dispatchMsg:function(t,e){var i=this.obsArray[t];if(void 0!==i)for(var o=0;o<i.length;o++){var s=i[o],n=s.func,r=s.ob;n&&r&&n.apply(r,[t,e])}else console.log("\u6d88\u606f\u5217\u8868\u4e2d\u4e0d\u5b58\u5728: "+t)}};cc.ObserverMgr=e.exports=o,cc._RF.pop()},{}],Observer:[function(t,e,i){"use strict";cc._RF.push(e,"b4e80bwFI5Cmbppt9+0tpcO","Observer");var o=cc.Class({extends:cc.Component,_initMsg:function(){var t=this._getMsgList();if(t)for(var e=0;e<t.length;e++){var i=t[e];cc.ObserverMgr.addEventListener(i,this._onMsg,this)}},onLoad:function(){},_getMsgList:function(){return[]},_onMsg:function(t,e){},onDisable:function(){},onEnable:function(){},onDestroy:function(){cc.ObserverMgr.removeEventListenerWithObject(this)}});cc.Observer=e.exports=o,cc._RF.pop()},{}],StoryAudioEffect:[function(t,e,i){"use strict";cc._RF.push(e,"054d0IwqPVLf704qGQ6F7OZ","StoryAudioEffect");var o=t("StoryAudioMgr");cc.Class({extends:cc.Component,editor:{menu:"A-StoryMaster/StoryAudioEffect"},properties:{audio:{default:null,displayName:"\u97f3\u6548",type:cc.AudioClip,tooltip:"\u5207\u6362\u60c5\u8282\u4f1a\u5173\u95ed\u4e4b\u524d\u6240\u6709\u7684\u97f3\u6548"},delayTime:{default:0,displayName:"\u5ef6\u8fdf\u64ad\u653e(s)",range:[0,999999],notify:function(t){}},loop:{default:!1,displayName:"\u662f\u5426\u5faa\u73af"}},onLoad:function(){},_play:function(){this.audio&&o.playEffect(this.audio,this.loop)},start:function(){this.scheduleOnce(function(){this.delayTime<=0?this._play():this.scheduleOnce(function(){this._play()}.bind(this),this.delayTime)}.bind(this),.1)}}),cc._RF.pop()},{StoryAudioMgr:"StoryAudioMgr"}],StoryAudioMgr:[function(t,e,i){"use strict";cc._RF.push(e,"2fbbcySg+tFQYwFhhpvMYOz","StoryAudioMgr"),e.exports={_allEffectID:[],cleanAudioEffect:function(){cc.audioEngine.stopAllEffects()},stopAll:function(){cc.audioEngine.stopMusic(),cc.audioEngine.stopAllEffects()},stopMusic:function(){cc.audioEngine.stopMusic()},playEffect:function(t,e){var i=cc.audioEngine.playEffect(t,e);this._allEffectID.push(i)},playMusic:function(t,e){cc.audioEngine.playMusic(t,e)}},cc._RF.pop()},{}],StoryAudioMusic:[function(t,e,i){"use strict";cc._RF.push(e,"1fc99vURVZLEJ9F5NfhEKNK","StoryAudioMusic");var o=t("StoryAudioMgr");cc.Class({extends:cc.Component,editor:{menu:"A-StoryMaster/StoryAudioMusic"},properties:{audio:{default:null,displayName:"\u97f3\u4e50",type:cc.AudioClip,tooltip:"\u540c\u4e00\u65f6\u95f4\u53ea\u4f1a\u64ad\u653e\u4e00\u4e2a\u97f3\u4e50"},delayTime:{default:0,displayName:"\u5ef6\u8fdf\u64ad\u653e(s)",range:[0,999999],notify:function(t){}},loop:{default:!1,displayName:"\u662f\u5426\u5faa\u73af",notify:function(){}},isStopOnDestroy:{default:!0,displayName:"\u7ed3\u675f\u65f6\u6682\u505c"}},onLoad:function(){},_play:function(){this.audio&&o.playMusic(this.audio,this.loop)},start:function(){this.scheduleOnce(function(){this.delayTime<=0?this._play():this.scheduleOnce(function(){this._play()}.bind(this),this.delayTime)}.bind(this),.1)},onDestroy:function(){this.isStopOnDestroy&&o.stopMusic()}}),cc._RF.pop()},{StoryAudioMgr:"StoryAudioMgr"}],StoryConfig:[function(t,e,i){"use strict";cc._RF.push(e,"783e27man1Dup0FNKgK7FWN","StoryConfig");var o={file:{init:{data:[],name:"init"},piece:{data:[],name:"piece"},plot:{data:[],name:"plot"}},_init:!1,_completeCallBack:null,init:function(t){if(!1===this._init){this._init=!0,this._completeCallBack=t,this._index=0,this._totalIndex=0;for(var e in this.file)this._totalIndex++;for(var i in this.file){var o=this.file[i];this._loadJson(o.name,o)}}else console.log("[StoryConfig] has init"),t&&t()},_loadJson:function(t,e){var i=""+t;cc.loader.loadRes(i,function(t,e,i){},function(i,o){this._index++,i?console.log("\u89e3\u6790\u914d\u7f6e\u6587\u4ef6"+t+"\u5931\u8d25: "+i):o?(e.data=o.json||o,console.log("---------------------------"),console.log(JSON.stringify(o.json)),console.log("---------------------------"),this._onProgress(t),this._index>=this._totalIndex&&this._onComplete()):this._onError(t)}.bind(this))},_onProgress:function(t){console.log("Json loaded: "+t)},_onComplete:function(){console.log("Json \u52a0\u8f7d\u5b8c\u6210"),this._completeCallBack&&this._completeCallBack()},_onError:function(t){console.log("Json error: "+t)}};cc.StoryConfig=e.exports=o,cc._RF.pop()},{}],StoryData:[function(t,e,i){"use strict";cc._RF.push(e,"72aef5yKXtE/bc2AB03D5ss","StoryData");var o=t("StoryConfig");e.exports={serializePlotArray:[],getUnitPiecePrefab:function(){var t=o.file.init.data;if(t.unit){var e=o.file.piece.data;for(var i in e)for(var s=e[i],n=0;n<s.length;n++){var r=s[n];if(r.id===t.unit)return{piece:i,item:r}}return null}return null},getBeganPrefab:function(){var t=o.file.plot.data[0].piece;return this.getPieceDataByID(t)[0]},getBeganPlot:function(){return o.file.plot.data[0]},getNextPlotData:function(t){for(var e=0;e<this.serializePlotArray.length;e++){if(this.serializePlotArray[e].id===t)return e===this.serializePlotArray.length-1?null:this._findValidPiece(e+1)}return null},_findValidPiece:function(t){for(var e=t;e<this.serializePlotArray.length;e++){var i=this.serializePlotArray[e],o=this.getPieceDataByID(i.piece);if(o&&o.length>0)return i;console.log("\u51fa\u73b0\u7a7a\u767d\u5267\u60c5:"+i.name)}return null},serializePlot:function(){for(var t=[],e=o.file.plot.data,i=0;i<e.length;i++){var s=e[i];this._serializePlot(s,t)}this.serializePlotArray=t},_serializePlot:function(t,e){e.push({id:t.id,name:t.name,piece:t.piece});for(var i=0;i<t.children.length;i++)this._serializePlot(t.children[i],e)},getPlotDataByPieceID:function(t){for(var e=0;e<this.serializePlotArray.length;e++){var i=this.serializePlotArray[e];if(i.piece===t)return i}return null},getPlotDataByID:function(t){for(var e=0;e<this.serializePlotArray.length;e++){var i=this.serializePlotArray[e];if(i.id===t)return i}return null},getPieceDataByPlotID:function(t){var e=this.getPlotDataByID(t);return e?this.getPieceDataByID(e.piece):null},getPieceDataByID:function(t){var e=o.file.piece.data;for(var i in e){var s=e[i];if(i===t)return s}return null},getNextPieceItemByPrefabID:function(t){var e=o.file.piece.data;for(var i in e)for(var s=e[i],n=0;n<s.length;n++){if(s[n].id===t)return n+1>=s.length?null:s[n+1]}return null},getNextPieceItemByKeyAndPrefab:function(t,e){var i=o.file.piece.data;if(i&&i[t])for(var s=i[t],n=0;n<s.length;n++){if(s[n].id===e)return n+1>=s.length?null:s[n+1]}}},cc._RF.pop()},{StoryConfig:"StoryConfig"}],StoryGame:[function(t,e,i){"use strict";cc._RF.push(e,"8641dg14NhCe5TefZdA2Jwk","StoryGame");var o=t("GameUtil"),s=t("StoryData"),n=t("StoryAudioMgr");cc.Class({extends:t("Observer"),properties:{storyNode:{default:null,displayName:"\u6545\u4e8b\u8282\u70b9",type:cc.Node},touchNode:{default:null,displayName:"\u89e6\u6478\u8282\u70b9",type:cc.Node},isTest:!1,_piece:null,_pieceData:null,_plotData:null},_getMsgList:function(){return[cc.StoryMaster.Msg.OnGoNextPiece,cc.StoryMaster.Msg.OnJumpNewPlot,cc.StoryMaster.Msg.OnEnableGlobalTouch]},_onMsg:function(t,e){if(t===cc.StoryMaster.Msg.OnGoNextPiece){var i=e.id,o=s.getNextPieceItemByKeyAndPrefab(this._plotData.piece,i);if(o)this.createPiece(o);else{var r=s.getNextPlotData(this._plotData.id);if(r){this._plotData=r;var a=s.getPieceDataByID(r.piece);a&&(this._pieceData=a,this.createPiece(a[0]))}else this._plotData=null,this._pieceData=null,this._piece=null,n.stopAll(),this.touchNode.off(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this)}}else t===cc.StoryMaster.Msg.OnJumpNewPlot?this._playNewPlot(e):t===cc.StoryMaster.Msg.OnEnableGlobalTouch&&(this.touchNode.active=!!e)},_onTouchEnd:function(){cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.UserTouch,null)},_initTouch:function(){var t=cc.view.getVisibleSize();this.touchNode.width=t.width,this.touchNode.height=t.height,this.touchNode.active=!0,this.touchNode.on(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this)},onLoad:function(){cc.debug.setDisplayStats(!1),cc.StoryConfig.init(function(){this._initMsg(),this.storyNode.destroyAllChildren(),this.touchNode.destroyAllChildren(),this._initTouch(),s.serializePlot(),this.isTest?this.startWithDebug():this.startWithNormal()}.bind(this))},_onPieceTips:function(t){this.storyNode.destroyAllChildren();var e=new cc.Node;e.addComponent(cc.Label).string=t,this.storyNode.addChild(e),this.touchNode.off(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this)},startWithDebug:function(){var t=s.getUnitPiecePrefab();if(t){var e=s.getPlotDataByPieceID(t.piece);if(e){this._plotData=e;var i=s.getPieceDataByID(t.piece);i&&(this._pieceData=i,this.createPiece(t.item))}}else this._onPieceTips("\u672a\u53d1\u73b0\u8981\u6d4b\u8bd5\u7684\u6545\u4e8b")},startWithNormal:function(){var t=s.getBeganPlot();this._playNewPlot(t.id)},_playNextPiece:function(){},_playNewPlot:function(t,e){var i=s.getPlotDataByID(t);if(i){this._plotData=i;var o=s.getPieceDataByID(i.piece);o?(this._pieceData=o,this.createPiece(o[0])):console.log("\u65e0\u6548\u7684piece: "+i.piece)}else console.log("\u65e0\u6548\u7684plotID: "+t)},createPiece:function(t){if(t&&t.type===cc.StoryMaster.Type.Pieces.Content||void 0===t.type){var e=t.prefab;e?(e=o.transformUrl(e),cc.loader.loadRes(e,function(e,i){if(e)console.log(e);else{cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.OnEnableGlobalTouch,!0),n.cleanAudioEffect(),this.storyNode.destroyAllChildren();var o=cc.instantiate(i),s=cc.view.getVisibleSize();o.x=o.y=0,o.width=s.width,o.height=s.height,this.storyNode.addChild(o);var r=o.getComponent("StoryPiece");r&&(r.pieceItem=t)}}.bind(this))):console.log("piece \u6570\u636e\u65e0\u6548")}else if(t&&t.type===cc.StoryMaster.Type.Pieces.PlotJump){var i=s.getPieceDataByPlotID(t.jump);i&&i.length>0?this._playNewPlot(t.jump):console.log("\u65e0\u6548\u7684piece-jump:"+t.name+"\njumpID:"+t.jump)}else console.log("\u672a\u77e5\u7684piece")},start:function(){}}),cc._RF.pop()},{GameUtil:"GameUtil",Observer:"Observer",StoryAudioMgr:"StoryAudioMgr",StoryData:"StoryData"}],StoryMaster:[function(t,e,i){"use strict";cc._RF.push(e,"4feebiWogBAyIuUcB1lWE0u","StoryMaster");cc.StoryMaster=e.exports={Msg:{OnJumpNewPlot:"StoryMaster_Msg_OnJumpNewPlot",OnPieceTalkOver:"StoryMaster_Msg_OnPieceTalkOver",OnGoNextPiece:"StoryMaster_Msg_OnGoNextPiece",OnEnableGlobalTouch:"StoryMaster_Msg_OnEnableGlobalTouch",PieceHasOptions:"StoryMaster_Msg_PieceHasOptions",PieceShowOptions:"StoryMaster_Msg_PieceShowOptions",UserTouch:"StoryMaster_Msg_UserTouch"},Type:{Pieces:{Content:1,PlotJump:2}},GameCfg:{profile:"profile://project/story-master.json",myResDir:"db://assets/my-resources",myTemplateDir:"db://assets/my-template",templateDir:"db://assets/template",plot:{plugin:"db://assets/resources/plot.json",game:"plot.json"},piece:{plugin:"db://assets/resources/piece.json",prefab:"db://assets/resources/piece",game:"piece.json"},init:{plugin:"db://assets/resources/init.json",game:"init.json"},template:{dev:{StoryPiece:"db://assets/code/template/StoryPiece.prefab",StoryTalk:"db://assets/code/template/StoryTalk.prefab",StoryOptions:"db://assets/code/template/StoryOptions.prefab"},public:{StoryPiece:"db://story-master-code/template/StoryPiece.prefab",StoryTalk:"db://story-master-code/template/StoryTalk.prefab",StoryOptions:"db://story-master-code/template/StoryOptions.prefab"}}}},cc._RF.pop()},{}],StoryOptionBox:[function(t,e,i){"use strict";cc._RF.push(e,"19090WSRhhORrP76JsMRRTG","StoryOptionBox"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){}}),cc._RF.pop()},{}],StoryOptionItem:[function(t,e,i){"use strict";cc._RF.push(e,"a44147YfYdDGLqyw82EC3HP","StoryOptionItem");var o=t("StoryAudioMgr");cc.Class({extends:cc.Component,properties:{audio:{default:null,displayName:"\u6309\u94ae\u58f0\u97f3",type:cc.AudioClip},menuLabel:cc.Label,menuText:{displayName:"\u9009\u9879\u6587\u672c",default:"\u9009\u9879",notify:function(){for(var t=this.node.children,e=0;e<t.length;e++){var i=t[e].getComponent(cc.Label);i&&(i.string=this.menuText)}}},jumpPlot:{default:"",displayName:"\u8981\u8df3\u8f6c\u7684\u65b0\u5267\u60c5"}},editor:{menu:"A-StoryMaster/StoryOptionItem",inspector:"packages://story-master/inspector/StoryOptionItem.js"},onLoad:function(){this.node.on(cc.Node.EventType.TOUCH_END,function(){this.audio&&o.playEffect(this.audio,!1),0===this.jumpPlot.length&&console.warn("\u8be5\u9009\u9879\u5e76\u672a\u8bbe\u7f6e\u8df3\u8f6c\u5267\u60c5"),cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.OnJumpNewPlot,this.jumpPlot)}.bind(this),this)},start:function(){}}),cc._RF.pop()},{StoryAudioMgr:"StoryAudioMgr"}],StoryPiece:[function(t,e,i){"use strict";cc._RF.push(e,"bdb458kLPpJxJi4DX7NH/Om","StoryPiece");t("StoryAudioMgr");cc.Class({extends:t("Observer"),editor:!1,properties:{_menuNode:null,_storyTalk:null,pieceItem:{default:null,visible:!1}},_getMsgList:function(){return[cc.StoryMaster.Msg.PieceShowOptions,cc.StoryMaster.Msg.OnPieceTalkOver,cc.StoryMaster.Msg.UserTouch]},_onMsg:function(t,e){t===cc.StoryMaster.Msg.PieceShowOptions?(cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.OnEnableGlobalTouch,!1),this._menuNode.active=!0):t===cc.StoryMaster.Msg.OnPieceTalkOver?cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.OnGoNextPiece,this.pieceItem):t===cc.StoryMaster.Msg.UserTouch&&(this._storyTalk?this._storyTalk.onUserTouch():this._menuNode||cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.OnGoNextPiece,this.pieceItem))},onLoad:function(){this._initMsg();for(var t=this.node.children,e=0;e<t.length;e++){var i=t[e],o=i.getComponent("StoryOptionBox");null===this._menuNode&&o&&(this._menuNode=i);var s=i.getComponent("StoryTalk");null===this._storyTalk&&s&&(this._storyTalk=s)}this._storyTalk?this._menuNode&&(this._menuNode.active=!1):this._menuNode&&(cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.OnEnableGlobalTouch,!1),this._menuNode.active=!0)},start:function(){this._menuNode&&cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.PieceHasOptions,null)}}),cc._RF.pop()},{Observer:"Observer",StoryAudioMgr:"StoryAudioMgr"}],StoryTalk:[function(t,e,i){"use strict";cc._RF.push(e,"65757LGwZdBcJEd9tHbaPeG","StoryTalk");var o=cc.Enum({Slow1:7,Slow2:6,Slow3:5,Normal:4,Fast1:3,Fast2:2,Fast3:1}),s=cc.Enum({Running:1,Waiting:2,Over:3});cc.Class({extends:t("Observer"),editor:!1,properties:{_bOptions:!1,roleTalkFrame:{default:null,displayName:"\u5bf9\u8bdd\u80cc\u666f\u6846",type:cc.Node,visible:!1},word:{default:null,displayName:"\u5bf9\u8bdd\u5185\u5bb9",type:cc.Label,visible:!1},talkSpeed:{default:o.Normal,displayName:"\u8bed\u901f",type:o,notify:function(){this.wordIntervalTime=.05*this.talkSpeed,this.onWordEffect()}},talkWord:{default:"",displayName:"\u5bf9\u8bdd",multiline:!0,notify:function(){this.word.string=this.talkWord}},wordIntervalTime:{tooltip:"\u6bcf\u4e2a\u5b57\u7b26\u51fa\u73b0\u7684\u95f4\u9694\u65f6\u95f4",default:.1,displayName:"\u95f4\u9694\u65f6\u95f4",type:cc.Float,visible:!1},preview:{default:"0",notify:!1}},onLoad:function(){this._initMsg(),this.onWordEffect()},_getMsgList:function(){return[cc.StoryMaster.Msg.PieceHasOptions]},_onMsg:function(t,e){t===cc.StoryMaster.Msg.PieceHasOptions&&(this._bOptions=!0)},onUserTouch:function(){this.state===s.Running?this.onTalkFast():this.state===s.Waiting||this.state===s.Over&&(this._bOptions||cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.OnPieceTalkOver,null))},start:function(){},onTalkFast:function(){this.wordIntervalTime=.03,this.unschedule(this._updateWord),this.schedule(this._updateWord,this.wordIntervalTime)},onWordEffect:function(){if(this.word){this.state=s.Running;var t=this.wordIntervalTime;this.index=0,this.allWord=this.word.string,this.unschedule(this._updateWord),this.schedule(this._updateWord,t),this._updateWord()}},_updateWord:function(){this._updateWordByIndex(this.index),this.index++,this.index>=this.allWord.length&&this.onTalkOver()},onTalkOver:function(){this.state=s.Waiting,this.unschedule(this._updateWord),this.word.string=this.allWord,this.scheduleOnce(function(){this.state=s.Over}.bind(this),.3),this._bOptions&&cc.ObserverMgr.dispatchMsg(cc.StoryMaster.Msg.PieceShowOptions,null)},_updateWordByIndex:function(t){if(this.allWord&&t<this.allWord.length){var e=this.allWord.slice(0,t);this.word.string=e}}}),cc._RF.pop()},{Observer:"Observer"}]},{},["Animation","GameUtil","LocalStorage","Observer","ObserverMgr","StoryGame","StoryAudioEffect","StoryAudioMgr","StoryAudioMusic","StoryConfig","StoryData","StoryOptionBox","StoryOptionItem","StoryPiece","StoryTalk","StoryMaster"]);