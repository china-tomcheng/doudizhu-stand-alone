"use strict";
cc._RF.push(module, 'b05a68gSOpBWr8ddvT03Jpj', 'loginScene');
// scripts/loginscene/loginScene.js

"use strict";

var _mygolbal = _interopRequireDefault(require("../mygolbal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    wait_node: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    cc.director.preloadScene("hallScene");
  },
  start: function start() {},
  onButtonCilck: function onButtonCilck(event, customData) {
    switch (customData) {
      case "wx_login":
        console.log("wx_login request"); //this.wait_node.active = true

        _mygolbal["default"].socket.request_wxLogin({
          uniqueID: _mygolbal["default"].playerData.uniqueID,
          // userId: myglobal.playerData.userId,
          userName: _mygolbal["default"].playerData.userName,
          avatarUrl: _mygolbal["default"].playerData.avatarUrl
        }, function (err, result) {
          //请求返回
          //先隐藏等待UI
          //this.wait_node.active = false
          if (err != 0) {
            console.log("err:" + err);
            return;
          }

          console.log("login sucess" + JSON.stringify(result));
          _mygolbal["default"].playerData.gobal_count = result.goldcount;
          cc.director.loadScene("hallScene");
        }.bind(this));

        break;

      case 'guest_login':
        this.wait_node.active = true;
        var count = Math.floor(Math.random() * 100000);
        var userName = "guest_".concat(count);
        _mygolbal["default"].playerData.userId = "".concat(count);
        _mygolbal["default"].playerData.userName = userName;
        cc.sys.localStorage.setItem('userData', JSON.stringify(_mygolbal["default"].playerData));
        cc.director.loadScene("hallScene");

      default:
        break;
    }
  } // update (dt) {},

});

cc._RF.pop();